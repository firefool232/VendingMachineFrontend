import IDrink from "@/types/Drink";
import axios from "axios";

const apiUrl = "https://localhost:44360/Administrator";


export function addDrink(drink: IDrink) {
    return axios.post(`${apiUrl}/addDrink`, drink);
}

export function removeDrink(drink: IDrink) {
    return axios.post(`${apiUrl}/removeDrink`, drink);
}

export function editDrink(drink: IDrink) {
    return axios.post(`${apiUrl}/changeDrink`, drink);
}