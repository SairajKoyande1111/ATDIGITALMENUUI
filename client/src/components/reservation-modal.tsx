import { motion, AnimatePresence } from "framer-motion";
import { X, Users, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import Lottie from "lottie-react";
// @ts-ignore
import confirmationAnimation from "@assets/Confirmation_1773569485933.json";
import reservationImg from "@assets/booking_1774207838605.png";

const TIME_SLOTS = [
  "11:00 AM – 12:30 PM",
  "12:30 PM – 02:00 PM",
  "02:00 PM – 03:30 PM",
  "03:30 PM – 05:00 PM",
  "05:00 PM – 06:30 PM",
  "06:30 PM – 08:00 PM",
  "08:00 PM – 09:30 PM",
  "09:30 PM – 11:00 PM",
];

interface ReservationModalProps {
  onClose: () => void;
}

export default function ReservationModal({ onClose }: ReservationModalProps) {
  const { isDark } = useTheme();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [guests, setGuests] = useState("2");
  const [occasion, setOccasion] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !timeSlot) return;
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsSubmitting(false);
    setConfirmed(true);
  };

  const inputBg = isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF";
  const inputBorder = isDark ? "1px solid #FFFFFF" : "1px solid #CC7A00";
  const inputColor = isDark ? "#FFFFFF" : "#000000";
  const labelColor = isDark ? "#FFFFFF" : "#CC7A00";

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />

      <motion.div
        className="relative w-full sm:max-w-sm mx-0 sm:mx-4 rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{
          background: isDark ? "#000000" : "#FFFFFF",
          border: isDark ? "1.5px solid #FFFFFF" : "1.5px solid #CC7A00",
          boxShadow: isDark ? "0 0 60px rgba(255,255,255,0.08), 0 24px 64px rgba(0,0,0,0.7)" : "0 0 40px rgba(204,122,0,0.12), 0 24px 64px rgba(0,0,0,0.15)",
          maxHeight: "92dvh",
          overflowY: "auto",
        }}
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
      >
        <div className="h-[3px] w-full" style={{ background: isDark ? "linear-gradient(90deg, transparent, #FFFFFF, transparent)" : "linear-gradient(90deg, transparent, #CC7A00, #E8960A, #CC7A00, transparent)" }} />

        {!confirmed ? (
          <div className="p-5 pb-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(204,122,0,0.1)", border: isDark ? "1px solid #FFFFFF" : "1px solid #CC7A00", color: isDark ? "#FFFFFF" : "#CC7A00" }}
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <img src={reservationImg} alt="Reservation" className="w-12 h-12 object-contain flex-shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-0.5" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(204,122,0,0.7)", fontFamily: "'DM Sans', sans-serif" }}>
                  Make a Reservation
                </p>
                <h3 className="text-lg font-black leading-tight" style={{ color: isDark ? "#FFFFFF" : "#CC7A00", fontFamily: "'Cormorant Garamond', serif" }}>
                  Book Your Table
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: labelColor }}>
                  Your Name *
                </label>
                <div className="flex items-center rounded-xl px-4 h-11" style={{ background: inputBg, border: inputBorder }}>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-transparent outline-none text-sm font-light"
                    style={{ color: inputColor, caretColor: isDark ? "#FFFFFF" : "#CC7A00" }}
                    data-testid="input-reservation-name"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: labelColor }}>
                  Contact Number *
                </label>
                <div className="flex items-center rounded-xl px-4 h-11" style={{ background: inputBg, border: inputBorder }}>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
                    placeholder="+91 XXXXX XXXXX"
                    maxLength={10}
                    inputMode="numeric"
                    required
                    className="w-full bg-transparent outline-none text-sm font-light"
                    style={{ color: inputColor, caretColor: isDark ? "#FFFFFF" : "#CC7A00" }}
                    data-testid="input-reservation-phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: labelColor }}>
                    Date *
                  </label>
                  <div className="flex items-center rounded-xl px-4 h-11" style={{ background: inputBg, border: inputBorder }}>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-transparent outline-none text-sm font-light"
                      style={{ color: inputColor, caretColor: "#D4AF37", colorScheme: isDark ? "dark" : "light" }}
                      data-testid="input-reservation-date"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: labelColor }}>
                    Guests *
                  </label>
                  <div className="relative flex items-center rounded-xl px-4 h-11" style={{ background: inputBg, border: inputBorder }}>
                    <Users className="w-3.5 h-3.5 mr-2 flex-shrink-0" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "#CC7A00" }} />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm font-light appearance-none"
                      style={{ color: inputColor }}
                      data-testid="select-reservation-guests"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                        <option key={n} value={String(n)} style={{ background: isDark ? "#000000" : "#FFFFFF", color: isDark ? "#FFFFFF" : "#000000" }}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-3 pointer-events-none" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "#CC7A00" }} />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: labelColor }}>
                  Time Slot *
                </label>
                <div className="relative flex items-center rounded-xl px-4 h-11" style={{ background: inputBg, border: inputBorder }}>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    required
                    className="w-full bg-transparent outline-none text-sm font-light appearance-none"
                    style={{ color: timeSlot ? inputColor : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)") }}
                    data-testid="select-reservation-timeslot"
                  >
                    <option value="" disabled style={{ background: isDark ? "#000000" : "#FFFFFF", color: isDark ? "#FFFFFF" : "#000000" }}>Select a time slot</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} style={{ background: isDark ? "#000000" : "#FFFFFF", color: isDark ? "#FFFFFF" : "#000000" }}>{slot}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-3 pointer-events-none" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "#CC7A00" }} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: labelColor }}>
                  Occasion <span style={{ color: isDark ? "rgba(180,160,100,0.5)" : "rgba(0,0,0,0.35)" }}>(Optional)</span>
                </label>
                <div className="flex items-center rounded-xl px-4 h-11" style={{ background: inputBg, border: inputBorder }}>
                  <input
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="Birthday, Anniversary, Business..."
                    className="w-full bg-transparent outline-none text-sm font-light"
                    style={{ color: inputColor, caretColor: isDark ? "#FFFFFF" : "#CC7A00" }}
                    data-testid="input-reservation-occasion"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !name || !phone || !date || !timeSlot}
                className="w-full h-12 rounded-full font-bold tracking-widest text-sm transition-all active:scale-95 disabled:opacity-40 mt-2"
                style={{
                  background: isDark ? "#FFFFFF" : "#CC7A00",
                  color: isDark ? "#000000" : "#FFFFFF",
                  letterSpacing: "0.15em",
                  boxShadow: isDark ? "0 4px 20px rgba(255,255,255,0.15)" : "0 4px 20px rgba(204,122,0,0.35)",
                }}
                data-testid="button-confirm-reservation"
              >
                {isSubmitting ? "RESERVING..." : "CONFIRM RESERVATION"}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center px-6 py-8 text-center">
            <Lottie
              animationData={confirmationAnimation}
              loop={false}
              autoplay
              style={{ width: 180, height: 144 }}
            />
            <h3
              className="text-2xl font-black mt-2"
              style={{ color: isDark ? "#FFFFFF" : "#CC7A00", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Reservation Confirmed!
            </h3>
            <p className="text-sm mt-2 font-light" style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
              We're looking forward to hosting you, <span style={{ color: isDark ? "#FFFFFF" : "#CC7A00", fontWeight: 600 }}>{name}</span>.
            </p>
            <div className="w-full mt-5 rounded-2xl p-4 space-y-2" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(204,122,0,0.06)", border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(204,122,0,0.25)" }}>
              {[
                { label: "Date", value: new Date(date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
                { label: "Time", value: timeSlot },
                { label: "Guests", value: `${guests} ${Number(guests) === 1 ? "Guest" : "Guests"}` },
                ...(occasion ? [{ label: "Occasion", value: occasion }] : []),
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-[11px] uppercase tracking-widest" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "#CC7A00", fontFamily: "'DM Sans', sans-serif" }}>{row.label}</span>
                  <span className="text-[13px] font-semibold" style={{ color: isDark ? "#FFFFFF" : "#000000", fontFamily: "'DM Sans', sans-serif" }}>{row.value}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] mt-4" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
              Our team will contact you on <span style={{ color: isDark ? "#FFFFFF" : "#CC7A00" }}>{phone}</span> to confirm.
            </p>
            <button
              onClick={onClose}
              className="mt-5 px-8 py-2.5 rounded-full font-bold text-sm tracking-widest uppercase transition-all active:scale-95"
              style={{ background: isDark ? "#FFFFFF" : "#CC7A00", color: isDark ? "#000000" : "#FFFFFF" }}
              data-testid="button-close-confirmation"
            >
              Done
            </button>
          </div>
        )}
        <div className="h-[2px] w-full" style={{ background: isDark ? "linear-gradient(90deg, transparent, #FFFFFF, transparent)" : "linear-gradient(90deg, transparent, #CC7A00, transparent)" }} />
      </motion.div>
    </motion.div>
  );
}
