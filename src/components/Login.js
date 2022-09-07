import { useState } from "react"
import useAuth from "../hooks/useAuth"
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { auth, setAuth } = useAuth();
	const { user } = auth;
	if (user) {
		return (
			<h1>Hello, {user}</h1>
		)
	}



	const handleSubmit = async e => {
		e.preventDefault();

		const user = { username, password };
		let formBody = [];
		for (let property in user) {
		  const encodedKey = encodeURIComponent(property);
		  const encodedValue = encodeURIComponent(user[property]);
		  formBody.push(encodedKey + "=" + encodedValue);
		}
		formBody = formBody.join("&");

		try {
			const response = await fetch(
				'http://79.143.31.216/login', 
				{
				  method: 'POST',
				  headers: {
				  	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				  },
				  body: formBody
				}
			);
			const json = await response.json();
			if (response.ok) {
				alert(`user ${JSON.stringify(user)} logged in successfully`);
				console.log(json);
				//Небезопасно. Имеет смысл перетащить в стейт
				localStorage.setItem("jwt", json.access_token);
				localStorage.setItem("user", username);
				setAuth({"jwt": json.access_token, "user": username})

			} else {
				alert(JSON.stringify(json));
				console.log(response.status);
				console.log(json)
			}

		}
		catch(err) {
			alert("request failed")
		}
	}

	return (
		<main>
			<h1>Login</h1>
			<form onSubmit={e => handleSubmit(e)}>
				<label htmlFor="username">username</label>
				<input
					id="username"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<label htmlFor="password">password</label>
				<input
					id="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button>login</button>
			</form>
		</main>
	)
}

export default Login