/**
 * @file 静态图片组件
 */

import {useEffect, useState} from 'react';
import useStore from '@/stores';
const IMG_BASE_URL = '/src/assets/images/';
const IMG_TYPE = ['png', 'webp', 'avif'];

const LocalImage = (props) => {
    const {
        imgName = '',
        alt = '',
        className = '',
        loading = 'lazy',
        decoding = 'async',
        setIsImgLoaded
    } = props;

    const {localImgs} = useStore();
    const [imgSet, setImgSet] = useState({});

    const name = imgName.split('.')[0];

    useEffect(() => {
        if (localImgs && imgName) {
            const imgSet = {};
            const originImgUrl = IMG_BASE_URL + imgName;
            const imgUrl = IMG_BASE_URL + imgName.split('.')[0];
            IMG_TYPE.forEach(type => {
                const img = localImgs[`${imgUrl}.${type}`];
                if (img) {
                    imgSet[`${name}.${type}`] = img.default;
                }
                else {
                    console.log('cannot find img: ', `${imgUrl}.${type}`);
                }
            });
            if (
                imgName.split('.')[1]
                && !IMG_TYPE.includes(imgName.split('.')[1])
                && localImgs[originImgUrl]
            ) {
                imgSet[imgName] = localImgs[originImgUrl].default;
            }
            setImgSet(imgSet);
        }
    }, [localImgs, imgName]);

    return (
        <picture className={className}>
            <source srcSet={imgSet[`${name}.avif`]} type="image/avif" />
            <source srcSet={imgSet[`${name}.webp`]} type="image/webp" />
            <source srcSet={imgSet[`${name}.png`]} type="image/png" />
            <img
                src={imgSet[imgName]}
                alt={alt}
                loading={loading}
                decoding={decoding}
                style={{
                    width: '100%'
                }}
                onLoad={() => setIsImgLoaded(true)}
            />
        </picture>
    )
}

export default LocalImage;