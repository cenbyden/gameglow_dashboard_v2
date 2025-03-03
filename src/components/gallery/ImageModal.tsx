import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Download, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export interface ImageData {
  id: string;
  src: string;
  tags?: string[];
  dateEdited?: string;
  dimensions?: string;
  isFavorite?: boolean;
}

interface ImageModalProps {
  image: ImageData | null;
  isOpen: boolean;
  onClose: () => void;
  onFavoriteToggle: (id: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  image, 
  isOpen, 
  onClose,
  onFavoriteToggle
}) => {
  if (!image) return null;

  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `image-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 gap-0 bg-transparent border-none">
        <VisuallyHidden>
          <DialogTitle>Image Details</DialogTitle>
        </VisuallyHidden>
        <div className="flex h-[85vh] rounded-lg overflow-hidden">
          {/* Image Container */}
          <div className="flex-1 bg-black flex items-center justify-center relative">
            <img 
              src={image.src} 
              alt="" 
              className="max-h-full max-w-full object-contain"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 left-4 rounded-full bg-black/50 hover:bg-black/70 text-white"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Info Panel */}
          <div className="w-80 bg-dark glass-dark p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-6">Image Details</h3>
            
            {/* Tags */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-400 mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {image.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-dark-nav text-gray-300">
                    {tag}
                  </Badge>
                )) || <span className="text-gray-500 text-sm">No tags</span>}
              </div>
            </div>
            
            {/* Date */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-400 mb-2">Date Edited:</h4>
              <p className="text-sm">{image.dateEdited || 'Unknown'}</p>
            </div>
            
            {/* Size */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-400 mb-2">Size:</h4>
              <p className="text-sm">{image.dimensions || 'Unknown'}</p>
            </div>
            
            {/* Actions */}
            <div className="mt-auto flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 bg-dark-nav hover:bg-accent-purple hover:text-white"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button 
                variant="outline" 
                className={`w-12 ${image.isFavorite ? 'bg-accent-purple text-white' : 'bg-dark-nav'}`}
                onClick={() => onFavoriteToggle(image.id)}
              >
                <Heart className={`h-4 w-4 ${image.isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;