import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHoursStringToMinutes } from "./utils/convert-hour-string-to-minute";
import { convertMinutesToHoursString } from "./utils/convert-minutes-to-hour-string";
import { gameList } from "./utils/gameList";
const app = express();
const prisma = new PrismaClient({
  log: ["query"]
});

app.use(express.json());
app.use(cors());

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    },
    orderBy: {
      title: "asc"
    }
  });

  return response.json(games);
});

app.get("/games-with-ads", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });

  const gamesWithAds = games.filter((game) => game._count.ads != 0);

  return response.json(gamesWithAds);
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHoursStringToMinutes(body.hourStart),
      hourEnd: convertHoursStringToMinutes(body.hourEnd),
      useVoiceChaneel: body.useVoiceChaneel
    }
  });
  return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChaneel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHoursString(ad.hourStart),
        hourEnd: convertMinutesToHoursString(ad.hourEnd)
      };
    })
  );
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  });

  return response.json({
    discord: ad.discord
  });
});

// PARA CADASTRAR JOGOS DO GAMELIST

// app.post("/game", async (request, response) => {
//   try {
//     for (let game of gameList) {
//       await prisma.game.create({
//         data: {
//           title: game.Jogo,
//           bannerUrl: game.Image
//         }
//       });
//     }
//     response.json({ message: "Jogo Criado!" });
//   } catch (error) {
//     response.json({ message: error });
//   }
// });
app.listen(3333, () => console.log("server is running"));
