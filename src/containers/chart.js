import {connect} from 'react-redux';

import Chat from '../components/chart';
import {sendMessage} from '../redux/actions';

export default connect(
    state => ({chatMessages:state.chatMessages}),
    {sendMessage}
)(Chat);