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

async function moviesGet() {
  const movies = await movieRegistrationRepository.moviesGet()
  if(!movies){
    throw {name: "Ainda não existe filmes em nosso banco :)"}
  }
  return movies
}

async function movieGetById(id: number) {
  const movie = await movieRegistrationRepository.movieGetById(id)
  return movie
}

async function movieBySearchBar(search: string){
  const searchResult = await movieRegistrationRepository.movieBySearchBar(search)
  return searchResult
}

const movieRegistrationService = {
  movieRegistration,
  movieGetById,
  moviesGet,
  movieBySearchBar
};

export default movieRegistrationService;
