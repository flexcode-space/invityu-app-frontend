import React, { FC, useState } from 'react';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  title: string;
  children: React.ReactNode;
  initialState?: boolean;
};

const Collapse: FC<Props> = ({ title, children, initialState = false }) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="border border-gray-200 bg-white rounded-xl">
      <motion.div
        className={`flex items-center px-5 py-4 cursor-pointer border-b text-primary-600 font-semibold ${
          isOpen ? 'border-gray-200' : 'border-transparent'
        }`}
        onClick={toggle}
        initial={{ backgroundColor: 'transparent' }}
        animate={{ backgroundColor: isOpen ? 'rgba(229, 229, 229, 0.05)' : 'transparent' }}
        whileHover={{ backgroundColor: 'rgba(229, 229, 229, 0.05)' }}
      >
        <div className="flex-1 mr-2 mt-1">{title}</div>
        {isOpen ? <FiChevronDown className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collapse;
