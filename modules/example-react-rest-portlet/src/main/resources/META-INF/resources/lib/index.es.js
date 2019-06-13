import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const INITIAL_STATE = { error: null, isLoading: true, items: [] }

function LiferayGroupList(props) {
	
	const { companyId, authToken } = props;
	const [ state, setState ] = React.useState(INITIAL_STATE);
	
	React.useEffect(() => {
	
		fetch(`/api/jsonws/group/get-groups/company-id/${companyId}/parent-group-id/0/site/true?p_auth=${authToken}`)
			.then(response => response.json())
			.then(results => {
				
				console.log("Data Fetching Complete");
				console.log("Results:");
				console.log(results);
				
				setState({
					error: null,
					isLoading: false,
					items: results
				});				
			})
			.catch(error => {
				setState({
					error: error,
					isLoading: false
				});				
			});		
		
	}, [companyId, authToken]);
	
	if(state.error) {
		console.log("Data Fecthing Error");
		return <div> {state.error.message} </div>
	} else if (state.isLoading) {
		console.log("Data Loading");
		return <div>Loading...</div>
	} else {
		console.log("Rendering View");
		
		return (
			<div>
				<div>Group List</div>
				<ul>
					{state.items.map(item => (
						<li key={item.groupId}>
							{item.groupId} - {item.descriptiveName}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default function(elementId, companyId, authToken) {
	ReactDOM.render(<LiferayGroupList companyId={companyId} authToken={authToken}/>, document.getElementById(elementId));
}