import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRegistrationRepository from '../../repositories/userRegistration-repository';
import userLoginService from '../../services/userLogin-service';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../repositories/userRegistration-repository');

describe('userLoginService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully and return a token', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const userId = 1;
    const username = 'Test User';
    const isAdmin = false;

    const user = {
      id: userId,
      username: username,
      email: email,
      password: '$2b$10$G6WEjAghfGZLmoC2kNKb5.VUk97t2ZTKDC/B70sLyE0MQ0KFJ5dZi', // Hashed password
      isAdmin: isAdmin,
    };

    // Mocking repository function to return user data
    (userRegistrationRepository.getUserByEmail as jest.MockedFunction<typeof userRegistrationRepository.getUserByEmail>).mockResolvedValueOnce(user);

    // Mocking bcrypt compare function to return true
    (bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>).mockImplementation(async () => true);

    // Mocking jwt sign function to return a token
    const mockToken = 'mocked-token';
    (jwt.sign as jest.MockedFunction<typeof jwt.sign>).mockImplementationOnce(() => mockToken);

    // Call the service function
    const result = await userLoginService.userLogin(email, password);

    // Verify repository function called with correct email
    expect(userRegistrationRepository.getUserByEmail).toHaveBeenCalledWith(email);

    // Verify bcrypt compare function called with correct arguments
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);

    // Verify jwt sign function called with correct arguments
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: user.id, name: user.username, isAdmin: user.isAdmin, email: user.email },
      expect.any(String)
    );

    // Verify the result is the mocked token
    expect(result).toEqual(mockToken);
  });

  it('should throw an error if user does not exist', async () => {
    const email = 'nonexistent@example.com';
    const password = 'password';

    // Mocking repository function to return null (user not found)
    (userRegistrationRepository.getUserByEmail as jest.MockedFunction<typeof userRegistrationRepository.getUserByEmail>).mockResolvedValueOnce(null);

    await expect(async () => {
        await userLoginService.userLogin(email, password);
    }).rejects.toEqual({ name: "Usuário não existe!" });
  });

  it('should throw an error if password is incorrect', async () => {
    const email = 'test@example.com';
    const password = 'wrongpassword';
    const userId = 1;
    const username = 'Test User';
    const isAdmin = false;

    const user = {
      id: userId,
      username: username,
      email: email,
      password: '$2b$10$G6WEjAghfGZLmoC2kNKb5.VUk97t2ZTKDC/B70sLyE0MQ0KFJ5dZi', // Hashed password
      isAdmin: isAdmin,
    };

    // Mocking repository function to return user data
    (userRegistrationRepository.getUserByEmail as jest.MockedFunction<typeof userRegistrationRepository.getUserByEmail>).mockResolvedValueOnce(user);

    // Mocking bcrypt compare function to return false
    (bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>).mockImplementation(async () => false);

    await expect(async () => {
        await userLoginService.userLogin(email, password);
    }).rejects.toEqual({ name: "Senha incorreta!" });
  });
});
