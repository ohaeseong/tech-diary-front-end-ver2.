import { useCallback, useState } from 'react';

function useToggle(value: any) {
	const [isToggle, setIsToggle] = useState(value);

	const toggle = useCallback(
		(toggleValue?: boolean) => {
			if (toggleValue) {
				setIsToggle(toggleValue);
			} else {
				setIsToggle(!isToggle);
			}
		},
		[isToggle]
	);

	return [isToggle, toggle] as [boolean, (toggleValue?: boolean) => void];
}

export default useToggle;
