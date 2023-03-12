import { Invoice } from "./invoiceInterface";
import { Bridge } from "./bridgeInterface";
import { Vehicle } from "./vehicleInterface";

export interface Trip {
  id: string;
  bridge: Bridge;
  vehicle: Vehicle;
  invoice: Invoice;
}
