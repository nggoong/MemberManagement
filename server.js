const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/api/customers', (req, res)=> {
    res.send([{
        'id' : 1,
        'image' : 'https://placeimg.com/64/64/any',
        'name':'홍길동',
        'birthday' : '970828',
        'gender' : '남자',
        'job' : '대학생'
      },
      {
        'id' : 2,
        'image' : 'https://placeimg.com/64/64/any',
        'name':'고길동',
        'birthday' : '970828',
        'gender' : '남자',
        'job' : '백수'
      },
      {
        'id' : 3,
        'image' : 'https://placeimg.com/64/64/any',
        'name':'도우너',
        'birthday' : '970828',
        'gender' : '미상',
        'job' : '동물'
      }])
});

app.listen(port, () => console.log(`on port ${port}`));