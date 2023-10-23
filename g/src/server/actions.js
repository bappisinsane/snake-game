import HttpError from '@wasp/core/HttpError.js'

export const createGame = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newGame = await context.entities.Game.create({
    data: {
      score: args.score,
      userId: context.user.id
    }
  });

  return newGame;
}

export const updateGame = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const game = await context.entities.Game.findUnique({
    where: { id: args.id }
  });

  if (game.userId !== context.user.id) { throw new HttpError(400) };

  return context.entities.Game.update({
    where: { id: args.id },
    data: { score: args.score }
  });
}