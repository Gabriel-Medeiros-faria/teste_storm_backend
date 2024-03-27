import { Request, Response } from 'express';
import { rateMovie } from '../../controllers/rateMovie-controller';
import rateMovieService from '../../services/rateMovie-service';
import { authMiddleware } from '../../middlewares/auth-middleware';

// Mockando o rateMovieService
jest.mock('../../services/rateMovie-service');

describe('Rate Movie Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      body: {},
    } as Partial<Request>;

    res = {
      locals: {} as Record<string, any> | undefined,
      send: jest.fn(),
      status: jest.fn(() => res),
      sendStatus: jest.fn(),
    } as Partial<Response>;

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should rate the movie successfully', async () => {
    const userId = 1;
    const movieId = 123;
    const assessment = 5;

    req.body = { userId, movieId, assessment };

    if (res.locals) {
      res.locals.user = {
        id: userId,
        isAdmin: true, // Supondo que o usuário autenticado é um administrador
      };
    }

    

    await rateMovie(req as Request, res as Response);

    expect(rateMovieService.rateMovie).toHaveBeenCalledWith(userId, movieId, assessment);
    expect(res.sendStatus).toHaveBeenCalledWith(201);
  });
  it('should return error if rating fails', async () => {
    const userId = 1;
    const movieId = 123;
    const assessment = 5;

    req.body = { userId, movieId, assessment };

    // Configurando serviço para lançar erro ao avaliar o filme
    (rateMovieService as jest.Mocked<typeof rateMovieService>).rateMovie.mockRejectedValueOnce({ name: 'Erro ao avaliar o filme!' });

    if (res.locals) {
      res.locals.user = {
        id: userId,
        isAdmin: true,
      };
    }

    await rateMovie(req as Request, res as Response);

    expect(rateMovieService.rateMovie).toHaveBeenCalledWith(userId, movieId, assessment);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ name: 'Erro ao avaliar o filme!' });
  });
});
