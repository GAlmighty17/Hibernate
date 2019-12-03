import React, { Component } from 'react';
import {
	DialogActions,
	DialogContent,
	DialogContentText,
	TextField,
	Button
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

class GetMessagesIDDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
            messageId: '',
            error: false
		};
    }
    
    handleGet = getMessagesById => {
		this.state.messageId === ''
			? this.setState({ error: true })
			: this.setState({ error: false }, getMessagesById(this.state.messageId));
	};

	render() {
		const { toggelopenGetId, getMessagesById, classes } = this.props;
		return (
			<React.Fragment>
				<DialogContent style={{ backgroundColor: '#3b3b3b' }}>
					<DialogContentText className={classes.typography }>Enter Message ID:</DialogContentText>
					<CssTextField
                        autoFocus
                        error={this.state.error}
						margin="dense"
						value={this.state.messageId}
						id="messageId"
						inputProps={{ style: { color: '#f3e5f5' } }}
						InputLabelProps={{
							className: classes.floatingLabelFocusStyle
						}}
						onChange={event =>
							this.setState({ messageId: event.target.value })
						}
						label="Message ID"
						type="number"
						fullWidth
					/>
				</DialogContent>
				<DialogActions style={{ backgroundColor: '#313131' }}>
					<Button onClick={() => toggelopenGetId()} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() => {
							this.handleGet(getMessagesById);
						}}
						color="primary"
					>
						Get
					</Button>
				</DialogActions>
			</React.Fragment>
		);
	}
}
export default withStyles(styles)(GetMessagesIDDialog);
