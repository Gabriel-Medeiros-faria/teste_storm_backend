import prisma from "../src/database/database";
import bcrypt from "bcrypt";

async function main() {
  // Insiro no banco de dados um usuário admin para poder acessá-lo assim que realizar o migrate
  const hashPassword = bcrypt.hashSync("senha123", 10);
  const user = await prisma.user.create({
    data: {
      username: "usuárioteste",
      email: "teste@email.com",
      password: hashPassword,
      isAdmin: true,
    },
  });

  const movies = [
    {
      title: "venom",
      description: "Filme do venom bem legal bla bla bla bla",
      imagePoster:
        "https://img.elo7.com.br/product/zoom/2368C5D/big-poster-filme-marvel-venom-tamanho-90x60-cm-loot-op-010-geek.jpg",
      director: "diretor filme venom",
      gender: "Ação",
      yearLaunch: 2020,
    },
    {
      title: "Joker",
      description: "Filme do joker bem legal bla bla bla bla",
      imagePoster:
        "https://img.elo7.com.br/product/zoom/2A1A4B7/big-poster-filme-joker-coringa-joaquin-phoenix-tam-90x60-cm-nerd.jpg",
      director: "diretor filme joker",
      gender: "Drama",
      yearLaunch: 2020,
    },
    {
      title: "Homem aranha",
      description: "Filme do homem aranha bem legal bla bla bla bla",
      imagePoster:
        "https://s2-techtudo.glbimg.com/FGUM3Rq3oJpF-tUkma6y9gdOQ7w=/0x0:620x914/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/c/k/MRk3mCRhuYKtX5GhnbeQ/2012-09-05-10.jpg",
      director: "diretor filme do homem aranha",
      gender: "Ação",
      yearLaunch: 2018,
    },
    {
      title: "Flash",
      description: "Filme do flash bem legal bla bla bla bla",
      imagePoster:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhjdyS2HFRz5s9q1AMmSKlXzyHKz3n6wk5Vql_3PFo8UFixru9hB6fA-0dj8SEOzPTl1Upm7zAeP2bFtoaLIzNNdHte49n0FAUh1JUJ8bvj2R-eO7pTSsjee7UF3GodFYqEW-mTYJXoRiUbSWz6q_nYgr5nUnaCQECKfX5K9gi3D1xIqx_BIYJqj7_NdQ/s800/thflsh01.jpg",
      director: "diretor filme flash",
      gender: "Ação",
      yearLaunch: 2022,
    },
    {
      title: "Batman",
      description: "Filme do batman bem legal bla bla bla bla",
      imagePoster:
        "https://www.cineset.com.br/wp-content/uploads/2020/10/big-poster-filme-batman-o-cavaleiro-das-trevas-lo02-90x60-cm-batman.jpg",
      director: "diretor filme batman",
      gender: "Ação",
      yearLaunch: 2021,
    },
    {
      title: "Bob marley",
      description: "Filme do bob marley bem legal bla bla bla bla",
      imagePoster:
        "https://br.web.img3.acsta.net/r_1280_720/pictures/23/12/05/15/53/4355814.jpg",
      director: "diretor filme bob Marley",
      gender: "Drama",
      yearLaunch: 2024,
    },
    {
      title: "Dumbo",
      description: "Filme do Dumbo bem legal bla bla bla bla",
      imagePoster:
        "https://sm.ign.com/ign_br/screenshot/default/dr-upuaw4aebypb_93kf.jpg",
      director: "diretor filme Bumbo",
      gender: "cOMÉDIA",
      yearLaunch: 2022,
    },
    {
      title: "Besouro azul",
      description: "Filme do besouro azul bem legal bla bla bla bla",
      imagePoster:
        "https://www.europanet.com.br/upload/id_produto/45_____/4500203g.jpg",
      director: "diretor filme besouro azul",
      gender: "Ação",
      yearLaunch: 2023,
    },
    {
      title: "Black widow",
      description: "Filme do black widow bem legal bla bla bla bla",
      imagePoster:
        "https://1.bp.blogspot.com/-QwMAcai4CuI/YMztJbyx6ZI/AAAAAAACNYc/LUOKQTRw0kU9cAcs7tqwyRn1ox0aa2uwwCLcBGAsYHQ/s675/viuvpost.jpg",
      director: "diretor filme black widow",
      gender: "Ação",
      yearLaunch: 2023,
    },
    {
      title: "Wish",
      description: "Filme do wish bem legal bla bla bla bla",
      imagePoster:
        "https://wp-emsaoroque-media.s3.sa-east-1.amazonaws.com/uploads/2023/12/22113015/poster-filme-wish-poder-desejos-cinema.jpeg",
      director: "diretor filme wish",
      gender: "Animação",
      yearLaunch: 2023,
    },
  ];

  for (let i = 0; i < movies.length; i++) {
    const movie = await prisma.movie.create({
      data: {
        id: i,
        title: movies[i].title,
        description: movies[i].description,
        imagePoster: movies[i].imagePoster,
        director: movies[i].director,
        gender: movies[i].gender,
        yearLaunch: movies[i].yearLaunch,
        userId: user.id,
      },
    });
  }

  const actor = [
    {
      name: "Zendaya",
    },
    {
        name: "Paul walker",
      },
      {
        name: "The rock",
      },
      {
        name: "Tom holand",
      },
      {
        name: "Leonardo dicaprio",
      },
      {
        name: "Johnny Depp",
      },
      {
        name: "Tom cruise",
      },
      {
        name: "Brad pitt",
      },
      {
        name: "will smith",
      },
      {
        name: "Tom hanks",
      },
  ];

  for(let i = 0; i< actor.length;i++){
    await prisma.actor.create({
        data:{
            id: i,
            name: actor[i].name
        }
    })
  }

  for(let i = 0; i < actor.length;i++){
    await prisma.actorMovie.create({
        data: {
            id: i,
            actorId: i,
            movieId: i
        }
    })
  }
  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
