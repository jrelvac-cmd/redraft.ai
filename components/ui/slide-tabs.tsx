import React, { useRef, useState, useEffect, useImperativeHandle } from "react";
import { motion } from "framer-motion";

export const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [selected]);

  return (
    <ul
      onMouseLeave={() => {
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect();
          setPosition({
            left: selectedTab.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1 dark:border-white dark:bg-neutral-800"
    >
      {["Home", "Pricing", "Features", "Docs", "Blog"].map((tab, i) => (
        <li
          key={tab}
          ref={(el: HTMLLIElement | null) => {
            if (el) tabsRef.current[i] = el;
          }}
          onClick={() => setSelected(i)}
          onMouseEnter={() => {
            const el = tabsRef.current[i];
            if (!el) return;

            const { width } = el.getBoundingClientRect();

            setPosition({
              left: el.offsetLeft,
              width,
              opacity: 1,
            });
          }}
          className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
        >
          {tab}
        </li>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black dark:bg-white md:h-12"
    />
  );
};
