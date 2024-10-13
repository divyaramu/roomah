import React from 'react';

function LandingPage() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://your-hero-image-url.com)' }}>
        <div className="bg-black bg-opacity-50 p-10 text-center rounded-xl">
          <h1 className="text-6xl text-white font-bold mb-5">Roomah</h1>
          <p className="text-xl text-gray-300 mb-5">Simplifying Your Home Inspection and Management</p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300">Get Started</button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">1. Add Property</h3>
            <p className="text-gray-600">Easily input property details and start managing.</p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">2. Conduct Inspections</h3>
            <p className="text-gray-600">Perform and track home inspections with our tools.</p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">3. Generate Reports</h3>
            <p className="text-gray-600">Receive automatic reports for quick analysis and sharing.</p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8">
            <img src="https://your-icon-url.com/icon1.png" alt="feature icon" className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">Dashboard Management</h3>
            <p className="text-gray-600 mt-2">Monitor all properties from a single dashboard.</p>
          </div>
          <div className="p-8">
            <img src="https://your-icon-url.com/icon2.png" alt="feature icon" className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">Inspection Tools</h3>
            <p className="text-gray-600 mt-2">Advanced tools for seamless property inspections.</p>
          </div>
          <div className="p-8">
            <img src="https://your-icon-url.com/icon3.png" alt="feature icon" className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">Report Generation</h3>
            <p className="text-gray-600 mt-2">Generate detailed reports instantly after inspections.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <p className="text-gray-600 italic">"Roomah saved me hours on home inspections. It's an essential tool!"</p>
            <p className="text-indigo-600 font-bold mt-4">- John D.</p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <p className="text-gray-600 italic">"The reporting feature is a game-changer for property management."</p>
            <p className="text-indigo-600 font-bold mt-4">- Sarah K.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-900 text-gray-300 text-center">
        <div className="max-w-6xl mx-auto">
          <p>&copy; 2024 Roomah. All Rights Reserved.</p>
          <div className="mt-5">
            <a href="#" className="text-indigo-400 hover:underline mx-2">Privacy Policy</a>
            <a href="#" className="text-indigo-400 hover:underline mx-2">Terms of Service</a>
            <a href="#" className="text-indigo-400 hover:underline mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;