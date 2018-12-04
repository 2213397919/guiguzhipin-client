import React, {Component} from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import HeaderSelector from '../header-selector/index';
class BossInfo extends Component {
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
            <NavBar>老板信息完善</NavBar>
            <HeaderSelector setHeader={this.setHeader}/>
            <InputItem onChange={val => {this.handleChange('post', val)}}>招聘职位:</InputItem>
            <InputItem onChange={val => {this.handleChange('company', val)}}>公司名称:</InputItem>
            <InputItem onChange={val => {this.handleChange('salary', val)}}>职位薪资:</InputItem>
            <TextareaItem title="职位要求:" rows={3} onChange={val => {this.handleChange('info', val)}}/>
            <Button type='primary'>保存</Button>
        </div>
    )
  }
}

export default BossInfo;

