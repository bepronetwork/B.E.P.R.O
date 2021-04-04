/*
* FeaturePage
*
* List all the features
*/
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Card from 'components/Card';
import H3 from 'components/H3';
import H2 from 'components/H2';
import H1 from 'components/H1';
import Text from 'components/Text';
import styled from 'styled-components';
import Button from 'components/Button';
import Divider from 'components/Divider';
import { numberWithCommas } from '../../utils/numbers';

const item = 
    {
        description : "Amazing",
        id : 1000,
        url : "https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/1074.png",
        price : 100000,
        state : 'SOLD'
    }

const TitleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
	margin-top : 150px;
`;

const ContainerWrapper = styled.div`
    flex-basis: 30%;
	margin : auto;
`;


export default function FeaturePage() {
	return (
		<TitleWrapper>
			<ContainerWrapper>
				<H1>#{item.id}</H1>
				<H3>Edition {item.id-999} of 100</H3>
				<div style={{width : 250}}>
					<Divider/>
				</div>
				<Text style={{color : "#6B6B6B"}}>description</Text>
				<H3>{item.description}</H3>
			</ContainerWrapper>
			<ContainerWrapper>
				<Card item={item}/>
			</ContainerWrapper>
			<ContainerWrapper>
				<Text style={{color : "#6B6B6B"}}>List Price</Text>
				{item.state == 'NOT_AVAILABLE' ? null : <H2 style={{color : "#6B6B6B", marginBottom : 0}}>{numberWithCommas(item.price)} $BEPRO</H2>}
				<H3 style={{color : "#6B6B6B", marginBottom : 10, marginTop : 0}}>(~$2,345)</H3>
				<div style={{marginBottom : 15}}>	
					<Button style={{backgroundColor : 'white', border : '1px solid black'}}>
						<H3 style={{margin : 5, color : 'black'}}>1) Approve</H3>
					</Button>
				</div>
				<Button>
					<H3 style={{margin : 5, color : 'white'}}>2) Buy</H3>
				</Button>
			</ContainerWrapper>
		</TitleWrapper>
	);
}
