import styled from 'styled-components';

const SeparateBar_Bar = styled.div`
	border-bottom: ${(props) => props.border} solid #e9e9e9;
	margin: ${(props) => props.margin} 0;
`;

function SeparateBar({ margin = 0, border = '2px' }) {
	return <SeparateBar_Bar margin={margin} border={border} />;
}

export default SeparateBar;
