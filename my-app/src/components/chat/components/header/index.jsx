/**
 * @file 多功能菜单栏
 */

import headImg from '@/assets/images/headImg.png';
import "./style.less";

const Header = () => {
    return (
        <div className="header">
            <div className="left">
                <img
                    src={headImg}
                    className="headimg"
                ></img>
                好猫 好猫·你的专属助手
            </div>
        </div>
    );
};

export default Header;