import React from 'react';

import styled from 'styled-components';

import { Dialog, DialogContent } from '@mui/material';
import StyledButton from './StyledButton';

import { ReactComponent as Close } from '../../assets/icons/close.svg';

const CommonDialog = ({ ...props }) => {
  console.log(props);
  const handleButtonRender = (mainText) => {
    if (mainText === '챌린지 참가 신청이 완료되었습니다.') {
      return (
        <ConfirmButton type="button" onClick={() => props.handleDialogClose()}>
          확인
        </ConfirmButton>
      );
    } else if (mainText === '챌린지 참가 신청이 취소되었습니다.') {
      return (
        <ButtonRow>
          <ConfirmButton
            type="button"
            onClick={() => props.handleChallengeCancel()}
          >
            확인
          </ConfirmButton>
          <CancelButton type="button" onClick={() => props.handleDialogClose()}>
            취소
          </CancelButton>
        </ButtonRow>
      );
    } else if (mainText === '챌린지 1주차 작심삼일 미션을 달성했습니다 🎉') {
      return (
        <ButtonRow>
          <ContinueButton
            type="button"
            onClick={() => {
              props.handleChallengeContinue();
              props.handleDialogClose();
            }}
          >
            챌린지 계속 하기
          </ContinueButton>
          <StopButton
            type="button"
            onClick={() => {
              props.handleChallengeStop();
              props.handleDialogClose();
            }}
          >
            챌린지 그만 두기
          </StopButton>
        </ButtonRow>
      );
    } else if (mainText === '챌린지 1주차 작심삼일 미션을 달성하지 못했어요 😔')
      return <ConfirmButton>확인</ConfirmButton>;
    else if (mainText === '회원 정보 변경이 완료되었습니다')
      return (
        <ConfirmButton
          type="button"
          onClick={() => {
            props.handleDialogClose();
          }}
        >
          확인
        </ConfirmButton>
      );
  };

  return (
    <Dialog onClose={() => props.handleDialogClose()} open={props.dialogOpen}>
      <StyledDialogContent>
        <CloseButton>
          <Close alt="Close icon" onClick={props.handleDialogClose} />
        </CloseButton>
        <Container>
          <Row>
            <MainText>{props.mainText}</MainText>
            <SubText>{props.subText}</SubText>
          </Row>
          <Row>{handleButtonRender(props.mainText)}</Row>
        </Container>
      </StyledDialogContent>
    </Dialog>
  );
};

export default CommonDialog;

const StyledDialogContent = styled(DialogContent)`
  padding: 6rem 9rem;
  position: relative;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Row = styled.div`
  text-align: center;
`;

const MainText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 1rem;
`;

const SubText = styled.div`
  font-size: 1.6rem;
  letter-spacing: 1px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
`;

const ConfirmButton = styled(StyledButton)`
  padding: 0.8rem 1.8rem;
  font-size: 1.6rem;
`;

const ContinueButton = styled(StyledButton)`
  padding: 0.8rem 1.8rem;
  font-size: 1.6rem;
`;

const CancelButton = styled(StyledButton)`
  padding: 0.8rem 1.8rem;
  font-size: 1.6rem;
  background-color: #c4c4c4;

  &:hover {
    background-color: #c4c4c4;
  }
`;

const StopButton = styled(StyledButton)`
  padding: 0.8rem 1.8rem;
  font-size: 1.6rem;
  background-color: #c4c4c4;

  &:hover {
    background-color: #c4c4c4;
  }
`;
