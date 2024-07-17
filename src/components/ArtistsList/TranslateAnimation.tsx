import { FC, RefObject, DependencyList, PropsWithChildren, useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

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
  dependencies: DependencyList;
  wrapperRef: RefObject<HTMLDivElement>;
};

const TranslateAnimation: FC<PropsWithChildren<TranslateAnimationProps>> = ({ children, wrapperRef, dependencies }) => {
  const [translateValue, setTranslateValue] = useState(0);

  const animationRule = css`
    ${translateAnimation(translateValue)} 16s linear infinite 2s;
  `;

  const AnimationWrapper = styled.div`
    animation: ${animationRule};
  `;

  const deps: DependencyList = [...dependencies, wrapperRef].filter((dep) => dep !== undefined);

  useEffect(() => {
    if (wrapperRef.current) {
      setTranslateValue(wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return translateValue !== 0 ? <AnimationWrapper>{children}</AnimationWrapper> : children;
};

export default TranslateAnimation;
