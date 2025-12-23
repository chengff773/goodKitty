import LocalImage from './components/localImage';
import WebImage from './components/webImage';

/**
 * @param {*} props 
 * imgName: 图片名称，渲染静态图片时使用
 * imgUrl: 图片地址，渲染网络图片时使用
 * alt: 图片的alt属性
 * loading: 图片加载方式，默认lazy
 * decoding: 图片解码方式，默认async
 * @returns 
 */
const CustomImage = (props) => {
    const {
        imgName = ''
    } = props;

    return (
        imgName ? <LocalImage {...props} /> : <WebImage {...props} />
    )
}

export default CustomImage;