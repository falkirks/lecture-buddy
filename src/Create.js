import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import Snackbar from 'material-ui/Snackbar';

import FlatButton from 'material-ui/FlatButton';


import AddBox from 'material-ui/svg-icons/content/add-box';

export default class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            key: '',
            buttons: [],
            clicks: {},
            clickLog: [],
            questions: [""],
            students: 0,
            newQuestion : null,
            open : false,
            openSnackBar : false
        };
        this.DISPLAY_DIST = 15*1000;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.handleNewQuestion = this.handleNewQuestion.bind(this);

        this.keySubmit = this.keySubmit.bind(this);
        this.buttonPressed = this.buttonPressed.bind(this);
        this.questionGot = this.questionGot.bind(this);
        this.buttonsSet = this.buttonsSet.bind(this);
        this.changeStudent = this.changeStudent.bind(this);


        window.socket.on('set-key', this.keySubmit);
        window.socket.on('set-buttons', this.buttonsSet);
        window.socket.on('button', this.buttonPressed);
        window.socket.on('question', this.questionGot);
        window.socket.on('student', this.changeStudent);

    }

    keySubmit(data){
        if(data.key != null) {
            this.setState({key: data.key});
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    removeQuestion(name){
        var index = this.state.buttons.indexOf(name);
        if (index > -1) {
            if(this.state.buttons.length == 1){
                //alert("Can't remove last question.");
                return;
            }

            var buttons = this.state.buttons;
            buttons.splice(index, 1);
            this.setState({
                buttons: buttons
            });
            window.socket.emit('set-buttons', {buttons: buttons});
        }
        console.log(name);
    }

    addQuestion(name) {
        var buttons = this.state.buttons;
        buttons.push(name);
        this.setState({
            buttons: buttons,
            newQuestion: ""
        });
        window.socket.emit('set-buttons', {buttons: buttons});
        console.log(name);
    }

    buttonPressed(data){
        if(data.name != null) {
            var clicks = this.state.clicks;
            if(clicks[data.name] == null){
                clicks[data.name] = 0;
            }
            clicks[data.name]++;

            var clickLog = this.state.clickLog;
            clickLog.push({
                name: data.name,
                time: Date.now()
            });

            this.setState({
                clicks: clicks,
                clickLog: clickLog
            });

            setTimeout((function () {
                this.setState({});
            }).bind(this), this.DISPLAY_DIST + 5);
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    questionGot(data){
        if(data.text != null) {
            var questions = this.state.questions;
            questions.push({
                text: data.text,
                time: Date.now()
            });
            this.setState({
                questions: questions
            });
            this.handleRequestOpen();
            // alert(data.text);
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

    changeStudent(data){
        if(data.action == 'remove'){
            this.setState({
                students: this.state.students-1
            });
        }
        else{
            this.setState({
                students: this.state.students+1
            });
        }
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleNewQuestion(event) {
        this.setState({newQuestion: event.target.value});
    }



    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.name);
        window.socket.emit('create', {
            name: this.state.name
        });
        event.preventDefault();
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleRequestClose = () => {
        this.setState({openSnackBar: false})
    }
    handleRequestOpen = () => {
        this.setState({openSnackBar: true})
    }

    render() {
        const actions = [
            <FlatButton
                className='ok-button'
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={(function() {
                    this.handleClose();
                    this.addQuestion(this.state.newQuestion);
                }).bind(this)}
            />,
        ];
        var style = {
            height: '20px',
            width: '100%'
        };

        var studentLang = (this.state.students == 1 ? "participant" : "participants");

        var validClicks = [];
        for(var i = 0; i < this.state.buttons.length; i++){
            validClicks.push({name: this.state.buttons[i], amount: 0});
        }
        for(i = 0; i < this.state.clickLog.length; i++){
            if(this.state.clickLog[i].time + this.DISPLAY_DIST >= Date.now()){
                validClicks[this.state.buttons.indexOf(this.state.clickLog[i].name)].amount++;
            }
        }
        if(this.state.name != '' && this.state.key != '' && this.state.buttons.length > 0) {
            var rightIcon = <span> <IconButton><NavigationClose /></IconButton></span>;
            if(this.state.buttons.length == 1){
                rightIcon = <span></span>;
            }

            return (

            <div style={{width:'100vw',height:'100vh'}}>
                <header2>Lecture Buddy</header2>
                <div className="options-container">
                    <h1 style={{textAlign:'center',width:'100%'}}>Code  <code>{this.state.key}</code></h1>
                    <i>{this.state.students} {studentLang} joined</i>
                    <div className="gen-container">
                        {validClicks.map((click) => (
                            <div>
                                <AppBar className="app-bar"
                                    title={<span>{click.name}</span>}
                                    iconElementRight={rightIcon}
                                    onRightIconButtonTouchTap={(function(event){ this.removeQuestion(click.name) }).bind(this)}
                                    iconElementLeft={<span></span>}
                                />
                                <LinearProgress color="#FF4081" mode="determinate" value={click.amount} max={Math.max(this.state.students, 1)} style={style} />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <IconButton tooltip="SVG Icon">
                        <AddBox onTouchTap= {this.handleOpen}/>
                    </IconButton>
                </div>



                <div>
                    <Dialog
                        title="New Button"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                        <TextField
                        hintText="your text"
                        value={this.state.newQuestion}

                        onChange={this.handleNewQuestion}
                        />
                    </Dialog>
                </div>
                <Snackbar
                    open={this.state.openSnackBar}
                    message={this.state.questions[this.state.questions.length - 1].text}
                    autoHideDuration={5000}
                    onRequestClose={this.handleRequestClose}
                />

            </div>);
        }
        else{
            return (
                <div>
                <header2 onClick={e => this.props.onItemSelect('home')}>Lecture Buddy</header2>
                <div className="join-state">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <TextField style={{margin:5,height:50,fontSize:30,lineHeight:1}} hintText="Lecture Name" value={this.state.name} onChange={this.handleChange}/>
                    </label>
                    <RaisedButton style={{margin:5,height:50,fontWeight:700}} label="Create" type="submit" value="Create lecture"/>
                </form>
                </div>
                </div>
            );
        }
    }
}