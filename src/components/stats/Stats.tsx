import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sword, Shield, Clock, Target, Trophy, Zap } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface StatCounterProps {
  end: number;
  label: string;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, label, icon, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Simple animation for counter
    const duration = 1500; // ms
    const interval = 20; // ms
    const steps = duration / interval;
    const increment = end / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [end]);
  
  return (
    <Card className="glass p-4 rounded-2xl border-none hover-scale">
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-xl bg-accent-purple/20">
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <div className="text-xl font-bold">{prefix}{count.toLocaleString()}{suffix}</div>
          <div className="text-sm text-gray-300">{label}</div>
        </div>
      </div>
    </Card>
  );
};

const Stats: React.FC = () => {
  const stats = [
    { end: 142, label: 'Wins', icon: <Trophy className="w-5 h-5 text-yellow-400" /> },
    { end: 5680, label: 'Kills', icon: <Sword className="w-5 h-5 text-red-400" /> },
    { end: 89, label: 'Win Rate', icon: <Target className="w-5 h-5 text-green-400" />, suffix: '%' },
    { end: 76, label: 'Accuracy', icon: <Target className="w-5 h-5 text-blue-400" />, suffix: '%' },
    { end: 240, label: 'Hours Played', icon: <Clock className="w-5 h-5 text-purple-400" /> },
    { end: 3450, label: 'XP Earned', icon: <Zap className="w-5 h-5 text-yellow-400" /> }
  ];

  return (
    <div className="page-transition w-full max-w-md mx-auto px-4 pb-24 pt-8">
      <header className="mb-6">
        <div className="flex items-center justify-center">
          <Logo size="lg" className="py-2" />
        </div>
      </header>
      
      <div className="grid gap-4">
        {stats.map((stat, index) => (
          <StatCounter
            key={index}
            end={stat.end}
            label={stat.label}
            icon={stat.icon}
            prefix={stat.prefix || ''}
            suffix={stat.suffix || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;
