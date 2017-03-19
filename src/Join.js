import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Click from './Click';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import BadWords from './Badwords';

export default class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            key: '',
            question: '',
            buttons: [],
            open : false
        };



        this.handleChange = this.handleChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.sendQuestion = this.sendQuestion.bind(this);

        this.buttonsSet = this.buttonsSet.bind(this);
        this.receiveName = this.receiveName.bind(this);
        this.collapse = this.collapse.bind(this);

        window.socket.on('set-buttons', this.buttonsSet);
        window.socket.on('set-name', this.receiveName);
        window.socket.on('collapse', this.collapse);

        console.log(BadWords);

    }

    receiveName(data){
        if(data.name != null) {
            this.setState({name: data.name});
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    buttonsSet(data){
        if(data.buttons != null) {
            this.setState({
                buttons: data.buttons
            });
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    sendQuestion(event){
        event.preventDefault();
        if(this.state.question != ''){
            var lower = this.state.question.toLowerCase();
            for(var i = 0; i < BadWords.length; i++){
                if(lower.includes(BadWords[i])){
                    this.props.onItemSelect('wall');
                    return;
                }
            }

            window.socket.emit('question', {text: this.state.question});
            this.setState({question: ''});
        }
    }

    collapse(data){
        this.handleTouchTap();
        /*alert("That wasn't valid.");*/
        this.setState({
            key: ""
        });
    }

    handleChange(event) {
        this.setState({key: event.target.value});
    }

    handleQuestionChange(event) {
        this.setState({question: event.target.value});
    }

    handleSubmit(event) {
        // alert('A key was submitted: ' + this.state.key);
        window.socket.emit('join', {
            key: this.state.key
        });
        event.preventDefault();
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
        const style ={
            color: 'white',
        };
        const style2 ={
            display: 'flex',
            'flex-direction': 'column',
            width: '100%'
        };


        if(this.state.name != '' && this.state.key != '' && this.state.buttons.length > 0) {
            return (
                <div>
                    <header2>Lecture Buddy</header2>
                    <div className="join-state">
                        <h1>{this.state.name}</h1>
                        <br/>
                        <div style={style2}>
                            {this.state.buttons.map((btn) => (
                                < Click name={btn} />
                            ))}
                        </div>
                        <br/>
                        <form onSubmit={this.sendQuestion}>
                            <label>
                                <TextField hintText="enter your question here" value={this.state.question} onChange={this.handleQuestionChange}/>
                            </label>
                            <RaisedButton label="Send" type="submit" value=""/>
                        </form>
                    </div>
                </div>
            );
        }
        else{
            return (
            <div>
                <header2 onClick={e => this.props.onItemSelect('home')}>Lecture Buddy</header2>
                <div className="join-state">
                    <Snackbar
                        open={this.state.open}
                        message="Lecture session does not exist"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <TextField style={{margin:5,height:50,fontSize:30,lineHeight:1}} hintText="Lecture Key" value={this.state.key} onChange={this.handleChange}/>
                    </label>
                    <RaisedButton style={{margin:5,height:50,fontWeight:700}} primary={true} label="Join" type="submit" value="Join lecture"/>
                </form>
                </div>
            </div>
            );
        }
    }
}
