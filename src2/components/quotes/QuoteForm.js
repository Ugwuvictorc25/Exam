import { Fragment, useRef } from "react";
import { Prompt } from "react-router-dom";
import { useState } from "react";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
	const authorInputRef = useRef();
	const textInputRef = useRef();
	const [isEntering, setIsEntering] = useState(false);

	function submitFormHandler(event) {
		event.preventDefault();

		const enteredAuthor = authorInputRef.current.value;
		const enteredText = textInputRef.current.value;

		// optional: Could validate here

		props.onAddQuote({ author: enteredAuthor, text: enteredText });
	}

	const formFocusHandler = () => {
		setIsEntering(true);
	};

	const finishedEnteringHandler = () => {
		setIsEntering(false);
	};

	return (
		<Fragment>
			<Prompt when={isEntering} message={(location) => "Are you sure that you want to leave this page all your entered data will be lost"} />
			<Card>
				<form onFocus={formFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
					{props.isLoading && (
						<div className={classes.loading}>
							<LoadingSpinner />
						</div>
					)}

					<div className={classes.control}>
						<label htmlFor="author">Author</label>
						<input type="text" id="author" ref={authorInputRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor="text">Text</label>
						<textarea id="text" rows="5" ref={textInputRef}></textarea>
					</div>
					<div className={classes.actions}>
						<button onClick={finishedEnteringHandler} className="btn">
							Add Quote
						</button>
					</div>
				</form>
			</Card>
		</Fragment>
	);
};

export default QuoteForm;
