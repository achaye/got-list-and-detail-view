import { useState, useReducer, useEffect } from "react";

const dataFetchReducer = (state, action) => {
	switch (action.type) {
		case "FETCH_INIT":
			return {
				...state,
				isLoading: true,
				hasError: false
			};
		case "FETCH_SUCCESS":
			return {
				...state,
				isLoading: false,
				hasError: false,
				data: action.payload
			};
		case "FETCH_FAILURE":
			return {
				...state,
				isLoading: false,
				hasError: true
			};
		default:
			throw new Error();
	}
};

const useDataApi = (resourceUrl, initialData) => {
	const [url, setUrl] = useState(resourceUrl);

	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		hasError: false,
		data: initialData
	});

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: "FETCH_INIT" });

			try {
				const responce = await fetch(url);
				const data = await responce.json();

				dispatch({ type: "FETCH_SUCCESS", payload: data });
			} catch (error) {
				dispatch({ type: "FETCH_FAILURE" });
			}
		};

		fetchData();
	}, [url]);

	return [state, setUrl];
};

export default useDataApi;
