import React from "react";

const Page = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl z-10"></div>

      {/* Content Wrapper */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h3 className="text-3xl font-semibold tracking-wide uppercase text-blue-400">
            Harmony Care Hospital
          </h3>
          <p className="text-lg text-zinc-300">Where compassion meets innovation</p>
          <p className="italic text-zinc-400">“Your health, our mission”</p>
        </div>

        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Healthcare made <span className="text-blue-400">Simple</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Book, manage and track your appointments anytime, anywhere.
          </p>
          <div>
            <button className="relative group z-0 overflow-hidden px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 cursor-pointer">
              <span className="relative z-10">Book an Appointment</span>
              <span className="absolute top-0 left-0 translate-y-full z-5 group-hover:translate-y-0 transition-transform duration-1000 ease-in-out group-hover:rounded-full w-full h-full bg-black"></span>
            </button>
          </div>
        </div>

        {/* About & Why Choose Us */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold">About Us</h2>
            <p className="text-zinc-300 leading-relaxed">
              Founded with the vision to make healthcare more accessible, Harmony
              Care Hospital brings together advanced medical expertise and
              patient-first care. With specialists across multiple fields, digital
              medical records, and a seamless appointment system, we ensure your
              journey to wellness is smooth and stress-free.
            </p>
          </div>

          <div className="space-y-5">
            <h2 className="text-3xl font-bold">Why Choose Us</h2>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">✔</span> Trusted doctors with 10+ years average experience
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">✔</span> Multi-specialty care under one roof
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">✔</span> Secure patient data & digital ID verification
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">✔</span> Flexible scheduling and easy cancellations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
