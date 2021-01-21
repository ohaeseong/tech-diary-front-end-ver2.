import { useCallback, useState } from 'react';

function useToggle(value: any) {
	const [isToggle, setIsToggle] = useState(value);

	const toggle = useCallback(() => {
		setIsToggle(!isToggle);
	}, [isToggle]);

	return [isToggle, toggle] as [boolean, () => void];
}

export default useToggle;
