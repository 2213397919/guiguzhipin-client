import {connect} from 'react-redux';
import Login from '../components/login/login';
import {login} from '../redux/actions';
//暴露/定义容器组件
export default connect(
    state => ({user:state.user}),
    {login}
)(Login)
