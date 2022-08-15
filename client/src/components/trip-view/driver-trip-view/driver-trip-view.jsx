import React from 'react';
import styled from 'styled-components';

import PlaceHolderBar from '../placeholder-bar';
import TitleOfTrip from '../title-of-trip';
import RiderCard from './rider-card/rider-card';

import Paper from '@mui/material/Paper';

function DriverTripView({ status, tripInfo }) {
  const profileInfo = {
    name: 'Nymeria',
    rating: 4.8,
    image: 'https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F013%2F564%2Fdoge.jpg',
  }
  return (
    <div>
      <PlaceHolderBar />
      <DriverTripViewContainer>
        <TitleOfTrip />
        <Paper
          elevation={12}
          sx={{
            height: '400px',
            width: '100%',
            borderRadius: '20px',
          }}
        />
        <RiderCard profile={profileInfo} />
      </DriverTripViewContainer>
    </div>
  );
}

const DriverTripViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default DriverTripView;
