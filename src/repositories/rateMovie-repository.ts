import prisma from "../database/database";

async function rateMovie(userId: number, movieId: number, assessment: number) {
  // Função para criar uma avaliação de um filme
  return prisma.avaliations.create({
    data: {
      userId,
      movieId,
      assessment,
    },
  });
}

async function getAvaliations(userId: number, movieId: number) {
  // Função para buscar uma avalição de filme pelo userId e movieId
    return prisma.avaliations.findFirst({
        where:{
            userId, movieId
        }
    })
}

const rateMovieRepository = {
  rateMovie,
  getAvaliations
};

export default rateMovieRepository;
