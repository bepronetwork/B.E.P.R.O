import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ArtContainer from '../ArtContainer';
import { connect } from 'react-redux'; 
import { getContract } from '../../env';

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

class ArtListCollection extends React.Component {

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
		let address = await global.app.getAddress();
		if(address){
			//owner of
			let ids = await (await getContract()).getRegisteredIDs({address});
			for(var i = 0; i < ids.length; i++){
				arr.push({
					id : ids[i],
					state : 'SOLD',
					loaded :false
				})
			}
		}else{
            //nothing
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
						{i.state == "SALE" || "SOLD"
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
	  	contract : state.contract,
        address : state.address
	};
};

ArtListCollection = connect(mapStateToProps)(ArtListCollection);

export default ArtListCollection;