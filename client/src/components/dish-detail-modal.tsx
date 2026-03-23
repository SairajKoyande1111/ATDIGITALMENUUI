import { motion, AnimatePresence } from "framer-motion";
import { X, Clock } from "lucide-react";
import type { MenuItem } from "@shared/schema";
import fallbackImg from "@assets/coming_soon_imagev2_1766811809828.jpg";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

interface NutritionEntry {
  label: string;
  value: string;
}

interface DummyProfile {
  nutrition: NutritionEntry[];
  allergens: string[];
  ingredients: string[];
  prepTime: string;
}

const PROFILES: Record<string, DummyProfile> = {
  food: {
    nutrition: [
      { label: "Calories", value: "320 kcal" },
      { label: "Protein", value: "14 g" },
      { label: "Carbs", value: "38 g" },
      { label: "Fat", value: "12 g" },
      { label: "Fibre", value: "4 g" },
      { label: "Sodium", value: "460 mg" },
    ],
    allergens: ["Gluten", "Dairy", "Soy"],
    ingredients: ["Fresh vegetables", "Spices", "Cooking oil", "Herbs", "Salt", "Wheat flour"],
    prepTime: "20–30 mins",
  },
  pizza: {
    nutrition: [
      { label: "Calories", value: "410 kcal" },
      { label: "Protein", value: "16 g" },
      { label: "Carbs", value: "52 g" },
      { label: "Fat", value: "14 g" },
      { label: "Fibre", value: "3 g" },
      { label: "Sodium", value: "620 mg" },
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Olive oil", "Fresh herbs", "Seasoning"],
    prepTime: "25–35 mins",
  },
  pasta: {
    nutrition: [
      { label: "Calories", value: "380 kcal" },
      { label: "Protein", value: "13 g" },
      { label: "Carbs", value: "58 g" },
      { label: "Fat", value: "10 g" },
      { label: "Fibre", value: "3 g" },
      { label: "Sodium", value: "520 mg" },
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    ingredients: ["Durum wheat pasta", "Olive oil", "Garlic", "Fresh herbs", "Parmesan", "Seasoning"],
    prepTime: "20–25 mins",
  },
  curry: {
    nutrition: [
      { label: "Calories", value: "350 kcal" },
      { label: "Protein", value: "18 g" },
      { label: "Carbs", value: "32 g" },
      { label: "Fat", value: "16 g" },
      { label: "Fibre", value: "5 g" },
      { label: "Sodium", value: "540 mg" },
    ],
    allergens: ["Dairy", "Tree Nuts"],
    ingredients: ["Spices", "Onions", "Tomatoes", "Ginger", "Garlic", "Cream", "Cooking oil"],
    prepTime: "25–35 mins",
  },
  biryani: {
    nutrition: [
      { label: "Calories", value: "480 kcal" },
      { label: "Protein", value: "20 g" },
      { label: "Carbs", value: "64 g" },
      { label: "Fat", value: "14 g" },
      { label: "Fibre", value: "3 g" },
      { label: "Sodium", value: "580 mg" },
    ],
    allergens: ["Dairy", "Tree Nuts", "Soy"],
    ingredients: ["Basmati rice", "Whole spices", "Saffron", "Fried onions", "Ghee", "Fresh mint", "Yogurt"],
    prepTime: "35–45 mins",
  },
  bread: {
    nutrition: [
      { label: "Calories", value: "180 kcal" },
      { label: "Protein", value: "5 g" },
      { label: "Carbs", value: "32 g" },
      { label: "Fat", value: "4 g" },
      { label: "Fibre", value: "2 g" },
      { label: "Sodium", value: "220 mg" },
    ],
    allergens: ["Gluten", "Dairy"],
    ingredients: ["Wheat flour", "Water", "Yeast", "Butter", "Salt"],
    prepTime: "10–15 mins",
  },
  sizzler: {
    nutrition: [
      { label: "Calories", value: "520 kcal" },
      { label: "Protein", value: "28 g" },
      { label: "Carbs", value: "44 g" },
      { label: "Fat", value: "22 g" },
      { label: "Fibre", value: "4 g" },
      { label: "Sodium", value: "680 mg" },
    ],
    allergens: ["Gluten", "Dairy", "Eggs", "Soy"],
    ingredients: ["Protein of choice", "Seasonal vegetables", "Butter", "Sauces", "Herbs", "Seasoning"],
    prepTime: "30–40 mins",
  },
  salad: {
    nutrition: [
      { label: "Calories", value: "140 kcal" },
      { label: "Protein", value: "5 g" },
      { label: "Carbs", value: "14 g" },
      { label: "Fat", value: "7 g" },
      { label: "Fibre", value: "4 g" },
      { label: "Sodium", value: "180 mg" },
    ],
    allergens: ["Dairy", "Tree Nuts"],
    ingredients: ["Mixed greens", "Cherry tomatoes", "Cucumber", "Olive oil", "Lemon dressing", "Herbs"],
    prepTime: "10–15 mins",
  },
  soup: {
    nutrition: [
      { label: "Calories", value: "120 kcal" },
      { label: "Protein", value: "6 g" },
      { label: "Carbs", value: "16 g" },
      { label: "Fat", value: "4 g" },
      { label: "Fibre", value: "3 g" },
      { label: "Sodium", value: "560 mg" },
    ],
    allergens: ["Dairy", "Gluten", "Celery"],
    ingredients: ["Vegetable / chicken stock", "Onions", "Garlic", "Cream", "Herbs", "Seasoning"],
    prepTime: "15–20 mins",
  },
  beer: {
    nutrition: [
      { label: "Calories", value: "180 kcal" },
      { label: "Protein", value: "2 g" },
      { label: "Carbs", value: "14 g" },
      { label: "Fat", value: "0 g" },
      { label: "Fibre", value: "0 g" },
      { label: "Sodium", value: "14 mg" },
    ],
    allergens: ["Gluten", "Barley"],
    ingredients: ["Malted barley", "Hops", "Yeast", "Water"],
    prepTime: "Served chilled",
  },
  cocktail: {
    nutrition: [
      { label: "Calories", value: "220 kcal" },
      { label: "Protein", value: "0 g" },
      { label: "Carbs", value: "20 g" },
      { label: "Fat", value: "0 g" },
      { label: "Fibre", value: "0 g" },
      { label: "Sodium", value: "10 mg" },
    ],
    allergens: ["Sulphites"],
    ingredients: ["Spirits", "Fresh citrus juice", "Simple syrup", "Ice", "Aromatic garnish"],
    prepTime: "3–5 mins",
  },
  spirits: {
    nutrition: [
      { label: "Calories", value: "230 kcal" },
      { label: "Protein", value: "0 g" },
      { label: "Carbs", value: "0 g" },
      { label: "Fat", value: "0 g" },
      { label: "Fibre", value: "0 g" },
      { label: "Sodium", value: "1 mg" },
    ],
    allergens: ["Sulphites", "Barley (trace)"],
    ingredients: ["Distilled spirit", "Purified water"],
    prepTime: "Served neat / on rocks",
  },
  wine: {
    nutrition: [
      { label: "Calories", value: "125 kcal" },
      { label: "Protein", value: "0 g" },
      { label: "Carbs", value: "4 g" },
      { label: "Fat", value: "0 g" },
      { label: "Fibre", value: "0 g" },
      { label: "Sodium", value: "6 mg" },
    ],
    allergens: ["Sulphites"],
    ingredients: ["Grapes", "Yeast", "Sulphur dioxide (preservative)"],
    prepTime: "Served chilled / at room temp",
  },
  dessert: {
    nutrition: [
      { label: "Calories", value: "290 kcal" },
      { label: "Protein", value: "4 g" },
      { label: "Carbs", value: "40 g" },
      { label: "Fat", value: "12 g" },
      { label: "Fibre", value: "1 g" },
      { label: "Sodium", value: "110 mg" },
    ],
    allergens: ["Dairy", "Eggs", "Gluten", "Tree Nuts"],
    ingredients: ["Cream", "Sugar", "Butter", "Flour", "Eggs", "Vanilla"],
    prepTime: "15–20 mins",
  },
  mocktail: {
    nutrition: [
      { label: "Calories", value: "95 kcal" },
      { label: "Protein", value: "0 g" },
      { label: "Carbs", value: "24 g" },
      { label: "Fat", value: "0 g" },
      { label: "Fibre", value: "0 g" },
      { label: "Sodium", value: "8 mg" },
    ],
    allergens: ["Sulphites"],
    ingredients: ["Fresh fruit juice", "Soda water", "Grenadine", "Fresh mint", "Ice", "Citrus garnish"],
    prepTime: "3–5 mins",
  },
};

function getCategoryProfile(category: string): DummyProfile {
  const cat = (category || "").toLowerCase();
  if (cat.includes("pizza") || cat.includes("artisan")) return PROFILES.pizza;
  if (cat.includes("pasta")) return PROFILES.pasta;
  if (cat.includes("curry") || cat.includes("indian-mains") || cat.includes("dal") || cat.includes("wok") || cat.includes("asian")) return PROFILES.curry;
  if (cat.includes("biryani") || cat.includes("rice")) return PROFILES.biryani;
  if (cat.includes("bread")) return PROFILES.bread;
  if (cat.includes("sizzler")) return PROFILES.sizzler;
  if (cat.includes("salad")) return PROFILES.salad;
  if (cat.includes("soup")) return PROFILES.soup;
  if (cat.includes("beer") || cat.includes("draught") || cat.includes("pint") || cat.includes("tap")) return PROFILES.beer;
  if (cat.includes("cocktail") || cat.includes("sangria") || cat.includes("shot") || cat.includes("beer-cocktail")) return PROFILES.cocktail;
  if (cat.includes("whisky") || cat.includes("whiskey") || cat.includes("vodka") || cat.includes("gin") || cat.includes("rum") || cat.includes("tequila") || cat.includes("cognac") || cat.includes("brandy") || cat.includes("liqueur") || cat.includes("bar")) return PROFILES.spirits;
  if (cat.includes("wine") || cat.includes("port") || cat.includes("sparkling") || cat.includes("rose") || cat.includes("rosé")) return PROFILES.wine;
  if (cat.includes("dessert")) return PROFILES.dessert;
  if (cat.includes("mocktail") || cat.includes("soft-bev") || cat.includes("beverage")) return PROFILES.mocktail;
  return PROFILES.food;
}

function getNutritionRows(item: MenuItem): NutritionEntry[] {
  const nc = (item as any).nutritionalContents;
  if (nc && typeof nc === "object" && Object.keys(nc).length > 0) {
    return Object.entries(nc).map(([label, value]) => ({ label, value: String(value) }));
  }
  return getCategoryProfile(item.category).nutrition;
}

function getAllergens(item: MenuItem): string[] {
  const a = (item as any).allergens;
  if (Array.isArray(a) && a.length > 0) return a;
  return getCategoryProfile(item.category).allergens;
}

function getIngredients(item: MenuItem): string[] {
  const ing = (item as any).ingredients;
  if (Array.isArray(ing) && ing.length > 0) return ing;
  return getCategoryProfile(item.category).ingredients;
}

function getPrepTime(item: MenuItem): string {
  const pt = (item as any).preparationTime;
  if (pt && typeof pt === "string" && pt.trim()) return pt;
  return getCategoryProfile(item.category).prepTime;
}

export default function DishDetailModal({ item, onClose }: DishDetailModalProps) {
  const { isDark } = useTheme();
  const [imgError, setImgError] = useState(false);

  if (!item) return null;

  const textPrimary = isDark ? "#FFFFFF" : "#000000";
  const textSecondary = isDark ? "rgba(220,212,200,0.5)" : "rgba(0,0,0,0.45)";
  const cardBg = isDark ? "rgba(212,175,55,0.06)" : "#FFFFFF";
  const cardBorder = isDark ? "1px solid rgba(212,175,55,0.15)" : "1px solid rgba(0,0,0,0.08)";

  const isBroken = imgError || !item.image || item.image.includes("placeholder.com") || item.image.includes("example.com");
  const imageUrl = isBroken ? fallbackImg : item.image;

  const priceDisplay =
    typeof item.price === "string" && item.price.includes("|")
      ? item.price.split("|").map((p: string) => `₹${p.trim()}`).join("  |  ")
      : `₹${item.price}`;

  const nutritionRows = getNutritionRows(item);
  const allergens = getAllergens(item);
  const ingredients = getIngredients(item);
  const prepTime = getPrepTime(item);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto"
          style={{ backgroundColor: isDark ? "var(--bb-card)" : "#FFFFFF" }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 32, stiffness: 300 }}
        >
          {/* Hero Image */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img
              src={imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(26,20,8,0.6) 100%)",
              }}
            />
            <div
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{
                backgroundColor: item.isVeg ? "rgba(22,163,74,0.92)" : "rgba(220,38,38,0.92)",
                color: "#fff",
                backdropFilter: "blur(4px)",
                border: item.isVeg ? "1px solid rgba(74,222,128,0.5)" : "1px solid rgba(252,165,165,0.4)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {item.isVeg ? "Veg" : "Non-Veg"}
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all active:scale-90"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #E6C55A)",
                border: "none",
                boxShadow: "0 2px 12px rgba(212,175,55,0.4)",
              }}
              data-testid="button-close-dish-modal"
            >
              <X className="w-4 h-4" style={{ color: "#1A1408" }} strokeWidth={2.5} />
            </button>
          </div>

          {/* Gold accent line */}
          <div
            className="w-full h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, #E6C55A, transparent)" }}
          />

          {/* Name + Price row */}
          <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
            <h2
              className="font-bold leading-tight uppercase flex-1"
              style={{
                color: textPrimary,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(17px, 5vw, 24px)",
                letterSpacing: "0.08em",
                wordBreak: "break-word",
              }}
              data-testid="text-dish-name"
            >
              {item.name}
            </h2>
            <p
              className="text-lg font-black tracking-wider flex-shrink-0"
              style={{
                background: "linear-gradient(90deg, #D4AF37, #E6C55A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'DM Sans', sans-serif",
              }}
              data-testid="text-dish-price"
            >
              {priceDisplay}
            </p>
          </div>

          {/* Content */}
          <div className="px-5 pb-10 space-y-5">

            {/* Description */}
            {item.description && (
              <div
                className="rounded-2xl px-4 py-3"
                style={{
                  background: isDark ? "rgba(212,175,55,0.07)" : "#F5F5F5",
                  borderLeft: "3px solid #D4AF37",
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: textPrimary, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75 }}
                  data-testid="text-dish-description"
                >
                  {item.description}
                </p>
              </div>
            )}

            {/* Prep time */}
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 flex-shrink-0" style={{ color: "var(--bb-gold)" }} />
              <div>
                <p
                  className="text-[10px] uppercase tracking-widest font-semibold"
                  style={{ color: "rgba(212,175,55,0.6)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Preparation Time
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: textPrimary, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {prepTime}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: isDark ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.08)" }} />

            {/* Nutritional Contents */}
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--bb-gold)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Nutritional Contents
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {nutritionRows.map((n) => (
                  <div
                    key={n.label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: cardBg, border: cardBorder }}
                  >
                    <p
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: textSecondary, fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {n.label}
                    </p>
                    <p
                      className="text-sm font-bold"
                      style={{ color: textPrimary, fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {n.value}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className="text-[10px] mt-2 text-center uppercase tracking-wider"
                style={{ color: "rgba(212,175,55,0.35)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Per serving · Approximate values
              </p>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: "rgba(212,175,55,0.15)" }} />

            {/* Allergens */}
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--bb-gold)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Allergens
              </h3>
              <div className="flex flex-wrap gap-2">
                {allergens.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: isDark ? "rgba(212,175,55,0.1)" : "#FFF8E7",
                      border: isDark ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(212,175,55,0.4)",
                      color: isDark ? "#E6C55A" : "#8B6200",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: isDark ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.08)" }} />

            {/* Ingredients */}
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--bb-gold)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: cardBg,
                      border: cardBorder,
                      color: textPrimary,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
