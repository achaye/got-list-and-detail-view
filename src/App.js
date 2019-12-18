import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import HouseList from "./components/HouseList";
import HouseDetails from "./components/HouseDetails";
import useDataApi from "./hooks/useDataApi";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

const initialPageNum = 1;

const getPageUrl = pageNum => {
	return `https://www.anapioficeandfire.com/api/houses?page=${pageNum}&pageSize=10`;
};

function App() {
	const [page, setPage] = useState(initialPageNum);
	const [selectedHouse, setSelectedHouse] = useState(null);
	const [
		{
			data: houses,
			isLoading: isLoadingHouses,
			hasError: hasErrorFetchingHouses
		},
		doFetch
	] = useDataApi();

	useEffect(() => {
		const url = getPageUrl(page);
		doFetch(url);
	}, [doFetch, page]);

	return (
		<div className="App">
			<Container
				style={{
					padding: "2rem",
					border: "2px dashed black"
				}}
			>
				<Grid container spacing={3}>
					<Grid item sm={12} md={4}>
						<Paper style={{ padding: "2rem" }}>
							<HouseList
								houses={houses}
								hasError={hasErrorFetchingHouses}
								isLoading={isLoadingHouses}
								selectHouse={setSelectedHouse}
								pageNum={page}
								loadNextPage={setPage}
							/>
						</Paper>
					</Grid>
					<Grid item sm={12} md={8}>
						<Paper style={{ padding: "2rem" }}>
							<HouseDetails house={selectedHouse} />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default App;
