import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useLogout() {
	const move = useNavigate;

	const logout = async () => {
		try {
			const req = await axios.get(`${process.env.REACT_APP_BASE_URL}/logout`);
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
