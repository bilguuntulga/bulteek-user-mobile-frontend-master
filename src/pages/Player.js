import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-mobile-ui/dist/videojs-mobile-ui.css";
import "@styles/videojs.scss";
// import "@videojs/themes/fantasy/index.css";
import "videojs-mobile-ui";
import _ from "lodash";

const VideoJS = React.forwardRef((props, ref) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { config } = props;

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    require("videojs-contrib-quality-levels");
    require("videojs-hls-quality-selector");
    if (!playerRef.current && videoRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: config.playlist,
            type: "application/vnd.apple.mpegurl",
          },
        ],
        fullscreen: {
          enterOnRotate: true,
          exitOnRotate: true,
          lockOnRotate: true,
        },
        touchControls: {
          seekSeconds: 10,
          tapTimeout: 300,
          disableOnEnd: true,
        },
      }));
      player.mobileUi();
      player.hlsQualitySelector({
        displayCurrentQuality: true,
      });
      return () => player.dispose()
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
    // alert("player")
  }, [playerRef, config]);

  // Dispose the Video.js player when the functional component unmounts
  // React.useEffect(() => {
  //   return () => {
  //     if (playerRef.current) {
  //       playerRef.current.dispose();
  //       playerRef.current = null;
  //     }
  //   };
  // }, []);
  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        crossorigin="anonymous"
        preload="auto"
        playsinline
      >
        <source
          src="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
          type="application/vnd.apple.mpegurl"
        />
        {/* <track
          kind="captions"
          src={cc}
          srclang="en"
          label="English"
          default
        /> */}
        {/* {
          _.get(config, "subtitles", []).map(item => (
            <track
              key={item}
              kind="captions"
              src={item.text}
              srclang="en"
              label="English"
              default
            />
          ))
        } */}
      </video>
    </div>


  );
});

export default VideoJS;

// const Player = () => {
//   const playerRef = React.useRef(null);

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     sources: [
//       {
//         src: "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8",
//         type: "application/vnd.apple.mpegurl",
//       },
//     ],
//     fullscreen: {
//       enterOnRotate: true,
//       exitOnRotate: true,
//       lockOnRotate: true,
//     },
//     touchControls: {
//       seekSeconds: 10,
//       tapTimeout: 300,
//       disableOnEnd: false,
//     },
//   };

//   const handlePlayerReady = (player) => {
//     playerRef.current = player;

//     // you can handle player events here
//     // player.on("waiting", () => {
//     //   console.log("player is waiting");
//     // });

//     // player.on("dispose", () => {
//     //   console.log("player will dispose");
//     // });

//     // var srtRegex =
//     //   /(.*\n)?(\d\d:\d\d:\d\d),(\d\d\d --> \d\d:\d\d:\d\d),(\d\d\d)/g;
//     // var vttText = "WEBVTT\n\n" + subtitle.replace(srtRegex, "$1$2.$3.$4");
//     // var vttBlob = new Blob([vttText], { type: "text/vtt" });
//     // var blobURL = URL.createObjectURL(vttBlob);
//     // player.on("loadedmetadata", function () {
//     //   player.addRemoteTextTrack(
//     //     {
//     //       src: blobURL,
//     //       srclang: "en",
//     //       label: "english",
//     //       kind: "subtitles",
//     //     },
//     //     true
//     //   );
//     // });
//   };



//   return (
//     <>
//       <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
//     </>
//   );
// };

// export default Player;
