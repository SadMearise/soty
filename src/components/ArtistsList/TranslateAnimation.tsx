import { FC, RefObject, PropsWithChildren, useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { useDebounce } from "../../utils/hooks";

const translateAnimation = (translateValuePx: number) => keyframes`
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-${translateValuePx}px);
    }
    50% {
      transform: translateX(-${translateValuePx}px);
    }
    75% {
      transform: translateX(0);
    }
  `;

type TranslateAnimationProps = {
  wrapperRef: RefObject<HTMLDivElement>;
};

const TranslateAnimation: FC<PropsWithChildren<TranslateAnimationProps>> = ({ children, wrapperRef }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [translateValue, setTranslateValue] = useState(0);
  const debouncedWindowWidth = useDebounce(windowWidth, 5000);

  const animationRule = css`
    ${translateAnimation(translateValue)} 16s linear infinite 2s;
  `;

  const AnimationWrapper = styled.div`
    animation: ${animationRule};
  `;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      setTranslateValue(wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth);
    }
  }, [wrapperRef, debouncedWindowWidth]);

  return translateValue !== 0 ? <AnimationWrapper>{children}</AnimationWrapper> : children;
};

export default TranslateAnimation;
