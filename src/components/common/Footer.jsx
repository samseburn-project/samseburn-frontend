import styled from "styled-components";

const Footer = () => {
	return (
		<StyledFooter>
			<Copyright>Copyright &copy; 2021 삼세번</Copyright>
			<Text>본 사이트는 포트폴리오 용도로 제작된 사이트입니다.</Text>
		</StyledFooter>
	);
};

export default Footer;

const StyledFooter = styled.div`
	width: 100%;
	height: 8rem;
	background-color: #f6f6f6;
	font-size: 4rem;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 70rem;
`;

const Copyright = styled.div`
	font-size: 2rem;
	font-weight: bold;
`;

const Text = styled.div`
	font-size: 2rem;
`;
