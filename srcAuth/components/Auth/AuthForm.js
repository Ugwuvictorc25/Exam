import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);
	const emailInputRef = useRef("");
	const passwordInputRef = useRef("");

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		if (isLogin) {
		} else {
			// fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQyUe1AWZZk2gldF9_H64QitQ0SEEuGfk", {
			// 	method: "POST",
			// 	body: JSON.stringify({
			// 		email: enteredEmail,
			// 		password: enteredPassword,
			// 		returnSecureToken: true,
			// 	}),
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// }).then((res) => {
			// 	if (res.ok) {
			// 	} else {
			// 		return res.json().then((data) => {
			// 			console.log(data);
			// 		});
			// 	}
			// });

			fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQyUe1AWZZk2gldF9_H64QitQ0SEEuGfk", {
				method: "POST",
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (res.ok) {
					// ...
				} else {
					return res.json().then((data) => {
						// show an error modal
						console.log(data);
					});
				}
			});
		}
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input type="password" id="password" required ref={passwordInputRef} />
				</div>
				<div className={classes.actions}>
					<button type="submit">{isLogin ? "Login" : "Create Account"}</button>
					<button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
						{isLogin ? "Create new account" : "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
