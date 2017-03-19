import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends React.Component {
    render() {
        return (
        <div>
            <RaisedButton primary={true}><a href="#" onClick={e => this.props.onItemSelect('join')}>Join</a></RaisedButton>
            <RaisedButton secondary={true}><a href="#" onClick={e => this.props.onItemSelect('create')}>Create</a></RaisedButton>
        </div>);
    }
}

