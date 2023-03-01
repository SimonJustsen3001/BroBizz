import { useContext, createContext } from "react";
import BroBizzStore from "./brobizzStore";
import UserStore from "./userStore";

interface Store {
    brobizzStore: BroBizzStore;
    userStore: UserStore;
}

export const store: Store = {
    brobizzStore: new BroBizzStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}