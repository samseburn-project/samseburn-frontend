import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Grid, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegisterChallengeCard from './RegisterChallengeCard';

function ManageChallenge({ ...props }) {
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState('');
  const [open, setOpen] = useState(false);

  // mui card responsive layout
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 375,
        md: 480,
        lg: 768,
        xl: 1200,
        // mobile: 0,
        // lg: 375,
        // tablet: 480,
        // desktop: 768,
      },
    },
  });

  const handleOpenDialog = (targetId) => {
    setOpenDialog(targetId);
  };

  const handleOpenToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setLoading(false);
    return () => {};
  }, []);

  return (
    <>
      {loading ? (
        <SpinnerContainer>
          <CircularProgress size={30} color="warning" />
        </SpinnerContainer>
      ) : (
        <ManageChallengeBox>
          {props?.userCreateChallengeList.length === 0 ? (
            <EmptyContainer>개설한 챌린지가 없습니다</EmptyContainer>
          ) : (
            <ThemeProvider theme={theme}>
              <Grid container style={{ marginTop: '5rem' }}>
                {props?.userCreateChallengeList.map((challenge) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    xl={6}
                    key={challenge.challengeId}
                  >
                    <RegisterChallengeCard
                      id={challenge.challengeId}
                      open={open}
                      handleOpenToggle={handleOpenToggle}
                      openDialog={openDialog}
                      handleOpenDialog={handleOpenDialog}
                      challenge={challenge}
                    />
                  </Grid>
                ))}
              </Grid>
            </ThemeProvider>
          )}
        </ManageChallengeBox>
      )}
    </>
  );
}

export default ManageChallenge;

const ManageChallengeBox = styled.div`
  padding-bottom: 20rem;
`;

const EmptyContainer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  margin: 8rem 0;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
