const express = require('express');
const { Pool } = require('pg'); // import the pg module
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: '10.90.0.136',
  database: 'dim',
  password: 'MMcdRcfMxnTFI4tBLtnAcIkcS',
  port: 5432,
});


app.get('/district/:id', (req, res) => {

    let userId = req.params.id;
        // sanitize the userId variable to prevent SQL injection
        userId = userId.replace(/[^a-zA-Z0-9_]/g, '');
    console.log(userId)
    pool.query(`
    WITH bbox_4326 as (
        SELECT ST_Transform(ST_SetSRID(ST_GeomFromText(ST_AsText(geom)),25832),4326) as geom
        FROM "${userId}".boundaries
    )
    SELECT ST_XMin(geom) as xmin, ST_YMin(geom) as ymin, ST_XMax(geom) as xmax, ST_YMax(geom) as ymax
    FROM bbox_4326
     `, (error, result) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

app.listen(3032, () => {
    console.log('Server started on port 3017');
});
