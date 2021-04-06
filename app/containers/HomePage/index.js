/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import InformationBanner from 'components/InformationBanner';
import ArtList from 'components/ArtList';

export function HomePage({}) {
  return (
    <div>
      {<InformationBanner/>}
      <ArtList />
    </div>
  );
}


export default HomePage
