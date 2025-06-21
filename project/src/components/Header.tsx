import React from 'react';
import { Heart, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Motivational Coach
        </h1>
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
          <Zap className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Stay motivated and focused with personalized messages delivered right to your browser. 
        Your personal coach is here to keep you energized and inspired throughout the day.
      </p>
    </header>
  );
};