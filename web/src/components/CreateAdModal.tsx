import { Check, GameController } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Input } from "./Input";
import { GameSelect } from "./GameSelect";
import { useState, FormEvent } from "react";
import { InputTime } from "./InputTime";
import axios from "axios";

export function CreateAdModal() {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [gameSelected, setGameSelected] = useState("");
  const [useVoiceChannel, setVoiceChannel] = useState(false);

  function handleCreateAd(event: FormEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (
      !data.name ||
      !data.yearsPlaying ||
      !data.discord ||
      !data.hourStart ||
      !data.hourEnd ||
      !gameSelected ||
      !weekDays
    ) {
      event.preventDefault();
      return alert("O todos os campos devem ser preenchidos");
    }

    try {
      axios.post(`http://localhost:3333/games/${gameSelected}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChaneel: useVoiceChannel
      });

      alert("Anúncio criado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar anúncio!");
    }
  }

  function handleSelectGame(gameSelected: string) {
    setGameSelected(gameSelected);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed z-10">
        <Dialog.Content className="fixed bg-[#2A2634]  py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black">
            Públique um anúncio
          </Dialog.Title>

          <form onSubmit={handleCreateAd} className="flex flex-col gap-4  mt-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>
              <GameSelect handleSelectGame={handleSelectGame} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                name="name"
                type="text"
                id="name"
                placeholder="Como te chamam no game"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga hã quantos anos?</label>
                <Input
                  name="yearsPlaying"
                  type="number"
                  id="yearsPlaying"
                  placeholder="Tudo bem ser Zero"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu Discord</label>
                <Input
                  name="discord"
                  type="text"
                  id="discord"
                  placeholder="Usuário#0000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Domingo"
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Segunda"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Terça"
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Quarta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Quinta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Sexta"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Sábado"
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-1 gap-2">
                  <InputTime
                    name="hourStart"
                    type="time"
                    id="hourStart"
                    placeholder="De"
                  />
                  <InputTime
                    name="hourEnd"
                    type="time"
                    id="hourEnd"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex gap-2 text-sm items-center">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setVoiceChannel(true);
                  } else {
                    setVoiceChannel(false);
                  }
                }}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
              >
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                <GameController className="w-6 h-6" />
                Encontar Duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
