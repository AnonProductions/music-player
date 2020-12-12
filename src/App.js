import { useRef, useState } from "react";

import data from "./data";

import "./styles/app.scss";

import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  // Refs
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(
    songs.find((song) => song.active)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Functions
  const timeUpdateHandler = (ev) => {
    const currentTime = ev.currentTarget.currentTime;
    const duration = ev.currentTarget.duration;
    const animationPercentage = Math.round(
      (Math.round(currentTime) / Math.round(duration)) * 100
    );
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage,
    });
  };

  const songEndHandler = async () => {
    const idx = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[idx + 1] || songs[0]);
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} songInfo={songInfo} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />
      <Library
        libraryStatus={libraryStatus}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentSong.audio}
        ref={audioRef}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
