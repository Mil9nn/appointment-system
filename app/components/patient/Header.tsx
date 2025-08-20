"use client";

import {
  Calendar,
  Clock,
  FileText,
  Heart,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React, { useState } from "react";

const Header = () => {
  const upcomingAppointments = [
    {
      id: 1,
      date: "August 25, 2025",
      time: "2:30 PM",
      doctor: "Dr. Michael Chen",
      department: "Cardiology",
      location: "Building A, Room 204",
      preparation:
        "Please fast for 12 hours before your appointment for blood work",
    },
    {
      id: 2,
      date: "August 28, 2025",
      time: "3:15 PM",
      doctor: "Dr. James Wilson",
      department: "Physical Therapy",
      location: "Rehabilitation Center, Room 15",
    },
  ];

  const [activeTab, setactiveTab] = useState("upcoming");

  return (
    <div className="grid grid-cols-[20vw_1fr] h-screen">
      <header className="sidebar-nav p-5 space-y-5 border-r-2 border-blue-500 flex flex-col">
        <nav className="flex flex-col space-x-8">
          {[
            { id: "overview", name: "Overview", icon: Heart },
            { id: "appointments", name: "Appointments", icon: Calendar },
            { id: "medical", name: "Medical Profile", icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setactiveTab(tab.id)}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Hello, Sarah Johnson!</h2>
          <p className="text-lg text-gray-400">
            Here&apos;s an overview of your health journey with Harmony Care.
          </p>
        </div>

        {/* Navigation Tabs */}

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Next Appointment */}
            <div className=" rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Next Appointment</h3>
              <div className="space-y-2">
                <div className="flex items-center text-blue-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">August 25, 2025</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>2:30 PM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>Dr. Michael Chen - Cardiology</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Building A, Room 204</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="space-y-8">
            {/* Upcoming Appointments */}
            <div className=" rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Stay prepared with your scheduled visits.
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {appointment.doctor}
                          </h4>
                          <p className="text-blue-600">
                            {appointment.department}
                          </p>
                          <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {appointment.location}
                          </p>
                          {appointment.preparation && (
                            <p className="text-sm text-orange-600 mt-2 font-medium">
                              Preparation: {appointment.preparation}
                            </p>
                          )}
                        </div>
                        
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "medical" && (
          <div className=" rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-400">
                Keep your medical and personal records up to date.
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold text-gray-400 mb-4">
                    Personal Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <p className="">Sarah Elizabeth Johnson</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Date of Birth
                      </label>
                      <p className="">March 15, 1985</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="">(555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="">sarah.johnson@email.com</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-1" />
                      <span className="">
                        1234 Oak Street, Springfield, IL 62701
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current Medications */}
                <div>
                  <h4 className="font-semibold mb-4">Medical Information</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded p-3">
                      <p className="font-medium">Lisinopril 10mg</p>
                      <p className="text-sm text-gray-600">
                        Once daily for blood pressure
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded p-3">
                      <p className="font-medium">Vitamin D3 2000 IU</p>
                      <p className="text-sm text-gray-600">Daily supplement</p>
                    </div>
                    <div className="border border-gray-200 rounded p-3">
                      <p className="font-medium">Cetirizine 10mg</p>
                      <p className="text-sm text-gray-600">
                        As needed for allergies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Update Medical Information
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Header;
