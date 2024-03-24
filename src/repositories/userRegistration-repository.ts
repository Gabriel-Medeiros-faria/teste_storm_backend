import prisma from "../database/database";

// Eu utilizo todos os parâmetros passado para a função e insiro todas as informações do usuário só que com a senha ecriptada

async function userRegistration(
  username: string,
  email: string,
  hashPassword: string,
  isAdmin: boolean
) {
  return prisma.user.create({
    data: {
      username,
      email,
      password: hashPassword,
      isAdmin,
    },
  });
}

// Eu utilizo essa função para buscar no banco de dados o usuário pelo email, para verificar se ele ja existe
async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

const userRegistrationRepository = {
  userRegistration,
  getUserByEmail,
};

export default userRegistrationRepository;
