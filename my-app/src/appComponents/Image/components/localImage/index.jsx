/**
 * @file 静态图片组件
 */

import {useMemo, memo} from 'react';
import useStore from '@/stores';
const IMG_BASE_URL = '/src/assets/images/';
const IMG_TYPE = ['png', 'webp', 'avif'];

const LocalImage = memo((props) => {
    const {
        imgName = '',
        alt = '',
        className = '',
        loading = 'lazy',
        decoding = 'async',
        setIsImgLoaded
    } = props;

    const {localImgs} = useStore();
    const name = imgName.split('.')[0];

    // 使用 useMemo 缓存 imgSet，避免每次渲染都创建新对象
    const imgSet = useMemo(() => {
        if (!localImgs || !imgName) {
            return {};
        }
        const result = {};
        const originImgUrl = IMG_BASE_URL + imgName;
        const imgUrl = IMG_BASE_URL + imgName.split('.')[0];
        IMG_TYPE.forEach(type => {
            const img = localImgs[`${imgUrl}.${type}`];
            if (img) {
                result[`${name}.${type}`] = img.default;
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
            result[imgName] = localImgs[originImgUrl].default;
        }
        return result;
    }, [localImgs, imgName, name]);

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
}, (prevProps, nextProps) => {
    // 只有当关键属性变化时才重新渲染
    // 注意：isImgLoaded 和 setIsImgLoaded 是函数，每次都是新引用，所以不比较它们
    return prevProps.imgName === nextProps.imgName
        && prevProps.alt === nextProps.alt
        && prevProps.className === nextProps.className
        && prevProps.loading === nextProps.loading
        && prevProps.decoding === nextProps.decoding;
});

LocalImage.displayName = 'LocalImage';

export default LocalImage;