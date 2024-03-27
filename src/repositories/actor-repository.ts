import prisma from "../database/database";

async function actorCreate(actors: Array<string>) {
    let actorArray = []

    // Faço um for para poder adicionar todos os atores no banco de dados e armazenar as respostas dentro de uma array
    for(let i=0; i< actors.length;i++){
        const actorResp = await prisma.actor.create({
            data:{
                name: actors[i]
            }
        })
        actorArray.push(actorResp)
    }
    return actorArray
  }

  async function actorGetByName(actorName: Array<string>) {
    const actorArray = []
    // Faço um for para poder buscar todos os atores no banco de dados e armazenar as respostas dentro de uma array
    for(let i = 0;i < actorName.length; i++){
        const actor = await prisma.actor.findFirst({
            where:{
                name: actorName[i]
            }
        })
        actorArray.push(actor)
    }
    return actorArray
  }

  const actorRepository = {
    actorCreate,
    actorGetByName
  };
  
  export default actorRepository;