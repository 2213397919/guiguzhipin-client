import {connect} from 'react-redux';
//引入UI组件
import Login from '../components/login/login';
//引入异步action creator.   `
import {login} from '../redux/actions';
//暴露/定义容器组件
export default connect(
    //state就看reducers传过来的返回值。
    state => ({user:state.user}),
    {login}
)(Login)
