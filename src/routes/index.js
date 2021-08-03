import configuration from "./configuration";
import provider from "./provider";
import product from "./product";
import promotion from "./promotion";
import food from "./food";
import user from "./user";

import commerce from "./commerce";
import geofence from "./geofence";
import restaurant from "./restaurant";
import market from "./market";
import marketproduct from "./marketproduct";
// import payment from './payment'
import location from "./location";
import driver from "./driver";
import home from "./home";

// import { readFileSync } from 'fs'

// const dd = () => {
//     return readFileSync(__dirname, './index.js')
// }

export default {
  home,
  configuration,
  location,
  geofence,
  commerce,
  market,
  marketproduct,
  restaurant,
  provider,
  promotion,
  product,
  food,

  user,
  driver,
};
