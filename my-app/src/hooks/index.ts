/**
 * @file 自定义hook
 */

import {useRef, useEffect, useState} from 'react';

export function useHover() {
    const ref = useRef(null);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (node) {
            const handleMouseLeft = () => setIsHover(false);
            const handleMouseEntry = () => setIsHover(true);

            node.addEventListener('mouseenter', handleMouseEntry);
            node.addEventListener('mouseleave', handleMouseLeft);

            return () => {
                node.removeEventListener('mouseenter', handleMouseEntry);
                node.removeEventListener('mouseleave', handleMouseLeft);
            };
        }
    }, []);

    return [
        ref,
        isHover
    ];
};