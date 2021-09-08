import {Component} from "react";
import ReactPlayer from 'react-player'
import video from '../../assets/videos/idle.mp4'


interface Props {
}

interface State {
}

export class Tutorial extends Component<Props, State> {
    render() {
        return (
            <div className={"tutorial"}>
                <div>
                    <button id={"previous"}/>
                    <ReactPlayer
                        url={video}
                        playing={true}
                        muted={false}
                        volume={0}
                        controls={false}
                        loop={true}
                    />
                    <button id={"next"}/>
                </div>
            </div>
        )
    }
}