/**
 * @file agent消息处理
 */

const msgProcess = (text: string) => {
    text.replace(/：/g, '：\n');
    text.replace(/\(*\)/g, '<div className="">($1)</div>')
};

export default msgProcess;