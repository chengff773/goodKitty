/**
 * @file 自定义图片组件
 */

import {useState, useEffect, useRef} from 'react';
import LocalImage from './components/localImage';
import WebImage from './components/webImage';
import './style.less';

/**
 * @param {*} props 
 * imgName: 图片名称，渲染静态图片时使用
 * imgUrl: 图片地址，渲染网络图片时使用
 * alt: 图片的alt属性
 * loading: 图片加载方式，默认lazy
 * decoding: 图片解码方式，默认async
 * lqipSrc: 渲染优化，图片的LQIP src
 * @returns 
 */
const CustomImage = (props) => {
    const {
        imgName = '',
        className = '',
        lqipSrc = null
    } = props;

    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const [lqipStyle, setLqipStyle] = useState({});
    const timerRef = useRef(null);
    const hasLoaded = useRef(false);

    function ComponentIs(props) {
        if (imgName) {
            return <LocalImage {...props} />;
        }
        return <WebImage {...props} />
    }

    useEffect(() => {
        if (isImgLoaded && !hasLoaded.current) {
            hasLoaded.current = true;
            timerRef.current = setTimeout(() => {
                setLqipStyle({opacity: 0});
            }, 100);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, [isImgLoaded]);

    return (
        <div className={`image-wrapper ${className}`}>
            <div
                className='image-instance'
                style={{
                    opacity: isImgLoaded ? 1 : 0
                }}
            >
                <ComponentIs
                    {...props}
                    isImgLoaded={isImgLoaded}
                    setIsImgLoaded={setIsImgLoaded}
                />
            </div>
            {lqipSrc
                ? <img
                    src={lqipSrc}
                    className='image-lqip'
                    loading='eager'
                    style={lqipStyle}
                />
                : <>
                    {isImgLoaded ? null : <div className='placeholder'></div>}
                </>
            }
        </div>
    )
}

export default CustomImage;
