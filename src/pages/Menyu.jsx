import React, { useState, useRef, useEffect } from 'react';
import '../style.css';

export const Menyu = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [activeView, setActiveView] = useState('home');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const audioRef = useRef(null);
  
  // Sample music data
  const songs = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      cover: "https://placehold.co/300x300/1db954/white?text=BL",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:35",
      cover: "https://placehold.co/300x300/1db954/white?text=SYT",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: 3,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      duration: "3:23",
      cover: "https://placehold.co/300x300/1db954/white?text=LEV",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: 4,
      title: "Don't Start Now",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      duration: "3:03",
      cover: "https://placehold.co/300x300/1db954/white?text=DSN",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
      id: 5,
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      album: "F*CK LOVE 3",
      duration: "2:59",
      cover: "https://placehold.co/300x300/1db954/white?text=STAY",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
      id: 6,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      duration: "2:58",
      cover: "https://placehold.co/300x300/1db954/white?text=G4U",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
      id: 7,
      title: "Montero",
      artist: "Lil Nas X",
      album: "Montero",
      duration: "2:17",
      cover: "https://placehold.co/300x300/1db954/white?text=MON",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
      id: 8,
      title: "Peaches",
      artist: "Justin Bieber",
      album: "Justice",
      duration: "3:18",
      cover: "https://placehold.co/300x300/1db954/white?text=PEACH",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }
  ];

  // Sample playlists
  const playlists = [
    { id: 1, name: "Liked Songs", count: 24 },
    { id: 2, name: "My Playlist #1", count: 15 },
    { id: 3, name: "Chill Vibes", count: 32 },
    { id: 4, name: "Workout Mix", count: 18 },
    { id: 5, name: "Road Trip", count: 27 }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleNext);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying, currentSongIndex]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };

  const handleTimeSliderChange = (e) => {
    const audio = audioRef.current;
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    const volumeValue = parseFloat(e.target.value);
    audio.volume = volumeValue;
    setVolume(volumeValue);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const renderHomeView = () => (
    <div className="home-view">
      <h1>Home</h1>
      <div className="recently-played">
        <h2>Recently played</h2>
        <div className="cards-grid">
          <div className="card" onClick={() => setActiveView('playlist')}>
            <img src="https://placehold.co/200x200/1db954/white?text=Recently+Played" alt="Recently Played" />
            <span>Recently Played</span>
          </div>
          <div className="card" onClick={() => setActiveView('playlist')}>
            <img src="https://placehold.co/200x200/1db954/white?text=Top+Hits" alt="Top Hits" />
            <span>Top Hits</span>
          </div>
          <div className="card" onClick={() => setActiveView('playlist')}>
            <img src="https://placehold.co/200x200/1db954/white?text=Chill+Mix" alt="Chill Mix" />
            <span>Chill Mix</span>
          </div>
          <div className="card" onClick={() => setActiveView('playlist')}>
            <img src="https://placehold.co/200x200/1db954/white?text=Rock+Classics" alt="Rock Classics" />
            <span>Rock Classics</span>
          </div>
        </div>
      </div>
      
      <div className="made-for-you">
        <h2>Made for you</h2>
        <div className="cards-grid">
          <div className="card" onClick={() => setActiveView('playlist')}>
            <img src="https://placehold.co/200x200/1db954/white?text=Daily+Mix+1" alt="Daily Mix 1" />
            <span>Daily Mix 1</span>
          </div>
          <div className="card" onClick={() => setActiveView('playlist')}>
            <img src="https://placehold.co/200x200/1db954/white?text=Daily+Mix+2" alt="Daily Mix 2" />
            <span>Daily Mix 2</span>
          </div>
          <div className="card" onClick={() => setActiveView('playlist')}>
            <img src="https://placehold.co/200x200/1db954/white?text=Release+Radar" alt="Release Radar" />
            <span>Release Radar</span>
          </div>
          <div className="card" onClick={() => setActiveView('playlist')}>
            <img src="https://placehold.co/200x200/1db954/white?text=Discover+Weekly" alt="Discover Weekly" />
            <span>Discover Weekly</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaylistView = () => (
    <div className="playlist-view">
      <div className="playlist-header">
        <img src={songs[currentSongIndex].cover} alt="Playlist" className="playlist-cover-large" />
        <div className="playlist-info">
          <span>PLAYLIST</span>
          <h1>My Playlist #1</h1>
          <p>Created by You • {songs.length} songs</p>
        </div>
      </div>
      
      <div className="playlist-controls">
        <button className="play-button" onClick={togglePlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="heart-button">♡</button>
        <button className="more-button">⋯</button>
      </div>
      
      <div className="songs-table">
        <div className="table-header">
          <div className="table-cell">#</div>
          <div className="table-cell">TITLE</div>
          <div className="table-cell">ALBUM</div>
          <div className="table-cell">DURATION</div>
        </div>
        {songs.map((song, index) => (
          <div 
            key={song.id} 
            className={`table-row ${index === currentSongIndex ? 'active' : ''}`}
            onClick={() => handleSongSelect(index)}
          >
            <div className="table-cell index">{index + 1}</div>
            <div className="table-cell song-info">
              <img src={song.cover} alt={song.title} className="song-cover" />
              <div>
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
              </div>
            </div>
            <div className="table-cell album">{song.album}</div>
            <div className="table-cell duration">{song.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBrowseView = () => (
    <div className="browse-view">
      <h1>Browse</h1>
      <div className="categories">
        <div className="category">
          <img src="https://placehold.co/300x300/1db954/white?text=Pop" alt="Pop" />
          <span>Pop</span>
        </div>
        <div className="category">
          <img src="https://placehold.co/300x300/1db954/white?text=Hip-Hop" alt="Hip-Hop" />
          <span>Hip-Hop</span>
        </div>
        <div className="category">
          <img src="https://placehold.co/300x300/1db954/white?text=Rock" alt="Rock" />
          <span>Rock</span>
        </div>
        <div className="category">
          <img src="https://placehold.co/300x300/1db954/white?text=Jazz" alt="Jazz" />
          <span>Jazz</span>
        </div>
        <div className="category">
          <img src="https://placehold.co/300x300/1db954/white?text=Electronic" alt="Electronic" />
          <span>Electronic</span>
        </div>
        <div className="category">
          <img src="https://placehold.co/300x300/1db954/white?text=Classical" alt="Classical" />
          <span>Classical</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="spotify-player">
      {/* Audio element */}
      <audio 
        ref={audioRef} 
        src={songs[currentSongIndex].audio}
      />
      
      <div className="app-layout">
        {/* Sidebar */}
        <nav className="sidebar">
          <div className="logo">
            <span className="spotify-logo">🎵</span>
            <span className="app-name">MusicPlayer</span>
          </div>
          
          <ul className="nav-menu">
            <li className={activeView === 'home' ? 'active' : ''} onClick={() => setActiveView('home')}>
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </li>
            <li className={activeView === 'search' ? 'active' : ''} onClick={() => setActiveView('search')}>
              <span className="nav-icon">🔍</span>
              <span>Search</span>
            </li>
            <li className={activeView === 'library' ? 'active' : ''} onClick={() => setActiveView('library')}>
              <span className="nav-icon">📚</span>
              <span>Your Library</span>
            </li>
          </ul>
          
          <div className="playlists-section">
            <div className="playlists-header">
              <span>PLAYLISTS</span>
              <span className="add-icon">+</span>
            </div>
            <ul className="playlists">
              {playlists.map(playlist => (
                <li key={playlist.id} className="playlist-item">
                  <span className="playlist-icon">📜</span>
                  <div className="playlist-info">
                    <div className="playlist-name">{playlist.name}</div>
                    <div className="playlist-count">{playlist.count} songs</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="install-app">
            <span className="install-icon">⬇️</span>
            <span>Install App</span>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="main-content">
          <div className="content-area">
            {activeView === 'home' && renderHomeView()}
            {activeView === 'playlist' && renderPlaylistView()}
            {activeView === 'search' && renderBrowseView()}
            {activeView === 'library' && (
              <div className="library-view">
                <h1>Your Library</h1>
                <p>Library content would go here...</p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Player Bar */}
      <footer className="player-bar">
        <div className="current-song">
          <img src={songs[currentSongIndex].cover} alt={songs[currentSongIndex].title} className="current-song-cover" />
          <div className="song-details">
            <div className="song-title">{songs[currentSongIndex].title}</div>
            <div className="song-artist">{songs[currentSongIndex].artist}</div>
          </div>
          <button className="like-button">♡</button>
        </div>
        
        <div className="player-controls">
          <div className="control-buttons">
            <button onClick={handlePrevious} className="control-btn">⏮</button>
            <button onClick={togglePlayPause} className="play-pause-btn">
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button onClick={handleNext} className="control-btn">⏭</button>
          </div>
          
          <div className="progress-bar">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleTimeSliderChange}
              className="progress-slider"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="extra-controls">
          <button className="volume-control">
            <span className="volume-icon">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </button>
        </div>
      </footer>
    </div>
  );
};