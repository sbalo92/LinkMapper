const express = require('express');
const app = express();
const jsts = require("jsts");
const wgs84GeoFac = new jsts.geom.GeometryFactory(new jsts.geom.PrecisionModel(), 4326);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index/index.html');
});
app.get('/index/*.js', (req, res) => {
  console.log("index called with request " + req.url);
  res.sendFile(__dirname + req.url);
});
app.get('/testGeo', (req, res) => {
  const testGeo = wgs84GeoFac.createPoint(new jsts.geom.Coordinate(12, 20));
  console.log(testGeo)
  res.send(new jsts.io.GeoJSONWriter(wgs84GeoFac).write(testGeo));
});
app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});