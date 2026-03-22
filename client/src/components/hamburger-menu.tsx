import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, Copy, Check, ExternalLink, Utensils, ChevronRight } from "lucide-react";
import { mainCategories } from "@/lib/menu-categories";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { categoryTranslationMap } from "@/lib/translations";
import { useState } from "react";
import ReservationModal from "@/components/reservation-modal";
import mapsImg from "@assets/logo_(1)_1773390711534.png";
import callImg from "@assets/call_1773390891033.png";
import clockImg from "@assets/clock_1773568902929.png";
import instaImg from "@assets/instagram_(2)_1773345405292.png";
import fbImg from "@assets/facebook_(2)_1773345408410.png";
import ytImg from "@assets/youtube_1773345412112.png";
import whatsappImg from "@assets/apple_1773515172898.png";
import reservationImg from "@assets/booking_1774207838605.png";
import gpayImg from "@assets/—Pngtree—google_pay_payment_icon_vector_12256719_1774208085844.png";
import phonepeImg from "@assets/phonepe_1774208135912.png";
import paytmImg from "@assets/paytm_1774208173896.png";
import bhimImg from "@assets/animation-png_512_1774208284046.png";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryClick: (categoryId: string) => void;
}

const UPI_ID = "atdigitalmenu@upi";
const PHONE = "+91 9619523254";

const PAYMENT_APPS = [
  { name: "GPay", img: gpayImg },
  { name: "PhonePe", img: phonepeImg },
  { name: "Paytm", img: paytmImg },
  { name: "BHIM", img: bhimImg },
];

export default function HamburgerMenu({
  isOpen,
  onClose,
  onCategoryClick,
}: HamburgerMenuProps) {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showReservation, setShowReservation] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    onCategoryClick(categoryId);
    onClose();
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID).catch(() => {});
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const sectionLabelColor = isDark ? "rgba(212,175,55,0.7)" : "#000000";
  const upiLabelColor = isDark ? "rgba(212,175,55,0.5)" : "#000000";
  const upiIdColor = isDark ? "#D4AF37" : "#000000";
  const qrBtnColor = isDark ? "#D4AF37" : "#000000";
  const restaurantInfoColor = isDark ? "rgba(212,175,55,0.5)" : "#000000";

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-50 overflow-y-auto"
            style={{ background: isDark ? "linear-gradient(160deg, #1C1500 0%, #0A0800 100%)" : "#FFFFFF" }}
          >
            {/* Gold shimmer top bar */}
            <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, #F0CC60, #D4AF37, transparent)" }} />

            {/* Header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
              style={{ background: isDark ? "linear-gradient(180deg, #1C1500 80%, transparent)" : "#FFFFFF", borderBottom: "1px solid rgba(212,175,55,0.2)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 rounded-full" style={{ background: "linear-gradient(180deg, #D4AF37, #E6C55A)" }} />
                <h2 className="text-base font-black tracking-[0.25em] uppercase" style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif" }}>
                  {t.menuCategories}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", color: "#D4AF37" }}
                data-testid="button-close-menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-4 pb-10 space-y-5 pt-3">

              {/* ── Category Grid ── */}
              <div className="grid grid-cols-2 gap-2.5">
                {mainCategories.filter((cat) => !cat.hidden).map((category, index) => {
                  const translationKey = categoryTranslationMap[category.id];
                  const label = translationKey ? t[translationKey] : category.displayLabel;
                  return (
                    <motion.button
                      key={category.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleCategoryClick(category.id)}
                      className="relative p-4 rounded-2xl text-left transition-all duration-200 overflow-hidden"
                      style={{ background: isDark ? "rgba(212,175,55,0.06)" : "#FFFFFF", border: isDark ? "1px solid rgba(212,175,55,0.22)" : "1px solid rgba(0,0,0,0.1)" }}
                      data-testid={`button-category-${category.id}`}
                    >
                      <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: "linear-gradient(90deg, #D4AF37, #E6C55A)" }} />
                      <p className="text-[10px] font-semibold tracking-widest uppercase mb-0.5" style={{ color: "rgba(212,175,55,0.7)", fontFamily: "'DM Sans', sans-serif" }}>
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="text-[13px] font-bold tracking-wide leading-tight" style={{ color: isDark ? "#E8D8B4" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>
                        {label}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* ── Divider ── */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.15)" }} />
                <Utensils className="w-3.5 h-3.5" style={{ color: "rgba(212,175,55,0.4)" }} />
                <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.15)" }} />
              </div>

              {/* ── Reservation Section ── */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowReservation(true)}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all"
                style={{ background: isDark ? "rgba(212,175,55,0.06)" : "#FFFFFF", border: isDark ? "1px solid rgba(212,175,55,0.28)" : "1px solid rgba(0,0,0,0.1)" }}
                data-testid="button-open-reservation"
              >
                <img src={reservationImg} alt="Reservation" className="w-12 h-12 object-contain flex-shrink-0" />
                <div className="text-left flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-0.5" style={{ color: "rgba(212,175,55,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
                    Table Booking
                  </p>
                  <p className="text-[15px] font-black tracking-wide" style={{ color: isDark ? "#E8D8B4" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>
                    Make a Reservation
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: isDark ? "rgba(220,212,200,0.4)" : "rgba(0,0,0,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
                    Reserve your table in seconds
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(90deg, #D4AF37, #E6C55A)" }}>
                  <ChevronRight className="w-4 h-4" style={{ color: "#1C1500", strokeWidth: 3 }} />
                </div>
              </motion.button>

              {/* ── Pay & Order ── */}
              <div className="rounded-2xl overflow-hidden" style={{ background: isDark ? "rgba(212,175,55,0.04)" : "#FFFFFF", border: isDark ? "1px solid rgba(212,175,55,0.22)" : "1px solid rgba(0,0,0,0.1)" }}>
                <div className="px-4 py-3" style={{ borderBottom: isDark ? "1px solid rgba(212,175,55,0.12)" : "1px solid rgba(0,0,0,0.08)", background: isDark ? "rgba(212,175,55,0.05)" : "#FFFFFF" }}>
                  <div className="flex items-center gap-2">
                    <QrCode className="w-3.5 h-3.5" style={{ color: "#D4AF37" }} />
                    <p className="text-[10px] tracking-[0.25em] font-semibold uppercase" style={{ color: sectionLabelColor, fontFamily: "'DM Sans', sans-serif" }}>
                      Pay &amp; Order
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: isDark ? "rgba(212,175,55,0.07)" : "#FFFFFF", border: isDark ? "1px solid rgba(212,175,55,0.2)" : "1px solid rgba(0,0,0,0.1)" }}>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: upiLabelColor, fontFamily: "'DM Sans', sans-serif" }}>UPI ID</p>
                      <p className="text-sm font-bold tracking-wide" style={{ color: upiIdColor, fontFamily: "monospace" }}>{UPI_ID}</p>
                    </div>
                    <button
                      onClick={handleCopyUpi}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold transition-all active:scale-95"
                      style={{ background: copiedUpi ? "#22c55e" : "linear-gradient(90deg, #D4AF37, #E6C55A)", color: "#1C1500" }}
                      data-testid="button-copy-upi"
                    >
                      {copiedUpi ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedUpi ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  <button
                    onClick={() => setShowQr(!showQr)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all active:scale-95"
                    style={{ border: isDark ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(0,0,0,0.1)", color: qrBtnColor, background: isDark ? "rgba(212,175,55,0.05)" : "#FFFFFF" }}
                    data-testid="button-show-qr"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    {showQr ? "Hide QR Code" : "Show QR Code"}
                  </button>

                  <AnimatePresence>
                    {showQr && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col items-center gap-2 pt-1">
                          <div className="w-44 h-44 rounded-xl flex items-center justify-center" style={{ background: "white", border: "3px solid #D4AF37" }}>
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=176x176&data=upi://pay?pa=${UPI_ID}&pn=BarrelBorn&cu=INR`}
                              alt="UPI QR Code"
                              className="w-40 h-40 object-contain rounded"
                            />
                          </div>
                          <p className="text-[10px] text-center tracking-wide" style={{ color: isDark ? "rgba(220,212,200,0.5)" : "rgba(0,0,0,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                            Scan with any UPI app
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Payment app icons */}
                  <div className="flex items-center gap-2 pt-1">
                    {PAYMENT_APPS.map((app) => (
                      <div
                        key={app.name}
                        className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg gap-1"
                        style={{ background: isDark ? "rgba(212,175,55,0.06)" : "#FFFFFF", border: isDark ? "1px solid rgba(212,175,55,0.15)" : "1px solid rgba(0,0,0,0.1)" }}
                      >
                        <img src={app.img} alt={app.name} className="w-7 h-7 object-contain" style={{ mixBlendMode: isDark ? "normal" : "multiply" }} />
                        <span className="text-[9px] font-semibold" style={{ color: isDark ? "rgba(220,212,200,0.5)" : "rgba(0,0,0,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Restaurant Info ── */}
              <div className="rounded-2xl overflow-hidden" style={{ background: isDark ? "rgba(212,175,55,0.04)" : "#FFFFFF", border: isDark ? "1px solid rgba(212,175,55,0.18)" : "1px solid rgba(0,0,0,0.1)" }}>
                <div className="px-4 py-3" style={{ borderBottom: isDark ? "1px solid rgba(212,175,55,0.12)" : "1px solid rgba(0,0,0,0.08)", background: isDark ? "transparent" : "#FFFFFF" }}>
                  <p className="text-[10px] tracking-[0.25em] font-semibold uppercase" style={{ color: restaurantInfoColor, fontFamily: "'DM Sans', sans-serif" }}>
                    Restaurant Info
                  </p>
                </div>
                <div className="p-4 space-y-4">
                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <img src={mapsImg} alt="Location" className="w-10 h-10 object-contain flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold" style={{ color: isDark ? "#FFFFFF" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>atdigitalmenu</p>
                      <p className="text-xs mt-0.5" style={{ color: isDark ? "#FFFFFF" : "#555555", fontFamily: "'DM Sans', sans-serif" }}>Thane, Maharashtra</p>
                    </div>
                  </div>
                  {/* Contact */}
                  <div className="flex items-center gap-3">
                    <img src={callImg} alt="Call" className="w-10 h-10 object-contain rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold tracking-wide uppercase mb-0.5" style={{ color: isDark ? "#FFFFFF" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>
                        {t.contactUs}
                      </p>
                      <button onClick={() => window.open(`tel:${PHONE.replace(/\s/g, "")}`, "_self")}
                        className="text-sm font-bold transition-opacity hover:opacity-80" style={{ color: isDark ? "#FFFFFF" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>
                        {PHONE}
                      </button>
                      <p className="text-[10px] mt-0.5" style={{ color: isDark ? "#FFFFFF" : "#555555", fontFamily: "'DM Sans', sans-serif" }}>{t.forReservations}</p>
                    </div>
                  </div>
                  {/* Hours */}
                  <div className="flex items-center gap-3">
                    <img src={clockImg} alt="Hours" className="w-10 h-10 object-contain flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold" style={{ color: isDark ? "#FFFFFF" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>11:00 AM – 11:30 PM</p>
                      <p className="text-[10px] mt-0.5" style={{ color: isDark ? "#FFFFFF" : "#555555", fontFamily: "'DM Sans', sans-serif" }}>{t.openAllDays}</p>
                    </div>
                  </div>
                  {/* Instagram */}
                  <div className="flex items-center gap-3">
                    <img src={instaImg} alt="Instagram" className="w-10 h-10 object-contain rounded-xl flex-shrink-0" />
                    <div>
                      <button onClick={() => window.open("https://www.instagram.com/atdigitalmenu", "_blank", "noopener,noreferrer")}
                        className="text-sm font-bold flex items-center gap-1 transition-opacity hover:opacity-80" style={{ color: isDark ? "#FFFFFF" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>
                        @atdigitalmenu <ExternalLink className="w-3 h-3" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)" }} />
                      </button>
                      <p className="text-[10px] mt-0.5" style={{ color: isDark ? "#FFFFFF" : "#555555", fontFamily: "'DM Sans', sans-serif" }}>{t.followForUpdates}</p>
                    </div>
                  </div>
                  {/* Facebook */}
                  <div className="flex items-center gap-3">
                    <img src={fbImg} alt="Facebook" className="w-10 h-10 object-contain rounded-xl flex-shrink-0" />
                    <div>
                      <button onClick={() => window.open("https://facebook.com/atdigitalmenu", "_blank", "noopener,noreferrer")}
                        className="text-sm font-bold flex items-center gap-1 transition-opacity hover:opacity-80" style={{ color: isDark ? "#FFFFFF" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>
                        atdigitalmenu <ExternalLink className="w-3 h-3" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)" }} />
                      </button>
                      <p className="text-[10px] mt-0.5" style={{ color: isDark ? "#FFFFFF" : "#555555", fontFamily: "'DM Sans', sans-serif" }}>Follow on Facebook</p>
                    </div>
                  </div>
                  {/* YouTube */}
                  <div className="flex items-center gap-3">
                    <img src={ytImg} alt="YouTube" className="w-10 h-10 object-contain rounded-xl flex-shrink-0" />
                    <div>
                      <button onClick={() => window.open("https://youtube.com/@atdigitalmenu", "_blank", "noopener,noreferrer")}
                        className="text-sm font-bold flex items-center gap-1 transition-opacity hover:opacity-80" style={{ color: isDark ? "#FFFFFF" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>
                        atdigitalmenu <ExternalLink className="w-3 h-3" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)" }} />
                      </button>
                      <p className="text-[10px] mt-0.5" style={{ color: isDark ? "#FFFFFF" : "#555555", fontFamily: "'DM Sans', sans-serif" }}>Watch on YouTube</p>
                    </div>
                  </div>
                  {/* WhatsApp */}
                  <div className="flex items-center gap-3">
                    <img src={whatsappImg} alt="WhatsApp" className="w-10 h-10 object-contain rounded-xl flex-shrink-0" />
                    <div>
                      <button onClick={() => window.open("https://wa.me/919619523254", "_blank", "noopener,noreferrer")}
                        className="text-sm font-bold flex items-center gap-1 transition-opacity hover:opacity-80" style={{ color: isDark ? "#FFFFFF" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>
                        {PHONE} <ExternalLink className="w-3 h-3" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)" }} />
                      </button>
                      <p className="text-[10px] mt-0.5" style={{ color: isDark ? "#FFFFFF" : "#555555", fontFamily: "'DM Sans', sans-serif" }}>Chat on WhatsApp</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="h-px w-full" style={{ background: "rgba(212,175,55,0.1)" }} />
              <p
                className="text-center text-[10px] tracking-widest cursor-pointer transition-opacity hover:opacity-80"
                style={{ color: "rgba(212,175,55,0.3)", fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => window.open("https://www.atdigitalmenu.com", "_blank")}
              >
                Powered by AT Digital Menu
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Reservation Modal ── */}
      <AnimatePresence>
        {showReservation && (
          <ReservationModal onClose={() => setShowReservation(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
