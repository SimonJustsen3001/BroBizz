interface Bridge {
  name: string;
}

interface Vehicle {
  licensePlate: string;
  type: string;
}

interface Invoice {
  id: string;
  customerName: string;
  customerAddress: string;
  supplyDate: Date;
  invoiceDate: Date;
  price: string;
}

export interface Trip {
  id: string;
  bridge: Bridge;
  vehicle: Vehicle;
  invoice: Invoice;
}
