/* eslint-disable @typescript-eslint/no-var-requires */
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

// Set the input directory for proto files
const PROTO_DIR = path.resolve(__dirname, '../protos');

// Set the output directory for generated code
const OUT_DIR = path.resolve(__dirname, '../src/generated');

// Load the proto files and generate the gRPC client and server
const loadProtoFiles = async (protoFilePath) => {
  const packageDefinition = await protoLoader.load(protoFilePath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
  return protoDescriptor;
};

// Generate the NestJS service from the gRPC client and server
const generateNestJSService = async (protoDescriptor, protoFilePath) => {
  const packageName = Object.keys(protoDescriptor)[0];
  const serviceName = Object.keys(protoDescriptor[packageName])[0];
  const serviceDescriptor = protoDescriptor[packageName][serviceName];

  if (!serviceDescriptor || !serviceDescriptor.service) {
    throw new Error(`No service found in ${protoFilePath}`);
  }

  const serviceMethods = Object.keys(serviceDescriptor.service);
  const nestJSService = `
    import { Injectable } from '@nestjs/common';
    import { Client, ClientGrpc, GrpcMethod, Transport } from '@nestjs/microservices';
    import { Observable } from 'rxjs';
    import { ${serviceName} } from '${protoFilePath}';

    @Injectable()
    export class ${serviceName}Service {
      @Client({
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: '${packageName}',
          protoLoader: require('@grpc/proto-loader'),
      loader: {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
          },
          protoPath: '${protoFilePath}',
        },
      })
      private client: ClientGrpc;

      private readonly service: ${serviceName};

      constructor() {
        this.service = this.client.getService<${serviceName}>('${serviceName}');
      }

      ${serviceMethods
        .map(
          (method) => `
        @GrpcMethod('${serviceName}', '${method}')
        ${method}(data: ${serviceDescriptor.service[method].requestType}): Observable<${serviceDescriptor.service[method].responseType}> {
          return this.service.${method}(data);
        }
      `,
        )
        .join('\n')}
    }
  `;
  console.log('nestJSService', nestJSService);
  return nestJSService;
};

// Find all proto files in the input directory and its subdirectories
const findProtoFiles = async (dir) => {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? findProtoFiles(res) : res;
    }),
  );
  return Array.prototype.concat(...files);
};

// Generate NestJS services for all proto files found
const generateNestJSServices = async () => {
  const protoFiles = await findProtoFiles(PROTO_DIR);
  for (const protoFilePath of protoFiles) {
    const protoDescriptor = await loadProtoFiles(protoFilePath);
    const nestJSService = await generateNestJSService(
      protoDescriptor,
      protoFilePath,
    );
    if (!fs.existsSync(OUT_DIR)) {
      fs.mkdirSync(OUT_DIR);
    }
    const nestJSServiceFilePath = path.resolve(
      OUT_DIR,
      `${path.basename(protoFilePath, '.proto')}.service.ts`,
    );
    await writeFileAsync(nestJSServiceFilePath, nestJSService);
    console.log(`Generated NestJS service for ${protoFilePath}`);
  }
};

generateNestJSServices();
