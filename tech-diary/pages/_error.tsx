import React from 'react';

function Error({ statusCode }: any): any {
	return <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>;
}

Error.getInitialProps = ({ res, err }: any) => {
	let statusCode;
	if (res) {
		statusCode = res.statusCode;
	} else if (err) {
		statusCode = err.statusCode;
	} else {
		statusCode = 404;
	}
	return { statusCode };
};

export default Error;
