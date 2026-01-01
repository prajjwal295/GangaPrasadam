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
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="max-w-3xl">
            <h1
              className={`text-4xl md:text-6xl text-white font-bold mb-6 ${headingFont.className}`}
              style={{ textShadow: "0 6px 16px rgba(0,0,0,0.6)" }}
            >
              {service.title}
            </h1>

            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <h2
          className={`text-2xl md:text-3xl font-semibold mb-6 ${headingFont.className}`}
          style={{
            background: "linear-gradient(to right, #8B0000, #DAA520)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About the Ritual
        </h2>

        <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
          {service.DetailDescription}
        </p>

        {/* Divider */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link
            href={`/contact?service=${encodeURIComponent(service.title)}`}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#8B0000] to-[#DAA520] text-white font-semibold shadow-lg hover:shadow-xl transition-all text-center"
          >
            Book Service
          </Link>
        </div>

        {/* Back */}
        <div className="mt-20 text-center">
          <Link
            href="/#services"
            className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            ← Back to Services
          </Link>
        </div>
      </section>
    </div>
  );
}
