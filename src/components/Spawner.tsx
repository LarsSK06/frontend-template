import { ComponentProps, ElementType, useEffect, useRef, useState } from "react";

type SpawnerProps<TagName extends ElementType> = {
    pre: ComponentProps<TagName>["style"];
    component?: TagName;
    show?: boolean;
    delay?: number;
} & ComponentProps<TagName>;

const Spawner = <TagName extends ElementType = "span">({
    pre,
    component,
    show = true,
    delay = 0,
    style,
    children,
    ...restProps
}: SpawnerProps<TagName>) => {
    const [isTimeoutFinished, setIsTimeoutFinished] = useState<boolean>(false);

    let timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timeout.current = setTimeout(() => {
            setIsTimeoutFinished(true);
        }, delay);

        return () => {
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, []);

    const Component = component ?? "span" as ElementType;

    const computedStyles =
        isTimeoutFinished && show
            ? style
            : { ...style, ...pre };

    return (
        <Component {...restProps} style={computedStyles}>
            {children}
        </Component>
    );
};

export default Spawner;