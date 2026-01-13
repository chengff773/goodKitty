/**
 * @file 左侧导航栏
 */

import {Link} from 'react-router-dom';
import './style.less';

const LEFT_MENU = props => {
    const {isShow = false} = props;

    return (
        <div
            className={`left-menu ${isShow ? 'left-menu-show' : 'left-menu-hide'}`}
        >
            <div className='menu-list'>
                <Link to='/'>首页</Link>
                <Link to='/chat'>小宝助手</Link>
            </div>
        </div>
    );
};

export default LEFT_MENU;