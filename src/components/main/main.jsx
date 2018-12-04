import React, {Component} from 'react';
import {Route} from  'react-router-dom';
import BossInfo from '../bossInfo/index';
import DaSen from '../dashen/index'
class Main extends Component {
  render () {
    return (
        <div>
          <Route path='/bossInfo' component={BossInfo}/>
            <Route path='/dashen' component={DaSen}/>
        </div>
    )
  }
}

export default Main;