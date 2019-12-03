import React, { Component } from 'react';
import './App.css';
import { Button, Divider, Grid, Dialog } from '@material-ui/core';
import axios from 'axios';
import MessageCard from './components/MessageCard';
import GetMessagesIDDialog from './components/GetMessagesIDDialog';
import Error from './components/Error';
import { withStyles } from '@material-ui/styles';
import CreateNewMessage from './components/CreateNewMessage';
import DeleteMessage from './components/DeleteMessage';

const style = theme => ({
	button: {
		color: '#ffff',
		backgroundColor: '#7b1fa2',
		'&:hover': {
			backgroundColor: '#6a1b9a'
		}
	},
	buttonGrid: {
		padding: '8px'
	},
	dialog: {
		color: '#ef5350'
	}
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			openGetId: false,
			openSnackbar: false,
			openError: false,
			openCreateMessage: false,
			openDeleteMessage: false,
			response: {}
		};
	}

	getMessages() {
		axios
			.get('http://localhost:8080/RestAPI/webapi/messages')
			.then(response => this.setState({ messages: response.data }));
	}

	getMessagesById = id => {
		this.toggelopenGetId();
		axios
			.get(`http://localhost:8080/RestAPI/webapi/messages/${id}`)
			.then(response =>
				response.status === 200
					? this.setState({
							messages: Object.values({ '': response.data })
					  })
					: this.setState({ openError: true, response: response })
			);
	};

	setMessage = message => {
		axios
			.post(`http://localhost:8080/RestAPI/webapi/messages/`, message, {
				headers: { 'Content-Type': 'application/json' }
			})
			.then(response =>
				this.setState({ openError: true, response: response })
			);
		this.getMessages();
	};

	deleteById = id => {
		this.toggelopenDeleteMessage();
		axios
			.delete(`http://localhost:8080/RestAPI/webapi/messages/${id}`)
			.then(response =>
				this.setState({ openError: true, response: response })
			);
		this.getMessages();
	};

	toggelopenGetId = () => {
		this.setState({ openGetId: !this.state.openGetId });
	};

	toggelopenError = () => {
		this.setState({ openError: !this.state.openError });
	};

	toggelopenCreateMessage = () => {
		this.setState({ openCreateMessage: !this.state.openCreateMessage });
	};

	toggelopenDeleteMessage = () => {
		this.setState({ openDeleteMessage: !this.state.openDeleteMessage });
	};

	render() {
		let { classes } = this.props;

		return (
			<div className="App">
				<Grid container className={classes.buttonGrid}>
					<Grid item xs={3}>
						<Button
							variant="contained"
							className={classes.button}
							onClick={() => this.getMessages()}
						>
							Get All message
						</Button>
					</Grid>
					<Grid item xs={3}>
						<Button
							variant="contained"
							className={classes.button}
							onClick={() => this.toggelopenGetId()}
						>
							Get Message by id
						</Button>
					</Grid>
					<Grid item xs={3}>
						<Button
							variant="contained"
							className={classes.button}
							onClick={() => this.toggelopenCreateMessage()}
						>
							Create new message
						</Button>
					</Grid>
					<Grid item xs={3}>
						<Button
							variant="contained"
							className={classes.button}
							onClick={() => this.toggelopenDeleteMessage()}
						>
							Delete a message
						</Button>
					</Grid>
				</Grid>
				<Divider style={{ backgroundColor: '#ba68c8' }} />
				<MessageCard messages={this.state.messages} />
				<Dialog
					open={this.state.openGetId}
					onClose={this.toggelopenGetId}
				>
					<GetMessagesIDDialog
						getMessagesById={this.getMessagesById}
						toggelopenGetId={this.toggelopenGetId}
					/>
				</Dialog>
				<Dialog
					open={this.state.openCreateMessage}
					onClose={this.toggelopenCreateMessage}
				>
					<CreateNewMessage
						toggelopenCreateMessage={this.toggelopenCreateMessage}
						setMessage={this.setMessage}
					/>
				</Dialog>
				<Dialog
					open={this.state.openDeleteMessage}
					onClose={this.toggelopenDeleteMessage}
				>
					<DeleteMessage
						toggelopenDeleteMessage={this.toggelopenDeleteMessage}
						deleteById={this.deleteById}
					/>
				</Dialog>
				<Error
					open={this.state.openError}
					onClose={this.toggelopenError}
					response={this.state.response}
				/>
			</div>
		);
	}
}

export default withStyles(style, { withTheme: true })(App);
