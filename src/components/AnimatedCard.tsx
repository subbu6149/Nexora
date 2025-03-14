
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  className?: string;
  children: React.ReactNode;
  tiltEffect?: boolean;
  glowEffect?: boolean;
  glassEffect?: boolean;
  hoverLift?: boolean;
}

const AnimatedCard = ({
  className,
  children,
  tiltEffect = true,
  glowEffect = true,
  glassEffect = true,
  hoverLift = true,
}: AnimatedCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tiltEffect) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setPosition({ x: rotateY, y: rotateX });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative rounded-xl overflow-hidden transition-all duration-300',
        hoverLift && 'hover:-translate-y-2',
        glassEffect && 'glass-card',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg)`
          : 'perspective(1000px) rotateX(0) rotateY(0)',
        zIndex: isHovered ? 10 : 1,
      }}
    >
      {glowEffect && isHovered && (
        <div
          className="absolute inset-0 rounded-xl opacity-50 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${(position.x + 10) * 10}px ${
              (position.y + 10) * 5
            }px, rgba(255, 255, 255, 0.15), transparent)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

export default AnimatedCard;
