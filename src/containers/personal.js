import {connect} from 'react-redux';
import Personal from '../components/personal/index';
import {resetUserInfo,resetUserList} from '../redux/actions';
export default connect(
    state =>({user:state.user}),
    {resetUserInfo,resetUserList}
)(Personal)