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
@media only screen and (max-width: 600px) {
	padding : 0px !important;
}
`;

const ContainerWrapper = styled.div`
padding: 25px;
@media only screen and (max-width: 600px) {
	padding : 0px !important;
}
`;



class ArtList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			items : []
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
		let arr = [];
		//all
		let id = await props.contract.currentTokenId();
		for(var i = 1000; i < 1100; i++){
			console.log("i", i == id ? 'SALE' : i < id ? 'SOLD' : 'NOT_AVAILABLE');

			arr.push({
				id : i,
				state : i == id ? 'SALE' : i < id ? 'SOLD' : 'NOT_AVAILABLE',
				loaded :false
			})
		}
		this.setState({
			items : arr
		})
	}

	render = () => {
		return (
			<TitleWrapper>
				{this.state.items.map((i, index) =>
					<ContainerWrapper key={index}>
						{i.state != "NOT_AVAILABLE"
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