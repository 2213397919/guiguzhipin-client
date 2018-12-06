import {connect} from 'react-redux';
import Main from '../components/main/main';
import {getUserInfo} from '../redux/actions';
export default connect(
    state =>({user:state.user}),
    {getUserInfo}
)(Main)