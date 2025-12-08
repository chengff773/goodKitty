/**
 * @file 用户消息
 */

import {v1 as uuid} from "uuid";

export default (text: string, extraInfo: any) => ({
    id: uuid(),
    content: text,
    type: 'user',
    time: '',
    extraInfo
})