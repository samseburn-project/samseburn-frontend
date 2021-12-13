import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ChallengeCard from './ChallengeCard';

const ChallengeList = () => {
  const [list, setList] = useState([]);

  const fetchChallenges = async () => {
    try {
      const { data } = await axios.get('/challenges?kind=All');
      console.log(data);
      setList(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <ListContainer>
      {list.map((challenge) => (
        <ChallengeCard
          title={challenge.title}
          category={challenge.category.name}
          locationType={challenge.locationType}
          startDate={challenge.startDate}
          endDate={challenge.endDate}
          imgUrl={challenge.imgUrl}
          limitPerson={challenge.limitPerson}
          participants={challenge.participants}
        />
      ))}
    </ListContainer>
  );
};

export default ChallengeList;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;
