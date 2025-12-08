/**
 * @file 时间转换工具
 */

export const getTimeStr = (timeStamp: any) => {
    if (!timeStamp) return '';
    const newDate = new Date(timeStamp);
    return [
        newDate.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        newDate.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }),
    ];
}

export const getCurTime = () => {
    return getTimeStr(new Date().getTime());
}