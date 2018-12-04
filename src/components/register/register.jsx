//引入react
import React, {Component} from 'react';
import PropTypes from 'prop-types';
//引入antd-mobile
import {NavBar,List,WhiteSpace,InputItem,Radio,Button} from 'antd-mobile';
//引入logo图
import Logo from '../logo/logo'
// import {reqRegister} from  '../../api/index';


const Item = List.Item;
class Register extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
    }
    //初始化状态
  state={
      username:'',
      password:'',
      rePassWord:'',
      boss:true
  }

    //通过onChange={value => this.handleValue('username',value)}来获取value.
  handleValue = (type,value)=>{
    this.setState({
        [type]:value
    })
  }
    //获取注册者的信息
  register = async ()=>{
      const { username,password,rePassword,boss} = this.state;
      // console.log(username,password,rePassWord,boss);
      //调用容器组件传递的更新状态的方法
      this.props.register({type: boss ? 'laoban' : 'dashen', password, rePassword, username});
  }
  //有账户，转换到登录页面。
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
                <InputItem onChange={value => this.handleValue('password',value)} type="password">密&nbsp;&nbsp;&nbsp;码:</InputItem>
                <InputItem onChange={value => this.handleValue('rePassword',value)} type="password">确认密码:</InputItem>
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