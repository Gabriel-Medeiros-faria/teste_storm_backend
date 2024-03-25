import prisma from "../database/database";

async function rateMovie(userId: number, movieId: number, assessment: number) {
  return prisma.avaliations.create({
    data: {
      userId,
      movieId,
      assessment,
    },
  });
}

async function getAvaliations(userId: number, movieId: number) {
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
