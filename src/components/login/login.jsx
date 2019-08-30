//引入react
import React, {Component} from 'react';
import PropTypes from 'prop-types';
//引入antd-mobile
import {NavBar,List,WhiteSpace,InputItem,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
//引入logo图
import Logo from '../logo/logo'
class Login extends Component {
    //声明接收约束
    static propTypes = {
        user: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired
    }
    //初始化状态
    state = {
        username: '',
        password: '',
    }
    //通过onChange={value => this.handleValue('username',value)}来获取value.
    handleValue = (type, value) => {
        this.setState({
            [type]: value
        })
    }
    //获取登录者的信息
    login = async () => {
        const {username, password} = this.state;
        this.props.login({username, password})
    }
    //没有账户，转换到注册页面。
    toRegister = () => {
        this.props.history.replace('/Register');
        this.props.user.errMsg='';
    }

    render() {
        const {errMsgL, redirectTo} = this.props.user;
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }
            return (
                <div>
                    <NavBar>浪里直聘</NavBar>
                    <Logo/>
                    <p className="err-msg">{errMsgL}</p>
                    <WhiteSpace/>
                    <List>
                        <InputItem onChange={value => this.handleValue('username', value)}>用户名:</InputItem>
                        <InputItem onChange={value => this.handleValue('password', value)}
                                   type="password" >密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <Button type='primary' onClick={this.login}>登录</Button>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                    <WhiteSpace/>
                </div>
            )
        }
    }
export default Login;
