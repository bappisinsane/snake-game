import HttpError from '@wasp/core/HttpError.js'

export const getGames = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Game.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getGame = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const game = await context.entities.Game.findUnique({
    where: { id: args.gameId },
    include: { user: true }
  });

  if (!game) { throw new HttpError(404, `Game with id ${args.gameId} not found`) }

  if (game.userId !== context.user.id) { throw new HttpError(400, `Game with id ${args.gameId} does not belong to the authenticated user`) }

  return game;
}