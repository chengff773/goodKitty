/**
 * @file agent消息
 */

import {v1 as uuid} from "uuid";

 interface Msg {
    id: string;
    content: string;
    type: string;
    isEnd: boolean;
    time: string;
}

export default (msg: Msg) => {
    const {id = '', content = '', isEnd = false, time = ''} = msg;
    return {
        id: id || uuid(),
        content,
        type: 'agent',
        isEnd,
        time
    }
};