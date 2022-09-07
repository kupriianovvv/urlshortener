import { useState } from "react"

const Register = () => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await fetch(
				`http://79.143.31.216/register?username=${username}&password=${password}`, 
				{
				  method: 'POST'
				}
			);
			const json = await response.json();
			if (response.ok) {
				alert(`user ${JSON.stringify(json)} registered successfully`)
				console.log(json)
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
			<h1>Register</h1>
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
				<button>register</button>
			</form>
		</main>
	)
}

export default Register