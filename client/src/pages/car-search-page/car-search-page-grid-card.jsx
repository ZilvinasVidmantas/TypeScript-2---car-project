import { Typography } from '@mui/material';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import Styles from './styles.module.css';

const CarSearchPageGridCard = ({ title, children, ...others }) => {
  const cardWrapRef = useRef(null);

  const [cardParameters, setCardParameters] = useState({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mounted: false,
  });

  let mouseLeaveDelay = null;

  const { backgroundUrl } = others;

  const handleMouseMove = (event) => {
    if (cardWrapRef.current) {
      const { width, height } = cardParameters;
      const newCardParameters = {
        ...cardParameters,
        mouseX: event.pageX - cardWrapRef.current.offsetLeft - width / 2,
        mouseY: event.pageY - cardWrapRef.current.offsetTop - height / 2,
      };

      setCardParameters(newCardParameters);
    }
  };

  const handleMouseEnter = useCallback(() => {
    if (mouseLeaveDelay) {
      clearTimeout(mouseLeaveDelay);
    }
  }, [mouseLeaveDelay]);

  const handleMouseLeave = useCallback(() => {
    mouseLeaveDelay = setTimeout(() => {
      setCardParameters({ ...cardParameters, mouseX: 0, mouseY: 0 });
    }, 100);
  }, [mouseLeaveDelay, cardParameters]);

  useEffect(() => {
    const { mounted } = cardParameters;

    if (
      !mounted
      && cardWrapRef?.current
      && cardParameters.width === 0
      && cardParameters.height === 0
    ) {
      setCardParameters({
        ...cardParameters,
        width: cardWrapRef.current.offsetWidth,
        height: cardWrapRef.current.offsetHeight,
        mounted: true,
      });
    }
  }, []);

  const mousePX = () => cardParameters.mouseX / cardParameters.width;
  const mousePY = () => cardParameters.mouseY / cardParameters.height;

  const cardStyle = () => {
    const rX = mousePX() * 30;
    const rY = mousePY() * -30;
    return {
      transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
    };
  };
  const cardBgTransform = () => {
    const tX = mousePX() * -40;
    const tY = mousePY() * -40;
    return {
      transform: `translateX(${tX}px) translateY(${tY}px)`,
    };
  };

  return (
    <div className={Styles['card-container']}>
      <div
        className={Styles['card-wrap']}
        onMouseMove={(event) => handleMouseMove(event)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={cardWrapRef}
      >
        <div className={Styles.card} style={cardStyle()}>
          <div
            className={Styles['card-bg']}
            style={{
              ...cardBgTransform(),
              backgroundImage: `url(${backgroundUrl})`,
            }}
          />
          <div className={Styles['card-info']}>
            <Typography component="h3" variant="h4" textAlign="center">{title}</Typography>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSearchPageGridCard;
