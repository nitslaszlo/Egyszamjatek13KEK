export default class Játékos {
    // Privát adattagok:
    #név: string; // privát mező TS 3.8.0-ás verziótól használható
    #tippek: number[] = [];

    public get fordulókSzáma(): number {
        return this.#tippek.length;
    }

    public get név(): string {
        return this.#név;
    }

    public get játékosLegnagyobbTippje(): number {
        let maxTipp = 0;
        for (const i in this.#tippek) {
            if (this.#tippek[i] > maxTipp) {
                maxTipp = this.#tippek[i];
            }
        }
        return maxTipp;
    }

    // Kódtagok:
    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.#név = m[0];
        for (let i = 1; i < m.length; i++) {
            this.#tippek.push(parseInt(m[i]));
        }
    }

    public fordulóTippje(forduló: number): number {
        const fordulóIndexe: number = forduló - 1;
        return this.#tippek[fordulóIndexe];
    }
}
