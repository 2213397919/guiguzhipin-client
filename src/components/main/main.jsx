import React, {Component} from 'react';
import {Route} from  'react-router-dom';
import BossInfo from '../../containers/boss-info';
import DaShenInfo from '../../containers/dashen-info'
class Main extends Component {
  render () {
    return (
        <div>
            <Route path='/bossinfo' component={BossInfo}/>
            <Route path='/dasheninfo' component={DaShenInfo}/>
        </div>
    )
  }
}

export default Main;