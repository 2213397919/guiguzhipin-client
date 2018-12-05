import React, {Component} from 'react';
import {Route,Redirect} from  'react-router-dom';
import Cookies from  'js-cookie';
import BossInfo from '../../containers/boss-info';
import DaShenInfo from '../../containers/dashen-info';

class Main extends Component {
  render  () {
          const userid = Cookies.get('userid');
          if (!userid) return <Redirect to="/login" />

      return (
          <div>
              <Route path='/bossinfo'  component={BossInfo}/>
              <Route path='/dasheninfo' component={DaShenInfo}/>
          </div>
      )
  }
}


export default Main;