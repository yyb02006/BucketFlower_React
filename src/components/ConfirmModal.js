import React, { useState } from 'react';
import { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

const slideUp = keyframes`
	0%{
		margin-top: 20px;
    opacity: 0%;
	}
	100%{
		margin-top: 0;
    opacity: 100%;
	}`;

const slideDown = keyframes`
	0%{
  margin-top: 0;
  opacity: 100%;
	}
	100%{
		margin-top: 20px;
    opacity: 0;
	}`;

const ModalContainer = styled.div`
	box-sizing: border-box;
	width: 400px;
	background-color: #fafafa;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-weight: 500;
	padding: 24px;
	border-radius: 16px;
	filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.2));
	animation-name: ${slideUp};
	animation-duration: 0.3s;
	animation-timing-function: ease-in-out;
	animation-fill-mode: forwards;

	${(props) =>
		props.animation &&
		css`
			animation-name: ${slideDown};
		`}

	& > div:nth-child(1) {
		border-bottom: 4px solid #32a797;
		width: ${(props) => props.width || ''};
		margin-bottom: 4px;
	}
	& > div:nth-child(2) {
		font-size: 1.375rem;
	}
	& > div:nth-child(3) {
		font-size: 1rem;
		font-weight: 400;
		margin-top: 48px;
		white-space: pre-wrap;
		line-height: 1.625rem;
	}
`;

const ModalButtons = styled.div`
	margin-top: 48px;
	display: flex;
	justify-content: space-between;
	button {
		font-size: 1rem;
		font-weight: 400;
		padding: 0;
		background-color: transparent;
	}
`;

const ConfirmButton = styled.button`
	color: #32a797;
`;

const CancelButton = styled.button`
	color: #404040;
`;

function ConfirmModal({
	onModal,
	onConfirm,
	onCancel,
	onContinue,
	title,
	titleBarWidth,
	content,
	confirmText,
	cancelText,
}) {
	const [visible, setVisible] = useState(onModal);
	const [animation, setAnimation] = useState(false);

	useEffect(() => {
		if (visible && !onModal && !onContinue) {
			setAnimation((p) => (p = true));
			setTimeout(() => {
				setAnimation((p) => (p = false));
			}, 300);
		}
		setVisible((p) => (p = onModal));
	}, [visible, onModal]);

	if (!animation && !visible) return null;
	return (
		<ModalContainer width={titleBarWidth} animation={animation}>
			<div></div>
			<div>{title}</div>
			<div>
				{content.split('\\n').map((arr, index) => (
					<span key={index}>
						{arr}
						<br />
					</span>
				))}
			</div>
			<ModalButtons>
				<CancelButton onClick={onCancel}>{cancelText}</CancelButton>
				<ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
			</ModalButtons>
		</ModalContainer>
	);
}

ConfirmModal.defaultProps = {
	title: '제목',
	content: '내용',
	confirmText: '확인',
	cancelText: '취소',
	titleBarWidth: '50px',
};

export default ConfirmModal;
