/*
对话聊天的路由组件
 */
import React, {Component} from 'react'
import {NavBar, List, InputItem,Icon,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'
import './index.less'
import Cookies from 'js-cookie';
import '../../assets/less/index.less'


const Item = List.Item

export default class Chat extends Component {
    static propTypes = {
        sendMessage:PropTypes.func.isRequired,
        chatMessages:PropTypes.object.isRequired,
        updateUnReadCount:PropTypes.func.isRequired,
    }
    state={
        message:'',
        isShow:false
    }
    goBack = ()=>{
        this.props.history.goBack();
    }
    //初次渲染，保证用户发送的最新消息在最下面。
    componentDidMount(){
        window.scrollTo(0,document.body.offsetHeight);
    }
    //保证用户发送的最新消息在最下面。
    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount(){
        console.log(this.props.match.params.id);
        this.props.updateUnReadCount(this.props.match.params.id)
    }
    handleValue = val=>{
        this.setState({
            message:val
        })
    }
    //组件将要挂载，进行渲染。
    componentWillMount () {
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣', '🙉'];

        this.emojis = emojis.map(item => ({text: item}));
    }
    toggleShow =()=>{
        const {isShow} = this.state;
        this.setState({isShow:!isShow})
        //解决轮播图显示高度异常的问题
        if (!isShow) {
            setTimeout(function () {
                window.dispatchEvent(new Event('resize'));
            }, 0)
        }
    }
    sendMessage = ()=>{
    //    获取发送用户的id
        const from = Cookies.get('userid');
    //    获取接受者的id
        const to = this.props.match.params.id;
        //获取要发送的消息
        const {message}=this.state;
    //    发送消息
        this.props.sendMessage({message,from,to});
    //清空用户输入状态
        this.setState({message:''});
    }
    render() {
         const {users,chatMsgs} = this.props.chatMessages;
        // console.log(users);
        //    获取发送用户的id
        const from = Cookies.get('userid');
        //    获取接受者的id
        const to = this.props.match.params.id;
        // console.log(to);
        //排除其他人的干扰
        const other = users[to];
        //处理首次渲染没有数据的情况
        if (!other){
            return null;
        }
        const from_to = [from,to].sort().join("-");
        //得到当前用户的所有相关的消息
        const currentMsg = chatMsgs.filter(item => item.from_to === from_to);
        //消息按照时间顺序排序
        currentMsg.sort(function (a,b) {
            return Date.parse(a.createTime)-Date.parse(b.createTime);
        })
        return (
            <div id='chat-page'>
                <NavBar style={{position:'fixed',left:0,top:0,width:'100%',zIndex:50 }} icon={<Icon type="left" onClick={this.goBack}/>}>{other.username}</NavBar>
                <List style={{marginTop:'96px'}}>
                    {
                        currentMsg.map((item,index)=>{
                            //判断消息a-->b 还是 b -->a
                            if(item.from === from){
                               return (<Item
                                   key={index}
                                    className='chat-me'
                                    extra='我'
                                >
                                    {item.message}
                                </Item>)
                            }else{
                               return (<Item
                                   key={index}
                                    thumb={require(`../../assets/images/头像${+other.header+1}.png`)}
                                >
                                   {item.message}
                                </Item>)
                            }
                        })
                    }
                </List>
                {/*判断表情是否显示，显示，让其把内容顶上去。*/}
                <div style={{height: this.state.isShow ? '190px' : 0}}></div>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入" onChange={this.handleValue}
                        extra={
                            <div>
                                <span onClick={this.toggleShow}>🙉</span> &nbsp;&nbsp;
                                <span onClick={this.sendMessage}>发送</span>
                            </div>
                        }
                        value={this.state.message}
                    />
                    {
                        this.state.isShow
                            ? <Grid
                                data={this.emojis}
                                isCarousel
                                columnNum={8}
                                carouselMaxRow={4}
                                onClick={el => {this.setState({message: this.state.message + el.text})}}
                            />
                            : null
                    }
                </div>
            </div>
        )
    }
}