import React, { useState } from 'react';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  title: string;
  children: React.ReactNode;
};

const Collapse: React.FC<Props> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="border border-gray-200 bg-white rounded-xl">
      <div
        className={`flex items-center px-5 py-4 cursor-pointer border-b text-primary-600 font-semibold ${
          isOpen ? 'border-gray-200' : 'border-transparent'
        }`}
        onClick={toggle}
      >
        <div className="flex-1 mr-2 mt-1">{title}</div>
        {isOpen ? <FiChevronDown className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-4 ">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collapse;
