import { motion, AnimatePresence } from "framer-motion";
import { X, Leaf, Flame, Clock, ChefHat, AlertTriangle, Sparkles, SlidersHorizontal } from "lucide-react";
import type { MenuItem } from "@shared/schema";
import fallbackImg from "@assets/coming_soon_imagev2_1766811809828.jpg";
import { useState } from "react";

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const NUTRITION_PLACEHOLDER = [
  { label: "Calories", value: "—" },
  { label: "Protein", value: "—" },
  { label: "Carbs", value: "—" },
  { label: "Fat", value: "—" },
  { label: "Fibre", value: "—" },
  { label: "Sodium", value: "—" },
];

const ALLERGEN_PLACEHOLDER = ["Information not available for this item."];
const INGREDIENTS_PLACEHOLDER = "Detailed ingredient list not available.";
const CUSTOMIZATION_PLACEHOLDER = [
  "Spice level: Mild / Medium / Hot",
  "Portion: Regular / Large",
];
const PREP_TIME_PLACEHOLDER = "15–25 mins";

export default function DishDetailModal({ item, onClose }: DishDetailModalProps) {
  const [imgError, setImgError] = useState(false);

  if (!item) return null;

  const isBroken = imgError || !item.image || item.image.includes("placeholder.com") || item.image.includes("example.com");
  const imageUrl = isBroken ? fallbackImg : item.image;

  const priceDisplay =
    typeof item.price === "string" && item.price.includes("|")
      ? item.price.split("|").map((p: string) => `₹${p.trim()}`).join(" | ")
      : `₹${item.price}`;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full sm:max-w-md max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl"
            style={{ backgroundColor: "#1A1408", border: "1px solid rgba(212,175,55,0.3)" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "rgba(212,175,55,0.3)" }} />
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#DCD4C8" }}
              data-testid="button-close-dish-modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full aspect-video overflow-hidden">
              <img
                src={imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1408] via-transparent to-transparent" />

              <div
                className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                  item.isVeg ? "bg-green-600 text-white" : "bg-red-600 text-white"
                }`}
              >
                {item.isVeg ? <Leaf className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
                {item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
              </div>
            </div>

            <div className="px-5 pb-8 -mt-4 space-y-5">
              <div>
                <h2
                  className="text-xl font-bold leading-tight mb-1 uppercase tracking-widest"
                  style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif" }}
                  data-testid="text-dish-name"
                >
                  {item.name}
                </h2>
                <p
                  className="text-lg font-bold tracking-wide"
                  style={{ color: "#E6C55A", fontFamily: "'DM Sans', sans-serif" }}
                  data-testid="text-dish-price"
                >
                  {priceDisplay}
                </p>
              </div>

              <div className="h-px w-full" style={{ backgroundColor: "rgba(212,175,55,0.2)" }} />

              <div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#DCD4C8", fontFamily: "'DM Sans', sans-serif" }}
                  data-testid="text-dish-description"
                >
                  {item.description || "No description available."}
                </p>
              </div>

              <div className="h-px w-full" style={{ backgroundColor: "rgba(212,175,55,0.2)" }} />

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(212,175,55,0.15)" }}
                >
                  <Clock className="w-4 h-4" style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif" }}>
                    Preparation Time
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#DCD4C8", fontFamily: "'DM Sans', sans-serif" }}>
                    {PREP_TIME_PLACEHOLDER}
                  </p>
                </div>
              </div>

              <div className="h-px w-full" style={{ backgroundColor: "rgba(212,175,55,0.2)" }} />

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4" style={{ color: "#D4AF37" }} />
                  <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif" }}>
                    Nutritional Contents
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {NUTRITION_PLACEHOLDER.map((n) => (
                    <div
                      key={n.label}
                      className="rounded-xl p-2.5 text-center"
                      style={{ backgroundColor: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}
                    >
                      <p className="text-xs mb-0.5" style={{ color: "#DCD4C8", opacity: 0.6 }}>{n.label}</p>
                      <p className="text-sm font-bold" style={{ color: "#DCD4C8" }}>{n.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-2 text-center" style={{ color: "#DCD4C8", opacity: 0.4, fontFamily: "'DM Sans', sans-serif" }}>
                  Nutritional info will be available soon
                </p>
              </div>

              <div className="h-px w-full" style={{ backgroundColor: "rgba(212,175,55,0.2)" }} />

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" style={{ color: "#D4AF37" }} />
                  <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif" }}>
                    Allergens
                  </h3>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{ backgroundColor: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  {ALLERGEN_PLACEHOLDER.map((a, i) => (
                    <p key={i} className="text-sm" style={{ color: "#DCD4C8", fontFamily: "'DM Sans', sans-serif" }}>
                      {a}
                    </p>
                  ))}
                </div>
              </div>

              <div className="h-px w-full" style={{ backgroundColor: "rgba(212,175,55,0.2)" }} />

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ChefHat className="w-4 h-4" style={{ color: "#D4AF37" }} />
                  <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif" }}>
                    Ingredients
                  </h3>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{ backgroundColor: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <p className="text-sm" style={{ color: "#DCD4C8", fontFamily: "'DM Sans', sans-serif" }}>
                    {INGREDIENTS_PLACEHOLDER}
                  </p>
                </div>
              </div>

              <div className="h-px w-full" style={{ backgroundColor: "rgba(212,175,55,0.2)" }} />

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <SlidersHorizontal className="w-4 h-4" style={{ color: "#D4AF37" }} />
                  <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif" }}>
                    Customization
                  </h3>
                </div>
                <div className="space-y-2">
                  {CUSTOMIZATION_PLACEHOLDER.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                      style={{ backgroundColor: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#D4AF37" }} />
                      <p className="text-sm" style={{ color: "#DCD4C8", fontFamily: "'DM Sans', sans-serif" }}>
                        {c}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
