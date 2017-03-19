/**
 * Created by godotbian on 2017-03-18.
 */
import React from 'react';

export default class Click extends React.Component {
    render() {
        return <button type="button" className="btn btn-primary">{this.props.name}</button>;
    }
}


