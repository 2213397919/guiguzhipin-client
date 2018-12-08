import React, {Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import '../../assets/less/index.less'
import QueueAnim from 'rc-queue-anim';
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
    goChart = id =>{
        this.props.history.push(`/chart/${id}`);
    }
  render () {
        const userList = this.props.userList.filter(item => item.header);
      return (
          <WingBlank size="lg">
              <WhiteSpace size="lg" />
              <QueueAnim delay={1000} type="scale">
              {
                  userList.map((item,index)=>{
                      return (<div onClick = {this.goChart.bind(null,item._id)}>
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
              </QueueAnim>
              <WhiteSpace size="lg" />
          </WingBlank>
    )
  }
}

export default Boss;