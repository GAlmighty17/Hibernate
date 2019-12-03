import React, { Component } from 'react';
import {
	DialogContent,
	DialogActions,
	DialogContentText,
	TextField,
	withStyles,
	Button
} from '@material-ui/core';

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

class DeleteMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: '',
			error: false
		};
	}

	handleDelete = deleteById => {
		this.state.id === ''
			? this.setState({ error: true })
			: this.setState({ error: false }, deleteById(this.state.id));
	};

	render() {
		let { classes, toggelopenDeleteMessage, deleteById } = this.props;

		return (
			<React.Fragment>
				<DialogContent style={{ backgroundColor: '#3b3b3b' }}>
					<DialogContentText className={classes.typography}>
						Enter ID to be deleted:
					</DialogContentText>
					<CssTextField
						autoFocus
						error={this.state.error}
						margin="dense"
						value={this.state.id}
						id="messageId"
						inputProps={{ style: { color: '#f3e5f5' } }}
						InputLabelProps={{
							className: classes.floatingLabelFocusStyle
						}}
						onChange={event =>
							this.setState({ id: event.target.value })
						}
						label="Message ID"
						type="number"
						fullWidth
					/>
				</DialogContent>
				<DialogActions style={{ backgroundColor: '#313131' }}>
					<Button
						onClick={() => toggelopenDeleteMessage()}
						color="primary"
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							this.handleDelete(deleteById);
						}}
						color="primary"
					>
						Delete
					</Button>
				</DialogActions>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(DeleteMessage);
