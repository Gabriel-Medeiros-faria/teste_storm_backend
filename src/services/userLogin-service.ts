import bcrypt  from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import userRegistrationRepository from '../repositories/userRegistration-repository';

async function userLogin(email: string, password: string) {
    const user = await userRegistrationRepository.getUserByEmail(email)

    // Verifico se o usuário existe e se a senha foi passada
    if(user?.password === null || !user) throw {name: "Usuário não existe!"}

    // Implanto no token que vou passar as inforações id do usuáriom, nome e se ele é admin ou não 
    const token = jwt.sign({userId: user?.id, name: user?.username, isAdmin: user?.isAdmin, email: user?.email}, `${process.env.JWT_SECRET}`)
    
    // Utilizo a biblioteca bcrypt para fazer a verificação de senha
    const senhaHash = await bcrypt.compare(password, user?.password)
    
    // Se a senha estiver incorreta retorna um erro 
    if(!senhaHash) throw {name: "Senha incorreta!"}

    // Se tudo der certo, retornará o token para o usuário 
    return token
}

const userLoginService = {
    userLogin
}

export default userLoginService