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
                if (aktSor.length > 0) {
                    this.#játékosok.push(new Játékos(aktSor));
                }
            });
    }

    private nyertesTipp(forduló: number): number {
        const stat: number[] = new Array(100).fill(0);
        for (const j of this.#játékosok) {
            stat[j.fordulóTippje(forduló)]++;
        }
        return stat.indexOf(1); // Az első 1-es érték indexe a vektorban, -1 ha nincs
    }

    private voltNyertesTipp(forduló: number): boolean {
        return this.nyertesTipp(forduló) != -1;
    }

    public nyertesTippSzöveg(forduló: number): string {
        const nyertesTipp: number = this.nyertesTipp(forduló);
        if (nyertesTipp != -1) {
            return `Nyertes tipp a megadott fordulóban: ${nyertesTipp}`;
        } else {
            return "Nem volt egyedi tipp a megadott fordulóban!";
        }
    }

    public nyertesJátékos(forduló: number): string {
        let nyertesNeve = "Nem volt nyertes a megadott fordulóban!";
        if (this.voltNyertesTipp(forduló)) {
            const nyertesTipp: number = this.nyertesTipp(forduló);
            for (const j of this.#játékosok) {
                if (j.fordulóTippje(forduló) == nyertesTipp) {
                    nyertesNeve = j.név;
                    break; // break nélkül is helyes eredményt ad, csak feleslegesen fut tovább
                }
            }
        }
        return nyertesNeve;
    }

    private állománytÖsszeállít(forduló: number): string {
        const ki: string[] = [];
        ki.push(`Forduló sorszáma: ${forduló}`);
        ki.push(`Nyertes tipp: ${this.nyertesTipp(forduló)}`);
        ki.push(`Nyertes játékos: ${this.nyertesJátékos(forduló)}`);
        return ki.join("\r\n") + "\r\n";
        // \r -> CR, ASCII kód: 13
        // \n -> LF, ASCII kód: 10
    }

    public állománybaÍr(állományNeve: string, forduló: number): void {
        if (this.voltNyertesTipp(forduló)) {
            // írás
            try {
                fs.writeFileSync(állományNeve, this.állománytÖsszeállít(forduló));
            } catch (error) {
                console.log((error as Error).message);
            }
        } else {
            // törlés
            try {
                fs.unlinkSync(állományNeve);
            } catch (error) {
                console.log((error as Error).message);
            }
        }
    }
}
