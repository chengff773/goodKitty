/**
 * @file 用户消息
 */

import {getTimeStr} from '@/utils/timeProcess';
import {ExclamationOutlined, PaperClipOutlined} from '@ant-design/icons';
import './style.less';

const UserMsg = props => {
    const {
        content,
        time,
        isError,
        extraInfo
    } = props;

    const [_, processTime] = getTimeStr(time);

    return (
        <div className="message user-msg-card">
            {isError
                ? <div className="message-error"><ExclamationOutlined/></div>
                : null
            }
            {content}
            {extraInfo
                ? (
                    <div className="extra-info">
                        <PaperClipOutlined />
                        {extraInfo}
                    </div>
                )
                : null
            }
            {time
                ? <div className="message-time">{processTime}</div>
                : null
            }
        </div>
    );
};

export default UserMsg;