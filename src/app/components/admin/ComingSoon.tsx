import React from 'react';

interface ComingSoonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-12 shadow-md text-center">
      {icon}
      <h2 className="text-2xl font-bold text-gray-900 mb-2 mt-4">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ComingSoon;