/**
 * @file agent消息
 */

import ReactMarkdown from 'react-markdown';
import {LoadingOutlined} from '@ant-design/icons';
import {getTimeStr} from '@/utils/timeProcess';
import './style.less';

const UserMsg = props => {
    const {
        content,
        isEnd,
        time
    } = props;

    const [_, processTime] = getTimeStr(time);

    return (
        <>
            {content
                ? (
                    <div className="message agent-msg-card">
                        <div className="content">
                            <ReactMarkdown>{content}</ReactMarkdown>
                                    {isEnd
                                        ? null
                                        : (<LoadingOutlined />)
                                    }
                            {time
                                ? <div className="message-time">{processTime}</div>
                                : null
                            }
                        </div>
                    </div>
                )
                : null
            }
        </>
    );
};

export default UserMsg;