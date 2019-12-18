import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
	table: {
		width: "100%",
		margin: "20px auto",
		tableLayout: "fixed",
		borderCollapse: "collapse"
	},

	td: {
		borderCollapse: "collapse",
		padding: "10px",
		border: "solid 1px",
		textAlign: "center"
	},

	th: {
		borderCollapse: "collapse",
		padding: "10px",
		border: "solid 1px",
		textAlign: "center"
	}
});

const createRowsData = dataObj => {
	let rows = [];

	if (dataObj) {
		for (let [key, value] of Object.entries(dataObj)) {
			const elem = { key: key, value: value };
			rows.push(elem);
		}
	}
	return rows;
};

const HouseDetails = ({ house }) => {
	const [entries, setEntries] = useState(createRowsData(house));
	const classes = useStyles();

	useEffect(() => {
		setEntries(createRowsData(house));
	}, [house]);

	if (!house) {
		return <div>No House Selected!</div>;
	}

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell align="center">Category</TableCell>
						<TableCell align="center">Value</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{entries.map(row => (
						<TableRow key={row.key}>
							<TableCell align="center">{row.key}</TableCell>
							<TableCell align="left" style={{ wordBreak: "break-word" }}>
								{row.value}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default HouseDetails;
