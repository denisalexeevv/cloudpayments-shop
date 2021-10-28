import PizzaDataEntity from "@/interfaces/PizzaDataEntity";
import {catalogData} from "@/apiRequests";
type CatalogDataState = { catalog: PizzaDataEntity[] }

const state = (): CatalogDataState => ({
    catalog: []
});

const getters = {
    getCatalogItemById: (state: CatalogDataState) => (id: number) => {
        return state.catalog.find(c => c.id === id);
    }
}

const actions = {
    async loadCatalog({ state } : { state: CatalogDataState }) {
        state.catalog = await catalogData();
    }
}

export default { namespaced: true, state, getters, actions };
