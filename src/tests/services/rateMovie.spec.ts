import rateMovieService from '../../services/rateMovie-service';
import rateMovieRepository from '../../repositories/rateMovie-repository';

jest.mock('../../repositories/rateMovie-repository');

describe('rateMovieService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rateMovie', () => {
    it('should throw error if assessment is less than 1', async () => {
        await expect(async () => {
            await rateMovieService.rateMovie(1, 1, 0);
        }).rejects.toEqual({name: 'A nota precisa ser entre 1 e 4'});
    });

    it('should throw error if assessment is greater than 4', async () => {
        await expect(async () => {
            await rateMovieService.rateMovie(1, 1, 5);
        }).rejects.toEqual({name: 'A nota precisa ser entre 1 e 4'});
    });

    it('should throw error if user already rated the movie', async () => {
      (rateMovieRepository.getAvaliations as jest.Mock).mockResolvedValueOnce({ userId: 1, movieId: 1, assessment: 4 });
      await expect(async () => {
        await rateMovieService.rateMovie(1, 1, 1);
    }).rejects.toEqual({name: 'Esse usuário já avaliou esse filme!'});
    });

    it('should rate the movie if user did not rate it before', async () => {
      (rateMovieRepository.getAvaliations as jest.Mock).mockResolvedValueOnce(null);

      await rateMovieService.rateMovie(1, 1, 3);

      expect(rateMovieRepository.rateMovie).toHaveBeenCalledWith(1, 1, 3);
    });
  });
});
