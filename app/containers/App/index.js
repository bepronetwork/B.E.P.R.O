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
import { addContractInfo, store } from '../../redux/reducer';
import CollectionsPage from '../CollectionsPage';
import { CONTRACT_ADDRESS, ENV } from '../../env';

console.log("ENV", ENV, CONTRACT_ADDRESS);
let app = new Application({ mainnet: ENV == 'DEV' ? false : true });
app.start();
global.app = app;
let contract = app.getERC721Collectibles({ contractAddress: CONTRACT_ADDRESS });

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
					defaultTitle="Art | belle et puissante, l'a raisonnablement obligée"
				>
					<meta
						name="description"
						content="Art | belle et  puissante, l'a raisonnablement obligée"
					/>
				</Helmet>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/art" component={FeaturePage} />
					<Route path="/collection" component={CollectionsPage} />
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