import axios from 'axios';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 1rem;
	font-weight: 400;
`;

const Contents = styled.div`
	padding-bottom: 16px;
`;

const DateContainer = styled.div`
	height: inherit;
	position: relative;
`;

const DateInner = styled.div`
	display: inline-block;
	position: relative;
	vertical-align: top;
	margin-right: 8px;
`;

const Indicator = styled.div`
	display: inline-block;
	height: 100%;
	position: relative;
	width: 16px;
`;

const Bar = styled.div`
	${(props) =>
		!props.isEnd
			? css`
					background-color: #32a797;
					width: 6px;
					height: 110%;
					left: 5px;
					top: 4px;
					position: relative;
			  `
			: css`
					width: 6px;
					height: 110%;
					left: 5px;
					top: 4px;
					position: relative;
			  `}
`;

const Circle = styled.div`
	background-color: #32a797;
	width: 16px;
	height: 16px;
	border-radius: 8px;
	position: absolute;
	top: 4px;
`;

function History({ userid }) {
	const [list, setList] = useState([]);
	const [byDate, setByDate] = useState([]);

	const loadList = async () => {
		try {
			const req = await axios.post('http://localhost:8080/userList', {
				id: userid,
			});
			setList((p) => (p = req.data));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!userid === false) {
			loadList();
		}
	}, [userid]);

	useEffect(() => {
		if (list.length > 0) {
			sort();
		}
	}, [list]);

	const sort = () => {
		const sortLists = [...list];
		let create = [];
		let success = [];
		let sum = [];

		create = sortLists.map((sortList) => ({
			...sortList,
			date: sortList.CreateDate,
		}));

		success = sortLists
			.map((sortList) => ({
				...sortList,
				date: sortList.SuccessDate,
			}))
			.filter((arr) => arr.date !== null);

		sum = [...create, ...success].sort((a, b) => {
			return new Date(a.date) - new Date(b.date);
		});

		setByDate((p) => (p = [...sum]));
	};

	useEffect(() => {
		console.log(byDate);
	}, [byDate]);

	return (
		<div>
			<div>
				{byDate.map((date, index) =>
					date.isCompleted === 0 ? (
						<Container key={date.id}>
							<Contents>
								<span>{date.Title}</span>
								<span>버킷리스트 생성</span>
							</Contents>
							<DateContainer>
								<DateInner>
									{date.CreateDate.replace('15:00:00.000Z', '')
										.replace('-', '년 ')
										.replace('-', '월 ')
										.replace('T', '일')}
								</DateInner>
								<Indicator>
									<Bar isEnd={byDate.length - 1 === index}></Bar>
									<Circle></Circle>
								</Indicator>
							</DateContainer>
						</Container>
					) : date.isCompleted === 1 ? (
						<Container key={date.id}>
							<Contents>
								<span>{date.Title}</span>
								<span>버킷리스트 생성</span>
							</Contents>
							<DateContainer>
								<DateInner>
									{date.SuccessDate
										? date.SuccessDate.replace('15:00:00.000Z', '')
												.replace('-', '년 ')
												.replace('-', '월 ')
												.replace('T', '일')
										: null}
								</DateInner>
								<Indicator>
									<Bar isEnd={byDate.length - 1 === index}></Bar>
									<Circle></Circle>
								</Indicator>
							</DateContainer>
						</Container>
					) : null
				)}
			</div>
		</div>
	);
}

export default History;
