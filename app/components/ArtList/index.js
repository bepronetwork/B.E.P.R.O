import React from 'react';
import styled from 'styled-components';
import ArtContainer from '../ArtContainer';
import { Link } from 'react-router-dom';

const TitleWrapper = styled.div`
    padding: 50px 5%;
    width: 100%;
    height: 274px;
    display: flex;
    flex-wrap: wrap;
`;

const ContainerWrapper = styled.div`
    padding: 25px;
`;


const items = [
    {
        description : "Amazing",
        id : 1000,
        url : "https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/1074.png",
        price : 100000,
        state : 'SOLD'
    },
    {
        description : "Amazing",
        id : 1001,
        url : "https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/1014.png",
        price : 100000,
        state : 'SELLING'
    },
    {
        description : "Amazing",
        id : 1001,
        url : "https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/1024.png",
        price : 100000,
        state : 'NOT_AVAILABLE'
    },
    {
        description : "Amazing",
        id : 1001,
        url : "https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/1023.png",
        price : 100000,
        state : 'NOT_AVAILABLE'
    }
]

function ArtList() {
    return (
        <TitleWrapper>
            {items.map( (i, index) => 
                <ContainerWrapper key={index}>
                    {i.state == "SELLING"
                    ? 
                    <Link to={`/art?id=${i.id}`}>
                        <ArtContainer key={index} item={i}/>
                    </Link>
                
                    :
                    <ArtContainer key={index} item={i}/>
                }
                  
                </ContainerWrapper>
            )}
        </TitleWrapper>
    );
}

export default ArtList;
