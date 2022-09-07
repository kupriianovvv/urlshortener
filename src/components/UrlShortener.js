import { useState } from "react"
import useAuth from "../hooks/useAuth"

const UrlShortener = () => {
	const [url, setUrl] = useState("");
	const [minifiedUrl, setMinifiedUrl] = useState("");
	const { auth } = useAuth();
	const { jwt } = auth;

	const handleSubmit = async e => {
		e.preventDefault();

		const encodedURL = encodeURIComponent(url);
		if (!jwt) {
			alert("you have to log in");
			return;
		}
		console.log(jwt)
		const response = await fetch(
			`http://79.143.31.216/squeeze?link=${encodedURL}`,
			{
				method: "POST",
				headers: {
					"Authorization": `Bearer ${jwt}`
				}
			}
		)
		const json = await response.json();
		if (response.ok) {
			alert("url minified successfully");
			console.log(json)
			setMinifiedUrl(`http://79.143.31.216/s/${json.short}`)

		} else {
			alert(JSON.stringify(json));
			console.log(response.status);
			console.log(json)
		}
	}

	return (
		<>
			<form onSubmit={e => handleSubmit(e)}>
				<label htmlFor="minifyUrl">Minify URL</label>
				<input
					id="minifyUrl"
					value={url}
					onChange={e => setUrl(e.target.value)}
				/>
				<button>Minify</button>
			</form>
			<label htmlFor="minifiedUrl">minified URL</label>
			<input id="minifiedUrl" value={minifiedUrl} readOnly/>
		</>
	)
}

export default UrlShortener