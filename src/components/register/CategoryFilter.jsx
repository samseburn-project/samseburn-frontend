import styled from 'styled-components';

const CategoryFilter = () => {
  const topics = ['운동', '공부', '취미', '독서', '기타'];
  const types = ['온라인', '오프라인'];

  console.log(topics);
  return (
    <>
      <SmallLabelText>챌린지 주제*</SmallLabelText>
      <CategoryRow>
        {topics.map((topic, i) => (
          <Category key={i}>{topic}</Category>
        ))}
      </CategoryRow>
      <SmallLabelText>챌린지 유형*</SmallLabelText>
      <CategoryRow>
        {types.map((type, i) => (
          <Category key={i}>{type}</Category>
        ))}
      </CategoryRow>
    </>
  );
};

export default CategoryFilter;

export const CategoryRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Category = styled.button`
  font-size: 1.6rem;
  border: 0.1rem solid #ffa883;
  color: #ffa883;
  background-color: white;
  border-radius: 2rem;
  width: 10rem;
  height: 3.2rem;
  cursor: pointer;

  &:hover {
    background-color: #ffa883;
    color: white;
  }
`;

const SmallLabelText = styled.div`
  font-size: 1.6rem;
  font-weight: bold;

  margin-bottom: 1.5rem;
`;
