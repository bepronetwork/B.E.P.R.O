/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import ArtListCollection from 'components/ArtListCollection';
import H3 from 'components/H3';
class CollectionsPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            address : ''
        };
    }

    componentDidMount = async () => {
        let address = await global.app.getAddress()
        this.setState({address})
    }

    render = () => {
        const { address } = this.state;
        return (
            <div>
                <H3>My Collection</H3>
              <ArtListCollection address={address}/>
            </div>
        );
    }

}


export default CollectionsPage
