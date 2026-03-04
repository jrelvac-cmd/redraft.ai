import React, { forwardRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  label?: string;
  onClick?: (e?: React.FormEvent) => void | Promise<void>;
  className?: string;
}

export const GlowButton = forwardRef<HTMLButtonElement, ComponentProps>(
  ({ label = "Generate", onClick, className }, ref) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = async (e?: React.FormEvent) => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
      await onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn("glow-btn", className)}
        onClick={handleClick}
        data-state={isClicked ? "clicked" : undefined}
      >
        <span className="flex items-center justify-center gap-1.5">
          {label}
          <ArrowRight size={16} className="ml-0.5" />
        </span>
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export default GlowButton;
