import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Invoice } from "../interfaces/invoiceInterface";

export default class InvoiceStore {
  invoices: Invoice[] = [];
  selectedInvoice: Invoice | null = null;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadInvoices = async () => {
    this.setLoadingInitial(true);

    try {
      const invoices = await agent.Invoices.list();
      console.log(invoices);
      if (this.invoices) {
        this.invoices = [];
      }
      invoices.forEach((invoice) => {
        this.invoices.push(invoice);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
    }
  };

  loadInvoice = async (id: string) => {
    this.setLoadingInitial(true);

    try {
      const invoice = await agent.Invoices.single(id);
      console.log(invoice);
      this.selectedInvoice = invoice;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}
