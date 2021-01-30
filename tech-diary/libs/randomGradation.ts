import { gradation } from 'styles/color';

const randomGradation = () => {
	const randomGradationIndex = Math.floor(Math.random() * 10);
	const gradationDatas = Object.values(gradation);
	const gradationEffect = gradationDatas[randomGradationIndex];

	return gradationEffect;
};

export default randomGradation;
