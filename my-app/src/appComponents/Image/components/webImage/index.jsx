/**
 * @file web图片组件
 */

const WebImage = (props) => {
    const {
        imgUrl = '',
        alt = '',
        className = '',
        loading = 'lazy',
        decoding = 'async'
    } = props;

    const imgBaseUrl = imgUrl.split('.')[0];

    return (
        <picture className={className}>
            <source srcSet={`${imgBaseUrl}.avif`} type="image/avif" />
            <source srcSet={`${imgBaseUrl}.webp`} type="image/webp" />
            <source srcSet={`${imgBaseUrl}.png`} type="image/png" />
            <img
                src={imgUrl}
                alt={alt}
                loading={loading}
                decoding={decoding}
                style={{
                    width: '100%'
                }}
            />
        </picture>
    )
}

export default WebImage;