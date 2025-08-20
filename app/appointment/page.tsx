"use client";

import { Search, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialization: "Cardiology",
    experience: "12+ years",
    qualification: "MBBS, MD (Cardiology)",
    about:
      "Dr. Sharma is a highly experienced cardiologist specializing in preventive heart care, advanced diagnostics, and minimally invasive treatments. She is known for her patient-centric approach and compassionate care.",
    availability: "Mon – Fri | 10:00 AM – 5:00 PM",
    image: "/images/doctor-riya.jpg",
  },
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialization: "Cardiology",
    experience: "12+ years",
    qualification: "MBBS, MD (Cardiology)",
    about:
      "Dr. Sharma is a highly experienced cardiologist specializing in preventive heart care, advanced diagnostics, and minimally invasive treatments. She is known for her patient-centric approach and compassionate care.",
    availability: "Mon – Fri | 10:00 AM – 5:00 PM",
    image: "/images/doctor-riya.jpg",
  },
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialization: "Cardiology",
    experience: "12+ years",
    qualification: "MBBS, MD (Cardiology)",
    about:
      "Dr. Sharma is a highly experienced cardiologist specializing in preventive heart care, advanced diagnostics, and minimally invasive treatments. She is known for her patient-centric approach and compassionate care.",
    availability: "Mon – Fri | 10:00 AM – 5:00 PM",
    image: "/images/doctor-riya.jpg",
  },
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialization: "Cardiology",
    experience: "12+ years",
    qualification: "MBBS, MD (Cardiology)",
    about:
      "Dr. Sharma is a highly experienced cardiologist specializing in preventive heart care, advanced diagnostics, and minimally invasive treatments. She is known for her patient-centric approach and compassionate care.",
    availability: "Mon – Fri | 10:00 AM – 5:00 PM",
    image: "/images/doctor-riya.jpg",
  },
];

const Page = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white px-6 py-10 space-y-12">
      {/* Intro */}
      <header className="max-w-3xl mx-auto text-center space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">
          Book Your Appointment
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Choose from our expert doctors, select a convenient time slot, and
          confirm your visit — all in just a few clicks. Your health,
          simplified.
        </p>
      </header>

      {/* Search Bar */}
      <section className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="search"
            placeholder="Search by doctor name or specialty…"
            className="w-full pl-12 pr-4 py-3 rounded-full 
              bg-white/10 border border-white/20 
              backdrop-blur-md shadow-md shadow-black/40
              text-gray-200 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
        </div>
      </section>

      {/* Doctors List */}
      <section className="max-w-5xl mx-auto space-y-10">
        <h3 className="text-2xl font-semibold">Featured Doctors</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoctor(doc)}
              className="relative cursor-pointer group rounded-2xl overflow-hidden 
                bg-white/5 backdrop-blur-md border border-white/10 
                shadow-lg shadow-black/40 hover:scale-[1.02] transition transform duration-1000"
            >
              <Image
                src={doc.image}
                alt={doc.name}
                width={400}
                height={300}
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="p-4 space-y-1">
                <h4 className="text-lg font-semibold">{doc.name}</h4>
                <p className="text-sm text-gray-400">{doc.specialization}</p>
                <p className="text-xs text-gray-500">{doc.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor Modal (Details) */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-2xl w-full bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm transition"
            >
              <X />
            </button>

            {/* Doctor Info */}
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                width={200}
                height={200}
                className="rounded-xl object-cover"
              />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{selectedDoctor.name}</h3>
                <p className="text-gray-300">{selectedDoctor.specialization}</p>
                <p className="text-gray-400 text-sm">
                  {selectedDoctor.qualification}
                </p>
                <p className="text-gray-400 text-sm">
                  Experience: {selectedDoctor.experience}
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {selectedDoctor.about}
            </p>

            <p className="text-gray-400 text-sm">
              Availability: {selectedDoctor.availability}
            </p>

            <button className="relative group overflow-hidden w-full px-4 py-3 bg-black text-white rounded-full transition">
              <span className="relative z-20 font-semibold">Book Appointment</span>
              <span className="absolute inset-0 z-10 w-[50%] h-full bg-pink-500 -translate-x-full group-hover:translate-x-0 transition-translate duration-1000 ease-in-out"></span>
              <span className="absolute top-0 right-0 z-10 w-[50%] h-full bg-violet-500 translate-x-full group-hover:translate-x-0 transition-translate duration-1000 ease-in-out"></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
