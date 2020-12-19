import { gradation } from 'styles/color';

export const randomGradation = () => {
    const randomGradationIndex = Math.floor(Math.random() * 10);
    const gradationDatas = Object.values(gradation);
    let gradationEffect = gradationDatas[randomGradationIndex];

    return gradationEffect;
};