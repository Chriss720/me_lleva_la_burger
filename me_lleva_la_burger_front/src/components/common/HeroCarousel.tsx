import { useState, useEffect } from 'react';

const images = [
    "https://res.cloudinary.com/dfqymzb25/image/upload/v1765673876/b_papas_huoboi.png",
    "https://res.cloudinary.com/dfqymzb25/image/upload/v1765673876/b_bbq_s0rgda.png",
    "https://res.cloudinary.com/dfqymzb25/image/upload/v1765673876/b_coca_aiocli.png",
    "https://res.cloudinary.com/dfqymzb25/image/upload/v1765673876/b_vegana_ksiaet.png"
];

export const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-6xl h-[500px] md:h-[650px] flex items-center justify-center">
            {/* Images */}
            {images.map((img, index) => (
                <img
                    key={img}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full object-contain transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        } hover:scale-105 transition-transform duration-500`}
                    style={{
                        filter: 'drop-shadow(0 0 20px rgba(255,199,44,0.3))'
                    }}
                />
            ))}

            {/* Dots/Indicators */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-[#FFC72C] w-8'
                            : 'bg-gray-600 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
