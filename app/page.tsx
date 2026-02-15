export default function Home() {
  return (
    <main className="min-h-screen luxury-gradient">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <header className="text-center mb-20">
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 gold-gradient">
            TheKeys
          </h1>
          <p className="text-luxury-silver text-xl md:text-2xl font-light tracking-wide">
            Unlock Exclusive Luxury Properties
          </p>
        </header>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-24">
          <div className="bg-luxury-charcoal border border-luxury-slate rounded-lg p-12 shadow-2xl">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-luxury-gold">
              Welcome to Excellence
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Discover a curated collection of the world&apos;s most prestigious properties.
              Each residence represents the pinnacle of architectural design, location, and luxury living.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              From penthouses overlooking iconic skylines to private estates nestled in exclusive enclaves,
              TheKeys opens doors to extraordinary living experiences.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-luxury-charcoal border border-luxury-slate rounded-lg p-8 hover:border-luxury-gold transition-colors duration-300">
            <div className="text-luxury-gold text-4xl mb-4">✦</div>
            <h3 className="font-serif text-2xl mb-3 text-luxury-lightGold">Exclusivity</h3>
            <p className="text-gray-400">
              Access to off-market listings and private sales unavailable to the general public.
            </p>
          </div>

          <div className="bg-luxury-charcoal border border-luxury-slate rounded-lg p-8 hover:border-luxury-gold transition-colors duration-300">
            <div className="text-luxury-gold text-4xl mb-4">◆</div>
            <h3 className="font-serif text-2xl mb-3 text-luxury-lightGold">Expertise</h3>
            <p className="text-gray-400">
              Decades of experience in luxury real estate markets worldwide.
            </p>
          </div>

          <div className="bg-luxury-charcoal border border-luxury-slate rounded-lg p-8 hover:border-luxury-gold transition-colors duration-300">
            <div className="text-luxury-gold text-4xl mb-4">✧</div>
            <h3 className="font-serif text-2xl mb-3 text-luxury-lightGold">Discretion</h3>
            <p className="text-gray-400">
              Complete confidentiality and privacy throughout your property journey.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="inline-block bg-luxury-charcoal border-2 border-luxury-gold rounded-lg p-8">
            <h3 className="font-serif text-3xl mb-4 text-luxury-gold">
              Begin Your Journey
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Connect with our specialists to explore properties tailored to your vision of luxury.
            </p>
            <button className="bg-luxury-gold hover:bg-luxury-lightGold text-luxury-dark font-semibold px-8 py-3 rounded transition-colors duration-300">
              Contact Us
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-center text-gray-500 text-sm">
          <p>&copy; 2026 TheKeys. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
