import { Request, Response } from "express";
import { userLogin } from "../../controllers/userLogin-controller";
import userLoginService from "../../services/userLogin-service";

// Mockando o userLoginService
jest.mock("../../services/userLogin-service");

describe("userLogin Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {},
    } as Partial<Request>;

    res = {
      send: jest.fn(),
      status: jest.fn(() => res),
      sendStatus: jest.fn(),
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login successfully with valid email and password", async () => {
    const email = "teste@email.com";
    const password = "senha123";
    const token = "mocked-token";

    // Configurando o serviço para retornar o token
    (userLoginService as jest.Mocked<typeof userLoginService>).userLogin.mockResolvedValueOnce(token);

    req.body = { email, password };

    await userLogin(req as Request, res as Response);

    expect(userLoginService.userLogin).toHaveBeenCalledWith(email, password);
    expect(res.send).toHaveBeenCalledWith(token)
  });

  it("should return error if user does not exist", async () => {
    const email = "nonexistent@example.com";
    const password = "password123";

    // Configurando o serviço para lançar um erro quando o usuário não existe
    (userLoginService as jest.Mocked<typeof userLoginService>).userLogin.mockRejectedValueOnce({ name: "Usuário não existe!" });

    req.body = { email, password };

    await userLogin(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ name: "Usuário não existe!" });
  });

  it("should return error if password is incorrect", async () => {
    const email = "user@example.com";
    const password = "incorrectPassword";

    // Configurando o serviço para lançar um erro quando a senha está incorreta
    (userLoginService as jest.Mocked<typeof userLoginService>).userLogin.mockRejectedValueOnce({ name: "Senha incorreta!" });

    req.body = { email, password };

    await userLogin(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ name: "Senha incorreta!" });
  });
});
