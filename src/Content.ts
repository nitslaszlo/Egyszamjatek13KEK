import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldás from "./Megoldás";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<meta charset='utf-8'>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

        // Kezd a kódolást innen -->

        res.write("Egyszámjáték feladat megoldása\n");
        const mo: Megoldás = new Megoldás("egyszamjatek.txt");

        res.write(`3. feladat: Játékosok száma: ${mo.játékosokSzáma}\n`);

        const fordulókSzáma: number = mo.fordulókSzáma;
        res.write(`4. feladat: Fordulók száma: ${fordulókSzáma}\n`);

        res.write(`5. feladat: Az első fordulóban ${mo.voltEgyesTippElsőFordulóban ? "" : "nem "}volt egyes tipp!\n`);

        res.write(`6. feladat: A legnagyobb tipp a fordulók során: ${mo.játékLegnagyobbTippje}\n`);

        // 7. feladat: Input:
        let inputForduló: number = parseInt(params.get("fordulo") as string);
        if (isNaN(inputForduló) || inputForduló < 1 || inputForduló > fordulókSzáma) inputForduló = 1;
        res.write(`<label>7. feladat: Kérem a forduló sorszámát [1-${fordulókSzáma}]: <input type='text' name='fordulo' value=${inputForduló} style='max-width:100px;' onChange='this.form.submit();'></label>\n`);
        res.write(`8. feladat: ${mo.nyertesTippSzöveg(inputForduló)}\n`);

        res.write(`9. feladat: A megadott forduló nyertese: ${mo.nyertesJátékos(inputForduló)}\n`);

        mo.állománybaÍr("nyertes.txt", inputForduló);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
