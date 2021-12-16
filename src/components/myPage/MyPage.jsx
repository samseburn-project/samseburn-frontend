import { useState } from 'react';
import styled from 'styled-components';
import ViewChallenge from './ViewChallenge';
import ModifyUser from './ModifyUser';
import ManageChallenge from './ManageChallenge';

const MyPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabArr = [
    {
      tabTitle: '챌린지 정보',
      tabContent: <ViewChallenge />,
    },
    {
      tabTitle: '회원 정보 수정',
      tabContent: <ModifyUser />,
    },
    {
      tabTitle: '개설한 챌린지 관리',
      tabContent: <ManageChallenge />,
    },
  ];

  const onTabSwitch = (index) => {
    setActiveIndex(index);
  };

  return (
    <Wrapper>
      <TabContainer>
        {tabArr.map((tab, i) => (
          <Tab onClick={() => onTabSwitch(i)} key={i}>
            {tab.tabTitle}
          </Tab>
        ))}
      </TabContainer>

      {tabArr[activeIndex].tabContent}
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.section`
  width: 104rem;
  margin: 0 auto;
`;

const TabContainer = styled.div``;

const Tab = styled.button`
  font-size: 2rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;

  margin-right: 2rem;
  margin-bottom: 6rem;
`;

const ContentContainer = styled.div`
  margin: 0;
`;
