import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"

const Table = () => {
	const [order, setOrder] = useState("desc_counter");
	const [offset, setOffset] = useState(0);
	const [limit, setLimit] = useState(3);
	const [data, setData] = useState([]);
	const { auth } = useAuth()
	const { jwt } = auth;
	const getData = async () => {
			
			if (offset === "" || limit === "") return;
			try {
				const response = await fetch(
					`http://79.143.31.216/statistics?order=${order}&offset=${offset}&limit=${limit}`,
					{
						method: "GET",
						headers: {
							"Authorization": `Bearer ${jwt}`
						}
					},

				)
				const data = await response.json();
				setData(data)
				console.log(data);
			} catch(err) {
				alert(JSON.stringify(err));
				console.log(err);
			}
		}
		

	return (
		<div>
			<select id="order" value={order} onChange={e => setOrder(e.target.value)}>
				<option value="asc_short">asc_short</option>
				<option value="asc_target">asc_target</option>
				<option value="asc_counter">asc_counter</option>
				<option value="desc_short">desc_short</option>
				<option value="desc_target">desc_target</option>
				<option value="desc_counter">desc_counter</option>
			</select>
			<label>
				offset
				<input id="offset" value={offset} onChange={e => setOffset(e.target.value)}/>
			</label>
			<label>
				limit
				<input id="limit" value={limit} onChange={e => setLimit(e.target.value)}/>
			</label>
			<table>
				<thead>
					<tr>
						{data.length > 0 && Object.keys(data[0]).map(key => <th key={key}>{key}</th>)}
					</tr>
				</thead>
				<tbody>
					{ data.length > 0 && 
						data.map(item => (
							<tr key={item.id}>
								{
									Object.entries(item).map(([key, value]) => {
										if (key === "short") {
											return <td key={key + value}>{`http://79.143.31.216/s/${value}`}</td>
										} else {
											return <td key={key + value}>{value}</td>
										}
									})
								}
							</tr>
						))
					}
				</tbody>
			</table>
			<button onClick={getData}>Get statistics</button>
		</div>
	)
}

export default Table;