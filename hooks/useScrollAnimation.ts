import { useState, useEffect, useRef, RefObject } from 'react';

interface ObserverOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export const useScrollAnimation = (options: ObserverOptions = {}): { ref: RefObject<any>; isVisible: boolean } => {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<Element>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else {
                    if (!triggerOnce) {
                        setIsVisible(false);
                    }
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, threshold, rootMargin, triggerOnce]);

    return { ref, isVisible };
};
