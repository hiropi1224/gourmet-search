import { IconStar, IconShare2, IconMapSearch } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';

const footer = tv({
  slots: {
    base: 'fixed bottom-[0vh] w-full py-2',
    nav: 'gap-6 mx-4 flex justify-around',
    text: 'text-xs',
    iconArea: 'flex flex-col items-center text-sm',
  },
});

const { base, nav, text, iconArea } = footer();

export const Footer: React.FC = () => {
  return (
    <footer className={base()}>
      <nav className={nav()}>
        <button className={iconArea()}>
          <IconStar size={24} />
          <p className={text()}>お気に入り</p>
        </button>

        <button className={iconArea()}>
          <IconShare2 size={24} />
          <p className={text()}>共有</p>
        </button>
        <button className={iconArea()}>
          <IconMapSearch size={24} />
          <p className={text()}>Mapを開く</p>
        </button>
      </nav>
    </footer>
  );
};
