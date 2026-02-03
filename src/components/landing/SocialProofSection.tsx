export function SocialProofSection() {
  const logos = [
    "TechCorp",
    "InnovateLabs",
    "FutureScale",
    "DataDriven",
    "CloudFirst",
    "AIVentures",
  ];

  return (
    <section className="py-16 border-y border-border/50 bg-card/30">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by <span className="text-foreground font-semibold">500+ brands</span> optimizing their AI presence
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
