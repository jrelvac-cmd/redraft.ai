"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  statusText?: string;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  statusText,
}: ProgressBarProps) {
  const calculateProgress = (step: number, total: number): number => {
    if (step <= 0) return 0;
    if (step >= total) return 100;

    const midPoint = total * 0.8;
    
    if (step <= midPoint) {
      return (step / midPoint) * 80;
    } else {
      const remaining = step - midPoint;
      const remainingSteps = total - midPoint;
      return 80 + (remaining / remainingSteps) * 20;
    }
  };

  const progress = calculateProgress(currentStep, totalSteps);

  return (
    <div className="flex flex-col items-center gap-4 h-full py-8">
      <div className="relative w-2 flex-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-primary rounded-full"
          initial={{ height: "0%" }}
          animate={{ height: `${progress}%` }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
        
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <motion.div
                key={stepNumber}
                className={`relative w-2 h-2 rounded-full mx-auto ${
                  isCompleted || isCurrent
                    ? "bg-primary-foreground"
                    : "bg-muted-foreground/30"
                }`}
                initial={{ scale: 0.8 }}
                animate={{
                  scale: isCurrent ? 1.2 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm font-medium">
          Étape {currentStep} / {totalSteps}
        </p>
        {statusText && (
          <motion.p
            key={statusText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-muted-foreground max-w-[120px]"
          >
            {statusText}
          </motion.p>
        )}
      </div>
    </div>
  );
}
