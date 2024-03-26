import prisma from "../database/database";

async function actorMovieCreate(movieId: number, actorId: number) {

        return prisma.actorMovie.create({
            data:{
                actorId,
                movieId
            }
        });
    
  }
async function actorMovieGet(movieId: number, actorId: number) {
    return prisma.actorMovie.findFirst({
        where: {
            movieId, actorId
        }
    })
}
  const actorMovieRepository = {
    actorMovieCreate,
    actorMovieGet
  };
  
  export default actorMovieRepository;