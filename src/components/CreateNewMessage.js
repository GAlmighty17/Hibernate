import React, { Component } from 'react';
import {
	DialogContent,
	DialogActions,
	DialogContentText,
	TextField,
	Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	floatingLabelFocusStyle: {
		color: '#ba68c8'
	},
	typography: { color: '#fff' }
};

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#ba68c8'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#6a1b9a'
		}
	}
})(TextField);

class CreateNewMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// id: '',
			message: '',
			author: '',
			error: false
		};
	}

	change = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (event, setMessage) => {
		event.preventDefault();
		// this.state.id === '' &&
		this.state.message === '' && this.state.author === ''
			? this.setState({ error: true })
			: this.setState({ error: false });

		!this.state.error && setMessage(JSON.stringify(this.state));
	};

	render() {
        
		let { toggelopenCreateMessage, setMessage, classes } = this.props;

		return (
			<React.Fragment>
				<form onSubmit={event => this.handleSubmit(event, setMessage)}>
					<DialogContent style={{ backgroundColor: '#3b3b3b' }}>
						<DialogContentText className={classes.typography}>
							Create New Message
						</DialogContentText>
						<DialogContentText
							color="error"
							hidden={!this.state.error}
						>
							All fields are mendatory
						</DialogContentText>
						{/* <CssTextField
							autoFocus
							error={this.state.error}
							margin="dense"
							value={this.state.id}
							name="id"
							inputProps={{ style: { color: '#f3e5f5' } }}
							InputLabelProps={{
								className: classes.floatingLabelFocusStyle
							}}
							onChange={event => this.change(event)}
							label="Message ID"
							type="number"
						/> */}
						<CssTextField
                            autoFocus
							name="message"
							error={this.state.error}
							value={this.state.message}
							inputProps={{ style: { color: '#f3e5f5' } }}
							onChange={event => this.change(event)}
							InputLabelProps={{
								className: classes.floatingLabelFocusStyle
							}}
							label="Message"
							fullWidth
						/>
						<CssTextField
							name="author"
							error={this.state.error}
							inputProps={{ style: { color: '#f3e5f5' } }}
							value={this.state.author}
							InputLabelProps={{
								className: classes.floatingLabelFocusStyle
							}}
							onChange={event => this.change(event)}
							label="Author"
							fullWidth
						/>
					</DialogContent>
					<DialogActions style={{ backgroundColor: '#313131' }}>
						<Button
							onClick={() => toggelopenCreateMessage()}
							color="primary"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							color="primary"
							onClick={() =>
								!this.state.error && toggelopenCreateMessage()
							}
						>
							Send
						</Button>
					</DialogActions>
				</form>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(CreateNewMessage);
