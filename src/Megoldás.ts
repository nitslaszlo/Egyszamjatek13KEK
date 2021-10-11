import fs from "fs";
import Játékos from "./Játékos";

export default class Megoldás {
    #játékosok: Játékos[] = [];

    public get játékosokSzáma(): number {
        return this.#játékosok.length;
    }

    public get fordulókSzáma(): number {
        return this.#játékosok[0].fordulókSzáma;
    }

    public get voltEgyesTippElsőFordulóban(): boolean {
        let voltEgyesTipp = false;
        for (const j of this.#játékosok) {
            if (j.fordulóTippje(1) == 1) {
                voltEgyesTipp = true;
                break;
            }
        }
        return voltEgyesTipp;
    }

    public get játékLegnagyobbTippje(): number {
        let maxTipp = 0;
        for (const j of this.#játékosok) {
            if (j.játékosLegnagyobbTippje > maxTipp) {
                maxTipp = j.játékosLegnagyobbTippje;
            }
        }
        return maxTipp;
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

    private nyertesTipp(forduló: number): number {
        const stat: number[] = new Array(100).fill(0);
        for (const j of this.#játékosok) {
            stat[j.fordulóTippje(forduló)]++;
        }
        return stat.indexOf(1); // Az első 1-es érték indexe a vektorban, -1 ha nincs
    }

    public nyertesTippSzöveg(forduló: number): string {
        const nyertesTipp: number = this.nyertesTipp(forduló);
        if (nyertesTipp != -1) {
            return `Nyertes tipp a megadott fordulóban: ${nyertesTipp}`;
        } else {
            return "Nem volt egyedi tipp a megadott fordulóban!";
        }
    }
}
