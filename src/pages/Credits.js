import React from 'react';

class CreditsPage extends React.Component{
    render() {
        return (
            <div className={"App"}>
                Hi! I'm Sevas. I made this. <br/>
                Thanks to the Collective Community for keeping this game alive, this couldn't be a thing without others to serve. <br/>
                <br/>
                If you really want to show me gratitude ask me out on a date or <a href={"https://www.buymeacoffee.com/sevas"} target={"_blank"} style={{color: '#0d6efd'}}>buy me a coffee.</a>
            </div>
        )
    }
}

export default CreditsPage