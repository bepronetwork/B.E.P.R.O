/*
* FeaturePage
*
* List all the features
*/
import React from 'react';
import Card from 'components/Card';
import H3 from 'components/H3';
import H2 from 'components/H2';
import H1 from 'components/H1';
import Text from 'components/Text';
import styled from 'styled-components';
import Button from 'components/Button';
import Divider from 'components/Divider';
import { connect } from 'react-redux'; 
import { numberWithCommas } from '../../utils/numbers';
import axios from 'axios';
import queryString from 'query-string';
import { BEPRO_PRICE, getContract } from '../../env';

const item = {
	description: 'Amazing',
	id: 1000,
	url:
		'https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/1074.png',
	price: 100000,
	state: 'SOLD',
};

const TitleWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	margin-top: 150px;

	@media only screen and (max-width: 600px) {
		margin-top : 0px !important;
	}
`;

const ContainerWrapper = styled.div`
	flex-basis: 30%;
	margin: auto;

	@media only screen and (max-width: 600px) {
		flex-basis: 100%;
		margin: auto;
	}
`;

const BoughtWrapper =styled.div`
	border : 1px solid black;
	padding : 10px 10px;
	width : fit-content;
`;

class FeaturePage extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			item : {
				isApproved : true,
				isLoaded : false,
				isLoadingApprove : false,
				isLoadingBuy : false,
				isLoadingMint : false,
				notExist : false,
				isMine : false,
				isPurchased : false,
				price : 0
			}
		}
	}

	componentDidMount = async () => {
		this._update(this.props);	
	}

	componentWillReceiveProps = async (props) => {
		this._update(props);	
	}

	_update = async (props) => {
		if(!props.contract){return}
		const id = queryString.parse(location.search).id;
		if(id < 1000 || id > 1099){return}
		let exists = await props.contract.exists({tokenID : id});
		let _url = await props.contract.baseURI();
		let itemData = await axios.get(_url+id);
		let price = 1000*1.09**(id-1000); 
		let isApproved = false;
		let isLogged = false;
		let isMine = false;
		let isPurchased = await props.contract.currentTokenId() > id;
		try{
			isLogged = await global.app.getAddress();
		}catch(err){/*err*/}

		if(isLogged){
			let ids = await (await getContract()).getRegisteredIDs({address : isLogged});
			for(var i = 0; i < ids.length; i++){
				if(ids[i] == item.id){
					isMine = true;
				}
			};
			
			isApproved = await (await getContract()).isApproved({address : isLogged, amount : price})
		}
		
		this.setState({
			isLogged,
			isApproved,
			isPurchased,
			isMine,
			item : {
				state : this.state.item.state,
				isLoaded : true,
				minted : exists,
				price,
				...itemData.data,
			}
		})
	}

	_approve = async () => {
		let contract = await getContract();
		this.setState({isLoadingApprove : true});
		await contract.approveERC20();
		await this._update(this.props);
		this.setState({isLoadingApprove : false});
	}

	_buy = async  () => {
		let contract = await getContract();
		this.setState({isLoadingBuy : true});
		await contract.openPack({
			amount : 1
		});
		await this._update(this.props);
		this.setState({isLoadingBuy : false});

	}

	_mint = async () => {
		let contract = await getContract();
		this.setState({isLoadingMint : true});
		await contract.mint({
			tokenID : this.state.item.id
		});
		await this._update(this.props);
		this.setState({isLoadingMint : false});
	}


	render = () => {
		const {item, isLogged, isApproved, isLoadingApprove, isLoadingMint, isLoadingBuy, isPurchased, isMine} = this.state;
		console.log("p", isPurchased, isMine, !item.minted, (isPurchased && isMine && !item.minted), isApproved )
		return (
			<TitleWrapper>
				<ContainerWrapper>
					<H1>#{item.id}</H1>
					<H3>Edition {item.id - 999} of 100</H3>
					<div style={{ width: 250 }}>
						<Divider />
					</div>
					<Text style={{ color: '#6B6B6B' }}>description</Text>
					<H3>{item.description}</H3>
				</ContainerWrapper>
				<ContainerWrapper>
					<Card item={item} />
				</ContainerWrapper>
				<ContainerWrapper>
					<Text style={{ color: '#6B6B6B' }}>List Price</Text>
					{item.state === 'NOT_AVAILABLE' ? null : (
						<H2 style={{ color: '#6B6B6B', marginBottom: 0 }}>
							{numberWithCommas(item.price)} $BEPRO
						</H2>
					)}
					<H3 style={{ color: '#6B6B6B', marginBottom: 10, marginTop: 0 }}>
						(~${numberWithCommas(item.price*BEPRO_PRICE)})
					</H3>
				
					{isPurchased ?
						<BoughtWrapper>
							<H3 style={{ margin: 5, color: 'black' }}>{`Purchased`}</H3>
						</BoughtWrapper>
					: isLogged ? 
						<div>
							<div>
								{!isApproved ? 
									<div style={{ marginBottom: 15 }}>
										<Button
											disabled={isLoadingApprove}
											handleRoute={() => this._approve()}
											style={{ backgroundColor: 'white', border: '1px solid black' }}
										>
											<H3 style={{ margin: 5, color: 'black' }}>{isLoadingApprove ? 'Loading...' : 'Approve' }</H3>
										</Button>
									</div>
								: null}
							</div>
							<Button
								disabled={isLoadingApprove || isLoadingBuy}
								handleRoute={() => this._buy()}
								>
								<H3 style={{ margin: 5, color: 'white' }}>{isLoadingBuy ? 'Loading...' : 'Buy' }</H3>
							</Button>
						</div>
					
					: 
						<H3 style={{ margin: 5, color: 'black' }}>Connect Wallet To Access the  Sale</H3>
					}
					{(isLogged && isPurchased && isMine && !item.minted) ? 
						<div style={{marginTop : 10}}>
							<Button
								disabled={isLoadingMint}
								handleRoute={() => this._mint()}
								>
								<H3 style={{ margin: 5, color: 'white' }}>{isLoadingMint ? 'Loading...' : 'Mint NFT' }</H3>
							</Button>
							<div style={{marginTop : 10}}>
								<Text style={{ margin: 5, color: '#6B6B6B' }}><strong>Note : </strong> Buying the NFT only soft mints it, to be able to transport to marketplaces like opensea you have to mint it in "Mint NFT"</Text>
							</div>
						</div>
					: null}
				</ContainerWrapper>
			</TitleWrapper>
		);
	}

}

const mapStateToProps = state => {
	return {
	  	contract : state.contract,
		address : state.address
	};
};

FeaturePage = connect(mapStateToProps)(FeaturePage);

export default FeaturePage;