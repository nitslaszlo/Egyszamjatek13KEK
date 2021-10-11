import fs from "fs";
import Játékos from "./Játékos";

export default class Megoldás {
    #játékosok: Játékos[] = [];

    public get játékosokSzáma(): number {
        return this.#játékosok.length;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(sor => {
                const aktSor: string = sor.trim(); // \r vezérlő karakter levágása
                this.#játékosok.push(new Játékos(aktSor));
            });
    }
}
