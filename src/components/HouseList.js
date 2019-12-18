import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const HouseList = ({
	isLoading,
	hasError,
	houses,
	selectHouse,
	loadNextPage,
	pageNum
}) => {
	return (
		<div className="#HouseList">
			<Typography variant="h5" component="h2">
				Houses
			</Typography>

			{/* TODO start */}
			{isLoading && <h3 style={{ color: "blue" }}>Loading...</h3>}
			{hasError && <h3 style={{ color: "red" }}>An Error occured</h3>}
			{/* TODO end */}

			{houses && (
				<List component="nav" aria-label="Houses List">
					{houses.map(house => (
						<ListItem
							button
							key={house.name}
							house={house}
							onClick={() => selectHouse(house)}
						>
							<ListItemText primary={house.name} />
						</ListItem>
					))}
				</List>
			)}

			<Button
				variant="contained"
				color="default"
				size="small"
				endIcon={<Icon>send</Icon>}
				onClick={() => loadNextPage(pageNum => pageNum + 1)}
			>
				Send
			</Button>
		</div>
	);
};

export default HouseList;
