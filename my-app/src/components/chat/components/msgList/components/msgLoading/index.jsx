/**
 * @file 消息加载动画
 */

import './style.less';

const MsgLoading = () => {
    return (
        <div className="message agent-msg-card">
            <div className="msg-loading">
                    小宝正在思考
                    <div className="msg-loading-dot">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                </div>
        </div>
    );
};

export default MsgLoading;