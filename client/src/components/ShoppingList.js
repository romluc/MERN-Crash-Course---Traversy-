import React, { Component } from 'react';
import {
	Container,
	ListGroup,
	ListGroupItem,
	Button,
	Spinner
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, setItemsLoading } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
	componentDidMount() {
		// this.props.setItemsLoading();
		this.props.getItems();
	}

	onDeleteClick = id => {
		this.props.deleteItem(id);
	};

	render() {
		const { items } = this.props.item;
		const { loading } = this.props.item;
		return (
			<Container className='listgroup-container'>
				{loading ? (
					<Spinner color='secondary' />
				) : (
					<ListGroup>
						<TransitionGroup className='shopping-list'>
							{items.map(({ _id, name }) => (
								<CSSTransition key={_id} timeout={500} classNames='fade'>
									<ListGroupItem>
										<Button
											className='remove-btn'
											color='danger'
											size='sm'
											onClick={this.onDeleteClick.bind(this, _id)}
										>
											&times;
										</Button>
										{name}
									</ListGroupItem>
								</CSSTransition>
							))}
						</TransitionGroup>
					</ListGroup>
				)}
			</Container>
		);
	}
}

ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	setItemsLoading: PropTypes.func,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	loading: state.loading
});

export default connect(
	mapStateToProps,
	{ getItems, deleteItem, setItemsLoading }
)(ShoppingList);
