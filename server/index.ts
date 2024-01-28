import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { ListenPlugin, RouterPlugin } from "./plugins";

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
RouterPlugin.routeSetup(app);
ListenPlugin.listen(app);
