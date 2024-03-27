import { Request, Response } from "express";
import {
  userRegistration,
  userUpdate,
  userDelete,
} from "../../controllers/userRegistration-controller";
import userRegistrationService from "../../services/userRegistration-service";
import { authMiddleware } from "../../middlewares/auth-middleware";

// Mockando o userRegistrationService
jest.mock("../../services/userRegistration-service");

describe("User Registration Controllers", () => {
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

  describe("userRegistration Controller", () => {
    it("should register user successfully", async () => {
      const username = "newuser";
      const email = "newuser@example.com";
      const password = "password";
      const isAdmin = true;

      req.body = { username, email, password, isAdmin };

      if(res.locals){
        res.locals.user = {
            id: 1,
            isAdmin: true,
          };
      }
      // Simulando usuário autenticado no middleware
     

      await userRegistration(req as Request, res as Response);

      expect(userRegistrationService.userRegistration).toHaveBeenCalledWith(
        username,
        email,
        password,
        isAdmin,
        expect.anything()
      );
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });
  
    it('should return 401 if authorization header is not present', () => {
      delete req.headers?.authorization; // Removendo o header de autorização para simular o cenário
  
      authMiddleware(req as Request, res as Response, next);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('Campo authorization obrigatório');
      expect(next).not.toHaveBeenCalled(); // Verifica se next() não foi chamado
    });

    it("should return error if user already exists", async () => {
      const username = "existinguser";
      const email = "existinguser@example.com";
      const password = "password";
      const isAdmin = true;

      req.body = { username, email, password, isAdmin };

      // Configurando serviço para lançar erro quando usuário já existe
      (userRegistrationService as jest.Mocked<typeof userRegistrationService>).userRegistration.mockRejectedValueOnce({ name: "Usuário já existe!" });

      if(res.locals){
        res.locals.user = {
            id: 1,
            isAdmin: true,
          };
      }
      // Simulando usuário autenticado no middleware
      

      await userRegistration(req as Request, res as Response);

      expect(userRegistrationService.userRegistration).toHaveBeenCalledWith(
        username,
        email,
        password,
        isAdmin,
        expect.anything()
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ name: "Usuário já existe!" });
    });
  });

  describe("userUpdate Controller", () => {
    it("should update user successfully", async () => {
      const username = "updateduser";
      const email = "updateduser@example.com";
      const password = "newpassword";

      req.body = { username, email, password };

      // Simulando usuário autenticado no middleware
      if(res.locals){
        res.locals.user = {
            id: 1,
            isAdmin: true,
          };
      }

      await userUpdate(req as Request, res as Response);

      expect(userRegistrationService.userUpdate).toHaveBeenCalledWith(
        username,
        email,
        password,
        expect.anything()
      );
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });

    it("should return error if user does not exist", async () => {
      const username = "nonexistentuser";
      const email = "nonexistent@example.com";
      const password = "newpassword";

      req.body = { username, email, password };

      // Configurando serviço para lançar erro quando usuário não existe
      (userRegistrationService as jest.Mocked<typeof userRegistrationService>).userUpdate.mockRejectedValueOnce({ name: "Usuário não existe!" });

      // Simulando usuário autenticado no middleware
      if(res.locals){
        res.locals.user = {
            id: 1,
            isAdmin: true,
          };
      }

      await userUpdate(req as Request, res as Response);

      expect(userRegistrationService.userUpdate).toHaveBeenCalledWith(
        username,
        email,
        password,
        expect.anything()
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ name: "Usuário não existe!" });
    });
  });

  describe("userDelete Controller", () => {
    it("should delete user successfully", async () => {
      const userId = 1; // Suponha que o usuário a ser excluído tenha ID 1

      req.body = { userId };

      await userDelete(req as Request, res as Response);

      expect(userRegistrationService.userDelete).toHaveBeenCalledWith(userId);
      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });

    it("should return error if user does not exist", async () => {
      const userId = 999; // Suponha que o usuário com ID 999 não existe

      req.body = { userId };

      // Configurando serviço para lançar erro quando usuário não existe
      (userRegistrationService as jest.Mocked<typeof userRegistrationService>).userDelete.mockRejectedValueOnce({ name: "Usuário não existe!" });

      // Simulando usuário autenticado no middleware
      if(res.locals){
        res.locals.user = {
            id: 1,
            isAdmin: true,
          };
      }

      await userDelete(req as Request, res as Response);

      expect(userRegistrationService.userDelete).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ name: "Usuário não existe!" });
    });
  });
});
