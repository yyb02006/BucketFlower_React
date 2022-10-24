import styled, { css } from 'styled-components';

const FooterContainer = styled.div`
	${(props) =>
		css`
			margin-top: ${props.margin}px;
		`}
`;

const Contents = styled.div`
	box-sizing: border-box;
	border-top: 2px solid #d0d0d0;
	max-width: 1200px;
	height: 150px;
	margin: 0 auto;
	padding-top: 24px;
	font-size: 0.875rem;
	font-weight: 500;
	color: #808080;
	display: flex;
	justify-content: space-between;
`;

function Footer({ margin }) {
	return (
		<FooterContainer margin={margin}>
			<Contents>
				<span>Copyright 2022 Our Team All rights reserved</span>
				<span>Email@Email.com</span>
			</Contents>
		</FooterContainer>
	);
}

Footer.defaultProps = {
	margin: 0,
};

export default Footer;
