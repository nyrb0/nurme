import { current } from '@reduxjs/toolkit';
import { FC, RefObject, useEffect, useState } from 'react';

interface ScrollI {
    refs: RefObject<HTMLDivElement>;
}

const useScroll = ({ refs }: ScrollI) => {
    const [leftScroll, setLeftScroll] = useState(true);
    const [rightScroll, setRightScroll] = useState(true);

    const handleScroll = () => {
        if (refs.current) {
            const { clientWidth, scrollLeft, scrollWidth } = refs.current;
            setLeftScroll(scrollLeft <= 0);
            setRightScroll(scrollLeft + clientWidth === scrollWidth);
        }
    };

    const toScrollLeft = () => {
        if (refs.current)
            refs.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const toScrollRight = () => {
        if (refs.current) {
            refs.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        handleScroll();
        if (refs.current) {
            refs.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            refs.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        leftScroll,
        rightScroll,
        toScrollLeft,
        toScrollRight,
        handleScroll,
    };
};

export default useScroll;
