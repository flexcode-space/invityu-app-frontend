import React, { FC } from 'react';
import LottiePlayer from './LottiePlayer';

type EmptyStateProps = {
  title: string;
  description?: string;
  src?: string;
  className?: string;
};

const EmptyState: FC<EmptyStateProps> = ({ title, description, src, className }) => {
  const animation = src || 'https://assets10.lottiefiles.com/datafiles/vhvOcuUkH41HdrL/data.json';

  return (
    <div className={`text-center space-y-1 ${className}`}>
      <LottiePlayer src={animation} />
      <div className="text-gray-500">{title}</div>
      {description && <div className="text-sm text-gray-400">{description}</div>}
    </div>
  );
};

export default EmptyState;
