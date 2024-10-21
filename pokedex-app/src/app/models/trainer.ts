import { Pokemon } from "./pokemon";

export class Trainer {
    name: string;
    id: string;
    hobbies: Hobbies[];
    birthdate: Date;
    age:number;
    image_path: string;
    dui?: string;
    minors_id?: string;
    pokemons_owned?: Pokemon[] = [];

    constructor(name: string, id: string, image_path: string, hobbies: Hobbies[], birthDate: Date, age: number, dui: string, minors_id: string, pokemons: Pokemon[] ){
        this.name = name;
        this.id = id;
        this.image_path = image_path;
        this.hobbies = hobbies;
        this.birthdate = birthDate;
        this.age = age;
        this.dui = dui;
        this.minors_id = minors_id;
        this.pokemons_owned = pokemons;
    }

}

class Hobbies {
    name: string;
}

