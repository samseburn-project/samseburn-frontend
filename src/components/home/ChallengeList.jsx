import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import ChallengeCard from './ChallengeCard';

// const base_url = 'https://api.fevertime.shop';
// 'Access-Control-Allow-Credentials': true,

function ChallengeList() {
  const fetchChallenges = async () => {
    try {
      const response = await axios.get(
        'https://api.fevertime.shop/challenges?kind=All',
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
}

export default ChallengeList;
