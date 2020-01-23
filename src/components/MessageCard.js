import React, { Component } from 'react';
import {
	Grid,
	Card,
	Typography,
	CardHeader,
	CardContent,
    withStyles
} from '@material-ui/core';

const style = {
    root:{
        margin:'64px 0 0 0',
        width: '100%',
        height:'100%'
    },
    card:{
        backgroundColor: '#7b1fa2',
        color: '#fff',
        opacity: '0.9'
    }
}

class MessageCard extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
        let {classes, messages} = this.props;
		return (
            <div className={classes.root}>
			<Grid container spacing={4} style={{textAlign: 'left'}}>
				{messages.map(message => (
					<Grid key={message.id} item xs={12} sm={6}>
						<Card key={message.id} className={classes.card}>
							<CardHeader
								title={`${message.author} wrote`}
                                action={message.id}
                                subheader={message.created}
							/>
							<CardContent>
								<Typography variant="h3">{message.message}</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
            </div>
		);
	}
}

export default withStyles(style)(MessageCard)