import Home from './routes/Home';
import GlobalStyle from './GlobalStyle';
import Personal from './routes/Personal';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
	const sendRequest = async () => {
		const response = await axios.get('http://localhost:8080');
		const responsePer = await axios.get('http://localhost:8080/personal');
		console.log(response);
		console.log(responsePer);
	};

	useEffect(() => {
		sendRequest();
	});

	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/personal' element={<Personal />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
