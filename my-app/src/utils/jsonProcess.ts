/**
 * @file json处理
 */

export const jsonSafeParse = (json: string) => {
    try {
        return JSON.parse(json);
    } catch (e) {
        return {};
    }
};