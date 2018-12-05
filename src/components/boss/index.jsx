import React, {Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

class Boss extends Component {
  render () {
    return (
      <div>
          <WingBlank size="lg">
              <WhiteSpace size="lg" />
              <Card>
                  <Card.Header
                      thumb={require('../../assets/images/头像1.png')}
                      extra={<span>来自星星的你</span>}
                  />
                  <Card.Body>
                      <div>职位：前端高级工程师</div>
                      <div>公司：独角兽</div>
                      <div>薪资：15K-18K</div>
                      <div>描述：lalalalalal</div>
                  </Card.Body>
              </Card>
              <WhiteSpace size="lg" />
          </WingBlank>
      </div>
    )
  }
}

export default Boss;