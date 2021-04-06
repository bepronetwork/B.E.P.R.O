import React from 'react';
import styled from 'styled-components';

import H3 from '../H3';
import { connect } from 'react-redux'; 
import { numberWithCommas } from '../../utils/numbers';

const TitleWrapper = styled.div`
padding: 50px 5%;
margin: 72px 0px;
width: 100%;
height: auto;
background: #f5f5f5;
`;

class InformationBanner extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			currentID : 0,
			currentPrice : 0,
			highestPrice : 0,
			total : 0
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
		let currentID = await props.contract.currentTokenId();
		let total = 100;
		let currentPrice = await props.contract.getPricePerPack();
		let highestPrice = currentPrice*1.09**(currentID-1000);
		console.log(currentPrice, "currentPrice")
		this.setState({
			currentID,
			currentPrice,
			highestPrice,
			total
		})
	}

	render = () => {
		const { total, currentID, currentPrice, highestPrice} = this.state;
		return (
			<TitleWrapper>
				<H3>
					Explore the collection of <strong style={{color : '#808080', margin : 0}}>{total}</strong> limited prestigious, unique timepieces as
					the first BEPRO collection of A.I. generated art.
				</H3>
				<H3>
					After each piece is acquired the price for the next one goes up <strong style={{color : '#808080', margin : 0}}>{numberWithCommas(1.09)}%</strong>
				</H3>
				<H3>
					Current Price of the piece #{currentID} sits at <strong style={{color : '#808080', margin : 0}}>{numberWithCommas(currentPrice)} BEPRO</strong>
				</H3>
			</TitleWrapper>
		);
	}
	
}


const mapStateToProps = state => {
	return {
	  	contract : state.contract
	};
};

InformationBanner = connect(mapStateToProps)(InformationBanner);

export default InformationBanner;
