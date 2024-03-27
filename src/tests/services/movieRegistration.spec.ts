import movieRegistrationService from '../../services/movieRegistration-service';
import actorRepository from '../../repositories/actor-repository';
import movieRegistrationRepository from '../../repositories/movieRegistration-repository';
import actorMovieRepository from '../../repositories/movieActor-repository';
import user from '../../interfaces/user-interface';

jest.mock('../../repositories/actor-repository');
jest.mock('../../repositories/movieRegistration-repository');
jest.mock('../../repositories/movieActor-repository');

describe('movieRegistrationService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('movieRegistration', () => {
    it('should throw error if user is not admin', async () => {
      const localUser = { isAdmin: false } as user;
      await expect(async () => {
        await movieRegistrationService.movieRegistration(123, 'Existing Movie', 'Description', 'Director', 'Gender', 2024, 'poster.jpg', localUser, ['Actor1', 'Actor2']);
    }).rejects.toEqual({name: "Você não tem permissão para cadastrar um novo filme!"});    });

    it('should throw error if movie with the same title exists', async () => {
      (actorRepository.actorGetByName as jest.Mock).mockResolvedValueOnce(null);
      (movieRegistrationRepository.movieGetByTitle as jest.Mock).mockResolvedValueOnce([{ id: 1, title: 'Existing Movie' }] as { id: number; title: string }[]);
  
      const localUser = { isAdmin: true } as user;
      await expect(async () => {
        await movieRegistrationService.movieRegistration(123, 'Existing Movie', 'Description', 'Director', 'Gender', 2024, 'poster.jpg', localUser, ['Actor1', 'Actor2']);
    }).rejects.toEqual({name: 'Esse filme já existe!'});
});

    it('should register a new movie and actors', async () => {
      (movieRegistrationRepository.movieGetByTitle as jest.Mock).mockResolvedValueOnce(null);
      (actorRepository.actorGetByName as jest.Mock).mockResolvedValueOnce(null);
      (actorRepository.actorCreate as jest.Mock).mockResolvedValueOnce({ id: 1, name: 'Actor1' });
      (movieRegistrationRepository.movieRegistration as jest.Mock).mockResolvedValueOnce({ id: 1 });

      const localUser = { isAdmin: true } as user;
      await movieRegistrationService.movieRegistration(123, 'New Movie', 'Description', 'Director', 'Gender', 2024, 'poster.jpg', localUser, ['Actor1', 'Actor2']);

      expect(movieRegistrationRepository.movieRegistration).toHaveBeenCalledWith(123, 'New Movie', 'Description', 'Director', 'Gender', 2024, 'poster.jpg');
      expect(actorRepository.actorCreate).toHaveBeenCalledWith(['Actor1', 'Actor2']);
    });
  });

  describe('moviesGet', () => {
    it('should throw error if no movies exist', async () => {
        (movieRegistrationRepository.moviesGet as jest.Mock).mockRejectedValueOnce({ name: 'Ainda não existe filmes em nosso banco :)' });
    });
  });

  describe('movieGetById', () => {
    it('should return movie by ID if it exists', async () => {
      const mockMovie = { id: 1, title: 'Movie 1' };
      (movieRegistrationRepository.movieGetById as jest.Mock).mockResolvedValueOnce(mockMovie as { id: number; title: string });
      const movie = await movieRegistrationService.movieGetById(1);
      expect(movie).toEqual(mockMovie);
    });
  });

  describe('movieBySearchBar', () => {
    it('should return movies by search query', async () => {
      const mockSearchResult = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];
      (movieRegistrationRepository.movieBySearchBar as jest.Mock).mockResolvedValueOnce(mockSearchResult as { id: number; title: string }[]);
      const searchResult = await movieRegistrationService.movieBySearchBar('Action');
      expect(searchResult).toEqual(mockSearchResult);
    });
  });

  describe('movieGetByTitle', () => {
    it('should return movie by title if it exists', async () => {
      const mockMovie = { id: 1, title: 'Movie 1' };
      (movieRegistrationRepository.movieGetByTitle as jest.Mock).mockResolvedValueOnce(mockMovie as { id: number; title: string });
      const movie = await movieRegistrationService.movieGetByTitle('Movie 1');
      expect(movie).toEqual(mockMovie);
    });
  });
});
