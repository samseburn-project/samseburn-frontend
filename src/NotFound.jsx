import React from "react";

import styled from "styled-components";

const NotFound = () => {
	return (
		<Wrapper>
			<Text>๐ซ ์กด์ฌํ์ง ์๋ ํ์ด์ง์๋๋ค! ๐ซ</Text>
		</Wrapper>
	);
};

export default NotFound;

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Text = styled.div`
	font-size: 4rem;
	font-weight: bold;
`;
