import { PokeDetailType } from "@/models/poke-detail.model";
import { PokeTypeDetail, PokeTypePaging } from "@/models/poke-type.model";
import { PokePaging } from "@/models/poke.model";

const POKE_API = process.env.NEXT_PUBLIC_POKE_API;

const getPokePaging = async (limit: number, offset: number) => {
    const response = await fetch(`${POKE_API}/pokemon?limit=${limit}&offset=${offset}`);
    return await response.json() as PokePaging;
}
const getPokeDetailByUrl = async (url: string) => {
    const response = await fetch(url);
    return await response.json() as PokeDetailType;
}
const getPokeTypePaging = async () => {
    const response = await fetch(`${POKE_API}/type`);
    return await response.json() as PokeTypePaging;
}
const getPokeTypeByName = async (name: string) => {
    const response = await fetch(`${POKE_API}/type/${name}`);
    return await response.json() as PokeTypeDetail;
}

const pokeServices = {
    getPokePaging, getPokeDetailByUrl, getPokeTypePaging, getPokeTypeByName
}

export default pokeServices;