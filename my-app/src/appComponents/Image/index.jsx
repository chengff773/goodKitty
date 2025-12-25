/**
 * @file 自定义图片组件
 */

import {useState} from 'react';
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
 * lqipSrc: 渲染优化，图片的LQIP地址
 * @returns 
 */
const CustomImage = (props) => {
    const {
        imgName = '',
        className = '',
        lqipSrc = ''
    } = props;

    const [isImgLoaded, setIsImgLoaded] = useState(false);

    return (
        <div className={`image-wrapper ${className}`}>
            {lqipSrc
                ? <img
                    src={lqipSrc}
                    className='image-lqip'
                    style={{
                        opacity: isImgLoaded ? 0 : 1
                    }}
                />
                : <>
                    {isImgLoaded ? null : <div className='placeholder'></div>}
                </>
            }
            <div className='image'>
                {imgName
                    ? <LocalImage
                        {...props}
                        isImgLoaded={isImgLoaded}
                        setIsImgLoaded={setIsImgLoaded}
                    />
                    : <WebImage {...props} />
                }
            </div>
        </div>
    )
}

export default CustomImage;
