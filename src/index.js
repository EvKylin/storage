import { version } from "../package.json";

import indexDB from "./indexDB";
import storage from "./storage";

const DB = {
  version,
  index: indexDB,
  session: storage("session"),
  local: storage("local")
};

export default DB;
