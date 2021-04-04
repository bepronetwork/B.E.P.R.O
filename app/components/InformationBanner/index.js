import React from 'react';
import styled from 'styled-components';

import H3 from '../H3';

const TitleWrapper = styled.div`
  padding: 50px 5%;
  margin: 72px 0px;
  width: 100%;
  height: auto;
  background: #f5f5f5;
`;

function InformationBanner() {
  return (
    <TitleWrapper>
      <H3>
        Explore the collection of 100 limited prestigious, unique timepieces as
        the first BEPRO collection of A.I. generated art.
      </H3>
      <H3>
        Start your journey into the fine digital arts by purchasing the last 10
        available pieces of purchase, all with the listing price of 100,000
        BEPRO.
      </H3>
    </TitleWrapper>
  );
}

export default InformationBanner;
