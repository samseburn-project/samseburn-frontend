import React, { useState } from "react";

import styled from "styled-components";

import ViewChallenge from "./ViewChallenge";
import ModifyUser from "./ModifyUser";
import ManageChallenge from "./ManageChallenge";

const Main = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const tabArr = [
		{
			tabTitle: "챌린지 정보",
			tabContent: <ViewChallenge />,
		},
		{
			tabTitle: "회원 정보 수정",
			tabContent: <ModifyUser />,
		},
		{
			tabTitle: "개설한 챌린지 관리",
			tabContent: <ManageChallenge />,
		},
	];

	const onTabSwitch = (index) => {
		setActiveIndex(index);
	};

	return (
		<Wrapper>
			<Row>
				{tabArr.map((tab, i) => (
					<Tab onClick={() => onTabSwitch(i)} key={i}>
						{tab.tabTitle}
					</Tab>
				))}
			</Row>

			{tabArr[activeIndex].tabContent}
		</Wrapper>
	);
};

export default Main;

const Wrapper = styled.section`
	width: 104rem;
	margin: 0 auto;
`;

const Row = styled.div``;

const Tab = styled.button`
	font-size: 2rem;
	font-weight: bold;
	background-color: transparent;
	border: none;
	cursor: pointer;

	margin-right: 2rem;
	margin-bottom: 6rem;
`;
