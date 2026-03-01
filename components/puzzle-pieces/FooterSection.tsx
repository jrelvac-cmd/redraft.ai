"use client";

interface FooterSectionProps {
  productName: string;
  tagline: string;
  legal: string;
  rgpdPlaceholder: string;
}

export function FooterSection({
  productName,
  tagline,
  legal,
  rgpdPlaceholder,
}: FooterSectionProps) {
  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-lg mb-1">{productName}</p>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>

          <div className="text-center md:text-right space-y-2">
            <p className="text-sm text-muted-foreground">{legal}</p>
            <div className="flex gap-4 text-sm text-muted-foreground justify-center md:justify-end">
              {rgpdPlaceholder.split("·").map((item, index) => (
                <button
                  key={index}
                  className="hover:text-foreground transition-colors"
                >
                  {item.trim()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
