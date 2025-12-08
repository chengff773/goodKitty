/**
 * @file 历史记录分割线
 */

import {getTimeStr, getCurTime} from '@/utils/timeProcess';
import "./style.less";

const SplitLine = props => {
    const {time} = props;
    const [date, processTime] = getTimeStr(time);
    const [currentDate] = getCurTime();
    const splitText = date === currentDate ? processTime : `${date} ${processTime}`;

    return (
        <div className="split-line">
            <div className='line' />
            <span className='text'>{splitText}</span>
            <div className='line' />
        </div>
    );
};

export default SplitLine;