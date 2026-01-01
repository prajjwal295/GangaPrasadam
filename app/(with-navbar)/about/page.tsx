"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { Playfair_Display, Lato } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});

const galleryImages = [
  "/hero.jpg",
  "/hero.jpg",
  "/hero.jpg",
  "/hero.jpg",
  "/hero.jpg",
];

export default function AboutPage() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = 300;
      galleryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f7f5] text-gray-800 relative z-10">
      {/* Background */}
      <div className="absolute inset-0 bg-fixed bg-[url('/subtle-pattern.png')] opacity-5 -z-10" />

      {/* HERO */}
      <section className="relative px-6 py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-48 h-48 bg-[#DAA520]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#8B0000]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-sm font-medium">
            ✦ Sanatan Seva & Vedic Rituals ✦
          </div>

          <h1
            className={`${playfairDisplay.className} text-5xl md:text-6xl lg:text-7xl font-bold`}
            style={{
              background:
                "linear-gradient(to right, #8B0000 0%, #DAA520 50%, #8B4513 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Connecting You to Divine Traditions
          </h1>

          <p className={`${lato.className} text-lg md:text-xl max-w-4xl mx-auto`}>
            Experience authentic Vedic pujas and sacred rituals performed with
            devotion, purity, and adherence to Sanatan Dharma.
          </p>

          <div
            className="w-40 h-1 mx-auto"
            style={{
              background: "linear-gradient(to right, #8B0000, #DAA520)",
            }}
          />
        </div>
      </section>

      {/* STORY / ABOUT */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-xl border-4 border-[#DAA520]">
              <Image
                src="/hero.jpg"
                alt="Vedic Puja"
                fill
                className="object-cover cursor-pointer"
                onClick={() => setModalImage("/hero.jpg")}
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <p
              className={`${lato.className} uppercase text-sm tracking-wider`}
              style={{
                background: "linear-gradient(to right, #8B0000, #DAA520)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Purpose
            </p>

            <h2
              className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold`}
            >
              Rooted in Sanatan Dharma, Guided by Faith
            </h2>

            <div className={`${lato.className} space-y-6`}>
              <p>
                Our mission is to preserve and share the eternal wisdom of
                Sanatan Dharma through authentic Vedic rituals and sacred
                ceremonies performed as per ancient scriptures.
              </p>
              <p>
                From Ganga Aarti and Vivah Sanskar to Swastivachan and special
                religious events, our experienced pandits conduct each puja with
                devotion, discipline, and spiritual accuracy.
              </p>
              <p>
                We believe rituals are not just traditions but powerful
                connections to divine energy, bringing peace, prosperity, and
                positivity into life.
              </p>
            </div>

            {/* Values */}
            <div className="grid sm:grid-cols-3 gap-6 pt-6">
              {[
                ["Authentic Rituals", "As per Vedic scriptures"],
                ["Experienced Pandits", "Knowledge & devotion"],
                ["Divine Experience", "Peace & blessings"],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="bg-white p-4 rounded-lg shadow-sm border-2 border-[#DAA520]"
                >
                  <h3
                    className={`${playfairDisplay.className} font-semibold`}
                  >
                    {title}
                  </h3>
                  <p className={`${lato.className} text-sm text-gray-600`}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* GALLERY */}
      <section className="py-16 bg-[#fefaf4] relative">
        <div className="max-w-7xl mx-auto text-center mb-12 px-6">
          <h2
            className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold`}
            style={{
              background: "linear-gradient(to right, #8B0000, #DAA520)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Gallery
          </h2>
          <p className={`${lato.className} text-gray-700 max-w-3xl mx-auto mt-4`}>
            Moments from our sacred rituals, events, and ceremonies.
          </p>
        </div>

        <div className="max-w-7xl mx-auto relative px-16">
          {/* Arrows */}

          {/* Scrollable gallery */}
          <div
            ref={galleryRef}
            className="flex gap-6 overflow-x-scroll py-4 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 h-72 relative rounded-lg overflow-hidden shadow-lg border-4 border-[#DAA520] cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setModalImage(img)}
              >
                <Image src={img} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2
            className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold`}
            style={{
              background: "linear-gradient(to right, #8B0000, #DAA520)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Let Us Guide Your Sacred Journey
          </h2>

          <p className={`${lato.className} text-lg`}>
            Book a puja, consult a pandit, or understand the right ritual for
            your occasion. We are here to assist you with devotion and care.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <Link
              href="https://www.instagram.com/ganga_prasadam"
              target="_blank"
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg border-2 border-[#DAA520]"
            >
              📸 Follow on Instagram
            </Link>

            <Link
              href="https://wa.me/919451383340"
              target="_blank"
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg border-2 border-[#DAA520]"
            >
              💬 Chat on WhatsApp
            </Link>
          </div>
        </div>
      </section>


      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-full max-w-3xl h-[80vh]">
            <Image
              src={modalImage}
              alt="Full Image"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
