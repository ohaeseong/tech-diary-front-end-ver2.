export const asyncForeach = async (array: any[], callback: any) => {
	for (let i = 0; i < array.length; i++) {
		await callback(array[i]);
	}
};
