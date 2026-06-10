import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CustomCursor = () => {
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });
  const ringX = useSpring(mouseX, { stiffness: 300, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 28 });

  // Offset so the cursor centers on the mouse point
  const dotLeft  = useTransform(dotX,  v => v - 4);
  const dotTop   = useTransform(dotY,  v => v - 4);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHoveringInteractive(
        !!target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]')
      );
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY]);

  const ringSize = isHoveringInteractive ? 48 : 40;
  const ringOffset = isHoveringInteractive ? -24 : -20;

  // Recompute offsets when size changes
  const adjustedRingLeft = useTransform(ringX, v => v + ringOffset);
  const adjustedRingTop  = useTransform(ringY, v => v + ringOffset);

  return (
    <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}>
      {/* Ring — lags behind */}
      <motion.div
        style={{
          position: 'fixed',
          left: adjustedRingLeft,
          top: adjustedRingTop,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1.5px solid rgba(139,26,69,${isHoveringInteractive ? 0.8 : 0.55})`,
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'multiply',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
      {/* Dot — instant */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotLeft,
          top: dotTop,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isHoveringInteractive ? 'rgba(139,26,69,0.9)' : 'rgba(139,26,69,0.7)',
          pointerEvents: 'none',
          zIndex: 9999,
          scale: isHoveringInteractive ? 0.5 : 1,
          transition: 'background 0.2s, scale 0.2s',
        }}
      />
    </div>
  );
};

export default CustomCursor;
