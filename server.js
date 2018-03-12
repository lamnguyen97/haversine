const express = require('express');
const app = express();
// const readlineSync = require('readline-sync');
// const bodyParser = require('body-parser');
const haversine = require('haversine');
// const format = require('string-format');


app.route('/').get((req, res) => {
      res.status(400).send({
            error: null,
            msg: 'Try /distance?start=123,132&end=156,973',
            note: 'lat,lon'
      });
});

app.route('/distance').get((req, res) => {
      let start = req.query.start;
      let end = req.query.end;

      if (!start || !end) {
            return res.status(400).send({error: 'Missing param'});
      }

      start = start.split(',').map(val => Number(val));
      end = end.split(',').map(val => Number(val));

      if (start.length != 2 || end.length != 2) {
            return res.status(400).send({error: 'Missing point'});
      }

      // console.log('Requested: {} - {}'.format(start, end));

      var result = {error: null, result: {kilometer: 0, meter: 0, mile: 0}};
      var format = '[lat,lon]';

      result.result.kilometer =
          haversine(start, end, {unit: 'km', format: format});
      result.result.meter =
          haversine(start, end, {unit: 'meter', format: format});
      result.result.mile =
          haversine(start, end, {unit: 'mile', format: format});

      return res.status(200).send(result);
});

app.route('*').all((req, res) => { res.redirect('/'); });

app.listen(3000);
