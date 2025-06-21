import React from 'react';
import { Quote, Sparkles, Target, TrendingUp, Heart } from 'lucide-react';
import { MotivationalMessage } from '../types';

interface MessageDisplayProps {
  message: MotivationalMessage;
  onNewMessage: () => void;
  onTestNotification: () => void;
}

const categoryIcons = {
  quote: Quote,
  personal: Heart,
  achievement: Target,
  resilience: Sparkles,
  growth: TrendingUp
};

const categoryColors = {
  quote: 'from-purple-500 to-pink-500',
  personal: 'from-blue-500 to-cyan-500',
  achievement: 'from-green-500 to-emerald-500',
  resilience: 'from-yellow-500 to-orange-500',
  growth: 'from-indigo-500 to-purple-500'
};

export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  onNewMessage,
  onTestNotification
}) => {
  const IconComponent = categoryIcons[message.category];
  const gradientColor = categoryColors[message.category];

  return (
    <div className="space-y-6">
      {/* Main Message Card */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradientColor} p-8 text-white shadow-2xl`}>
        <div className="absolute top-4 right-4">
          <IconComponent className="w-8 h-8 opacity-30" />
        </div>
        
        <div className="relative z-10">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              {message.category.charAt(0).toUpperCase() + message.category.slice(1)}
            </span>
          </div>
          
          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
            "{message.text}"
          </blockquote>
          
          {message.author && (
            <cite className="text-lg opacity-90 font-medium">
              — {message.author}
            </cite>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onNewMessage}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Get New Message
        </button>
        
        <button
          onClick={onTestNotification}
          className="flex-1 bg-white text-gray-700 px-6 py-4 rounded-2xl font-semibold shadow-lg border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Test Notification
        </button>
      </div>
    </div>
  );
};