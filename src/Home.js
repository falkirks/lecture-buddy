import React from 'react';

export default class Home extends React.Component {
    render() {
        return <ul>
            <li><a href="#" onClick={e => this.props.onItemSelect('join')}>Join</a> </li>
            <li><a href="#" onClick={e => this.props.onItemSelect('create')}>Create</a> </li>
                </ul>;
    }
}

