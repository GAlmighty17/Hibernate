import React, { Component } from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';

export default class Error extends Component {
	render() {

        let {response, open, onClose} = this.props;

		return (
			<Snackbar
				open={open}
                autoHideDuration={2000}
                onClose={onClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
			>
				<SnackbarContent
					style={{ backgroundColor: 'red' }}
					aria-describedby="client-snackbar"
					message={<span>{response.statusText}</span>}
				/>
			</Snackbar>
		);
	}
}
