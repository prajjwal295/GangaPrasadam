"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ServicesData from "../../../static/Services";
import { Cormorant_Garamond, Lora } from "next/font/google";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = Number(params.id);

  const service = ServicesData.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Service not found</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#f9f7f5] ${bodyFont.className}`}>
      {/* Hero Section */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 ${headingFont.className}`}
            style={{ textShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
          >
            {service.title}
          </h1>

          <p className="text-white text-lg max-w-2xl">
            {service.description}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-10">
          <h2
            className={`text-2xl md:text-3xl font-semibold mb-4 ${headingFont.className}`}
            style={{
              background: "linear-gradient(to right, #8B0000, #DAA520)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About This Service
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg">
            {service.DetailDescription}
          </p>
        </div>

        {/* Price & CTA */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-gray-500 uppercase mb-1">Service Price</p>
            <p
              className={`text-3xl font-bold ${headingFont.className}`}
              style={{
                background: "linear-gradient(to right, #8B0000, #DAA520)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {service.price}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md text-white font-medium shadow-lg hover:shadow-xl transition-all"
            style={{
              background: "linear-gradient(to right, #8B0000, #DAA520)",
            }}
          >
            Book This Service
          </Link>
        </div>

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            href="/#services"
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
}
