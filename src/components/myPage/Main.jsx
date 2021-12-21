import { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import { Tab, Tabs } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import ViewChallenge from './ViewChallenge';
import ModifyUser from './ModifyUser';
import ManageChallenge from './ManageChallenge';

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [userChallengeList, setUserChallengList] = useState([]);
  const [userCreateChallengeList, setUserCreateChallengList] = useState([]);
  const userToken = localStorage.getItem('token');

  const fetchUserChallenges = async () => {
    try {
      const res = await axios.get('/user/challenges', {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (res.status === 200) setUserChallengList(res.data);
      console.log(res.data);

      // response에서 받은 데이터 state에 저장해 컴포넌트에 props로 내려주기
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserCreateChallenge = async () => {
    try {
      const res = await axios.get('/user/challenges/create', {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (res.status === 200) setUserCreateChallengList(res.data);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserChallenges(); // 유저와 연관된 챌린지 정보 요청
    fetchUserCreateChallenge(); // 유저가 생성한 챌린지 정보 요청
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const StyledTabs = muiStyled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 100,
      width: '100%',
      backgroundColor: '#EB3901',
    },
  });

  const StyledTab = muiStyled((props) => <Tab disableRipple {...props} />)({
    fontFamily: ['Lato'],
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#000000',
    '&.Mui-selected': {
      color: '#EB3901',
    },
  });

  return (
    <>
      <Wrapper>
        <Row>
          <StyledTabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="챌린지 정보" />
            <StyledTab label="회원 정보 수정" />
            <StyledTab label="개설한 챌린지 관리" />
          </StyledTabs>
        </Row>

        <Row>
          {selectedTab === 0 && (
            <ViewChallenge
              userToken={userToken}
              userChallengeList={userChallengeList}
            />
          )}
          {selectedTab === 1 && <ModifyUser userToken={userToken} />}
          {selectedTab === 2 && (
            <ManageChallenge
              userCreateChallengeList={userCreateChallengeList}
            />
          )}
        </Row>
      </Wrapper>
    </>
  );
};

export default Main;

const Wrapper = styled.section`
  width: 104rem;
  margin: 0 auto;
`;

const Row = styled.div``;
