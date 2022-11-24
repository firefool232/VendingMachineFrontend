import IDrink from "@/types/Drink";
import axios from "axios";

const apiUrl = "https://localhost:44360/Vending";

export function getDrinks() {
    return axios.get(`${apiUrl}/getDrinks`);
}

export function putCoin(value: number) {
    const formData = new FormData();
    formData.append('value', value.toString());
    return axios.post(`${apiUrl}/putCoin`, formData);
}

export function getChange() {
    return axios.get(`${apiUrl}/getChange`);
}

export function isThereAChange(drink: IDrink) {
    return axios.post(`${apiUrl}/isThereAChange`, drink);
}

export function buyDrink(drink: IDrink) {
    return axios.post(`${apiUrl}/buyDrink`, drink);
}