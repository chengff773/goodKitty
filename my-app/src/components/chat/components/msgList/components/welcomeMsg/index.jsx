/**
 * @file 欢迎语
 */

import {WarningOutlined} from '@ant-design/icons';
import useStore from "@/stores";
import Image from '@/appComponents/Image';
import placeholderImg from '@/assets/images/logo-tiny.png';
import './style.less';

const WelcomeMsg = () => {
    const {
        connectStatus
    } = useStore();

    return (<div className='welcome-card'>
        <Image
            className='welcome-img'
            imgName='logo.png'
            lqipSrc={placeholderImg}
        />
        <div className='welcome-msg'>
            <div>kitty kitty，很高兴为您服务</div>
            <div>我是您的专属助手小宝</div>
        </div>
        {connectStatus
            ? null
            : <div className='welcome-card-warning'>
                <WarningOutlined className='icon-warning' />
                当前会话未联通，请检查网络状态 🛜
            </div>
        }
    </div>);
};

export default WelcomeMsg;