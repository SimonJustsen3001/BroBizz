import { useContext, createContext } from "react";
import BroBizzStore from "./brobizzStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import TripStore from "./tripStore";

interface Store {
  brobizzStore: BroBizzStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  tripStore: TripStore;
}

export const store: Store = {
  brobizzStore: new BroBizzStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  tripStore: new TripStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
