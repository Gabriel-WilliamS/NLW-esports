import { GameBanner } from "./components/GameBanner";
import "./styles/main.css";
import logoImg from "./assets/logo-nlw-esports.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

interface Game {
  bannerUrl: string;
  id: string;
  title: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games-with-ads").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center">
      <img className=" my-20" src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black">
        Seu{" "}
        <span className="bg-nlw-gradient text-transparent bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <Swiper
        slidesPerView={7}
        spaceBetween={24}
        freeMode={true}
        modules={[Navigation]}
        className="mySwiper mt-16"
      >
        {games.length > 0 &&
          games.map((game) => (
            <SwiperSlide key={game.id}>
              <GameBanner
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
