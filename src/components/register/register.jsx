import React, {Component} from 'react';
import {NavBar,List,WhiteSpace,InputItem,Radio,Button} from 'antd-mobile';
import Logo from '../logo/logo'

const Item = List.Item;
class Register extends Component {
  state={
      username:'',
      password:'',
      rePassWord:'',
      boss:true
  }
  handleValue = (type,value)=>{
    this.setState({
        [type]:value
    })
  }
  register = ()=>{
      const { username,password,rePassWord,boss} = this.state;
      console.log(username,password,rePassWord,boss);
  }
  toLogin=()=>{
    this.props.history.replace('/login');
  }
  render () {
    const {boss} = this.state;
    return (
        <div>
            <NavBar>硅谷直聘</NavBar>
            <Logo/>
            <WhiteSpace />
            <List>
                <InputItem onChange={value => this.handleValue('username',value)}>用户名:</InputItem>
                <InputItem onChange={value => this.handleValue('password',value)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                <InputItem onChange={value => this.handleValue('rePassWord',value)}>确认密码:</InputItem>
                <Item>
                    用户类型:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    <Radio  checked={!boss} onChange={this.handleValue.bind(null,'boss',false)}>大神</Radio>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio checked={boss} onChange={this.handleValue.bind(null,'boss',true)}>老板</Radio>
                </Item>
              <Button type='primary' onClick={this.register}>注册</Button>
              <Button onClick={this.toLogin}>已有账户</Button>
            </List>
            <WhiteSpace />
        </div>
    )
  }
}

export default Register;