const Image = (props) => {
    const {
        src = '',
        alt = '',
        className = '',
        loading = 'lazy',
        decoding = 'async'
    } = props;

    const imgUrl = src.split('.')[0];
    const imgUrlAvif = `${imgUrl}.avif`;
    const imgUrlWebp = `${imgUrl}.webp`;
    const imgUrlPng = `${imgUrl}.png`;

    return (
        <picture className={className}>
            <source srcSet={imgUrlAvif} type="image/avif" />
            <source srcSet={imgUrlWebp} type="image/webp" />
            <source srcSet={imgUrlPng} type="image/png" />
            <img
                src={src}
                alt={alt}
                loading={loading}
                decoding={decoding}
            />
        </picture>
    )
}

export default Image;