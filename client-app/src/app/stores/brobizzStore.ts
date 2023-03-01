import { makeAutoObservable } from "mobx";
import { BroBizz } from "../../features/BroBizz/brobizzInterface";
import agent from "../api/agent";

export default class BroBizzStore {
    
    brobizzs: BroBizz[] = [];
    selectedBroBizz: BroBizz | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadBroBizzs = async () => {
        this.setLoadingInitial(true)

        try {
            const brobizzs = await agent.BroBizzs.list();
            brobizzs.forEach(brobizz => {
                this.brobizzs.push(brobizz);
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}