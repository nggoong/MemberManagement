import React, { Component } from 'react';
import axios from 'axios';

class CustomerDelete extends Component {
    constructor(props) {
        super(props);
    }

    deleteCustomer = (id) => {
        const url = 'api/customers/' + id;
        return axios.delete(url)
        .then((res) => {
            console.log(res);
            this.props.stateRefresh();
        })
    }

    render() {
        return(
            <button onClick={(e)=> {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}


export default CustomerDelete;