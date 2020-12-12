import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  setCurrentSong,
  songs,
  setSongs,
  songInfo,
  setSongInfo,
  isPlaying,
  setIsPlaying,
  audioRef,
}) => {
  // Effects
  useEffect(() => {
    const newSongs = songs.map((singleSong) => {
      if (singleSong.id === currentSong.id) {
        return { ...singleSong, active: true };
      } else {
        return { ...singleSong, active: false };
      }
    });
    setSongs(newSongs);
    // eslint-disable-next-line
  }, [currentSong]);

  // Functions
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const dragHandler = (ev) => {
    const currentTime = ev.currentTarget.value;
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };

  const skipTrackHandler = async (direction) => {
    const idx = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[idx + 1] || songs[0]);
      // activeLibraryHandler(songs[idx + 1] || songs[0]);
    } else {
      await setCurrentSong(songs[idx - 1] || songs[songs.length - 1]);
      // activeLibraryHandler(songs[idx - 1] || songs[songs.length - 1]);
    }
    if (isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // const activeLibraryHandler = (nextPrev) => {
  //   const newSongs = songs.map((singleSong) => {
  //     if (singleSong.id === nextPrev.id) {
  //       return { ...singleSong, active: true };
  //     } else {
  //       return { ...singleSong, active: false };
  //     }
  //   });
  //   setSongs(newSongs);
  // };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // Styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{songInfo.currentTime ? getTime(songInfo.currentTime) : "0:00"}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            min={0}
            value={songInfo.currentTime || 0}
            max={songInfo.duration || 0}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          onClick={() => skipTrackHandler("skip-forward")}
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
