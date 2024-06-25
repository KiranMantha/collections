import { Server, ServerCredentials } from "@grpc/grpc-js";
import { loadHelloService } from "./hello-service";
// import { loadTodoService } from "./todo-service";

const PORT = "50050";
const server = new Server();

// loadTodoService(server);
loadHelloService(server);

server.bindAsync(
  `localhost:${PORT}`,
  ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(`Failed to start server: ${err}`);
      server.forceShutdown();
      server.unbind(PORT);
    } else {
      console.log(`Server running at http://localhost:${port}`);
    }
  }
);
