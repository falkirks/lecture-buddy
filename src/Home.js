import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
        <ul>
            <li><button><a href="#" onClick={e => this.props.onItemSelect('join')}>Join</a></button></li>
            <li><button><a href="#" onClick={e => this.props.onItemSelect('create')}>Create</a></button></li>
        </ul>);
    }
}

