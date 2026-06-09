import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="text-2xl font-bold text-green-700">🏔️ Trek Nepal</div>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/trek" className="hover:text-green-700">Treks</Link>
          <Link href="/tours" className="hover:text-green-700">Tours</Link>
          <Link href="/gear" className="hover:text-green-700">Gear</Link>
          <Link href="/about" className="hover:text-green-700">About</Link>
        </div>
        <div className="flex gap-3">
          <Link href="/auth/login"
            className="px-4 py-2 text-sm border border-green-700 text-green-700 rounded-lg hover:bg-green-50">
            Login
          </Link>
          <Link href="/auth/register"
            className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Explore Nepal Like Never Before</h1>
        <p className="text-xl mb-8 text-green-100">
          Book treks, hire guides, join tours and buy gear — all in one place
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/trek"
            className="px-6 py-3 bg-white text-green-800 font-semibold rounded-lg hover:bg-green-50">
            Browse Treks
          </Link>
          <Link href="/tours"
            className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-green-700">
            Explore Tours
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-4 gap-0 bg-green-900 text-white text-center">
        {[
          { number: '100+', label: 'Trek Routes' },
          { number: '50+', label: 'Expert Guides' },
          { number: '200+', label: 'Gear Items' },
          { number: '1000+', label: 'Happy Travellers' },
        ].map((stat) => (
          <div key={stat.label} className="py-8 border-r border-green-700 last:border-0">
            <div className="text-3xl font-bold">{stat.number}</div>
            <div className="text-green-300 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          What are you looking for?
        </h2>
        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: '🥾',
              title: 'Trekking',
              desc: 'Everest Base Camp, Annapurna Circuit, Langtang and more',
              href: '/trek',
              color: 'bg-green-50 border-green-200',
            },
            {
              icon: '🗺️',
              title: 'Tours',
              desc: 'Kathmandu valley, Pokhara, Chitwan jungle safari',
              href: '/tours',
              color: 'bg-blue-50 border-blue-200',
            },
            {
              icon: '🎒',
              title: 'Gear',
              desc: 'Buy, sell or rent trekking equipment at best prices',
              href: '/gear',
              color: 'bg-orange-50 border-orange-200',
            },
          ].map((cat) => (
            <Link href={cat.href} key={cat.title}>
              <div className={`border rounded-xl p-6 ${cat.color} hover:shadow-md transition cursor-pointer`}>
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                <p className="text-gray-600 text-sm">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Treks */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Popular Treks</h2>
            <Link href="/trek" className="text-green-700 hover:underline text-sm">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                name: 'Everest Base Camp',
                days: 14,
                difficulty: 'Strenuous',
                price: '$1200',
                region: 'Khumbu',
                rating: '4.9',
              },
              {
                name: 'Annapurna Circuit',
                days: 12,
                difficulty: 'Moderate',
                price: '$900',
                region: 'Annapurna',
                rating: '4.8',
              },
              {
                name: 'Langtang Valley',
                days: 7,
                difficulty: 'Moderate',
                price: '$600',
                region: 'Langtang',
                rating: '4.7',
              },
            ].map((trek) => (
              <div key={trek.name}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-5xl">
                  🏔️
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{trek.name}</h3>
                    <span className="text-yellow-500 text-sm">⭐ {trek.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {trek.region} · {trek.days} days · {trek.difficulty}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 font-bold">{trek.price}</span>
                    <Link href="/trek"
                      className="text-xs px-3 py-1 bg-green-700 text-white rounded-lg hover:bg-green-800">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Trek Nepal?
        </h2>
        <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: '✅', title: 'Verified Guides', desc: 'All guides are licensed and background checked' },
            { icon: '💳', title: 'Secure Payments', desc: 'Pay via eSewa, Khalti or Stripe safely' },
            { icon: '🗺️', title: 'Route Maps', desc: 'Detailed GPX maps and altitude profiles' },
            { icon: '🆘', title: '24/7 Support', desc: 'Emergency support throughout your trek' },
          ].map((item) => (
            <div key={item.title} className="text-center p-4">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-10 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold mb-3">🏔️ Trek Nepal</div>
            <p className="text-green-300 text-sm">Your trusted travel partner in Nepal since 2024.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <div className="flex flex-col gap-2 text-green-300 text-sm">
              <Link href="/trek">Treks</Link>
              <Link href="/tours">Tours</Link>
              <Link href="/gear">Gear</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Account</h4>
            <div className="flex flex-col gap-2 text-green-300 text-sm">
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="flex flex-col gap-2 text-green-300 text-sm">
              <span>📧 info@treknepal.com</span>
              <span>📞 +977-1-XXXXXXX</span>
              <span>📍 Kathmandu, Nepal</span>
            </div>
          </div>
        </div>
        <div className="text-center text-green-400 text-sm mt-8 border-t border-green-700 pt-6">
          © 2024 Trek Nepal. Built by Abhishek Jha.
        </div>
      </footer>

    </main>
  );
}