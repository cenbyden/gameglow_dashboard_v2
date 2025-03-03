import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Sword, 
  Shield, 
  Shirt, 
  Sparkles,
  Clock,
  Zap
} from 'lucide-react';

interface ShopItemProps {
  name: string;
  description: string;
  price: number;
  category: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500'
};

const ShopItem: React.FC<ShopItemProps> = ({ name, description, price, category, icon, rarity }) => {
  return (
    <Card className="glass border-none rounded-2xl overflow-hidden hover-scale">
      <div className={`${rarityColors[rarity]} h-1`}></div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-dark-nav px-2 py-0.5 rounded-full">{category}</span>
          <div className="flex items-center">
            <Zap className="w-3 h-3 text-yellow-400 mr-1" />
            <span className="text-sm font-bold">{price}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center my-3">
          <div className="p-4 rounded-full bg-dark-nav/50 mb-2">
            {icon}
          </div>
          <h3 className="text-sm font-bold">{name}</h3>
          <p className="text-xs text-gray-300 mt-1">{description}</p>
        </div>
        
        <Button className="w-full mt-2 rounded-xl bg-accent-purple hover:bg-accent-purple/90">
          Purchase
        </Button>
      </div>
    </Card>
  );
};

const Shop: React.FC = () => {
  const shopItems: ShopItemProps[] = [
    {
      name: "Frost Blade",
      description: "+15 Attack, +5% Critical Damage",
      price: 2000,
      category: "Weapon",
      icon: <Sword className="w-6 h-6 text-blue-400" />,
      rarity: "rare"
    },
    {
      name: "Dragonscale Armor",
      description: "+25 Defense, +10 Fire Resistance",
      price: 3500,
      category: "Armor",
      icon: <Shield className="w-6 h-6 text-red-400" />,
      rarity: "epic"
    },
    {
      name: "Shadow Cloak",
      description: "+10% Stealth, +5 Agility",
      price: 1800,
      category: "Apparel",
      icon: <Shirt className="w-6 h-6 text-purple-400" />,
      rarity: "rare"
    },
    {
      name: "Ancient Amulet",
      description: "+20% Magic Power, -10% Cooldowns",
      price: 4200,
      category: "Accessory",
      icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
      rarity: "legendary"
    },
    {
      name: "Speed Potion",
      description: "+30% Movement Speed for 5 minutes",
      price: 750,
      category: "Consumable",
      icon: <Clock className="w-6 h-6 text-green-400" />,
      rarity: "common"
    },
    {
      name: "Energy Crystal",
      description: "Instantly restore 50% of your energy",
      price: 1200,
      category: "Consumable",
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      rarity: "common"
    },
  ];

  return (
    <div className="page-transition w-full max-w-md mx-auto px-4 pb-24 pt-8">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-accent-purple">STORE</span>
            <h1 className="text-2xl font-bold">Game Shop</h1>
          </div>
          <div className="glass rounded-full p-2">
            <ShoppingCart className="w-5 h-5 text-accent-purple" />
          </div>
        </div>
      </header>
      
      <div className="mb-4 flex gap-2 overflow-x-auto py-1 scrollbar-none">
        {['All', 'Weapons', 'Armor', 'Consumables', 'Special'].map((category) => (
          <div 
            key={category}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
              category === 'All' 
                ? 'bg-accent-purple text-white' 
                : 'bg-dark-nav text-gray-300'
            }`}
          >
            {category}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {shopItems.map((item, index) => (
          <ShopItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
