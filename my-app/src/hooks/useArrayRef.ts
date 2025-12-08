/**
 * @file 列表索引
 */

import {useRef} from 'react';

const useRefs = () => {
    const refs = useRef<(HTMLImageElement | null)[]>([]);
    // refs.current = [];
    return [refs, (ref: HTMLImageElement | null, index) => {
        refs.current[index] = ref;
    }]
};

export default useRefs;