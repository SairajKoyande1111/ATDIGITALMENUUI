import { Utensils } from "lucide-react";
import googleReviewImg from "@assets/Google_Review_(2)_1773394875392.png";
import { useLocation } from "wouter";
import { useWelcomeAudio } from "../hooks/useWelcomeAudio";
import { MediaPreloader } from "../components/media-preloader";
import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageDropdown from "@/components/language-dropdown";
import atDigitalMenuLogo from "@assets/ATDIGITALMENUNOBG_1773511851120.png";
import instaImg from "@assets/instagram_(2)_1773345405292.png";
import fbImg from "@assets/facebook_(2)_1773345408410.png";
import ytImg from "@assets/youtube_1773345412112.png";
import mapsImg from "@assets/logo_(1)_1773390711534.png";
import callImg from "@assets/call_1773390891033.png";
import mailImg from "@assets/communication_1773390476300.png";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const { playWelcomeAudio } = useWelcomeAudio();
  const [mediaReady, setMediaReady] = useState(false);
  const { t } = useLanguage();

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

  return (
    <div
      className="h-screen w-full overflow-hidden relative flex flex-col"
      style={{ backgroundColor: "#3D3100" }}
    >
      <MediaPreloader onComplete={() => setMediaReady(true)} />

      {/* Language dropdown — fixed top right */}
      <div className="fixed top-3 right-3 z-50">
        <LanguageDropdown />
      </div>

      {/* Main content — every element is a direct sibling, no wrappers, no padding */}
      <div className="flex flex-col items-center w-full flex-1 px-0 pt-0 pb-0 gap-3 justify-start">

        {/* Logo */}
        <div className="w-full flex justify-center" style={{ paddingTop: "16px" }}>
          <img
            src={atDigitalMenuLogo}
            alt="AT Digital Menu"
            style={{ width: "280px", objectFit: "contain" }}
          />
        </div>

        {/* Explore button */}
        <button
          onClick={handleExploreMenu}
          className="w-full max-w-xs py-3 font-normal border-2 rounded-full transition-colors flex items-center justify-center gap-2 text-sm"
          style={{ borderColor: "#FFF500", color: "#FFFFFF", backgroundColor: "#FFF500", outline: "2px solid #FFF500", outlineOffset: "2px" }}
          data-testid="button-explore-menu"
        >
          <Utensils className="w-4 h-4" style={{ color: "#FFFFFF" }} />
          <span style={{ color: "#FFFFFF" }}>{t.exploreMenu}</span>
        </button>

        {/* Follow Our Socials label */}
        <p className="text-xs font-normal tracking-widest" style={{ color: "#FFFFFF" }}>
          Follow Our Socials
        </p>

        {/* Social icons row */}
        <div className="flex items-center gap-5">
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

        {/* Google Review badge — clip internal whitespace from square image */}
        <div className="overflow-hidden flex justify-center" style={{ height: "65px" }}>
          <button onClick={handleReviewClick} className="hover:opacity-80 transition-opacity flex-shrink-0">
            <img
              src={googleReviewImg}
              alt="Rate us on Google"
              style={{ width: "160px", height: "160px", objectFit: "contain", display: "block", marginTop: "-48px" }}
            />
          </button>
        </div>

        {/* Connect With Us label */}
        <p className="text-xs font-normal tracking-widest" style={{ color: "#FFFFFF" }}>
          Connect With Us
        </p>

        {/* Connect icons row */}
        <div className="flex items-start justify-center gap-6">
          <button
            className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-80"
            onClick={() => window.open("https://maps.app.goo.gl/C7K6BijrGrvWTXyBA", "_blank")}
          >
            <img src={mapsImg} alt="Google Maps" className="w-12 h-12 rounded-lg object-cover" />
            <span className="text-xs font-medium" style={{ color: "#FFFFFF" }}>Location</span>
          </button>
          <button
            className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-80"
            onClick={() => window.open("tel:+918278251111")}
          >
            <img src={callImg} alt="Call" className="w-12 h-12 rounded-full object-cover" />
            <span className="text-xs font-medium" style={{ color: "#FFFFFF" }}>Call Us</span>
          </button>
          <button
            className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-80"
            onClick={() => window.open("mailto:info@barrelborn.in")}
          >
            <img src={mailImg} alt="Email" className="w-12 h-12 rounded-lg object-cover" />
            <span className="text-xs font-medium" style={{ color: "#FFFFFF" }}>Email Us</span>
          </button>
        </div>

        {/* Footer */}
        <p
          className="cursor-pointer text-xs font-medium"
          style={{ color: "#FFFFFF" }}
          onClick={() => window.open("https://www.atdigitalmenu.com", "_blank")}
        >
          www.atdigitalmenu.com
        </p>

      </div>
    </div>
  );
}
