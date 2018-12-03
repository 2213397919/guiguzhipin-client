import React, {Component} from 'react';
import {NavBar,List,WhiteSpace,InputItem,Button} from 'antd-mobile';
import Logo from '../logo/logo'

class Login extends Component {
    state={
        username:'',
        password:'',
    }
    handleValue = (type,value)=>{
        this.setState({
            [type]:value
        })
    }
    login = ()=>{
        const { username,password} = this.state;
        console.log(username,password);
        this.props.history.replace('/')
    }
    toRegister=()=>{
        this.props.history.replace('/Register');
    }
    render () {
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WhiteSpace />
                <List>
                    <InputItem onChange={value => this.handleValue('username',value)}>用户名:</InputItem>
                    <InputItem onChange={value => this.handleValue('password',value)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    <Button type='primary' onClick={this.login}>登录</Button>
                    <Button onClick={this.toRegister}>还没有账户</Button>
                </List>
                <WhiteSpace />
            </div>
        )
    }
}

export default Login;