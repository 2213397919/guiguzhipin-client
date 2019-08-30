import React, {Component} from 'react';
import {Route,Redirect} from  'react-router-dom';
import Cookies from  'js-cookie';
import BossInfo from '../../containers/boss-info';
import DaShenInfo from '../../containers/dashen-info';
import PropTypes from 'prop-types'
import Boss from  '../../containers/boss';
import Dashen from '../../containers/dashen';
import Message from  '../../containers/message';
import Personal from '../../containers/personal';
import {NavBar,Icon} from  'antd-mobile';
import Footer from '../../containers/footer';
import Chart from  '../../containers/chart';
import './index.less'

class Main extends Component {
    static propTypes = {
        user:PropTypes.object.isRequired,
        getUserInfo: PropTypes.func.isRequired,
        getChatList: PropTypes.func.isRequired

    }
    // 请求所有关于此用户的消息的数据
    componentDidMount(){
        this.props.getChatList();
}
    //用数组的形式，将有用的信息保存起来。
    navList = [
        {path:'/boss',text:'大神列表',icon:"laoban",title:'老板'},
        {path:'/dashen',text:'老板列表',icon:"dashen",title:'大神'},
        {path:'/message' ,text:'消息列表',icon:"message",title:'消息'},
        {path:'/personal',text:'个人中心',icon:"personal",title:'个人'}
    ]
  render  () {
          //1. 判断本地有没有cookie，如果没有，直接去登录页面
          //通过保存cookie，七天免登录。
          const userid = Cookies.get('userid');
          if (!userid) return <Redirect to="/login" />
      //2. 如果本地有cookie，redux中没有状态（用户之前登录过，刷新页面），必须将数据请求回来
      if (!this.props.user._id && this.props.user.message ){
          this.props.getUserInfo();
          return <Icon type="loading" size='lg' className="loading"/>
      }
      //获取当前的路由路径部分
      const {pathname} = this.props.location;
      if (pathname==='/'){
          return  <Redirect to={this.props.user.redirectTo}/>;
      }
      //找到与当前路径，匹配的对象
      const current = this.navList.find(item => item.path === pathname);
      return (
          <div>
              {current?<NavBar className="header-nav">{current.text}</NavBar>:null}
             <div className="content">
                 <Route path='/bossinfo'  component={BossInfo}/>
                 <Route path='/dasheninfo' component={DaShenInfo}/>
                 <Route path='/boss'  component={Boss}/>
                 <Route path='/dashen'  component={Dashen}/>
                 <Route path='/message' component={Message}/>
                 <Route path='/personal' component={Personal}/>
                 <Route path="/chart/:id" component={Chart}/>
             </div>
              {current?<Footer navList={this.navList} type ={this.props.user.type}/>:null}
          </div>
      )
  }
}
export default Main;
