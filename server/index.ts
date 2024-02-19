import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { ListenPlugin, RouterPlugin } from "./plugins";
import fileUpload from "express-fileupload";
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({}));

RouterPlugin.routeSetup(app);
ListenPlugin.listen(app);
