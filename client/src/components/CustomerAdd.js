import React, { Component } from 'react';
import axios from 'axios'
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    hidden : {
        display: 'none'
    }
})


class CustomerAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            filename:'',
            open : false

        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer().then((res) => {
            console.log(res.data);
            this.props.stateRefresh();
        });
        
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            filename:'',
            open:false
        })
        
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
        
        return axios.post(url, formData, config);
     }
     handleClickOpen = ()=> {
         this.setState({
             open: true,
         })
     }
     handleClose = () => {
         this.setState({
             file:null,
             userName:'',
             birthday:'',
             gender:'',
             job:'',
             filename:'',
             open:false
         })
     }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color='primary' onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose = {this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input  className = {classes.hidden} accept = "image/*" id='raised-button-file' type = "file"  file={this.state.file} value = {this.state.filename} onChange={this.handleFileChange}></input> <br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.filename == '' ? "프로필 이미지 선택" : this.state.filename}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></TextField> <br/>
                        <TextField label="생년월일" type="text" name ="birthday" value={this.state.birthday} onChange={this.handleValueChange}></TextField><br/>
                        <TextField label="성별" type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange}></TextField><br/>
                        <TextField label="직업" type='text' name='job' value={this.state.job} onChange={this.handleValueChange}></TextField><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);