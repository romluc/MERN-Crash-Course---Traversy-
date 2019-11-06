import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<div className='App'>
			<Provider store={store}>
				<AppNavbar />
				<Container>
					<ItemModal />
					<ShoppingList />
				</Container>
			</Provider>
		</div>
	);
}

export default App;
