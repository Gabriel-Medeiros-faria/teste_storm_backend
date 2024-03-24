import userRegistrationRepository from "../repositories/userRegistration-repository"
import bcrypt from "bcrypt";

async function userRegistration(username: string, email: string, password: string, isAdmin: boolean){
    // Faço a requisição utilizando o repositório userRegistrationRepository mandando o email como parâmetro e verificar se o usuário(email) já existe no banco de dados
    const user = await userRegistrationRepository.getUserByEmail(email)

    // Se ele existir eu retorno a mensagem "Usuário já existe!"
    if(user){
        throw {name: "Usuário já existe!"}
    }

    // Se não existir, eu utilizo a biblioteca bcrypt para encriptar a senha do usuário e salvo no banco de dados todas as informações junto com a senha encriptada 
    const hashPassword = bcrypt.hashSync(password, 10);
    await userRegistrationRepository.userRegistration(username, email, hashPassword, isAdmin)
}

const userRegistrationService = {
    userRegistration
}

export default userRegistrationService