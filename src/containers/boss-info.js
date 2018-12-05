import {connect} from 'react-redux';
import BossInfo from  '../components/bossInfo';
import {upData} from '../redux/actions';

export default connect(
    state => ({user:state.user}),
    {upData}
)(BossInfo);