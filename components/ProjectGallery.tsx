import React, { useState, useEffect, useCallback } from 'react';
import AnimatedSection from './AnimatedSection';

// Icons for the Lightbox
const CloseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

interface Album {
  id: number;
  title: string;
  coverUrl: string;
  images: string[];
}

// Data from user request
const albums: Album[] = [
  {
    id: 1,
    title: "Gallery One",
    // Converted to direct Imgur links
    coverUrl: "https://i.imgur.com/XsNoftC.png",
    images: [
      "https://i.imgur.com/z1obWzI.png",
      "https://i.imgur.com/a3pW3yp.png",
      "https://i.imgur.com/dfFQHvD.png",
      "https://i.imgur.com/E0kbR9L.png"
    ]
  },
  {
    id: 2,
    title: "Gallery Two",
    coverUrl: "https://i.imgur.com/88IObhf.png",
    images: [
      "https://i.imgur.com/C7UxcFT.png",
      "https://i.imgur.com/YO2mes6.png",
      "https://i.imgur.com/XNaBc8o.png",
      "https://i.imgur.com/rL7mkGu.png",
      "https://i.imgur.com/vmKT1H3.png",
      "https://i.imgur.com/W9zcbBm.png",
      "https://i.imgur.com/Q8RxuXj.png",
      "https://i.imgur.com/ufIE8xu.png",
      "https://i.imgur.com/600Lqb2.png",
      "https://i.imgur.com/dW9vCJ5.png",
      "https://i.imgur.com/Jv3ZbX3.png",
      "https://i.imgur.com/3bUhnrh.png",
      "https://i.imgur.com/We0X1Fz.png"
    ]
  }
];

const ProjectGallery: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAlbum(null), 300);
    document.body.style.overflow = 'auto';
  };

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedAlbum) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedAlbum.images.length);
    }
  }, [selectedAlbum]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedAlbum) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length);
    }
  }, [selectedAlbum]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, nextImage, prevImage]);

  return (
    <div className="mb-20">
       {/* Grid of Albums */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
         {albums.map((album, index) => (
            <AnimatedSection key={album.id} delay={index * 100}>
              <div 
                onClick={() => openAlbum(album)}
                // Updated aspect ratio to match 808x632 pixels (approx 1.28)
                className="group relative aspect-[808/632] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/10 bg-brand-dark-2"
              >
                {/* Album Cover */}
                <img 
                    src={album.coverUrl} 
                    alt={album.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                    decoding="async"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <span className="bg-brand-blue-500 text-white px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg">
                            View Album
                        </span>
                    </div>
                </div>

                {/* Album Title Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <h3 className="text-white font-bold text-xl">{album.title}</h3>
                    <p className="text-gray-300 text-sm">{album.images.length} Photos</p>
                </div>
              </div>
            </AnimatedSection>
         ))}
       </div>

       {/* Full Screen Lightbox Modal */}
       {isModalOpen && selectedAlbum && (
         <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center transition-opacity duration-300">
            {/* Close Button */}
            <button 
                onClick={closeModal} 
                className="absolute top-6 right-6 text-gray-400 hover:text-white z-20 p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close Gallery"
            >
                <CloseIcon className="w-8 h-8" />
            </button>
            
            {/* Prev Button */}
            <button 
                onClick={prevImage} 
                className="absolute left-4 md:left-8 text-gray-400 hover:text-white z-20 p-3 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
                aria-label="Previous Image"
            >
                <ChevronLeftIcon className="w-10 h-10" />
            </button>
            
            {/* Main Image Container */}
            <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-12" onClick={closeModal}>
                <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                    <img 
                        key={currentImageIndex} // Key forces re-render for animation
                        src={selectedAlbum.images[currentImageIndex]} 
                        alt={`Gallery image ${currentImageIndex + 1}`}
                        className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-pop-in"
                    />
                    
                    {/* Image Counter */}
                    <div className="absolute -bottom-10 left-0 right-0 text-center text-gray-400 text-sm font-medium tracking-widest">
                        {currentImageIndex + 1} / {selectedAlbum.images.length}
                    </div>
                </div>
            </div>

            {/* Next Button */}
            <button 
                onClick={nextImage} 
                className="absolute right-4 md:right-8 text-gray-400 hover:text-white z-20 p-3 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
                aria-label="Next Image"
            >
                <ChevronRightIcon className="w-10 h-10" />
            </button>
         </div>
       )}
    </div>
  );
};

export default ProjectGallery;