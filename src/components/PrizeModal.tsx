interface PrizeModalProps {
  prize: string;
  onClose: () => void;
}

const PrizeModal = ({ prize, onClose }: PrizeModalProps) => {
  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-casino-dark/80 backdrop-blur-sm animate-overlay-enter"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute top-1/2 left-1/2 animate-modal-enter z-10 w-[90%] max-w-md">
        <div className="rounded-2xl border-2 border-primary/60 bg-gradient-to-b from-muted to-background p-8 text-center shadow-2xl shadow-primary/20">
          {/* Sparkles */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="text-primary text-2xl animate-sparkle"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                ✨
              </span>
            ))}
          </div>

          <h2 className="font-display text-4xl sm:text-5xl text-primary mb-2 tracking-wide">
            PARABÉNS!
          </h2>
          <p className="text-foreground text-lg sm:text-xl mb-2">Você ganhou</p>
          <p className="font-display text-3xl sm:text-4xl text-secondary mb-8 tracking-wide">
            {prize}
          </p>

          <a
            href="https://seulink.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full py-4 px-8 rounded-xl font-display text-2xl tracking-wider bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
          >
            CADASTRE-SE
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrizeModal;
