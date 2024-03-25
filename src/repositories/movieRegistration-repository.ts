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

const movieRegistrationRepository = {
  movieRegistration,
};

export default movieRegistrationRepository;
