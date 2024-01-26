import express from "express";
import { configs } from "../config";
export const ListenPlugin = {
  listen(app: express.Express) {
    const server = express();
    server.use(app);
    server.listen(configs.PORT, () => {
      console.log(`\n Server listening on port ${configs.PORT}`);
    });
  },
};
