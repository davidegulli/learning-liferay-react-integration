import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';

const INITIAL_STATE = { error: null, isLoading: true, items: [] }

function MyFunctionalComponent(props) {
	const { companyId, authToken } = props;

	const [state, setState] = React.useState(INITIAL_STATE);

	React.useEffect(() => {

		fetch(`/api/jsonws/user/get-company-users/company-id/${companyId}/start/0/end/100?p_auth=${authToken}`)
			.then(response => response.json())
			.then(result => {

				console.log("Fetch Complete");

				setState({
					error: null,
					isLoading: false,
					items: result
				});
			})
			.catch(error => {
				setState({
					error: error,
					isLoading: false
				});
			})
	}, [companyId, authToken]);

	if (state.error) {
		console.log("Rendering Error");
		return <div> {state.error.message}</div>;
	} else if (state.isLoading) {
		console.log("Rendering Loading");
		return <div>Loading...</div>;
	} else {
		console.log("Rendering List");
		return (
			<ul>
				{state.items.map(item => (
					<li key={item.userId}>
						{item.userId} - {item.firstName}
					</li>
				))}
			</ul>
		);
	}

}

export default function(elementId, companyId, authToken) {
	ReactDOM.render(<MyFunctionalComponent companyId={companyId} authToken={authToken} />, document.getElementById(elementId));
}