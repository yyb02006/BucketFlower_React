import Home from './routes/Home';
import GlobalStyle from './GlobalStyle';
import Personal from './routes/Personal';
import Login from './routes/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './routes/Signup';

function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/personal' element={<Personal />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
