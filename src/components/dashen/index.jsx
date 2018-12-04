import React, {Component} from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import HeaderSelector from '../header-selector/index';




class DaShen extends Component {
    state = {
        header:'',
        post :'',
        company :'',
        salary:'',
        info:''
    }
    setHeader = header =>{
        this.setState({
            header
        })
    }
    handleChange = (type,val) =>{
        this.setState({[type]:val});
    }
    render () {
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem onChange={val => {this.handleChange('salary', val)}}>求职岗位:</InputItem>
                <TextareaItem title="个人介绍:" rows={3} onChange={val => {this.handleChange('info', val)}}/>
                <Button type='primary'>保存</Button>
            </div>
        )
    }
}

export default DaShen;

