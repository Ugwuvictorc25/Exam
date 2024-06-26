import { useHistory, useLocation } from "react-router-dom";
import { Fragment } from "react";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
	return quotes.sort((quoteA, quoteB) => {
		if (ascending) {
			return quoteA.id > quoteB.id ? 1 : -1;
		} else {
			return quoteA.id < quoteB.id ? 1 : -1;
		}
	});
};
const QuoteList = (props) => {
	const location = useLocation();

	const history = useHistory();

	const queryParams = new URLSearchParams(location.search);
	const isSortingAscending = queryParams.get("sort") === "asc";

	const sortQouteHandler = () => {
		history.push({
			pathname: location.pathname,
			search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
		});
		// history.push("/quotes?sort=" + (isSortingAscending ? "desc" : "asc"));
	};

	const sortedQuote = sortQuotes(props.quotes, isSortingAscending);

	return (
		<Fragment>
			<div className={classes.sorting}>
				<button onClick={sortQouteHandler}>Sort {isSortingAscending ? "Ascending" : "Descending"}</button>
			</div>
			<ul className={classes.list}>
				{sortedQuote.map((quote) => (
					<QuoteItem key={quote.id} id={quote.id} author={quote.author} text={quote.text} />
				))}
			</ul>
		</Fragment>
	);
};

export default QuoteList;
