import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getGame from '@wasp/queries/getGame';
import updateGame from '@wasp/actions/updateGame';

export function Game() {
  const { gameId } = useParams();
  const { data: game, isLoading, error } = useQuery(getGame, { gameId });
  const updateGameFn = useAction(updateGame);

  const [score, setScore] = useState(0);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleScoreIncrease = () => {
    const newScore = score + 1;
    setScore(newScore);
    updateGameFn({ id: gameId, score: newScore });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold'>Snake Game</h1>
      <p className='text-lg'>Game ID: {gameId}</p>
      <p className='text-lg'>Score: {game.score}</p>
      <button
        onClick={handleScoreIncrease}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Increase Score
      </button>
    </div>
  );
}