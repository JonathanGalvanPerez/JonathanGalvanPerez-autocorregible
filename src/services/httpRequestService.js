import axios from "axios";
import { HERO_API_URL, LOGIN_API_URL } from "../app/config";

const login = async (values) => {
    const { data } = await axios.post(LOGIN_API_URL, values);
    return data;
}

const searchHero = async (query) => {
    let { data } = await axios.get(`${HERO_API_URL}/search/${query}`);
    if(!data.error)
        data = data.results.map(hero => (
            {
                id: hero.id,
                name: hero.name,
                powerstats: hero.powerstats,
                image: hero.image
            }));
    return data;
}

const getHero = async (id) => {
    let { data } = await axios.get(`${HERO_API_URL}/${id}`);
    if(!data.error)
        data = data.results.map(hero => (
            {
                name: hero.name,
                aliases: hero.biography.aliases,
                workplace: hero.work.base,
                height: hero.appearance.height,
                weight: hero.appearance.weight,
                eyeColor: hero.appearance["eye-color"],
                hairColor: hero.appearance["hair-color"],
                image: hero.image.url
            }
        ));
    return data.results;
}

const RequestService = {
    login,
    searchHero,
    getHero
}

export default RequestService;