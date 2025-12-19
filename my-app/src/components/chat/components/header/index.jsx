/**
 * @file 多功能菜单栏
 */

import headImg from '@/assets/images/headImg.png';
import Image from '@/appComponents/Image';
import "./style.less";

const Header = () => {
    return (
        <div className="header">
            <div className="left">
                <Image
                    src={headImg}
                    className="headimg"
                />
                好猫 好猫·你的专属助手
            </div>
        </div>
    );
};

export default Header;