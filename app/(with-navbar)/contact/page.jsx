"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ServicesData from "../../static/Services";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../_lib/firebase";
import { Cormorant_Garamond, Lora } from "next/font/google";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function ContactPage() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setSelectedServices([preselectedService]);
    }
  }, [preselectedService]);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert("Please select at least one service");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "queries"), {
        fullName,
        email,
        contact,
        location,
        date,
        services: selectedServices,
        message,
        createdAt: serverTimestamp(),
      });

      alert("🙏 Your query has been submitted successfully");

      setFullName("");
      setEmail("");
      setContact("");
      setLocation("");
      setDate("");
      setMessage("");
      setSelectedServices([]);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#f9f7f5] ${bodyFont.className}`}>
      <div className="max-w-4xl mx-auto px-4 py-14">
        <h1
          className={`text-4xl md:text-5xl text-center mb-4 ${headingFont.className}`}
          style={{
            background: "linear-gradient(to right, #8B0000, #DAA520)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Book / Raise a Query
        </h1>

        <p className="text-center text-gray-600 mb-10">
          All fields are required except the custom message
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 space-y-6"
        >
          {/* Name, Contact, Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City / Address"
              className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40"
            />
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Select Services <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-wrap gap-3">
              {ServicesData.map((service) => {
                const isSelected = selectedServices.includes(service.title);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.title)}
                    className={`px-4 py-2 rounded-full text-sm border transition-all
                      ${
                        isSelected
                          ? "bg-gradient-to-r from-[#8B0000] to-[#DAA520] text-white border-transparent shadow"
                          : "border-gray-300 text-gray-700 hover:border-[#8B0000]"
                      }`}
                  >
                    {service.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Custom Message (Optional)
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any special request or message"
              className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-md text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
            style={{
              background: "linear-gradient(to right, #8B0000, #DAA520)",
            }}
          >
            {loading ? "Submitting..." : "Raise Query"}
          </button>
        </form>
      </div>
    </div>
  );
}
