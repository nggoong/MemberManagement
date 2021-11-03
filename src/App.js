import logo from './logo.svg';
import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';


const customers = [{
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
}]


class App extends Component {
  render() {
    return (
      <div>
        {customers.map(c=> {
          return(
            <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} job={c.job} gender={c.gender}/>
          )
        })}
      </div>
    );
  }
  
}

export default App;
