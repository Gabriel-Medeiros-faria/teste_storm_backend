
import prisma from "../database/database";
import userLocal from "../interfaces/userlocal-interface";

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

async function userUpdate(username: string, email: string, password: string, localUser: userLocal){

  //Atualizo o usuário com os dados passados
  await prisma.user.update({
    where: {id: localUser.id},
    data: {
      username, email, password
    }
  });

}

const userRegistrationRepository = {
  userRegistration,
  getUserByEmail,
  userUpdate
};

export default userRegistrationRepository;
