import React, {Component} from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import  './index.less'

const Item = TabBar.Item;
class Footer extends Component {
  static propTypes = {
    navList : PropTypes.array.isRequired,
      type:PropTypes.string.isRequired,
      unReadCount:PropTypes.number.isRequired
  }
    //点击footer区域的按钮进行相应的跳转
    redirectTo = path => {
        this.props.history.push(path);
    }
  render () {
      //通过redux获取type
      const {type,unReadCount} = this.props;

      const filter = type === 'boss' ? '/dashen' : '/boss';
      //过滤掉老板或大神的数据
      const currNavList = this.props.navList.filter(item => filter === item.path ? false : true);

      return (
          <TabBar>
              {
                  currNavList.map((item, index) => <Item
                      key={index}
                      title={item.text}
                      icon={<img className="footer-img" src={require(`./images/${item.icon}.png`)} alt={item.text}/>}
                      onPress={this.redirectTo.bind(null, item.path)}
                      selected={this.props.location.pathname === item.path}
                      selectedIcon={<img className="footer-img" src={require(`./images/${item.icon}-selected.png`)} alt={item.text}/>}
                      badge={item.path === '/message'?unReadCount:0}
                  />)
              }
          </TabBar>
    )
  }
}

//withRouter函数能将一般组件包装成路由组件，从而组件内部就能使用路由组件的三个属性history location match
export default Footer;