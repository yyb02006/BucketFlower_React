import Header from '../components/Header';
import Background from '../components/Background';
import styled, { css } from 'styled-components';
import { useEffect } from 'react';

const FlowerContainer = styled.div`
	width: 580px;
	height: 1100px;
	border-radius: 16px;
	filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.35));
	background-color: #fafafa;
	position: relative;
	margin-left: 10px;
`;

const PersonalWrapper = styled.div`
	max-width: 1200px;
	background-color: bisque;
	margin: 0 auto;
	position: relative;
	z-index: -1;
	display: flex;
`;

function Personal() {
	return (
		<div>
			<Background />
			<Header />
			<PersonalWrapper>
				<FlowerContainer />
			</PersonalWrapper>
		</div>
	);
}

export default Personal;
