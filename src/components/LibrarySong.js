const LibrarySong = ({
  songs,
  setSongs,
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
}) => {
  // Functions
  const songSelectHandler = async (id) => {
    const selectedSong = songs.find((song) => song.id === id);
    await setCurrentSong(selectedSong);

    const newSongs = songs.map((singleSong) => {
      if (singleSong.id === song.id) {
        return { ...singleSong, active: true };
      } else {
        return { ...singleSong, active: false };
      }
    });
    setSongs(newSongs);

    if (isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={() => songSelectHandler(song.id)}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
