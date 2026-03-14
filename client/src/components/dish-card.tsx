import { useState } from "react";
import { motion } from "framer-motion";
import type { MenuItem } from "@shared/schema";
import fallbackImg from "@assets/coming_soon_imagev2_1766811809828.jpg";

interface DishCardProps {
  item: MenuItem;
}

export default function DishCard({ item }: DishCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = imgError || !item.image ||
    item.image.includes("example.com") ||
    item.image.includes("unsplash.com") ||
    item.image.includes("placeholder.com") ||
    item.image.includes("via.placeholder.com")
    ? fallbackImg : item.image;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="overflow-hidden h-full flex flex-col transition-all duration-300"
      style={{
        borderRadius: "10px",
        backgroundColor: "#1A1408",
        border: "1px solid rgba(212,175,55,0.25)",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: "10px 10px 0 0" }}>
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
          <div
            className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 shadow-sm ${
              item.isVeg ? 'bg-green-500 border-green-300' : 'bg-red-500 border-red-300'
            }`}
          />
        </div>

        <div className="p-2 md:p-3 flex-1 flex flex-col">
          <div className="flex-1 space-y-1">
            <h3
              className="text-sm md:text-base font-semibold leading-tight line-clamp-2 tracking-wide uppercase"
              style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif" }}
            >
              {item.name}
            </h3>
            <p
              className="text-xs md:text-sm leading-tight line-clamp-2"
              style={{ color: "#DCD4C8", fontFamily: "'DM Sans', sans-serif", opacity: 0.8 }}
            >
              {item.description}
            </p>
          </div>

          <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}>
            <div className="flex justify-center">
              <span
                className="font-bold text-sm md:text-base tracking-wide"
                style={{ color: "#E6C55A", fontFamily: "'DM Sans', sans-serif" }}
              >
                {typeof item.price === "string" && item.price.includes("|")
                  ? item.price.split("|").map(p => `₹${p.trim()}`).join(" | ")
                  : `₹${item.price}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
