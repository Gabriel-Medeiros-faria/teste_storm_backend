import { Request, Response } from "express";
import {
  movieRegistration,
  moviesGet,
  movieGetById,
  movieBySearchBar,
} from "../../controllers/movieRegistration-controller";
import movieRegistrationService from "../../services/movieRegistration-service";

// Mockando o movieRegistrationService
jest.mock("../../services/movieRegistration-service");

describe("Movie Registration Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    } as Partial<Request>;

    res = {
      locals: {} as Record<string, any>,
      send: jest.fn(),
      status: jest.fn(() => res),
      sendStatus: jest.fn(),
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("movieRegistration", () => {
    it("should register a movie successfully", async () => {
      const movieData = {
        userId: 1,
        title: "Test Movie",
        description: "Test Description",
        director: "Test Director",
        gender: "Test Gender",
        yearLaunch: 2022,
        imagePoster: "test-poster.jpg",
        actors: ["Actor 1", "Actor 2"],
      };

      req.body = movieData;
      if (res.locals) {
        res.locals.user = { id: 1 }; // Simulando usuário autenticado
      }

      await movieRegistration(req as Request, res as Response);

      expect(movieRegistrationService.movieRegistration).toHaveBeenCalledWith(
        movieData.userId,
        movieData.title,
        movieData.description,
        movieData.director,
        movieData.gender,
        movieData.yearLaunch,
        movieData.imagePoster,
        expect.anything(),
        movieData.actors
      );
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });

    it("should return an error if movie registration fails", async () => {
      const movieData = {
        userId: 1,
        title: "Test Movie",
        description: "Test Description",
        director: "Test Director",
        gender: "Test Gender",
        yearLaunch: 2022,
        imagePoster: "test-poster.jpg",
        actors: ["Actor 1", "Actor 2"],
      };

      req.body = movieData;
      if (res.locals) {
        res.locals.user = { id: 1 }; // Simulando usuário autenticado
      }

      const errorMessage = "Movie registration failed";
      (
        movieRegistrationService.movieRegistration as jest.Mock
      ).mockRejectedValueOnce({
        name: errorMessage,
      });

      await movieRegistration(req as Request, res as Response);

      expect(movieRegistrationService.movieRegistration).toHaveBeenCalledWith(
        movieData.userId,
        movieData.title,
        movieData.description,
        movieData.director,
        movieData.gender,
        movieData.yearLaunch,
        movieData.imagePoster,
        expect.anything(),
        movieData.actors
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ name: errorMessage });
    });
  });

  describe("moviesGet", () => {
    it("should get all movies successfully", async () => {
      const mockMovies = [{ title: "Movie 1" }, { title: "Movie 2" }];

      (movieRegistrationService.moviesGet as jest.Mock).mockResolvedValueOnce(
        mockMovies
      );

      await moviesGet(req as Request, res as Response);

      expect(res.send).toHaveBeenCalledWith(mockMovies);
    });

    it("should return an error if fetching movies fails", async () => {
      const errorMessage = "Failed to fetch movies";

      (movieRegistrationService.moviesGet as jest.Mock).mockRejectedValueOnce({
        name: errorMessage,
      });

      await moviesGet(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ name: errorMessage });
    });
  });

  describe("movieGetById", () => {
    it("should get a movie by ID successfully", async () => {
      // Preparar os dados de entrada para o teste
      const movieId = 1;
      const movie = {
        id: 1,
        title: "Example Movie",
        description: "This is an example movie",
        director: "John Doe",
        gender: "Action",
        yearLaunch: 2022,
        imagePoster: "example-poster.jpg",
        userId: 1,
        ActorMovie: [
          {
            id: 1,
            movieId: 1,
            actorId: 1,
            Actor: {
              id: 1,
              name: "Actor 1",
            },
          },
          {
            id: 2,
            movieId: 1,
            actorId: 2,
            Actor: {
              id: 2,
              name: "Actor 2",
            },
          },
        ],
        Avaliations: [
          {
            id: 1,
            userId: 1,
            movieId: 1,
            assessment: 5,
            User: {
              id: 1,
            },
          },
        ],
      };

      // Configurar o comportamento esperado do serviço mockado
      (
        movieRegistrationService.movieGetById as jest.MockedFunction<
          typeof movieRegistrationService.movieGetById
        >
      ).mockResolvedValueOnce(movie);

      // Chamar a função do controlador
      req.params = { id: "1" };
      await movieGetById(req as Request, res as Response);

      // Verificar se o serviço foi chamado corretamente
      expect(movieRegistrationService.movieGetById).toHaveBeenCalledWith(
        movieId
      );

      // Verificar se o conteúdo da resposta estão corretos
      expect(res.send).toHaveBeenCalledWith(movie);
    });

    it("should return an error if fetching a movie by ID fails", async () => {
      // Preparar os dados de entrada para o teste
      const movieId = "1";
      const errorMessage = "Failed to fetch movie by ID";

      // Configurar o comportamento esperado do serviço mockado
      (
        movieRegistrationService.movieGetById as jest.MockedFunction<
          typeof movieRegistrationService.movieGetById
        >
      ).mockRejectedValueOnce({ message: errorMessage });

      // Chamar a função do controlador
      req.params = { id: movieId };
      await movieGetById(req as Request, res as Response);

      // Verificar se o serviço foi chamado corretamente
      expect(movieRegistrationService.movieGetById).toHaveBeenCalledWith(
        Number(movieId)
      );

      // Verificar se o status e a mensagem de erro na resposta estão corretos
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
