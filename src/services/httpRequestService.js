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
                image: hero.image,
                height: hero.appearance.height[1].replace( ' cm', ''),
                weight: hero.appearance.weight[1].replace( ' kg', '')
            }));
    return data;
}

const getHero = async (id) => {
    let { data } = await axios.get(`${HERO_API_URL}/${id}`);
    if(data.response === "success")
        return {
            name: data.name,
            aliases: data.biography.aliases,
            workplace: data.work.base,
            height: data.appearance.height[1].replace( ' cm', ''),
            weight: data.appearance.weight[1].replace( ' kg', ''),
            eyeColor: data.appearance["eye-color"],
            hairColor: data.appearance["hair-color"],
            image: data.image.url
        }
    return data.results;
}

const RequestService = {
    login,
    searchHero,
    getHero
}

export default RequestService;