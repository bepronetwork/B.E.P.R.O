import React from 'react';
import {FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import A from './A';
import H3 from '../H3';
import Button from '../Button';
import H1 from '../H1';

const TitleWrapper = styled.div`
  display: flex;
  min-height: 100%;
  text-align: left;
  flex-direction: column;
`;

const ConnectWalletWrapper = styled.div`
  float: right;
  position: relative;
`;

function Header() {
  return (
    <div>
      <ConnectWalletWrapper>
        <Button>
          <H3 style={{ color: 'white', margin: '5px 2px' }}>connect wallet</H3>
        </Button>
      </ConnectWalletWrapper>
      <A href="/">
        <H3>b.e.p.r.o</H3>
      </A>
      <TitleWrapper>
        <H1>belle et puissante, la raisonnablement obligée</H1>
      </TitleWrapper>
    </div>
  );
}

export default Header;
