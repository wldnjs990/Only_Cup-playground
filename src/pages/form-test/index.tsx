'use client';

import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FORM_SCHEMA_MOCK } from '../../constants/form_schema_mock';
import type { EvaluationRootSchema } from '../../hooks/useFormResult';

export default function FormTest() {
  useEffect(() => {
    const tabs:string[] = FORM_SCHEMA_MOCK.evaluation_schemas.forEach((schema) => {
      return schema.title;
    });
    setSelectedTab(()=>tabs)
  }, []);
  const [selectedTab, setSelectedTab] = useState<string>(tabs);

  const tabsStyles = 'flex flex-col';
  const [test, setTest] = useState<EvaluationRootSchema>(FORM_SCHEMA_MOCK);

  return (
    <div className="flex h-full w-full flex-row-reverse rounded-lg bg-white shadow-xl/20">
      <nav className="bg-[#fdfdfd] px-5 py-2">
        <ul className={twMerge(tabsStyles, 'w-40')}>
          {test.evaluation_schemas.map((item) => (
            <motion.li
              key={item.id}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? '#eee' : '#eee0',
              }}
              style={tab}
              onClick={() => setSelectedTab(item)}
            >
              {item.title}
              {item === selectedTab ? (
                <motion.div style={underline} layoutId="underline" id="underline" />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main style={iconContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : 'empty'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={icon}
          >
            {selectedTab ? selectedTab.icon : '😋'}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
const tabsStyles: React.CSSProperties = {
  padding: 0,
  margin: 0,
  fontWeight: 500,
  fontSize: 14,
  display: 'flex',
  flexDirection: 'column',
};
const tabsContainer: React.CSSProperties = {
  ...tabsStyles,
  display: 'flex',
  width: '100%',
};

const tab: React.CSSProperties = {
  ...tabsStyles,
  borderRadius: 5,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  width: '100%',
  padding: '10px 15px',
  position: 'relative',
  background: 'white',
  cursor: 'pointer',
  height: 24,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
  userSelect: 'none',
  color: '#0f1115',
};

const underline: React.CSSProperties = {
  position: 'absolute',
  bottom: -2,
  left: 0,
  right: 0,
  height: 2,
  background: 'var(--accent)',
};

const iconContainer: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};

const icon: React.CSSProperties = {
  fontSize: 128,
};

/**
 * ==============   Data   ================
 */

const allIngredients = [
  { icon: '🍅', label: 'Tomato' },
  { icon: '🥬', label: 'Lettuce' },
  { icon: '🧀', label: 'Cheese' },
  { icon: '🥕', label: 'Carrot' },
  { icon: '🍌', label: 'Banana' },
  { icon: '🫐', label: 'Blueberries' },
  { icon: '🥂', label: 'Champers?' },
];

const [tomato, lettuce, cheese] = allIngredients;
const tabs = [tomato, lettuce, cheese];
