import * as motion from 'motion/react-client';
export default function App() {
  const arr = Array(5).fill(0);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <div className="flex gap-3">
        {arr.map((_, idx) => {
          return <Box key={idx} />;
        })}
      </div>
    </div>
  );
}

function Box() {
  return (
    <motion.div
      className="flex h-25 w-25 items-center justify-center rounded-2xl bg-amber-500"
      whileHover={{ scale: 2 }}
      transition={{ duration: 0.3 }}
    >
      옵션1
    </motion.div>
  );
}
