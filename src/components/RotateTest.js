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
	const box = useRef();

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
			<TestBox ref={box} left={30}>
				<Handler onMouseDown={(e) => start(e)}></Handler>
			</TestBox>
			<TestBox ref={box} left={70}>
				<Handler onMouseDown={(e) => start(e)}></Handler>
			</TestBox>
		</Background>
	);
}

export default RotateTest;
