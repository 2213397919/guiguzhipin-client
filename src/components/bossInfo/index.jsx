import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import HeaderSelector from '../header-selector/index';
import {Redirect} from 'react-router-dom';
class BossInfo extends Component {
    static propTypes = {
        user : PropTypes.object.isRequired,
        upData: PropTypes.func.isRequired
    }
    //初始化状态
    state = {
        header:'',
        post :'',
        company :'',
        salary:'',
        info:'',
        type:'boss'
    }
    //在父组件定义更新状态方法
    setHeader = header =>{
        this.setState({
            header
        })
    }
    //获取InputItem里面的值。
    handleChange = (type,val) =>{
        this.setState({[type]:val});
    }
    //收集用户填写的数据
    upDataInfo = ()=>{
        this.props.upData(this.state);
    }
  render () {
      const {errMsg, redirectTo} = this.props.user;

      if (redirectTo === '/boss') {
          return <Redirect to={redirectTo}/>
      }
    return (
        <div style={{marginTop:"-50px",marginBottom:"-50px"}}>
            <NavBar>老板信息完善</NavBar>
            <HeaderSelector setHeader={this.setHeader}/>
            <p className="err-msg">{errMsg}</p>
            <InputItem onChange={val => {this.handleChange('post', val)}}>招聘职位:</InputItem>
            <InputItem onChange={val => {this.handleChange('company', val)}}>公司名称:</InputItem>
            <InputItem onChange={val => {this.handleChange('salary', val)}}>职位薪资:</InputItem>
            <TextareaItem title="职位要求:" rows={3} onChange={val => {this.handleChange('info', val)}}/>
            <Button type='primary' onClick={this.upDataInfo}>保存</Button>
        </div>
    )
  }
}
export default BossInfo;

