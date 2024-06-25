import {
  Server,
  loadPackageDefinition as loadGrpcPackageDefinition,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { ReflectionService } from "@grpc/reflection";

export function loadPackageDefinition(packageName: string, server: Server) {
  const PROTO_PATH = `./node_modules/protos/src/${packageName}.proto`;

  const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const reflection = new ReflectionService(packageDefinition);
  reflection.addToServer(server);
  return loadGrpcPackageDefinition(packageDefinition);
}
