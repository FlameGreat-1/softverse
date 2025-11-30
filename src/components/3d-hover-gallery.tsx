"use client";

import React, { useState } from "react";

export interface ThreeDHoverGalleryProps {
  images: string[];
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  perspective?: number;
  hoverScale?: number;
  transitionDuration?: number;
  grayscaleStrength?: number;
  brightnessLevel?: number;
  activeWidth?: number;
  rotationAngle?: number;
  zDepth?: number;
  enableKeyboardNavigation?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ThreeDHoverGallery: React.FC<ThreeDHoverGalleryProps> = ({
  images,
  itemWidth = 2,
  itemHeight = 8,
  gap = 0.2,
  perspective = 30,
  hoverScale = 8,
  transitionDuration = 0.6,
  grayscaleStrength = 0.5,
  brightnessLevel = 0.6,
  activeWidth = 20,
  rotationAngle = 20,
  zDepth = 5,
  enableKeyboardNavigation = true,
  autoPlay = true,
  autoPlayDelay = 3000,
  className = "",
  style = {},
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getTransform = (index: number) => {
    if (hoveredIndex === null) return "translateX(0)";
    
    const smallWidth = 90;
    const largeWidth = 220;
    const gapSize = gap * 16;
    
    // Calculate the exact distance to move to center position
    const widthDifference = (largeWidth - smallWidth) / 2;
    const positionShift = smallWidth + gapSize;
    
    // When first image (index 0) is hovered
    if (hoveredIndex === 0) {
      if (index === 0) {
        // First image moves to center
        return `translateX(${positionShift + widthDifference}px)`;
      } else if (index === 1) {
        // Middle image moves to first position
        return `translateX(-${positionShift + widthDifference}px)`;
      } else if (index === 2) {
        // Third image adjusts to stay visible on the right
        return `translateX(${widthDifference}px)`;
      }
    }
    
    // When third image (index 2) is hovered
    if (hoveredIndex === 2) {
      if (index === 2) {
        // Third image moves to center
        return `translateX(-${positionShift + widthDifference}px)`;
      } else if (index === 1) {
        // Middle image moves to third position
        return `translateX(${positionShift + widthDifference}px)`;
      } else if (index === 0) {
        // First image adjusts to stay visible on the left
        return `translateX(-${widthDifference}px)`;
      }
    }
    
    // When middle image (index 1) is hovered - side images stay close
    if (hoveredIndex === 1) {
      // No movement needed, they stay in their original positions
      return "translateX(0)";
    }
    
    return "translateX(0)";
  };

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        gap: `${gap}rem`,
        ...style,
      }}
    >
      {images.map((image, index) => {
        const isHovered = hoveredIndex === index;
        
        return (
          <div
            key={index}
            className="relative transition-all ease-out rounded-lg shadow-lg overflow-hidden"
            style={{
              width: isHovered ? "220px" : "90px",
              height: isHovered ? "320px" : "280px",
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              filter: isHovered 
                ? "grayscale(0) brightness(1)" 
                : `grayscale(${grayscaleStrength}) brightness(${brightnessLevel})`,
              transform: `${getTransform(index)} rotate(${hoveredIndex !== null ? '0deg' : '8deg'}) scale(${isHovered ? 1.05 : 1})`,
              zIndex: isHovered ? 10 : 1,
              cursor: "pointer",
              transitionDuration: `${transitionDuration}s`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        );
      })}
    </div>
  );
};

export default ThreeDHoverGallery;