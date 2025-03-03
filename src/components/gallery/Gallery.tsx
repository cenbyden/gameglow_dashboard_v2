import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageModal, { ImageData } from './ImageModal';
import './Gallery.css';

const Gallery: React.FC = () => {
  const [searchVisible, setSearchVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState<Array<string | null>>(Array(30).fill(null));
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star, X } from 'lucide-react';
import ImageModal, { ImageData } from './ImageModal';
import './Gallery.css';

const Gallery: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState<Array<string | null>>(Array(30).fill(null));
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Mock image data with metadata
  const mockImageData: ImageData[] = Array.from({ length: 30 }, (_, i) => ({
    id: `img-${i}`,
    src: `https://picsum.photos/400/400?random=${i}`,
    tags: getRandomTags(),
    dateEdited: getRandomDate(),
    dimensions: getRandomDimensions(),
    isFavorite: false
  }));

  // Generate random metadata for demo purposes
  function getRandomTags() {
    const allTags = ['Nature', 'Urban', 'Portrait', 'Landscape', 'Architecture', 
                     'Travel', 'Food', 'Animal', 'Sport', 'Abstract', 'Black & White',
                     'Macro', 'Night', 'Street', 'Water', 'Mountain', 'Beach', 'Forest',
                     'Sunset', 'Vintage', 'Minimal', 'People', 'City', 'Summer', 'Winter',
                     'Spring', 'Autumn', 'Wildlife', 'Texture', 'Pattern', 'Aerial', 'Underwater'];
    
    const count = Math.floor(Math.random() * 5) + 1; // 1-5 tags
    const tags = new Set<string>();
    
    while(tags.size < count) {
      const randomIndex = Math.floor(Math.random() * allTags.length);
      tags.add(allTags[randomIndex]);
    }
    
    return Array.from(tags);
  }
  
  function getRandomDate() {
    const start = new Date(2022, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    return randomDate.toLocaleDateString('en-GB') + ' ' + 
           randomDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }
  
  function getRandomDimensions() {
    const widths = [1920, 1280, 3840, 2560, 1440, 720];
    const heights = [1080, 720, 2160, 1440, 900, 480];
    
    const randomIndex = Math.floor(Math.random() * widths.length);
    return `${widths[randomIndex]}×${heights[randomIndex]}px`;
  }

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      const loadedImages = mockImageData.map(img => img.src);
      setImages(loadedImages);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we should show or hide the header
      if (currentScrollY > 100) {
        setHeaderVisible(currentScrollY < lastScrollY);
      } else {
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleImageClick = (index: number) => {
    const imageData = {
      ...mockImageData[index],
      isFavorite: favorites.has(mockImageData[index].id)
    };
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleFavoriteToggle = (id: string, event?: React.MouseEvent) => {
    // Prevent the click from propagating to parent elements
    if (event) {
      event.stopPropagation();
    }
    
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      
      // Update the selected image if it's currently open
      if (selectedImage && selectedImage.id === id) {
        setSelectedImage({
          ...selectedImage,
          isFavorite: !selectedImage.isFavorite
        });
      }
      
      return newFavorites;
    });
  };

  const toggleFavoritesFilter = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
  };

  // Filter images based on search query and favorites filter
  const filteredImages = images.filter((src, index) => {
    if (!src) return false;
    
    const imageId = mockImageData[index].id;
    const matchesSearch = mockImageData[index].tags.some(tag => 
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (showOnlyFavorites) {
      return favorites.has(imageId) && (searchQuery === '' || matchesSearch);
    }
    
    return searchQuery === '' || matchesSearch;
  });

  return (
    <div className="page-transition w-full max-w-7xl mx-auto px-4 pb-24 pt-8">
      <header className={`mb-6 sticky top-0 z-50 transition-all duration-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-medium text-accent-purple">GALLERY</span>
            <h1 className="text-2xl font-bold">Gallery</h1>
          </div>
        </div>
        
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-lg shadow-sm w-full max-w-[90vw] mx-auto">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleFavoritesFilter}
              className={`${showOnlyFavorites ? 'bg-accent-purple text-white' : ''} min-w-10`}
              aria-label={showOnlyFavorites ? "Show all images" : "Show favorites only"}
            >
              <Star className={`h-4 w-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setSearchQuery('')}
              className="min-w-10"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {filteredImages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64">
          <Star className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">
            {showOnlyFavorites 
              ? "No favorite images found. Add some favorites!" 
              : "No images match your search criteria."}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-[90vw] mx-auto">
        {images.map((src, index) => {
          const imageId = mockImageData[index].id;
          const isFavorite = favorites.has(imageId);
          
          // Skip rendering if filtered out
          if (showOnlyFavorites && !isFavorite) return null;
          if (searchQuery && !mockImageData[index].tags.some(tag => 
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )) return null;
          
          return (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
            >
              <div 
                className="w-full h-full"
                onClick={() => src && handleImageClick(index)}
              >
                <AspectRatio ratio={1}>
                  {src ? (
                    <img
                      src={src}
                      alt=""
                      className="object-cover w-full h-full transition-opacity duration-300 opacity-0"
                      onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('opacity-100')}
                      loading="lazy"
                    />
                  ) : (
                    <Skeleton className="w-full h-full" />
                  )}
                </AspectRatio>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Favorite button - always visible on mobile, visible on hover for desktop */}
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => handleFavoriteToggle(imageId, e)}
                className={`absolute bottom-2 right-2 z-10 size-8 sm:size-9 transition-all duration-200 
                  ${isFavorite ? 'bg-accent-purple text-white' : 'bg-black/50 hover:bg-black/70'} 
                  sm:opacity-0 sm:group-hover:opacity-100 favorite-button`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              
              {/* Favorite indicator - always visible */}
              {isFavorite && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-accent-purple text-white rounded-full p-1 shadow-md">
                    <Star className="h-3 w-3 fill-current" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Image Modal */}
      <ImageModal 
        image={selectedImage} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
};

export default Gallery;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Mock image data with metadata
  const mockImageData: ImageData[] = Array.from({ length: 30 }, (_, i) => ({
    id: `img-${i}`,
    src: `https://picsum.photos/400/400?random=${i}`,
    tags: getRandomTags(),
    dateEdited: getRandomDate(),
    dimensions: getRandomDimensions(),
    isFavorite: false
  }));

  // Generate random metadata for demo purposes
  function getRandomTags() {
    const allTags = ['Nature', 'Urban', 'Portrait', 'Landscape', 'Architecture', 
                     'Travel', 'Food', 'Animal', 'Sport', 'Abstract', 'Black & White',
                     'Macro', 'Night', 'Street', 'Water', 'Mountain', 'Beach', 'Forest',
                     'Sunset', 'Vintage', 'Minimal', 'People', 'City', 'Summer', 'Winter',
                     'Spring', 'Autumn', 'Wildlife', 'Texture', 'Pattern', 'Aerial', 'Underwater'];
    
    const count = Math.floor(Math.random() * 5) + 1; // 1-5 tags
    const tags = new Set<string>();
    
    while(tags.size < count) {
      const randomIndex = Math.floor(Math.random() * allTags.length);
      tags.add(allTags[randomIndex]);
    }
    
    return Array.from(tags);
  }
  
  function getRandomDate() {
    const start = new Date(2022, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    return randomDate.toLocaleDateString('en-GB') + ' ' + 
           randomDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }
  
  function getRandomDimensions() {
    const widths = [1920, 1280, 3840, 2560, 1440, 720];
    const heights = [1080, 720, 2160, 1440, 900, 480];
    
    const randomIndex = Math.floor(Math.random() * widths.length);
    return `${widths[randomIndex]}×${heights[randomIndex]}px`;
  }

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      const loadedImages = mockImageData.map(img => img.src);
      setImages(loadedImages);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setSearchVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleImageClick = (index: number) => {
    const imageData = {
      ...mockImageData[index],
      isFavorite: favorites.has(mockImageData[index].id)
    };
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleFavoriteToggle = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      
      // Update the selected image if it's currently open
      if (selectedImage && selectedImage.id === id) {
        setSelectedImage({
          ...selectedImage,
          isFavorite: !selectedImage.isFavorite
        });
      }
      
      return newFavorites;
    });
  };

  return (
    <div className="page-transition w-full max-w-7xl mx-auto px-4 pb-24 pt-8">
      <header className="mb-6 sticky top-0 z-50">
        <div className={`transition-all duration-300 ${searchVisible ? 'translate-y-0' : '-translate-y-20'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-medium text-accent-purple">GALLERY</span>
              <h1 className="text-2xl font-bold">Gallery</h1>
            </div>
          </div>
          
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-lg shadow-sm">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon" onClick={() => setSearchQuery('')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4 w-full max-w-[90vw] mx-auto">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer hover-scale"
            style={{ maxWidth: '30vw' }}
            onClick={() => src && handleImageClick(index)}
          >
            <AspectRatio ratio={1}>
              {src ? (
                <img
                  src={src}
                  alt=""
                  className="object-cover w-full h-full transition-opacity duration-300 opacity-0"
                  onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('opacity-100')}
                  loading="lazy"
                />
              ) : (
                <Skeleton className="w-full h-full" />
              )}
            </AspectRatio>
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            {favorites.has(`img-${index}`) && (
              <div className="absolute top-2 right-2 z-10">
                <Heart className="h-5 w-5 text-accent-purple fill-accent-purple" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <ImageModal 
        image={selectedImage} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
};

// Heart icon component for favorites
const Heart = ({ className }: { className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className}
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default Gallery;
