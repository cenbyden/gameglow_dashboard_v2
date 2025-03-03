import React from 'react';
import { Play, Gift, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';

const Dashboard: React.FC = () => {
  return (
    <div className="page-transition w-full max-w-md mx-auto px-4 pb-24 pt-8">
      <header className="mb-6">
        <div className="flex items-center justify-center">
          <Logo size="lg" className="py-2" />
        </div>
      </header>

      {/* Main Play Button */}
      <div className="my-10 flex justify-center">
        <Button 
          className="w-40 h-40 rounded-full bg-accent-purple hover:bg-accent-purple/90 text-white play-breathing-glow hover-scale"
          aria-label="Play game"
        >
          <div className="flex flex-col items-center justify-center">
            <Play className="w-12 h-12 mb-1" fill="white" />
            <span className="text-xl font-bold">PLAY</span>
          </div>
        </Button>
      </div>

      {/* Player Status Card */}
      <Card className="glass mb-6 p-4 rounded-2xl border-none">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Current Status</h3>
            <p className="text-sm text-gray-300">Level 36 - Master</p>
          </div>
          <div className="flex">
            <div className="flex items-center mr-3">
              <Zap className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">1,280</span>
            </div>
            <div className="glass-dark rounded-full px-3 py-1">
              <span className="text-xs font-semibold">ONLINE</span>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-black/20 rounded-full h-2">
          <div className="bg-accent-purple h-2 rounded-full w-3/4"></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">Next level</span>
          <span className="text-xs font-medium">75%</span>
        </div>
      </Card>

      {/* Daily Rewards */}
      <h2 className="text-xl font-semibold mb-3">Daily Rewards</h2>
      <Card className="glass mb-6 p-4 rounded-2xl border-none">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Day 3 Reward</h3>
            <p className="text-sm text-gray-300">Claim your daily bonus</p>
          </div>
          <Button className="rounded-xl bg-accent-purple hover:bg-accent-purple/90 hover-scale">
            <Gift className="w-4 h-4 mr-2" />
            <span>Claim</span>
          </Button>
        </div>
        <div className="flex justify-between mt-4">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div 
              key={day} 
              className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg ${
                day < 3 ? 'bg-accent-purple/30 text-gray-300' : 
                day === 3 ? 'bg-accent-purple text-white' : 
                'bg-black/20 text-gray-400'
              }`}
            >
              <span className="text-xs">{day}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activities */}
      <h2 className="text-xl font-semibold mb-3">Recent Activities</h2>
      <div className="grid gap-3">
        {[
          { title: 'New Achievement', desc: 'First Blood: Kill 10 enemies in a row', time: '2h ago' },
          { title: 'Level Up', desc: 'You reached Level 36', time: '1d ago' },
          { title: 'New Item', desc: 'Received: Legendary Sword', time: '2d ago' }
        ].map((activity, index) => (
          <Card key={index} className="glass p-3 rounded-2xl border-none hover-scale">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <h4 className="text-sm font-semibold">{activity.title}</h4>
                <p className="text-xs text-gray-300">{activity.desc}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
