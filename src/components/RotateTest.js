import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	z-index: -1000;
`;

const TestBox = styled.div`
	${(props) =>
		css`
			left: ${props.left}%;
		`};
	width: 200px;
	height: 200px;
	background-color: orangered;
	position: absolute;
	top: 50%;
	transform-origin: center;
	border-bottom: 8px solid #32a797;
	border-radius: 100px;
`;

const Handler = styled.div`
	width: 24px;
	height: 24px;
	background-color: skyblue;
	position: relative;
	top: -12px;
	left: -12px;
	border-radius: 12px;
	filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.35));
	cursor: pointer;
`;

function RotateTest() {
	const [rotateActive, setRotateActive] = useState(false);
	const [mouseLocation, setMouseLocation] = useState({});
	const [boxStyle, setBoxStyle] = useState({});
	const radians = 180 / Math.PI;
	const box = useRef([]);

	const start = (e) => {
		setRotateActive((p) => (p = true));
	};

	const end = (e) => {
		setRotateActive((p) => (p = false));
	};

	const move = (e) => {
		let boxData = box.current.getBoundingClientRect();

		setMouseLocation((p) => (p = { clientX: e.clientX, clientY: e.clientY }));
		setBoxStyle(
			(p) =>
				(p = {
					boxWidth: boxData.width,
					boxHeight: boxData.height,
					boxLeft: boxData.left,
					boxTop: boxData.top,
				})
		);

		let rotate = 0;

		let boxCenter = {
			x: boxStyle.boxLeft + boxStyle.boxWidth / 2,
			y: boxStyle.boxTop + boxStyle.boxHeight / 2,
		};

		let arcPoints = {
			x: mouseLocation.clientX - boxCenter.x,
			y: mouseLocation.clientY - boxCenter.y,
		};
		let angle = Math.floor(Math.atan2(arcPoints.y, arcPoints.x) * radians);
		let startAngle = 180 - 45;

		if (rotateActive) {
			rotate = angle + startAngle;
			box.current.style.transform = `rotate(${rotate}deg)`;
			console.log(rotate);
			// if (angle < 0 && angle > -180) {
			// 	rotate = angle + startAngle;
			// }
		}
	};

	return (
		<Background onMouseUp={(e) => end(e)} onMouseMove={(e) => move(e)}>
			<TestBox ref={box[0]} left={30}>
				<Handler onMouseDown={(e) => start(e)}></Handler>
			</TestBox>
			<TestBox ref={box[1]} left={70}>
				<Handler onMouseDown={(e) => start(e)}></Handler>
			</TestBox>
		</Background>
	);
}

{
	/* <Theme>{themes.branch}</Theme>
							<div>
								{rewards
									.filter((arr) => arr.theme === 'branch')
									.map((arr, index) => (
										<BranchWrapper
											key={arr.id}
											isSelected={
												rewardsStat[arr.id - 1]
													? rewardsStat[arr.id - 1].isSelected
													: false
											}
										>
											{rewardsStat[arr.id - 1] ? (
												rewardsStat[arr.id - 1].isSelected ? (
													<RewardsShadow
														src={`http://localhost:8080/images/${arr.filename}.svg`}
														alt=''
													></RewardsShadow>
												) : null
											) : null}
											<RewardsBox
												draggable={
													adornment
														? !displayed
																.map((keys) => keys.key)
																.includes(arr.id)
															? isDraggable
															: false
														: false
												}
												onDragStart={(e) =>
													dragStartHandler(
														e,
														arr.id,
														true,
														'rewards',
														arr.filename
													)
												}
												onDrag={(e) => dragHandler(e)}
												onDragEnd={(e) =>
													dragEndHandler(
														e,
														arr.id - 1,
														rewardsRef.current[arr.id - 1],
														true,
														{
															key: arr.id,
															userid: arr.userid,
															filename: arr.filename,
															angle: 0,
														},
														'rewards'
													)
												}
												onDrop={(e) => dropHandler(e)}
												onDragOver={() => false}
												used={
													adornment
														? displayed
																.map((keys) => keys.imagekey)
																.includes(arr.id)
															? true
															: dropedRewards
																	.filter((arr) => !arr === false)
																	.map((arr) => arr.imagekey)
																	.includes(arr.id)
															? true
															: false
														: false
												}
												ref={(el) => (rewardsRef.current[arr.id - 1] = el)}
											>
												<Rewards
													src={`http://localhost:8080/images/${arr.filename}.svg`}
													alt=''
													draggable={false}
												/>
											</RewardsBox>
										</BranchWrapper>
									))}
							</div> */
}

export default RotateTest;
