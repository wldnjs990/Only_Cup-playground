import clsx from 'clsx';
import * as motion from 'motion/react-client';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
export default function App() {
  const arr = Array(5).fill(0);
  const [boxSelected, setBoxSelected] = useState<number | 'all'>('all');
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <div className="flex gap-3">
        {arr.map((_, idx) => {
          return (
            <Box
              key={idx}
              title={'옵션' + idx}
              idx={idx}
              boxSelected={boxSelected}
              setBoxSelected={setBoxSelected}
            />
          );
        })}
      </div>
    </div>
  );
}

function Box({
  title,
  idx,
  boxSelected,
  setBoxSelected,
}: {
  title: string;
  idx: number;
  boxSelected: number | 'all';
  setBoxSelected: React.Dispatch<React.SetStateAction<number | 'all'>>;
}) {
  return (
    <motion.button
      className={twMerge(
        'flex h-25 w-25 items-center justify-center rounded-2xl border-2 border-amber-300',
        clsx(boxSelected === idx || boxSelected === 'all' ? 'block' : 'hidden'),
      )}
      initial={{ backgroundColor: '#ffffff' }}
      whileHover={{ backgroundColor: '#fbbf24' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onClick={() => setBoxSelected((prev) => (prev === idx ? 'all' : idx))}
    >
      {title}
    </motion.button>
  );
}

function HideOptions() {
  return (
    <div>
      <motion.button></motion.button>
    </div>
  );
}
