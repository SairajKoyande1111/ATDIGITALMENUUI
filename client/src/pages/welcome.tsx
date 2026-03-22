import googleReviewImg from "@assets/Google_Review_(1)_1773512308220.png";
import spoonForkImg from "@assets/19_1773512274982.png";
import { useLocation } from "wouter";
import { useWelcomeAudio } from "../hooks/useWelcomeAudio";
import { MediaPreloader } from "../components/media-preloader";
import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageDropdown from "@/components/language-dropdown";
import { AnimatePresence } from "framer-motion";
import ReservationModal from "@/components/reservation-modal";
import atDigitalMenuLogo from "@assets/₹999-_(15)_1774207200972.png";
import instaImg from "@assets/instagram_(2)_1773345405292.png";
import fbImg from "@assets/facebook_(2)_1773345408410.png";
import ytImg from "@assets/youtube_1773345412112.png";
import mapsImg from "@assets/logo_(1)_1773390711534.png";
import callImg from "@assets/call_1773390891033.png";
import mailImg from "@assets/communication_1773390476300.png";
import whatsappImg from "@assets/apple_1773515172898.png";
import bookingImg from "@assets/booking_1774207838605.png";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center rounded-full transition-all duration-300 active:scale-95 select-none"
      style={{
        width: "88px",
        height: "36px",
        padding: "3px",
        background: isDark ? "#1C1500" : "#E4E4E4",
        border: isDark
          ? "1.5px solid rgba(212,175,55,0.4)"
          : "1.5px solid rgba(0,0,0,0.12)",
        boxShadow: isDark
          ? "inset 0 1px 3px rgba(0,0,0,0.6)"
          : "inset 0 2px 4px rgba(0,0,0,0.12)",
      }}
      data-testid="button-theme-toggle"
    >
      {isDark ? (
        <>
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{
              width: 28,
              height: 28,
              background: "#FFFFFF",
              boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="#2C2200"
                stroke="#2C2200"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="18" cy="5" r="1" fill="#2C2200" />
              <circle cx="20" cy="9" r="0.7" fill="#2C2200" />
            </svg>
          </div>
          <span
            className="flex-1 text-center font-bold"
            style={{
              color: "#D4AF37",
              fontSize: "9px",
              letterSpacing: "0.06em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            DARK
          </span>
        </>
      ) : (
        <>
          <span
            className="flex-1 text-center font-bold"
            style={{
              color: "#555",
              fontSize: "9px",
              letterSpacing: "0.06em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            LIGHT
          </span>
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{
              width: 28,
              height: 28,
              background: "#FFFFFF",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </div>
        </>
      )}
    </button>
  );
}

export default function Welcome() {
  const [, setLocation] = useLocation();
  const { playWelcomeAudio } = useWelcomeAudio();
  const [mediaReady, setMediaReady] = useState(false);
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [showReservation, setShowReservation] = useState(false);

  const handleExploreMenu = () => {
    playWelcomeAudio();
    setLocation("/menu");
  };

  const handleSocialClick = useCallback((url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      (document.activeElement as HTMLElement)?.blur();
    }
  }, []);

  const handleReviewClick = useCallback(() => {
    window.open("https://g.page/r/CbKAeLOlg005EBM/review", "_blank", "noopener,noreferrer");
  }, []);

  const labelColor = isDark ? "#FFFFFF" : "var(--bb-text)";

  return (
    <div
      className="h-screen w-full overflow-hidden relative flex flex-col"
      style={{ backgroundColor: "var(--bb-bg)" }}
    >
      <MediaPreloader onComplete={() => setMediaReady(true)} />

      <div className="fixed top-3 left-3 z-50">
        <ThemeToggle />
      </div>

      <div className="fixed top-3 right-3 z-50">
        <LanguageDropdown />
      </div>

      <div className="flex flex-col items-center w-full flex-1 px-0 pt-12 pb-3 gap-5 justify-start">

        {/* Logo — cropped to remove whitespace above and below the text */}
        <div
          className="w-full flex justify-center"
          style={{ height: "155px", overflow: "hidden", position: "relative", flexShrink: 0 }}
        >
          <img
            src={atDigitalMenuLogo}
            alt="AT Digital Menu"
            style={{
              width: "340px",
              position: "absolute",
              top: "-78px",
              mixBlendMode: isDark ? "normal" : "multiply",
            }}
          />
        </div>

        {/* Explore button */}
        <button
          onClick={handleExploreMenu}
          className="w-full max-w-xs py-4 font-semibold rounded-full transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(90deg, #d4af37, #e6c55a)",
            border: "none",
            color: "#3D3100",
            boxShadow: isDark
              ? "inset 0 0 0 2px #3D3100, 0 0 0 2px #FFFFFF, 0 0 0 4px #d4af37"
              : "inset 0 0 0 2px rgba(0,0,0,0.1), 0 0 0 2px #FFFFFF, 0 0 0 4px #d4af37",
            fontSize: "17px",
          }}
          data-testid="button-explore-menu"
        >
          <img src={spoonForkImg} alt="" className="w-7 h-7 object-contain" style={{ mixBlendMode: "multiply" }} />
          <span style={{ color: "#3D3100" }}>{t.exploreMenu}</span>
        </button>

        {/* Follow Our Socials */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-normal tracking-widest" style={{ color: labelColor }}>
            Follow Our Socials
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleSocialClick("https://www.instagram.com/barrelborn_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==")}
              className="transition-opacity hover:opacity-80"
            >
              <img src={instaImg} alt="Instagram" className="w-12 h-12 rounded-xl object-cover" />
            </button>
            <button
              onClick={() => handleSocialClick("https://facebook.com")}
              className="transition-opacity hover:opacity-80"
            >
              <img src={fbImg} alt="Facebook" className="w-12 h-12 rounded-xl object-cover" />
            </button>
            <button
              onClick={() => handleSocialClick("https://youtube.com")}
              className="transition-opacity hover:opacity-80"
            >
              <img src={ytImg} alt="YouTube" className="w-12 h-12 rounded-xl object-cover" />
            </button>
          </div>
        </div>

        {/* Click to Rate Us */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-normal tracking-widest" style={{ color: labelColor }}>
            Click To Rate Us
          </p>
          <div style={{ overflow: "hidden", height: "62px" }}>
            <button onClick={handleReviewClick} className="hover:opacity-80 transition-opacity">
              <img
                src={googleReviewImg}
                alt="Rate us on Google"
                style={{ width: "210px", display: "block", marginTop: "-74px" }}
              />
            </button>
          </div>
        </div>

        {/* Connect With Us */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-normal tracking-widest" style={{ color: labelColor }}>
            Connect With Us
          </p>
          <div className="flex items-start justify-center gap-4">
            <button
              className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-80"
              onClick={() => window.open("https://maps.app.goo.gl/C7K6BijrGrvWTXyBA", "_blank")}
            >
              <img src={mapsImg} alt="Google Maps" className="w-12 h-12 rounded-lg object-cover" />
              <span className="text-xs font-medium" style={{ color: labelColor }}>LOCATE</span>
            </button>
            <button
              className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-80"
              onClick={() => window.open("tel:+918278251111")}
            >
              <img src={callImg} alt="Call" className="w-12 h-12 rounded-full object-cover" />
              <span className="text-xs font-medium" style={{ color: labelColor }}>CALL</span>
            </button>
            <button
              className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-80"
              onClick={() => window.open("https://wa.me/918278251111", "_blank")}
            >
              <img src={whatsappImg} alt="WhatsApp" className="w-12 h-12 rounded-xl object-cover" />
              <span className="text-xs font-medium" style={{ color: labelColor }}>CHAT</span>
            </button>
            <button
              className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-80"
              onClick={() => window.open("mailto:info@barrelborn.in")}
            >
              <img src={mailImg} alt="Email" className="w-12 h-12 rounded-lg object-cover" />
              <span className="text-xs font-medium" style={{ color: labelColor }}>EMAIL</span>
            </button>
            <button
              className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-80"
              onClick={() => setShowReservation(true)}
              data-testid="button-welcome-reserve"
            >
              <img src={bookingImg} alt="Reserve" className="w-12 h-12 object-contain" />
              <span className="text-xs font-medium" style={{ color: labelColor }}>RESERVE</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p
          className="cursor-pointer text-xs font-normal tracking-widest"
          style={{ color: labelColor, textTransform: "lowercase", opacity: 0.7 }}
          onClick={() => window.open("https://www.atdigitalmenu.com", "_blank")}
        >
          www.atdigitalmenu.com
        </p>

      </div>

      <AnimatePresence>
        {showReservation && (
          <ReservationModal onClose={() => setShowReservation(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
