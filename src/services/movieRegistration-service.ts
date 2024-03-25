import user from "../interfaces/user-interface";
import movieRegistrationRepository from "../repositories/movieRegistration-repository";

async function movieRegistration(
  userId: number,
  title: string,
  description: string,
  director: string,
  gender: string,
  yearLaunch: number,
  imagePoster: string,
  localUser: user
) {

    // Se o usuário não for admin ele não poderá criar um novo filme
    if(!localUser.isAdmin){
        throw {name: "Você não tem permissão para cadastrar um novo filme!"}
    }
    await movieRegistrationRepository.movieRegistration(userId, title, description, director, gender, yearLaunch, imagePoster)
}

const movieRegistrationService = {
  movieRegistration,
};

export default movieRegistrationService;
