import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function isHabitable(planet) {
    return (
        planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
    );
}

const habitablePlanets = [];

const parser = parse({
    comment: '#',
    columns: true,
});

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(
            path.join(
                path.dirname(fileURLToPath(import.meta.url)),
                '../../data',
                'kepler_data.csv'
            )
        )
            .pipe(parser)
            .on('data', (data) => {
                if (isHabitable(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('error', (err) => reject(err))
            .on('end', () => {
                console.log(`Habitable planets: ${habitablePlanets.length}`);
                resolve();
            });
    });
}
function getAllPlanets() {
    return habitablePlanets;
}
export { getAllPlanets, loadPlanetsData };
