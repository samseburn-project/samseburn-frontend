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
  const [challengeList, setChallengList] = useState([]);
  const userToken = localStorage.getItem('token');

  const fetchUserChallenges = async () => {
    try {
      const response = await axios
        .get('/user/challenges', {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });

      // response에서 받은 데이터 state에 저장해 컴포넌트에 props로 내려주기
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUserChallenges();
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
      maxWidth: 50,
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

        {selectedTab === 0 && <ViewChallenge />}
        {selectedTab === 1 && <ModifyUser />}
        {selectedTab === 2 && <ManageChallenge />}
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
