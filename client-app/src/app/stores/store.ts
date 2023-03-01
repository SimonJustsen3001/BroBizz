import { useContext, createContext } from "react";
import BroBizzStore from "./brobizzStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
  brobizzStore: BroBizzStore;
  userStore: UserStore;
  commonStore: CommonStore;
}

export const store: Store = {
  brobizzStore: new BroBizzStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
