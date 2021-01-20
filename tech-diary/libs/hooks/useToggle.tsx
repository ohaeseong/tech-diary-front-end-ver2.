import { useState } from 'react';

function useToggle(value: any) {
	const [isToggle, setIsToggle] = useState(value);

	const toggle = () => {
		setIsToggle(!isToggle);
	};

	return [isToggle, toggle] as [boolean, () => void];
}

export default useToggle;
