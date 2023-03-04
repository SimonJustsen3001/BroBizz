import { makeAutoObservable } from "mobx";
import { BroBizz } from "../../features/BroBizz/brobizzInterface";
import { Trip } from "../../features/Trip/tripInterface";
import agent from "../api/agent";

export default class TripStore {
  trips: Trip[] = [];
  selectedTrip: Trip | null = null;
  id = "";
  name = "";
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadTrips = async (id: string) => {
    this.setLoadingInitial(true);

    try {
      const trips = await agent.Trips.list(id);
      console.log(trips);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  //   addBroBizz = async (creds: TripFormValues) => {
  //     await agent.Trip.create(creds);
  //     router.navigate("/brobizz");
  //     store.modalStore.closeModal();
  //   };
}
