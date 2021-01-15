import { keyframes } from '@emotion/react';

export const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
`;

export const fadein = keyframes`
  from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }

    0% {
      transform: translateY(-3rem);
    }
    100% {
      transform: none;
    }
`;


export const fadeout = keyframes`
  from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }

    0% {
      transform: none;
    }
    100% {
      transform: translateY(-10rem);
    }

`;

export const flicker = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.5;
  }
`;

export const moveToTop = keyframes`
  0% {
    transform: translateY(5px);
  }
  100% {
    transform: none;
  }
`;

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(0.95);
  }
  66% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const moveAngle = keyframes`
  0% {
    transform: translate(0,0);
    transform: translateX(0);
  }
  50% {
    /* transform: translateY(3.5rem); */
    transform: translate(-0.5rem, 0.5rem);
  }
  100% {
    transform: translateY(0);
    transform: translateX(0);
  }
`;

export const moveLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-0.5rem);
  }
  100% {
    transform: translateX(0);
  }
`;

export const moveDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(0.5rem);
  }
  100% {
    transform: translateY(0);
  }
`;

export const toSmall = keyframes`
    from {
    transform: scale(1);
    }
    to {
      transform: scale(0.5);
    }
`;
