import express from "express";
import cors from "cors";
import routes from "./routes";

import 'dotenv/config'

const app = express();

const server = require("http").Server(app);

app.use(cors());
app.use(express.json());
app.use(require("./request_handler"));

process.env.PORT = process.env.PORT || '8080';

server.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

routes.forEach((route: any) => {
  switch (route.method) {
    case "GET":
      app.get(route.path, route.func);
      break;
    case "POST":
      app.post(route.path, route.func);
      break;
    case "PUT":
      app.put(route.path, route.func);
      break;
    case "PATCH":
      app.patch(route.path, route.func);
      break;
    case "DELETE":
      app.delete(route.path, route.func);
      break;
    case "OPTIONS":
      app.options(route.path, route.func);
      break;
  }
});
