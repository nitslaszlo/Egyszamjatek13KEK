export default class Játékos {
    // Privát adattagok:
    #név: string; // privát mező TS 3.8.0-ás verziótól használható
    #tippek: number[] = [];

    public get fordulókSzáma(): number {
        return this.#tippek.length;
    }

    // Kódtagok:
    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.#név = m[0];
        for (let i = 1; i < m.length; i++) {
            this.#tippek.push(parseInt(m[i]));
        }
    }
}
