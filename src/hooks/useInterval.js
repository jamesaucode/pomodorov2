import React, { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    const stopRunning = !delay;

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }
        let id = stopRunning ? null : setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}