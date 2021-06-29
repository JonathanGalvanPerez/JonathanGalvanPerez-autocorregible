import axios from "axios";
import { HERO_API_URL, LOGIN_API_URL } from "../app/config";

const login = (values) => {
    return axios.post(LOGIN_API_URL, values);
}

const searchHero = (name) => {
    return axios.post(HERO_API_URL, name);
}

const getHero = (id) => {
    return axios.get(`${HERO_API_URL}/${id}`);
}

const RequestServices = {
    login,
    searchHero,
    getHero
}

export default RequestServices;