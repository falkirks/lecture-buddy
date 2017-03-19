import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Click from './Click';

export default class Join extends React.Component {
    render() {
        if(this.state.name != '' && this.state.key != '' && this.state.buttons.length > 0) {
            return (
                <div className="container">
                    <b>WE JOINED AND ITS {this.state.name}</b>

                    <br/>
                    <div>
                        <ul className="list-group">
                            {this.state.buttons.map((btn) => (
                                <li> < Click name={btn} /> </li>
                            ))}
                        </ul>
                    </div>


                </div>
            );
        }
        else{
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Key:
                        <input type="text" value={this.state.key} onChange={this.handleChange}/>
                    </label>
                    <RaisedButton label="Join" type="submit" value="Join lecture"/>
                </form>
            );
        }
    }
}
