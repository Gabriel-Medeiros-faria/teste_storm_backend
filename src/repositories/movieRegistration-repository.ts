import prisma from "../database/database";

async function movieRegistration(
  userId: number,
  title: string,
  description: string,
  director: string,
  gender: string,
  yearLaunch: number,
  imagePoster: string
) {

  // Crio o filme com os parâmetros passados
  return prisma.movie.create({
    data: {
      userId,
      title,
      description,
      director,
      gender,
      yearLaunch,
      imagePoster,
    },
  });
}

async function moviesGet() {
  return prisma.movie.findMany();
}

async function movieGetById(id: number) {
  // Eu busco nas duas tabelas e vinculo as avaliações com o filme buscado
  const movie = await prisma.movie.findFirst({
    where: {
        id: id
    },
    include: {
        ActorMovie: {
            include: {
                Actor: true
            }
        },
        Avaliations: true
    }
});
  return movie;
}

async function movieBySearchBar(search: string) {
  // Nessa requisição eu vejo se tem o que o usuário está pesquisando na tabela movie e incluo os atores 
  const movies = await prisma.movie.findMany({
    where: {
      OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { gender: { contains: search , mode: 'insensitive'} },
          {
              ActorMovie: {
                  some: {
                      Actor: {
                          name: { contains: search, mode: 'insensitive' }
                      }
                  }
              }
          }
      ]
  },
  include: {
      ActorMovie: true
  }
  });
  return movies;
}



const movieRegistrationRepository = {
  movieRegistration,
  movieGetById,
  moviesGet,
  movieBySearchBar,
};

export default movieRegistrationRepository;
