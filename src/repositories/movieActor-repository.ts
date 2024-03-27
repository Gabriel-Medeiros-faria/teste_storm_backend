import prisma from "../database/database";

async function actorMovieCreate(movieId: number, actorId: number) {
        // Função para poder adicionar um ator a um filme
        return prisma.actorMovie.create({
            data:{
                actorId,
                movieId
            }
        });
    
  }
async function actorMovieGet(movieId: number, actorId: number) {
    // Função para buscar o filme e o ator ao mesmo tempo e verificar se o ator já não está no filme
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