import React, {Component} from 'react';
import { List,Badge } from 'antd-mobile';
import Cookies from "js-cookie";
import PropTypes from 'prop-types';
const Item = List.Item;
const Brief = Item.Brief;
class Message extends Component {
    static propTypes = {
        chatMessages: PropTypes.object.isRequired
    }

    goChat = id => {
        this.props.history.push(`/chart/${id}`);
    }

    render () {
        //获取当前用户的userid
        const userid = Cookies.get('userid');
        //从消息列表中找到所有通话的用户
        const {users, chatMsgs} = this.props.chatMessages;
        // console.log(users, chatMsgs)
        //从每一个chatMsgs中的对象，找到from to与userid不同的id值
        //过滤掉相同id值，相同的id值只保留一个
        let users_id = {};
        chatMsgs.forEach(item => {
            //找到与当前用户不同的其他用户的id
            const othersId = item.from === userid ? item.to : item.from;
            //保证users_id对象中有且只保存一份其他用户id和对应的值
            //保证新对象不会修改原对象
            if(!users_id[othersId]){
                users_id[othersId]={};
            }
            for (let key in users[othersId]) {
                users_id[othersId][key] = users[othersId][key];
            }
            //为了方便后面取id值，在给这个对象添加一个id
            users_id[othersId].id = othersId;
            const time = Date.parse(item.createTime);
            if (users_id[othersId].time) {
                //说明之前添加过数据，将现在的数据和之前的数据进行比较
                if (users_id[othersId].time < time) {
                    users_id[othersId].time = time;
                    users_id[othersId].message = item.message;
                }
            } else {
                users_id[othersId].time = time;
                users_id[othersId].message = item.message;
            }
            //展示单个列表的未读消息
            if (!users_id[othersId].unRead ){
                users_id[othersId].unRead=0;
            }
            if (item.from === othersId && !item.read){
                users_id[othersId].unRead++;
            }
        })

        //将对象变成数组
        const chatList = Object.values(users_id);  // [{header, username, id}]
        // console.log(chatList,users_id)
        return (
            <List className="my-list">
                {
                    chatList.map((item, index) => (
                        <Item
                            key={index}
                            thumb={require(`../../assets/images/头像${(item.header === 'undefined' ? 0 : + item.header) + 1}.png`)}
                            multipleLine
                            arrow="horizontal"
                            onClick={this.goChat.bind(null, item.id)}
                            extra={<Badge text={item.unRead}/>}
                        >
                            {item.message} <Brief>{item.username}</Brief>
                        </Item>
                    ))
                }
            </List>
        )
    }
}

export default Message;
