import Home from './routes/Home';
import GlobalStyle from './GlobalStyle';
import Personal from './routes/Personal';
import Login from './routes/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './routes/Signup';
import axiosInstance from './utils/axiosConfig';
import React, { useLayoutEffect, useState } from 'react';
import UserHome from './routes/UserHome';

function App() {
	const [isLogin, setIsLogin] = useState('');
	const test = async () => {
		try {
			const req = await axiosInstance.get('http://localhost:8080/authtoken');
			setIsLogin(req.data.id);
			// console.log('First' + req.data.id);
		} catch (error) {
			console.log('auth' + error);
		}
	};
	useLayoutEffect(() => {
		test();
	}, []);
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path='/' element={<Home isLogin={isLogin} />} />
				<Route path='/personal' element={<Personal isLogin={isLogin} />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/userhome' element={<UserHome />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
