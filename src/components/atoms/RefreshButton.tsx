import { useRef, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { motion } from "framer-motion";
import useStore from "../../../store";
import { useParams } from "react-router-dom";

const RefreshButton = () => {
  return (
    <div className="grid py-2 drop-shadow-md">
      <EncryptButton />
    </div>
  );
};

const TARGET_TEXT = "Refresh";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton = () => {
  const { pageNumber = 1 } = useParams();
  const { fetchData } = useStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [text, setText] = useState(TARGET_TEXT);
  const [isHovered, setIsHovered] = useState(false);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  return (
    <div className="relative inline-block">
      <motion.button
        onMouseEnter={() => {
          scramble();
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          stopScramble();
          setIsHovered(false);
        }}
        whileHover={{
          scale: 1.025,
        }}
        whileTap={{
          scale: 0.975,
        }}
        className="group relative overflow-hidden rounded-lg border-[1px] border-neutral-500 bg-neutral-700 px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-indigo-300"
        onClick={() => fetchData(pageNumber || 1)}
      >
        <div className="relative z-10 flex items-center gap-2">
          <FiRefreshCcw />
          <span>{text}</span>
        </div>
        <motion.span
          initial={{
            y: "100%",
          }}
          animate={{
            y: "-100%",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          }}
          className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
        />
      </motion.button>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute px-2 py-1 mt-2 text-sm text-white transform -translate-x-1/2 bg-black rounded shadow-lg"
        >
          Refresh to update data
        </motion.div>
      )}
    </div>
  );
};

export default RefreshButton;
