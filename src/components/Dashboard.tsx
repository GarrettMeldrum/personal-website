import { useEffect } from 'react';

function Dashboard() {
	const[data, setData] = useState(null);
	
	useEffect(() => {
		async function fectchData() {
			const response = await fetch('api/recent');
			const json = await response.json();
			setData(json);
		}
		fetchData();
	}, []);
	
	return <div>{data ? <p>{data.message}</p> : <p>Loading...</p>}</div>;
}
