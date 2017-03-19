import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
export default class Join extends React.Component {
    render() {
        return(
            <div>
                <TextField hintText=" Key Code"/>
                <RaisedButton label='Submit'/>
            </div>
        )
    };
}

