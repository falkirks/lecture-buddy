import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import './Snack.css'

export default class Snack extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <RaisedButton
                    onTouchTap={this.handleTouchTap}
                    label="Add to my calendar"
                    primary={true}
                />
                <Snackbar
                    open={this.state.open}
                    message=""
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}
