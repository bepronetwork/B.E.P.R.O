import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ArtContainer from '../ArtContainer';
import { connect } from 'react-redux'; 

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
		description: "Amazing",
		id: 1000,
		url: "https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/1074.png",
		price: 100000,
		state: 'SOLD'
	},
	{
		description: "Amazing",
		id: 1001,
		url: "https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/1014.png",
		price: 100000,
		state: 'SELLING'
	},
	{
		description: "Amazing",
		id: 1001,
		url: "https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/1024.png",
		price: 100000,
		state: 'NOT_AVAILABLE'
	},
	{
		description: "Amazing",
		id: 1001,
		url: "https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/1023.png",
		price: 100000,
		state: 'NOT_AVAILABLE'
	}
];

class ArtList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			items : []
		}
	}

	componentDidUpdate = async (props) => {
		let id = await props.contract.currentTokenId();
		console.log("here", props.contract)
		this.setState({
			items : new Array(id-1000).map( (a, index) => {return{id : index+1000, loaded : false}})
		})
	}

	render = () => {
		console.log("hit", this.state.items)
		return (
			<TitleWrapper>
				{this.state.items.map((i, index) =>
					<ContainerWrapper key={index}>
						{i.state == "SELLING"
							? (
								<Link to={`/art?id=${i.id}`}>
									<ArtContainer key={index} item={i} />
								</Link>
							) : (
								<ArtContainer key={index} item={i} />
							)}
					</ContainerWrapper>
				)}
			</TitleWrapper>
		);
	}
	
}


const mapStateToProps = state => {
	return {
	  	contract : state.contract
	};
};

ArtList = connect(mapStateToProps)(ArtList);

export default ArtList;