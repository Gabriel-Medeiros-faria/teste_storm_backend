import userLocal from "../interfaces/userlocal-interface";
import user from "../interfaces/user-interface";
import userRegistrationRepository from "../repositories/userRegistration-repository"
import bcrypt from "bcrypt";

async function userRegistration(username: string, email: string, password: string, isAdmin: boolean, localUser: user){
    
    // Se o usuário não for admin ele não poderá criar um novo usuário
    if(!localUser.isAdmin){
        throw {name: "Você não tem permissão para cadastrar um usuário"}
    }
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

async function userUpdate(username: string, email: string, password: string, localUser: userLocal) {
    // Construo a regra de negócio para atualizar no banco de dados apenas os dados que foram passados 
    // E se não forem passado, preencho com os dados ja existentes para não alterar para algo vazio no banco de dados
    const updateFields = {} as user;
    if (username && username !== ''){
        updateFields.username = username;
    } else{
        updateFields.username = localUser.name
    }
    if (email && email !== ''){
        updateFields.email = email;
    } else{
        updateFields.email = localUser.email
    }
    if (password && password !== ''){
        const hashPassword = bcrypt.hashSync(password, 10);
        updateFields.password = hashPassword;
    }else{
        updateFields.password = localUser.password
    }

    await userRegistrationRepository.userUpdate(updateFields.username, updateFields.email, updateFields.password, localUser)
    
}

async function userDelete(userId: number){
    await userRegistrationRepository.userDelete(userId)
}
const userRegistrationService = {
    userRegistration,
    userUpdate,
    userDelete
}

export default userRegistrationService