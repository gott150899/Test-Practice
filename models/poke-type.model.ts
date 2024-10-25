export type PokeTypePaging = {
    count: number;
    next: string;
    previous: string;
    results: PokeTypeResult[];
}

export type PokeTypeResult = {
    name: string;
    url: string;
}

export type PokeTypeDetail = {
    damage_relations: {
      double_damage_from: Array<{
        name: string
        url: string
      }>
      double_damage_to: Array<any>
      half_damage_from: Array<any>
      half_damage_to: Array<{
        name: string
        url: string
      }>
      no_damage_from: Array<{
        name: string
        url: string
      }>
      no_damage_to: Array<{
        name: string
        url: string
      }>
    }
    game_indices: Array<{
      game_index: number
      generation: {
        name: string
        url: string
      }
    }>
    generation: {
      name: string
      url: string
    }
    id: number
    move_damage_class: {
      name: string
      url: string
    }
    moves: Array<{
      name: string
      url: string
    }>
    name: string
    names: Array<{
      language: {
        name: string
        url: string
      }
      name: string
    }>
    past_damage_relations: Array<any>
    pokemon: Array<{
      pokemon: {
        name: string
        url: string
      }
      slot: number
    }>
    sprites: {
      "generation-iii": {
        colosseum: {
          name_icon: string
        }
        emerald: {
          name_icon: string
        }
        "firered-leafgreen": {
          name_icon: string
        }
        "ruby-saphire": {
          name_icon: string
        }
        xd: {
          name_icon: string
        }
      }
      "generation-iv": {
        "diamond-pearl": {
          name_icon: string
        }
        "heartgold-soulsilver": {
          name_icon: string
        }
        platinum: {
          name_icon: string
        }
      }
      "generation-ix": {
        "scarlet-violet": {
          name_icon: string
        }
      }
      "generation-v": {
        "black-2-white-2": {
          name_icon: string
        }
        "black-white": {
          name_icon: string
        }
      }
      "generation-vi": {
        "omega-ruby-alpha-sapphire": {
          name_icon: string
        }
        "x-y": {
          name_icon: string
        }
      }
      "generation-vii": {
        "lets-go-pikachu-lets-go-eevee": {
          name_icon: string
        }
        "sun-moon": {
          name_icon: string
        }
        "ultra-sun-ultra-moon": {
          name_icon: string
        }
      }
      "generation-viii": {
        "brilliant-diamond-and-shining-pearl": {
          name_icon: string
        }
        "legends-arceus": {
          name_icon: string
        }
        "sword-shield": {
          name_icon: string
        }
      }
    }
  }
  