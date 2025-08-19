const VideoPlayer = (props) => {
    return (
        <video width="360" autoPlay loop muted playsInline>
            <source src={props.video} type="video/mp4" />
        </video>
    );
};

export default VideoPlayer;