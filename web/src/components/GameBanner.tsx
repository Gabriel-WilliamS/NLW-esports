interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={props.bannerUrl} />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient flex flex-col gap-1 absolute left-0 bottom-0 right-0 ">
        <strong className="font-bold text-white">{props.title}</strong>
        <span className="text-zinc-300 text-sm">
          {props.adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}
