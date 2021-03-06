
import React, {Component} from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class HeaderSelector extends Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    state = {
        header: null
    }

    setHeader = (el, index) => {
        //更新自身状态
        this.setState({
            header: el.icon
        })
        //更新父组件状态
        this.props.setHeader(index);
    }
    render () {
        const {header} = this.state;
        const data = Array.from(new Array(20)).map((_val, i) => ({
            //涉及多张图片时，可以使用require来引入图片。
            icon: require(`../../assets/images/头像${i + 1}.png`),
            text: `头像${i + 1}`,
        }));
        return (
            <List renderHeader={() => {
                return <div>请选择头像 <img src={header} alt=''/></div>
            }}>
                <Grid data={data} columnNum={5} activeStyle={false} onClick={this.setHeader} />
            </List>
        )
    }
}
export default HeaderSelector;
