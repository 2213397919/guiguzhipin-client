import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import HeaderSelector from '../header-selector/index';
import {Redirect} from "react-router-dom";
class DaShenInfo extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        upData: PropTypes.func.isRequired
    }
    state = {
        header: '',
        post: '',
        info: '',
        type: 'dashen'
    }
    setHeader = header => {
        this.setState({
            header
        })
    }
    handleChange = (type, val) => {
        this.setState({[type]: val});
    }
    //收集用户填写的数据
    upDataInfo = () => {
        this.props.upData(this.state);
    }

    render() {
        const {errMsg, redirectTo} = this.props.user;

        if (redirectTo === '/dashen') {
            return <Redirect to={redirectTo}/>
        }
            return (
                <div style={{marginTop:"-50px",marginBottom:"-50px"}}>
                    <NavBar>大神信息完善</NavBar>
                    <HeaderSelector setHeader={this.setHeader}/>
                    <p className="err-msg">{errMsg}</p>
                    <InputItem onChange={val => {this.handleChange('post', val)}}>求职岗位:</InputItem>
                    <TextareaItem title="个人简介:" rows={3} onChange={val => {
                        this.handleChange('info', val)
                    }}/>
                    <Button type='primary' onClick={this.upDataInfo}>保存</Button>
                </div>
            )
        }
    }
export default DaShenInfo;

