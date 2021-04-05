/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import { Provider, connect } from 'react-redux'; 
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Application } from 'bepro-js';
import GlobalStyle from '../../global-styles';
import { store } from '../../app';
import { addContractInfo } from '../../redux/reducer';


let app = new Application({ mainnet: false });
app.start();

let contract = app.getERC721Collectibles({ contractAddress: "0x8e60e8ddbec0279b4e2cc5d60054edf297dbca97" });

const AppWrapper = styled.div`
	margin: 0 auto;
	display: flex;
	min-height: 100%;
	background-color: white;
	padding: 20px 10%;
	flex-direction: column;
`;


class App extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount = async () => {
		await contract.__assert();
		store.dispatch(addContractInfo(contract))
	}

	render = () => {
		return (
				<AppWrapper>
					<Helmet
						titleTemplate="Art | b.e.p.r.o"
						defaultTitle="belle et puissante, l'a raisonnablement obligée"
					>
						<meta
							name="description"
							content="belle et  puissante, l'a raisonnablement obligée"
						/>
					</Helmet>
					<Header />
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/art" component={FeaturePage} />
						<Route path="" component={NotFoundPage} />
					</Switch>
					<Footer />
					<GlobalStyle />
				</AppWrapper>
		);
	}

}

const mapStateToProps = state => {
	return {
	  	contract : state.contract
	};
};


App = connect(mapStateToProps)(App);

export default App;