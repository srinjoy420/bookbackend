import React from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';

const Hero = ({ heroCount, setHeroCount, heroData }) => {
  const totalSlides = 4;

  return (
    <div className="text-center text-black px-4">
      <h2 className="text-2xl font-bold mb-2">{heroData.text1}</h2>
      <p className="mb-6">{heroData.text2}</p>

      {/* Dots for slide selection */}
      <div className="flex justify-center gap-4 mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setHeroCount(index)}
            className="focus:outline-none"
            title={`Slide ${index + 1}`}
          >
            {heroCount === index ? (
              <FaCircle className="text-blue-600" size={14} />
            ) : (
              <FaRegCircle className="text-gray-400 hover:text-blue-400" size={14} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
