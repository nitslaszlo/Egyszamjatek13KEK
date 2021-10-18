import Játékos from "../Játékos";

describe("Játékos osztály unit tesztek", () => {
    const j1: Játékos = new Játékos("Marci 3 12 1 8 5 8 1 2 1 4");

    it("Játékos osztálypéldány ellenőrzése", async () => {
        expect(j1).toBeInstanceOf(Játékos);
    });

    it("Fordulók száma", async () => {
        expect(j1.fordulókSzáma).toBe(10);
    });

    it("Játékos neve", async () => {
        expect(j1.név).toBe("Marci");
    });

    it("Játékos legnagyobb tippje", async () => {
        expect(j1.játékosLegnagyobbTippje).toBe(12);
    });

    it("Fordulók (1..10) tippjei", async () => {
        const tippek: number[] = [3, 12, 1, 8, 5, 8, 1, 2, 1, 4];
        for (let i = 1; i <= tippek.length; i++) {
            expect(j1.fordulóTippje(i)).toBe(tippek[i - 1]);
        }
    });
});
