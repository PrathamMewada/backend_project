import * as models from "./models";
import { ConnectToDb } from "./connection";

const mongoDbClient = {
  ConnectToDb,
  Booking: models.Booking
};

export default mongoDbClient;