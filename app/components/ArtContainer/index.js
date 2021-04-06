import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Img from 'components/Img';
import H3 from 'components/H3';

import Text from 'components/Text';
import Card from 'components/Card';
import { connect } from 'react-redux'; 
import axios from 'axios';
import { numberWithCommas } from '../../utils/numbers';
import { BEPRO_PRICE } from '../../env';

const TitleWrapperSold = styled.div`
width: 350px;
height: 540px;
background: #ffffff;

@media only screen and (max-width: 600px) {
	width: 250px !important;
}
`;

const TitleWrapperSelling = styled.div`
width: 350px;
height: 540px;
background: #f5f5f5;

	@media only screen and (max-width: 600px) {
		width: 250px !important;
	}
`;

const TitleWrapperNotAvailable = styled.div`
width: 350px;
height: 540px;
background: white;

@media only screen and (max-width: 600px) {
	width: 250px !important;
}
`;

const ContentWrapperBasic = styled.div`
padding: 15px 25px;
`;

const ContentWrapperNotAvailable = styled.div`
padding: 25px 25px;
`;

const SOLDwrapper = styled.div`
	padding: 5px;
	background-color: #9e9e9e;
	position: relative;
	float: right;
	margin-top: 0;
`;

const Mintedwrapper = styled.div`
	padding: 5px;
	background-color: black;
	position: relative;
	float: right;
	margin-top: 0;
`;

const NOT_AVAILABLE_InfoWrapper = styled.div`
background-color: #white;
float : right;
text-align : right;
width : 150px;
position: relative;
padding: 25px 0px;
height : 100%;
`;


class ArtContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			item : props.item
		}
	}

	componentDidMount = async () => {
		let exists = await this.props.contract.exists({tokenID : this.state.item.id});
		let _url = await this.props.contract.baseURI();
		let itemData = await axios.get(_url+this.state.item.id);
		let price = 1000*1.09**(this.state.item.id-1000); 

		this.setState({
			item : {
				state : this.state.item.state,
				isLoaded : true,
				minted : exists,
				price,
				...itemData.data,
			}
		})
	}

	render = () => {
		const {item} = this.state;
		if(!item.isLoaded){
			return(
				<TitleWrapperSold>
					<Card item={item}/>
				</TitleWrapperSold>
			)
		
		}
		let Wrapper;
		let ContentWrapper;
		switch (item.state) {
			case 'SOLD': {
				Wrapper = TitleWrapperSold;
				ContentWrapper = ContentWrapperBasic;
				break;
			}
			case 'SALE': {
				Wrapper = TitleWrapperSelling;
				ContentWrapper = ContentWrapperBasic;
				break;
			}
			case 'NOT_AVAILABLE': {
				Wrapper = TitleWrapperNotAvailable;
				ContentWrapper = ContentWrapperNotAvailable;
				break;
			}
		}
		return (
			<Wrapper>
				<Card item={item}/>
				<ContentWrapper>
					{/*item.state == 'NOT_AVAILABLE' ? (
						<NOT_AVAILABLE_InfoWrapper>
							<Text
								data-tip="hello world"
								style={{ color: 'black', marginBottom: 0, marginTop: 0 }}
							>
								Available to Purchase after #{item.id - 1}
							</Text>
						</NOT_AVAILABLE_InfoWrapper>
					) : null*/}
					<H3>#{item.id}</H3>
						<H3 style={{ color: '#6B6B6B', marginBottom: 0 }}>
							{numberWithCommas(item.price)} $BEPRO
						</H3>
					
					{item.state == 'SOLD' ? (
						<div>
							{item.minted ? 
								<Mintedwrapper>
									<H3 style={{ color: 'white', marginBottom: 0, marginTop: 0 }}>
										Minted
									</H3>
								</Mintedwrapper>
							: null}
							<SOLDwrapper>
								<H3 style={{ color: 'white', marginBottom: 0, marginTop: 0 }}>
									SOLD
								</H3>
							</SOLDwrapper>
						</div>
					
					) : null}
					{
						<div>
							<H3 style={{ color: '#6B6B6B', marginBottom: 10, marginTop: 0 }}>
								(~${numberWithCommas(item.price*BEPRO_PRICE)})
							</H3>
							<Text style={{color: '#B8B8B8', marginTop: 0 }}>List Price</Text>
						</div>
					}
				</ContentWrapper>
			
			</Wrapper>
		);
	}

}

const mapStateToProps = state => {
	return {
	  	contract : state.contract
	};
};

ArtContainer = connect(mapStateToProps)(ArtContainer);

export default ArtContainer;