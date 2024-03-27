import bcrypt from 'bcrypt';
import userRegistrationService from '../../services/userRegistration-service';
import userRegistrationRepository from '../../repositories/userRegistration-repository';
import user from 'interfaces/user-interface';

// Mockando o userRegistrationRepository
jest.mock('../../repositories/userRegistration-repository');

describe('userRegistrationService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('userRegistration', () => {
    it('should register user successfully', async () => {
      const username = 'testuser';
      const email = 'testuser@example.com';
      const hashedPassword = 'hashedPassword';
      const password = 'password';
      const isAdmin = true;
      const localUser = { isAdmin: true } as user;

      // Mockando a função hashSync para retornar um valor fixo
      bcrypt.hashSync = jest.fn().mockReturnValue(hashedPassword);

      await userRegistrationService.userRegistration(username, email, password, isAdmin, localUser);

      expect(userRegistrationRepository.userRegistration).toHaveBeenCalledWith(username, email, expect.any(String), isAdmin);
    });

    it('should throw error if user already exists', async () => {
      const username = 'existinguser';
      const email = 'existinguser@example.com';
      const password = 'password';
      const isAdmin = true;
      const localUser = { isAdmin: true } as user;

      (userRegistrationRepository.getUserByEmail as jest.Mock).mockResolvedValueOnce({ email });

      await expect(async () => {
        await userRegistrationService.userRegistration(username, email, password, isAdmin, localUser);
    }).rejects.toEqual({ name: 'Usuário já existe!' });

    });

    it('should throw error if user is not admin', async () => {
      const username = 'testuser';
      const email = 'testuser@example.com';
      const password = 'password';
      const isAdmin = false;
      const localUser = { isAdmin: false } as user;

      await expect(async () => {
        await userRegistrationService.userRegistration(username, email, password, isAdmin, localUser);
    }).rejects.toEqual({name: "Você não tem permissão para cadastrar um usuário"});
    });
  });
});
