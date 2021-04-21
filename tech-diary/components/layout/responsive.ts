export const breakPoints = {
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	over: 1900,
};

export const media = {
	sm: `@media (max-width: ${breakPoints.sm}px)`,
	md: `@media (min-width: ${breakPoints.md}px) and (max-width:${breakPoints.lg}px)`,
	lg: `@media (min-width: ${breakPoints.lg}px) and (max-width:${breakPoints.xl}px)`,
	xl: `@media (min-width: ${breakPoints.xl}px)`,
	over: `@media (min-width: ${breakPoints.over}px)`,
};

export const mediaQuery = (maxWidth: number) => {
	return `  @media (max-width: ${maxWidth}px)`;
};
