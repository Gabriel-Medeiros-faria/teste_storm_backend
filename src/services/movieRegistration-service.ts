import actorRepository from "../repositories/actor-repository";
import user from "../interfaces/user-interface";
import movieRegistrationRepository from "../repositories/movieRegistration-repository";
import actorMovieRepository from "../repositories/movieActor-repository";

async function movieRegistration(
  userId: number,
  title: string,
  description: string,
  director: string,
  gender: string,
  yearLaunch: number,
  imagePoster: string,
  localUser: user,
  actors: Array<string>
) {
    // Se o usuário não for admin ele não poderá criar um novo filme
    if(!localUser.isAdmin){
        throw {name: "Você não tem permissão para cadastrar um novo filme!"}
    }

    // Verifico se o ator já existe
    let actorGetResp = await actorRepository.actorGetByName(actors)
    // Se não existir cria o ator e o salva na variável actorGetResp
    if(!actorGetResp){
      actorGetResp = await actorRepository.actorCreate(actors)
    }
    
    // Crio o filme no banco de dados
    const movieRegistrationResp = await movieRegistrationRepository.movieRegistration(userId, title, description, director, gender, yearLaunch, imagePoster)
    
    // Pego o filme pelo ID criado
    const movie = await movieRegistrationRepository.movieGetById(movieRegistrationResp.id)
    
    // Faço um loop para poder adicionar o campo actorGetResp[i]?.id que é o id do ator 
    for (let i =0;i < actorGetResp.length;i++){
      // Verifico se aquele ator já não está no filme
      const actorMovie = await actorMovieRepository.actorMovieGet(movie?.id ?? 0, actorGetResp[i]?.id ?? 0) 
      // Se não estiver no filme adiciona na tabela meio actorMovie
      if(!actorMovie){
        await actorMovieRepository.actorMovieCreate(movie?.id ?? 0, actorGetResp[i]?.id ?? 0)
      }
    }
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
