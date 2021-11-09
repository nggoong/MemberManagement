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

/* 이미지 파일 처리를 위한 library >>> multer */
const multer = require('multer');
// 업로드 폴더 설정(사용자의 파일이 저장되는 폴더)
const upload = multer({dest: './upload'});
app.get('/api/customers', (req, res)=> {
    connection.query(
      'select * from customer',
      (err, rows, field) => {
        res.send(rows);
      }
    )
});
// upload폴더 공유(사용자는 image폴더로 확인할 수 있음.. image와 upload 바인딩)
app.use('/image', express.static('./upload'))
app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'insert into customer values (null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    })
})

app.listen(port, () => console.log(`on port ${port}`));