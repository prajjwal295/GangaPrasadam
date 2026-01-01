"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ServicesData from "../../static/Services";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../_lib/firebase";
import { Cormorant_Garamond, Lora } from "next/font/google";
import emailjs from "@emailjs/browser";

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

  // Preselect service from URL
  useEffect(() => {
    if (preselectedService) {
      setSelectedServices([preselectedService]);
    }
  }, [preselectedService]);

  // Init EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.error("EmailJS Public Key missing");
    }
  }, []);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT
    setLoading(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const adminTemplateId =
        process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID;
      const userTemplateId =
        process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID;
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !adminTemplateId || !userTemplateId || !publicKey) {
        throw new Error("EmailJS environment variables missing");
      }

      // 1️⃣ Save to Firestore (optional but recommended)
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

      // 2️⃣ Email to Admin
      await emailjs.send(
        serviceId,
        adminTemplateId,
        {
          fullName,
          email,
          contact,
          location,
          date,
          services: selectedServices.join(", "),
          message,
        },
        publicKey
      );

      // 3️⃣ Email to User
      await emailjs.send(
        serviceId,
        userTemplateId,
        {
          fullName,
          email,
          services: selectedServices.join(", "),
        },
        publicKey
      );

      alert("Inquiry submitted successfully 🙏");
      setFullName("");
      setEmail("");
      setContact("");
      setLocation("");
      setDate("");
      setMessage("");
      setSelectedServices([]);

    } catch (error) {
      console.error("Submission error:", error);
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
          {/* Name & Contact */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number *
              </label>
              <input
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full rounded-md border px-4 py-3"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-4 py-3"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Location *
            </label>
            <input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-md border px-4 py-3"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Date *
            </label>
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border px-4 py-3"
            />
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Select Services *
            </label>
            <div className="flex flex-wrap gap-3">
              {ServicesData.map((service) => {
                const isSelected = selectedServices.includes(service.title);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.title)}
                    className={`px-4 py-2 rounded-full text-sm border transition
                      ${
                        isSelected
                          ? "bg-gradient-to-r from-[#8B0000] to-[#DAA520] text-white"
                          : "border-gray-300"
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
              Message (Optional)
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-md border px-4 py-3"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-md text-white font-medium shadow-lg hover:cursor-pointer"
            style={{
              background: "linear-gradient(to right, #8B0000, #DAA520)",
            }}
          >
            {loading ? "Submitting..." : "Book Now / Submit Query"}
          </button>
        </form>
      </div>
    </div>
  );
}
