import styled from "styled-components";

import { customMedia } from "../../GlobalStyles";

const Footer = () => {
	return (
		<StyledFooter>
			<Copyright>Copyright &copy; 2021 삼세번</Copyright>
			<Text>본 사이트는 포트폴리오 용도로 제작된 사이트입니다.</Text>
		</StyledFooter>
	);
};

export default Footer;

const StyledFooter = styled.footer`
	width: 100%;
	height: 8rem;
	background-color: #f6f6f6;
	font-size: 4rem;

	display: flex;
	justify-content: center;
	align-items: center;
  gap: 70rem;
  
  ${customMedia.lessThan("mobile")`
    height: 4rem;
    gap: 2rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    height: 4rem;
    gap: 2rem;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
    height: 4rem;
    gap: 5rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
    height: 6rem;
    gap: 20rem;
  `}
`;

const Copyright = styled.div`
	font-size: 2rem;
  font-weight: bold;
  
  ${customMedia.lessThan("mobile")`
   	font-size: 1rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
   	font-size: 1rem;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
  	font-size: 1.2rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
  	font-size: 1.6rem;
  `}
`;

const Text = styled.div`
  font-size: 2rem;
  
  ${customMedia.lessThan("mobile")`
   	font-size: 1rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
   	font-size: 1rem;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
  	font-size: 1.2rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
  	font-size: 1.6rem;
  `}
`;
