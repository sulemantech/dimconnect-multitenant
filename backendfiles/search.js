const express = require('express');
const { Pool } = require('pg'); // import the pg module
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '1234',
  port: 5432,
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    pool.query(`
    WITH gis_osm_waterways_free_1 AS (
        SELECT ST_Extent(ST_GeomFromText(ST_AsText(geom))) as bbox
        FROM gis_osm_waterways_free_1  where name =$1
        )
        SELECT ST_XMin(gis_osm_waterways_free_1.bbox) as min_lng, ST_YMin(gis_osm_waterways_free_1.bbox) as min_lat, ST_XMax(gis_osm_waterways_free_1.bbox) as max_lng, ST_YMax(gis_osm_waterways_free_1.bbox) as max_lat
         FROM gis_osm_waterways_free_1 `,[userId], (error, result) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

app.listen(3014, () => {
    console.log('Server started on port 3014');
});
