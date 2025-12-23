/**
 * @file 入口文件
 */

import { useEffect } from 'react';
import useStore from '@/stores';
import Chat from '../chat';
import './style.less'
// 预加载所有图片
const imgModules = import.meta.glob('/src/assets/images/*', { eager: true });

const Entry = () => {
    const {setLocalImgs} = useStore();
    useEffect(() => {
        if (imgModules && Object.keys(imgModules).length) {
            setLocalImgs(imgModules);
        }
    }, [imgModules]);
    return (
        <div>
            <Chat />
        </div>
    );
};

export default Entry;