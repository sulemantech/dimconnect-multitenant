
const { exec, spawn } = require('child_process');

const host = 'localhost';
const user = 'postgres';
const password = '1234';
const dbname = 'test';
const table = 'hachenburg';
const table1 = 'lambrecht';
const table2 = 'badneuner';
// delete ./output/geojson.geojson if exist



exec(`ogr2ogr -f "GeoJSON" -lco COORDINATE_PRECISION=10 ./output/hachenburg.geojson PG:"host=${host} user=${user} password=${password} dbname=${dbname}" -sql "SELECT *, ST_AsGeoJSON(geom) as geometry FROM ${table}"`, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
    console.log(stderr);
    //////////////////////////////
    //////////////////////////////
    //////////////////////////////


    const tippecanoe = spawn('tippecanoe', ['-o', './output/hachenburg.mbtiles', './output/hachenburg.geojson','-z','20','-Z','10',' --drop-densest-as-needed', '--extend-zooms-if-still-dropping','--force']);
    tippecanoe.stdout.on('data', (data) => {
        console.log(`stdut: ${data}`);
    }
    );

    tippecanoe.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    }
    );

    tippecanoe.on('close', (code) => {
        if (code === 0) {
            console.log('Tippecanoe exited with code 0');
        } else {
            console.error(`Tippecanoe exited with code ${code}`);
        }
    }
    );


    //////////////////////////
    //////////////////////////
    //////////////////////////
});
// exec(`ogr2ogr -f "GeoJSON" -lco COORDINATE_PRECISION=10 ./output/lambrecht.geojson PG:"host=${host} user=${user} password=${password} dbname=${dbname}" -sql "SELECT *, ST_AsGeoJSON(geom) as geometry FROM ${table1}"`, (err, stdout, stderr) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(stdout);
//     console.log(stderr);
//     //////////////////////////////
//     //////////////////////////////
//     //////////////////////////////


//     const tippecanoe = spawn('tippecanoe', ['-o', './output/lambrecht.mbtiles', './output/lambrecht.geojson','-z','18','-Z','14',' --drop-densest-as-needed', '--extend-zooms-if-still-dropping','--force']);
//     tippecanoe.stdout.on('data', (data) => {
//         console.log(`stdut: ${data}`);
//     }
//     );

//     tippecanoe.stderr.on('data', (data) => {
//         console.log(`stderr: ${data}`);
//     }
//     );

//     tippecanoe.on('close', (code) => {
//         if (code === 0) {
//             console.log('Tippecanoe exited with code 0');
//         } else {
//             console.error(`Tippecanoe exited with code ${code}`);
//         }
//     }
//     );


//     //////////////////////////
//     //////////////////////////
//     //////////////////////////
// });
// exec(`ogr2ogr -f "GeoJSON" -lco COORDINATE_PRECISION=10 ./output/badneuner.geojson PG:"host=${host} user=${user} password=${password} dbname=${dbname}" -sql "SELECT *, ST_AsGeoJSON(geom) as geometry FROM ${table2}"`, (err, stdout, stderr) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(stdout);
//     console.log(stderr);
//     //////////////////////////////
//     //////////////////////////////
//     //////////////////////////////


//     const tippecanoe = spawn('tippecanoe', ['-o', './output/badneuner.mbtiles', './output/badneuner.geojson','-z','18','-Z','14',' --drop-densest-as-needed', '--extend-zooms-if-still-dropping','--force']);
//     tippecanoe.stdout.on('data', (data) => {
//         console.log(`stdut: ${data}`);
//     }
//     );

//     tippecanoe.stderr.on('data', (data) => {
//         console.log(`stderr: ${data}`);
//     }
//     );

//     tippecanoe.on('close', (code) => {
//         if (code === 0) {
//             console.log('Tippecanoe exited with code 0');
//         } else {
//             console.error(`Tippecanoe exited with code ${code}`);
//         }
//     }
//     );


//     //////////////////////////
//     //////////////////////////
//     //////////////////////////
// });













