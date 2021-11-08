const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mariadb = require('mariadb/callback');

const connection = mariadb.createConnection({
  host : conf.host,
  database : conf.database,
  user : conf.user,
  password : conf.password,
  port : conf.port,
})
connection.connect((err) => {
	if (err) throw err;
	console.log('Database Connected');
});

app.get('/api/customers', (req, res)=> {
    connection.query(
      'select * from customer',
      (err, rows, field) => {
        res.send(rows);
      }
    )
});

app.listen(port, () => console.log(`on port ${port}`));