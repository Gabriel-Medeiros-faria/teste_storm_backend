import rateMovieRepository from "../repositories/rateMovie-repository"

async function rateMovie(userId: number, movieId: number, assessment: number) {
    const avaliation = await rateMovieRepository.getAvaliations(userId, movieId)
    if(avaliation){
        throw {name: "Esse usuário já avaliou esse filme!"}
    }
    await rateMovieRepository.rateMovie(userId, movieId, assessment)
}

const rateMovieService = {
    rateMovie
}

export default rateMovieService