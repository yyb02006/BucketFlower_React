import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useLogout() {
	const move = useNavigate;

	const logout = async () => {
		try {
			const req = await axios.get('http://localhost:8080/logout');
			move('/');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		logout();
	}, []);
}

export default useLogout;
