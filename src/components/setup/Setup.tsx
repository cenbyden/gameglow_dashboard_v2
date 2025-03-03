import React from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Volume2, 
  Vibrate, 
  Gamepad2, 
  Cog, 
  CloudSun, 
  Accessibility,
  Languages
} from 'lucide-react';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  control: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, title, description, control }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center">
        <div className="mr-3 p-2 rounded-full bg-dark-nav">
          {icon}
        </div>
        <div className="text-left">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
      <div>{control}</div>
    </div>
  );
};

const Setup: React.FC = () => {
  return (
    <div className="page-transition w-full max-w-md mx-auto px-4 pb-24 pt-8">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-accent-purple">SETTINGS</span>
            <h1 className="text-2xl font-bold">Game Setup</h1>
          </div>
          <div className="glass rounded-full p-2">
            <Cog className="w-5 h-5 text-accent-purple" />
          </div>
        </div>
      </header>
      
      <Card className="glass mb-6 p-4 rounded-2xl border-none">
        <h2 className="text-lg font-semibold mb-3">Sound & Haptics</h2>
        
        <SettingItem
          icon={<Volume2 className="w-4 h-4" />}
          title="Master Volume"
          description="Adjust overall game volume"
          control={
            <div className="w-32">
              <Slider defaultValue={[75]} max={100} step={1} />
            </div>
          }
        />
        
        <SettingItem
          icon={<Vibrate className="w-4 h-4" />}
          title="Haptic Feedback"
          description="Vibration on events"
          control={<Switch defaultChecked />}
        />
      </Card>
      
      <Card className="glass mb-6 p-4 rounded-2xl border-none">
        <h2 className="text-lg font-semibold mb-3">Gameplay</h2>
        
        <SettingItem
          icon={<Gamepad2 className="w-4 h-4" />}
          title="Controller Support"
          description="Enable gamepad controls"
          control={<Switch defaultChecked />}
        />
        
        <SettingItem
          icon={<CloudSun className="w-4 h-4" />}
          title="Dynamic Weather"
          description="Change weather during gameplay"
          control={<Switch defaultChecked />}
        />
      </Card>
      
      <Card className="glass mb-6 p-4 rounded-2xl border-none">
        <h2 className="text-lg font-semibold mb-3">Preferences</h2>
        
        <SettingItem
          icon={<Accessibility className="w-4 h-4" />}
          title="Accessibility Mode"
          description="Enhanced visual aids"
          control={<Switch />}
        />
        
        <SettingItem
          icon={<Languages className="w-4 h-4" />}
          title="Language"
          description="Currently set to English"
          control={
            <div className="text-xs px-3 py-1 rounded-full bg-dark-nav">
              English
            </div>
          }
        />
      </Card>
      
    </div>
  );
};

export default Setup;
