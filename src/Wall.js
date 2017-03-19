import React from 'react';


export default class Wall extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <b className="topic">Access revoked</b>
                </header>
                <p>Your access has been revoked.</p>
                <cover className="wall"></cover>
            </div>
        );
    }
}
