import { useCallback, useState } from 'react';

function useMenuSliderHeight(totalHeight: number) {
	const [height, setHeight] = useState(0);

	const menuToggle = useCallback(() => {
		if (height === totalHeight) {
			setHeight(0);
		} else {
			setHeight(totalHeight);
		}
	}, [height, totalHeight]);

	const closeMenu = useCallback(() => {
		if (height === totalHeight) {
			setHeight(0);
		}
	}, [height, totalHeight]);

	return [height, menuToggle, closeMenu] as [number, () => void, () => void];
}

export default useMenuSliderHeight;
