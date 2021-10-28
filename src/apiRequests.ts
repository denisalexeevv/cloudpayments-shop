import PizzaDataEntity from "@/interfaces/PizzaDataEntity";
import axios from 'axios';

async function catalogData (): Promise<PizzaDataEntity[]> {
    return (await axios.get('/static/cp-pizza.json')).data;
}

export { catalogData }
