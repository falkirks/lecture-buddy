import React from 'react';


export default class Wall extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <b className="topic">Access revoked</b>
                </header>
                <div><p className="harrass">Your access has been revoked. You were using inappropriate words in conversation with your presenter.
                    You shouldn't do this and it's not going to be tolerated. You should be using appropriate words and respect people.
                    #HackHarassment
                </p></div>
                <cover className="wall"></cover>
            </div>
        );
    }
}
