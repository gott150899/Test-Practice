export type PokePaging = {
    count: number;
    next: string;
    previous: string;
    results: PokeResult[];
}

export type PokeResult = {
    name: string;
    url: string;
}