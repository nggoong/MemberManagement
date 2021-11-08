import React, { Component } from 'react';
import axios from 'axios'


class CustomerAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            filename:''

        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer().then((res) => console.log(res.Data));
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            filename : e.target.value
        })
    }
    handleValueChange = (e)=> {
        let nextState ={};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url='/api/customers';
        /* new FormData()를 통해 빈 객체를 만들고, FormData.append()를 통해 key값, value값을 지정한다.*/ 
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        /* 파일이 포함된 데이터는 헤더를 추가해줘야한다.*/

        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }
        
        return axios.post(url, FormData, config);
     }


    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type = "file" name = "file" file={this.state.file} value = {this.state.filename} onChange={this.handleFileChange}></input> <br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></input> <br/>
                생년월일 : <input type="text" name ="birthday" value={this.state.birthday} onChange={this.handleValueChange}></input><br/>
                성별 : <input type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange}></input><br/>
                직업 : <input type='text' name='job' value={this.state.job} onChange={this.handleValueChange}></input><br/>
                <button type='submit'>추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;