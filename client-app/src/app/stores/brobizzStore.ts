import { makeAutoObservable } from "mobx";
import {
  BroBizz,
  BroBizzFormValues,
} from "../../features/BroBizz/brobizzInterface";
import agent from "../api/agent";
import { router } from "../router/Routes";
import { store } from "./store";

export default class BroBizzStore {
  brobizzs: BroBizz[] = [];
  selectedBroBizz: BroBizz | null = null;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadBroBizzs = async () => {
    this.setLoadingInitial(true);

    try {
      const brobizzs = await agent.BroBizzs.list();
      console.log(brobizzs);
      if (this.brobizzs) {
        this.brobizzs = [];
      }
      brobizzs.forEach((brobizz) => {
        this.brobizzs.push(brobizz);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  addBroBizz = async (creds: BroBizzFormValues) => {
    await agent.BroBizzs.create(creds);
    router.navigate("/brobizz");
    store.modalStore.closeModal();
  };
}
