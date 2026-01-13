/**
 * @file 入口文件
 */

import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import useStore from '@/stores';
import {useHover} from '@/hooks';
import Chat from '../chat';
import LeftMenu from '../leftMenu';
import './globalStyle.less';
import './style.less';
// 预加载所有图片
const imgModules = import.meta.glob('/src/assets/images/*', {
    eager: true,
    query: {url: 'true'}
});

const Entry = () => {
    const {setLocalImgs} = useStore();
    const [hoverRef, isHover] = useHover();

    useEffect(() => {
        if (imgModules && Object.keys(imgModules).length) {
            setLocalImgs(imgModules);
        }
    }, [imgModules]);

    return (
        <div className='entry'>
            <div
                className='menu-box'
                ref={hoverRef}
            >
                <LeftMenu isShow={isHover} />
            </div>
            <div className='content-box'>
                <Routes>
                    <Route path='/' element={<div>首页</div>} />
                    <Route path='/chat' element={<Chat />} />
                </Routes>
            </div>
        </div>
    );
};

export default Entry;