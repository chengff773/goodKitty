/**
 * @file url相关工具
 */

export const isWebUrl = (url: string) => {
    return /^(https?:\/\/)/.test(url);
};