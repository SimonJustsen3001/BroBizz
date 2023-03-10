import { makeAutoObservable } from "mobx";
import { Trip } from "../interfaces/tripInterface";
import agent from "../api/agent";

export default class TripStore {
  trips: Trip[] = [];
  selectedTrip: Trip | null = null;
  id = "";
  name = "";
  tripDate = "";
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
      if (this.trips) {
        this.trips = [];
      }
      trips.forEach((trip) => {
        this.trips.push(trip);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadTrip = async (id: string) => {
    this.setLoadingInitial(true);

    try {
      const trip = await agent.Trips.single(id);
      console.log(trip);
      this.selectedTrip = trip;
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
