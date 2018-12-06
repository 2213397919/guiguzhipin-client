import React, {Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import '../../assets/less/index.less'
class Boss extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired,
        getUserList:PropTypes.func.isRequired
    }
    componentDidMount () {
        //防止二次请求相同的数据
        if (!this.props.userList.length){
            this.props.getUserList('dashen');
        }
    }
  render () {
        console.log(this.props.userList);
        const userList = this.props.userList.filter(item => item.header);
      console.log(userList);
      return (
          <WingBlank size="lg">
              <WhiteSpace size="lg" />
              {
                  userList.map((item,index)=>{
                      return (<div className="content-list">
                          <Card key={index}>
                              <Card.Header
                                  thumb={require(`../../assets/images/头像${+item.header+1}.png`)}
                                  extra={<span>{item.username}</span>}
                              />
                              <Card.Body>
                                  <div>职位：{item.post}</div>
                                  <div>描述：{item.info}</div>
                              </Card.Body>
                          </Card>
                      </div>)
                  })
              }
              <WhiteSpace size="lg" />
          </WingBlank>
    )
  }
}

export default Boss;