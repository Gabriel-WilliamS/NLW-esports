import * as Select from "@radix-ui/react-select";
import { Check, CaretDown, CaretUp } from "phosphor-react";
import { useEffect, useState } from "react";
import axios from "axios";
interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

interface GameSelectProps {
  handleSelectGame: (gameSelected: string) => void;
}

export function GameSelect({ handleSelectGame }: GameSelectProps) {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) =>
      setGames(response.data)
    );
  }, []);

  return (
    <Select.Root
      onValueChange={(gameSelected) => handleSelectGame(gameSelected)}
    >
      <Select.SelectTrigger
        aria-label="Game"
        className="bg-zinc-900  py-3 px-4 rounded text-sm text-zinc-500 flex justify-between relative items-center "
      >
        <Select.SelectValue placeholder="Selecione o game que deseja jogar" />
        <Select.SelectIcon>
          <CaretDown size={24} className="text-zinc-400 " />
        </Select.SelectIcon>
      </Select.SelectTrigger>
      <Select.Portal>
        <Select.SelectContent className="bg-zinc-900 z-20 border-zinc-700 border-solid border-2 rounded absolute top-0 left-0 right-0">
          <Select.SelectScrollUpButton className="flex items-center justify-center">
            <CaretUp size={24} className="text-zinc-400 " />
          </Select.SelectScrollUpButton>
          <Select.SelectViewport className="max-h-[500px] ">
            <Select.SelectGroup>
              {games.map((game) => {
                return (
                  <Select.SelectItem
                    className="flex items-center justify-between py-2 px-3 m-1  bg-zinc-900 text-zinc-500 cursor-pointer rounded hover:bg-zinc-800 hover:text-white"
                    value={game.id}
                    key={game.id}
                  >
                    <Select.SelectItemText>{game.title}</Select.SelectItemText>
                    <Select.SelectItemIndicator>
                      <Check size={24} className="text-emerald-500" />
                    </Select.SelectItemIndicator>
                  </Select.SelectItem>
                );
              })}
            </Select.SelectGroup>
          </Select.SelectViewport>
          <Select.ScrollDownButton className="flex items-center justify-center">
            <CaretDown size={24} className="text-zinc-400" />
          </Select.ScrollDownButton>
        </Select.SelectContent>
      </Select.Portal>
    </Select.Root>
  );
}
