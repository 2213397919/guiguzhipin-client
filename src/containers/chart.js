import {connect} from 'react-redux';

import Chat from '../components/chart';
import {sendMessage,updateUnReadCount} from '../redux/actions';

export default connect(
    state => ({chatMessages:state.chatMessages}),
    {sendMessage,updateUnReadCount}
)(Chat);