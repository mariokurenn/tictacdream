import React, { useState, useEffect } from 'react';

const TicTac = () => {
    // State variables
    const [loggedIn, setLoggedIn] = useState(false);
    const [games, setGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);

    // Effects
    useEffect(() => {
        // Fetch games data and update state
        const fetchGames = async () => {
            try {
                const response = await fetch('https://tictactoe.aboutdream.io/api/games');
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, []);

    
    const handleLogin = async () => {
        try {
            const response = await fetch('https://tictactoe.aboutdream.io/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username, // Add the username input value here
                    password: password // Add the password input value here
                })
            });

            if (response.ok) {
                setLoggedIn(true);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    

    const handleRegister = async (username, password) => {
      try {
        const response = await axios.post('https://tictactoe.aboutdream.io/register', {
          username: username,
          password: password
        });
    
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    registerUser('yourUsername', 'yourPassword');

    // Render
    return (
        <div>
            {loggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <div>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}

            <h2>Games</h2>
            {games.map((game) => (
                <div key={game.id}>
                    <h3>{game.name}</h3>
                    <button onClick={() => handleJoinGame(game.id)}>Join Game</button>
                </div>
            ))}

            {currentGame && (
                <div>
                    <h2>{currentGame.name}</h2>
                    {/* Render game board and move controls */}
                </div>
            )}
        </div>
    );
    const handleLogout = () => {
        // Implement logout logic here
        setLoggedIn(false);
    };

    const handleNewGame = () => {
        // Implement new game logic here
    };

    const handleJoinGame = (gameId) => {
        // Implement join game logic here
    };

    const handleMove = (move) => {
        // Implement move logic here
    };

    // Render
    return (
        <div>
            {loggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}

            <h2>Games</h2>
            {games.map((game) => (
                <div key={game.id}>
                    <h3>{game.name}</h3>
                    <button onClick={() => handleJoinGame(game.id)}>Join Game</button>
                </div>
            ))}

            {currentGame && (
                <div>
                    <h2>{currentGame.name}</h2>
                    {/* Render game board and move controls */}
                </div>
            )}
        </div>
    );
};

export default TicTac;
