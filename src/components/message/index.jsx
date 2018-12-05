import React, {Component} from 'react';
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
class Message extends Component {
  render () {
    return (
      <div>
          <List className="my-list">
              <Item
                  thumb={require('../../assets/images/头像1.png')}
                  multipleLine
                  arrow="horizontal"
              >
                  今天天气真晴朗 <Brief>来自星星的你</Brief>
              </Item>
              <Item
                  thumb={require('../../assets/images/头像2.png')}
                  multipleLine
                  arrow="horizontal"
              >
                  你来哇 <Brief>漂流</Brief>
              </Item>
          </List>
      </div>
    )
  }
}

export default Message;