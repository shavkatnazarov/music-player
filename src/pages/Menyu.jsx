import React, { useState, useRef, useEffect } from 'react';
import '../style.css';

// Sample data for our music library
const sampleArtists = [
  { id: 1, name: "Tamerlan Alena", followers: "2.1M", cover: "https://placehold.co/200x200/ff0000/white?text=TA" },
  { id: 2, name: "Oxxxymiron", followers: "1.8M", cover: "https://placehold.co/200x200/ff0000/white?text=OX" },
  { id: 3, name: "IC3PEAK", followers: "1.5M", cover: "https://placehold.co/200x200/ff0000/white?text=IC" },
  { id: 4, name: "Scally Milano", followers: "980K", cover: "https://placehold.co/200x200/ff0000/white?text=SM" }
];

const sampleAlbums = [
  { id: 1, title: "Midnight Dreams", artist: "Tamerlan Alena", year: 2023, cover: "https://placehold.co/200x200/ff0000/white?text=MD", tracks: 12 },
  { id: 2, title: "Cyber Poetry", artist: "IC3PEAK", year: 2022, cover: "https://placehold.co/200x200/ff0000/white?text=CP", tracks: 10 },
  { id: 3, title: "Urban Legends", artist: "Oxxxymiron", year: 2023, cover: "https://placehold.co/200x200/ff0000/white?text=UL", tracks: 14 },
  { id: 4, title: "Neon Nights", artist: "Scally Milano", year: 2021, cover: "https://placehold.co/200x200/ff0000/white?text=NN", tracks: 8 }
];

export const Menyu = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  
  const audioRef = useRef(null);
  
  // Sample music data
  const songs = [
    {
      id: 1,
      title: "Midnight City",
      artist: "Tamerlan Alena",
      album: "Midnight Dreams",
      duration: "3:45",
      cover: "https://placehold.co/300x300/ff0000/white?text=MC",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Digital Love",
      artist: "IC3PEAK",
      album: "Cyber Poetry",
      duration: "4:20",
      cover: "https://placehold.co/300x300/ff0000/white?text=DL",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: 3,
      title: "Neon Lights",
      artist: "Oxxxymiron",
      album: "Urban Legends",
      duration: "3:15",
      cover: "https://placehold.co/300x300/ff0000/white?text=NL",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: 4,
      title: "Urban Jungle",
      artist: "Scally Milano",
      album: "Neon Nights",
      duration: "2:58",
      cover: "https://placehold.co/300x300/ff0000/white?text=UJ",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
      id: 5,
      title: "Electric Dreams",
      artist: "Tamerlan Alena",
      album: "Midnight Dreams",
      duration: "4:10",
      cover: "https://placehold.co/300x300/ff0000/white?text=ED",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
      id: 6,
      title: "Cyber Heart",
      artist: "IC3PEAK",
      album: "Cyber Poetry",
      duration: "3:55",
      cover: "https://placehold.co/300x300/ff0000/white?text=CH",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
  ];

  // Sample playlists
  const playlists = [
    { id: 1, name: "Мне нравится", count: 42 },
    { id: 2, name: "Моя коллекция", count: 28 },
    { id: 3, name: "Для тренировок", count: 15 },
    { id: 4, name: "Для дороги", count: 33 }
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

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHomeView = () => (
    <div className="home-view">
      <h1>Главная</h1>
      
      <section className="section">
        <h2>Плейлисты</h2>
        <div className="cards-grid">
          {playlists.map(playlist => (
            <div 
              key={playlist.id} 
              className="card playlist-card"
              onClick={() => setActiveView('playlist')}
            >
              <div className="playlist-cover">
                <div className="cover-art"></div>
                <div className="cover-art"></div>
                <div className="cover-art"></div>
              </div>
              <div className="card-content">
                <h3>{playlist.name}</h3>
                <p>{playlist.count} треков</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section">
        <h2>Недавно слушали</h2>
        <div className="cards-grid">
          {songs.slice(0, 4).map(song => (
            <div 
              key={song.id} 
              className="card song-card"
              onClick={() => handleSongSelect(songs.findIndex(s => s.id === song.id))}
            >
              <img src={song.cover} alt={song.title} />
              <div className="card-content">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section">
        <h2>Популярные исполнители</h2>
        <div className="cards-grid">
          {sampleArtists.map(artist => (
            <div 
              key={artist.id} 
              className="card artist-card"
              onClick={() => {
                setSelectedArtist(artist);
                setActiveView('artist');
              }}
            >
              <img src={artist.cover} alt={artist.name} />
              <div className="card-content">
                <h3>{artist.name}</h3>
                <p>{artist.followers} подписчиков</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderSearchView = () => (
    <div className="search-view">
      <h1>Поиск</h1>
      
      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Исполнитель, трек или альбом"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      {searchQuery ? (
        <div className="search-results">
          <h2>Результаты поиска</h2>
          <div className="songs-table">
            {filteredSongs.map((song, index) => (
              <div 
                key={song.id} 
                className="table-row"
                onClick={() => handleSongSelect(songs.findIndex(s => s.id === song.id))}
              >
                <div className="table-cell index">{songs.findIndex(s => s.id === song.id) + 1}</div>
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
      ) : (
        <>
          <div className="section">
            <h2>Популярные запросы</h2>
            <div className="popular-searches">
              <div className="search-suggestion">Tamerlan Alena</div>
              <div className="search-suggestion">IC3PEAK</div>
              <div className="search-suggestion">Midnight Dreams</div>
              <div className="search-suggestion">Cyber Poetry</div>
            </div>
          </div>
          
          <div className="section">
            <h2>Популярные плейлисты</h2>
            <div className="cards-grid">
              <div className="card large-card" onClick={() => setActiveView('playlist')}>
                <div className="large-card-content">
                  <h3>Топ чарта</h3>
                  <p>Еженедельный подборка хитов</p>
                </div>
              </div>
              <div className="card large-card" onClick={() => setActiveView('playlist')}>
                <div className="large-card-content">
                  <h3>Новинки</h3>
                  <p>Свежие релизы</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderPlaylistView = () => (
    <div className="playlist-view">
      <div className="playlist-header">
        <div className="playlist-cover-large">
          <div className="cover-grid">
            <div className="cover-item"></div>
            <div className="cover-item"></div>
            <div className="cover-item"></div>
            <div className="cover-item"></div>
          </div>
        </div>
        <div className="playlist-info">
          <span>ПЛЕЙЛИСТ</span>
          <h1>Мне нравится</h1>
          <p>Создано для вас • {songs.length} треков</p>
        </div>
      </div>
      
      <div className="playlist-controls">
        <button className="play-button" onClick={togglePlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>
      
      <div className="songs-table">
        <div className="table-header">
          <div className="table-cell">#</div>
          <div className="table-cell">НАЗВАНИЕ</div>
          <div className="table-cell">АЛЬБОМ</div>
          <div className="table-cell">ДЛИТЕЛЬНОСТЬ</div>
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

  const renderArtistView = () => (
    <div className="artist-view">
      <div className="artist-header">
        <img src={selectedArtist?.cover || sampleArtists[0].cover} alt={selectedArtist?.name || sampleArtists[0].name} className="artist-cover" />
        <div className="artist-info">
          <span>ИСПОЛНИТЕЛЬ</span>
          <h1>{selectedArtist?.name || sampleArtists[0].name}</h1>
          <p>{selectedArtist?.followers || sampleArtists[0].followers} подписчиков</p>
          <button className="follow-button">Подписаться</button>
        </div>
      </div>
      
      <div className="artist-controls">
        <button className="play-button" onClick={togglePlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="more-button">⋯</button>
      </div>
      
      <div className="section">
        <h2>Популярные треки</h2>
        <div className="songs-table">
          {songs.filter(song => song.artist === (selectedArtist?.name || sampleArtists[0].name)).map((song, index) => (
            <div 
              key={song.id} 
              className={`table-row ${songs.findIndex(s => s.id === song.id) === currentSongIndex ? 'active' : ''}`}
              onClick={() => handleSongSelect(songs.findIndex(s => s.id === song.id))}
            >
              <div className="table-cell index">{index + 1}</div>
              <div className="table-cell song-info">
                <img src={song.cover} alt={song.title} className="song-cover" />
                <div>
                  <div className="song-title">{song.title}</div>
                </div>
              </div>
              <div className="table-cell album">{song.album}</div>
              <div className="table-cell duration">{song.duration}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h2>Альбомы</h2>
        <div className="cards-grid">
          {sampleAlbums.filter(album => album.artist === (selectedArtist?.name || sampleArtists[0].name)).map(album => (
            <div 
              key={album.id} 
              className="card album-card"
              onClick={() => {
                setSelectedAlbum(album);
                setActiveView('album');
              }}
            >
              <img src={album.cover} alt={album.title} />
              <div className="card-content">
                <h3>{album.title}</h3>
                <p>{album.year} • {album.tracks} треков</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAlbumView = () => (
    <div className="album-view">
      <div className="album-header">
        <img src={selectedAlbum?.cover || sampleAlbums[0].cover} alt={selectedAlbum?.title || sampleAlbums[0].title} className="album-cover-large" />
        <div className="album-info">
          <span>АЛЬБОМ</span>
          <h1>{selectedAlbum?.title || sampleAlbums[0].title}</h1>
          <p>{selectedAlbum?.artist || sampleAlbums[0].artist}</p>
          <p>{selectedAlbum?.year || sampleAlbums[0].year} • {selectedAlbum?.tracks || sampleAlbums[0].tracks} треков</p>
        </div>
      </div>
      
      <div className="album-controls">
        <button className="play-button" onClick={togglePlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="more-button">⋯</button>
      </div>
      
      <div className="songs-table">
        <div className="table-header">
          <div className="table-cell">#</div>
          <div className="table-cell">НАЗВАНИЕ</div>
          <div className="table-cell">ДЛИТЕЛЬНОСТЬ</div>
        </div>
        {songs.filter(song => song.album === (selectedAlbum?.title || sampleAlbums[0].title)).map((song, index) => (
          <div 
            key={song.id} 
            className={`table-row ${songs.findIndex(s => s.id === song.id) === currentSongIndex ? 'active' : ''}`}
            onClick={() => handleSongSelect(songs.findIndex(s => s.id === song.id))}
          >
            <div className="table-cell index">{index + 1}</div>
            <div className="table-cell song-info">
              <img src={song.cover} alt={song.title} className="song-cover" />
              <div>
                <div className="song-title">{song.title}</div>
              </div>
            </div>
            <div className="table-cell duration">{song.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="yandex-music-player">
      {/* Audio element */}
      <audio 
        ref={audioRef} 
        src={songs[currentSongIndex].audio}
      />
      
      <div className="app-layout">
        {/* Sidebar */}
        <nav className="sidebar">
          <div className="logo">
            <span className="yandex-logo">▶</span>
            <span className="app-name">Музыка</span>
          </div>
          
          <ul className="nav-menu">
            <li className={activeView === 'home' ? 'active' : ''} onClick={() => setActiveView('home')}>
              <span className="nav-icon">🏠</span>
              <span>Главная</span>
            </li>
            <li className={activeView === 'search' ? 'active' : ''} onClick={() => setActiveView('search')}>
              <span className="nav-icon">🔍</span>
              <span>Поиск</span>
            </li>
            <li className={activeView === 'library' ? 'active' : ''} onClick={() => setActiveView('library')}>
              <span className="nav-icon">📚</span>
              <span>Моя коллекция</span>
            </li>
          </ul>
          
          <div className="playlists-section">
            <div className="playlists-header">
              <span>ПЛЕЙЛИСТЫ</span>
            </div>
            <ul className="playlists">
              {playlists.map(playlist => (
                <li 
                  key={playlist.id} 
                  className="playlist-item"
                  onClick={() => setActiveView('playlist')}
                >
                  <span className="playlist-icon">🎵</span>
                  <div className="playlist-info">
                    <div className="playlist-name">{playlist.name}</div>
                    <div className="playlist-count">{playlist.count} треков</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="main-content">
          <div className="content-area">
            {activeView === 'home' && renderHomeView()}
            {activeView === 'search' && renderSearchView()}
            {activeView === 'playlist' && renderPlaylistView()}
            {activeView === 'artist' && renderArtistView()}
            {activeView === 'album' && renderAlbumView()}
            {activeView === 'library' && (
              <div className="library-view">
                <h1>Моя коллекция</h1>
                <p>Здесь будут отображаться ваши сохраненные треки, альбомы и плейлисты.</p>
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