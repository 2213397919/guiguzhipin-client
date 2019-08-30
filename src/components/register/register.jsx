//引入react
import React, {Component} from 'react';
import PropTypes from 'prop-types';
//引入antd-mobile
import {NavBar,List,WhiteSpace,InputItem,Radio,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
//引入logo图
import Logo from '../logo/logo';

const Item = List.Item;
class Register extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
    }
    //初始化状态
    state = {
        username: '',
        password: '',
        rePassWord: '',
        boss: true
    }

    //通过onChange={value => this.handleValue('username',value)}来获取value.
    handleValue = (type, value) => {
        this.setState({
            [type]: value
        })
    }
    //获取注册者的信息
    register = async () => {
        const {username, password, rePassword, boss} = this.state;
        //调用容器组件传递的更新状态的方法
        this.props.register({type: boss ? 'boss' : 'dashen', password, rePassword, username});
        console.log(username, password, rePassword, boss);
    }
    //有账户，转换到登录页面。
    toLogin = () => {
        this.props.history.replace('/login');
        this.props.user.errMsg='';
    }

    render() {
        const {boss} = this.state;
        const {errMsg, redirectTo} = this.props.user;
        //判断注册是否成功
        if (redirectTo) {
            //路由链接跳转
            return <Redirect to={redirectTo}/>
        }
            return (
                <div>
                    <NavBar>浪里直聘</NavBar>
                    <Logo/>
                    <p className="err-msg">{errMsg}</p>
                    <WhiteSpace/>
                    <List>
                        <InputItem onChange={value => this.handleValue('username', value)}>用户名:</InputItem>
                        <InputItem onChange={value => this.handleValue('password', value)}
                                   type="password">密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <InputItem onChange={value => this.handleValue('rePassword', value)}
                                   type="password" >确认密码:</InputItem>
                        <Item>
                            用户类型:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <Radio checked={!boss} onChange={this.handleValue.bind(null, 'boss', false)}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={boss} onChange={this.handleValue.bind(null, 'boss', true)}>老板</Radio>
                        </Item>
                        <Button type='primary' onClick={this.register}>注册</Button>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                    <WhiteSpace/>
                </div>
            )
        }
    }
export default Register;