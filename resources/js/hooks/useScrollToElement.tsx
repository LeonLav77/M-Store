import { useCallback, useEffect, useRef } from "react";

export const useScrollToElement = () => {
    const elRef = useRef<null | HTMLDivElement>(null);
    //refs se mijenja bez da se rerendera komponenta
    // const scroll = useCallback(() => {
    //     if (elRef != null) {
    //         elRef.current?.scrollIntoView();
    //     }
    // }, []);
    // scroll();
    // useEffect(() => console.log("now"), [scroll]);

    //nisto ne valja haha
    if (elRef != null) {
        elRef.current?.scrollIntoView();
    }
    return [elRef];
};
