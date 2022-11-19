import { Drawer, Modal } from "antd";
import React from "react";
import "video.js/dist/video-js.css";
import "videojs-mobile-ui/dist/videojs-mobile-ui.css";
import videojs from "video.js";
import "videojs-mobile-ui";
import "videojs-youtube";
function TrailerModal({ trailerId, visible, setVisible }) {

  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  React.useEffect(() => {

    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: `https://www.youtube.com/watch?v=${trailerId}`,
            type: "video/youtube",
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
        "techOrder": ["youtube"],
        "youtube": { "iv_load_policy": 1 }
      })
      playerRef.current.mobileUi();
      playerRef.current.play();

      // return () => playerRef.current.dispose();
    }
  }, [trailerId, visible, videoRef])

  React.useEffect(() => {
    if (playerRef.current) {
      if (!visible) {
        playerRef.current.pause && playerRef.current.pause();
      } else {
        playerRef.current.play && playerRef.current.play();
      }
    }
  }, [visible])

  return (
    <Modal className="trailer__modal" visible={visible} placement="bottom" onCancel={() => setVisible(false)} footer={null} centered closable={false}>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          crossorigin="anonymous"
          preload="auto"
          data-setup='{}'
        >
          <source src={`https://www.youtube.com/watch?v=${trailerId}`} type="video/youtube" />
        </video>
      </div>
      {/* <iframe src={`https://www.youtube.com/watch?v=${trailerId}`} /> */}
    </Modal>
  )
}

export default React.memo(TrailerModal)