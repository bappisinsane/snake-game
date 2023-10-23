import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getGames from '@wasp/queries/getGames';
import createGame from '@wasp/actions/createGame';

export function Dashboard() {
  const { data: games, isLoading, error } = useQuery(getGames);
  const createGameFn = useAction(createGame);

  const [score, setScore] = useState(0);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateGame = () => {
    createGameFn({ score });
    setScore(0);
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Snake Game</h1>
        <div className='flex items-center'>
          <span className='mr-2'>Score:</span>
          <span>{score}</span>
        </div>
      </div>
      <div>
        {games.map((game) => (
          <div
            key={game.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>Game ID: {game.id}</div>
            <div>Score: {game.score}</div>
          </div>
        ))}
      </div>
      <div>
        <input
          type='number'
          placeholder='New Score'
          className='px-1 py-2 border rounded text-lg'
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        />
        <button
          onClick={handleCreateGame}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Game
        </button>
      </div>
      <div>
        <Link to='/'>Go to Dashboard</Link>
      </div>
    </div>
  );
}