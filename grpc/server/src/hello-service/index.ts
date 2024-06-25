import { Server, handleUnaryCall } from "@grpc/grpc-js";
import {
  GreeterServer,
  HelloReply,
  HelloRequest,
} from "../generated-models/hello/hello";
import { loadPackageDefinition } from "../utils";

class HelloService implements GreeterServer {
  [name: string]: import("@grpc/grpc-js").UntypedHandleCall;
  sayHello: handleUnaryCall<HelloRequest, HelloReply> = (call, callback) => {
    callback(null, { message: `Hello ${call.request.name}!!` });
  };
}

export function loadHelloService(server: Server) {
  const helloProto: any = loadPackageDefinition("hello").hello;
  server.addService(helloProto.Greeter.service, new HelloService());
}
