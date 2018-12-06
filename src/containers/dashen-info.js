import {connect} from 'react-redux';
import DaShenInfo from '../components/dashenInfo';
import {upData} from '../redux/actions';

export default connect(
    state => ({user:state.user}),
    {upData}
)(DaShenInfo);