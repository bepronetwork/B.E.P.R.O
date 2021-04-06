import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import A from './A';
import H3 from '../H3';
import Button from '../Button';
import H1 from '../H1';
import { connect } from 'react-redux'; 
import { Link }from 'react-router-dom';
import { addContractInfo, log, store } from '../../redux/reducer';

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

const AddressWrapper  = styled.div`
float: right;
position: relative;

@media only screen and (max-width: 600px) {
	float : left !important;
}
`;
 
class Header extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			address : null
		}
	}

	componentDidMount = async () => {
		this._update(this.props);	
	}

	componentWillReceiveProps = async (props) => {
		this._update(props);	
	}

	_update = async (props) => {
		if(!global.app){return}
		try{
			let address = await global.app.getAddress();
			if(address){
				this.setState({
					address
				})
			}
		}catch(err){
			alert("no metamask")
		}
		
	}

	connectToMetamask = async () => {
		try{
			await global.app.login();
			this._update();
			store.dispatch(log(await global.app.getAddress()));
		}catch(err){
			console.log("err", err)
		}
	}

	render = () => {
		const { address } = this.state;
		return (
			<div>
				<ConnectWalletWrapper>
					{!address
					?
					<Button 
						handleRoute={() => this.connectToMetamask()}>
						<H3 style={{ color: 'white', margin: '5px 2px' }}>connect wallet</H3>
					</Button>
					:
					<div>
						<Link to={'/collection'}>
							<Button 
								style={{ backgroundColor: 'white', border: '1px solid black' }}
								handleRoute={() => this.connectToMetamask()}>
								<H3 style={{ color: 'black', margin: '5px 2px' }}>My Collection</H3>
							</Button>
							<AddressWrapper>
								<H3 style={{ olor: 'black', margin: '10px 10px' }}>{`${String(address).substring(0, 8)}...${String(address).substr(address.length-5)}`}</H3>
							</AddressWrapper>
						</Link>
						</div>
					
					}
					
				</ConnectWalletWrapper>
				<Link to="/">
					<H3>b.e.p.r.o</H3>
				</Link>
				<TitleWrapper>
					<H1>belle et puissante, la raisonnablement obligée</H1>
				</TitleWrapper>
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
	  	contract : state.contract
	}
};

Header = connect(mapStateToProps)(Header);

export default Header;