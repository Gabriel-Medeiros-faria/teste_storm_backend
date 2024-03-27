import rateMovieRepository from "../repositories/rateMovie-repository"

async function rateMovie(userId: number, movieId: number, assessment: number) {

    // Vejo se o usuário já não avaliou o filme em questão
    const avaliation = await rateMovieRepository.getAvaliations(userId, movieId)
    if( assessment < 1 || assessment > 4){
        throw {name: "A nota precisa ser entre 1 e 4"}
    }
    if(avaliation){
        throw {name: "Esse usuário já avaliou esse filme!"}
    }
    await rateMovieRepository.rateMovie(userId, movieId, assessment)
}

const rateMovieService = {
    rateMovie
}

export default rateMovieService