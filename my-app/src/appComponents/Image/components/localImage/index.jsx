/**
 * @file 静态图片组件
 */

const IMG_BASE_URL = '/src/assets/images/';

const LocalImage = (props) => {
    const {
        imgName = '',
        alt = '',
        className = '',
        loading = 'lazy',
        decoding = 'async'
    } = props;

    const originImgUrl = IMG_BASE_URL + imgName;
    const imgUrl = IMG_BASE_URL + imgName.split('.')[0];

    return (
        <picture className={className}>
            <source srcSet={`${imgUrl}.avif`} type="image/avif" />
            <source srcSet={`${imgUrl}.webp`} type="image/webp" />
            <source srcSet={`${imgUrl}.png`} type="image/png" />
            <img
                src={originImgUrl}
                alt={alt}
                loading={loading}
                decoding={decoding}
            />
        </picture>
    )
}

export default LocalImage;