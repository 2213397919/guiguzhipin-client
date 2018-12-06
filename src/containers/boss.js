import {connect} from 'react-redux';
import Boss from '../components/boss/index';
import {getUserList} from '../redux/actions';
export default connect(
    state =>({userList:state.userList}),
    {getUserList}
)(Boss)