import { Utensils } from "lucide-react";
import googleReviewImg from "@assets/Google_Review_(1)_1773391050407.png";
import { useLocation } from "wouter";
import { useWelcomeAudio } from "../hooks/useWelcomeAudio";
import { MediaPreloader } from "../components/media-preloader";
import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageDropdown from "@/components/language-dropdown";
import digitalMenuImg from "@assets/Untitled_design_(2)_1773391381521.png";
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
      className="min-h-screen w-full overflow-auto relative"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <MediaPreloader onComplete={() => setMediaReady(true)} />

      {/* Language dropdown — fixed top right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageDropdown />
      </div>

      {/* Main content container */}
      <div className="flex flex-col items-center w-full px-6 pt-8 pb-6 gap-6">

        {/* Digital Menu Logo */}
        <img
          src={digitalMenuImg}
          alt="Digital Menu"
          className="w-full max-w-sm h-auto object-contain -mb-12"
        />

        {/* Stay Connected Always — Social Icons */}
        <div className="flex flex-col items-center gap-3 w-full">
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#B8986A" }}>
            Stay Connected Always
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleSocialClick("https://www.instagram.com/barrelborn_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==")}
              className="flex items-center justify-center transition-opacity hover:opacity-80"
            >
              <img src={instaImg} alt="Instagram" className="w-11 h-11 rounded-xl object-cover" />
            </button>
            <button
              onClick={() => handleSocialClick("https://facebook.com")}
              className="flex items-center justify-center transition-opacity hover:opacity-80"
            >
              <img src={fbImg} alt="Facebook" className="w-9 h-9 rounded-xl object-cover" />
            </button>
            <button
              onClick={() => handleSocialClick("https://youtube.com")}
              className="flex items-center justify-center transition-opacity hover:opacity-80"
            >
              <img src={ytImg} alt="YouTube" className="w-11 h-11 rounded-xl object-cover" />
            </button>
          </div>
        </div>

        {/* Explore Menu Button */}
        <button
          onClick={handleExploreMenu}
          className="px-10 py-3 font-semibold border-2 rounded-full transition-colors flex items-center gap-2 text-base"
          style={{ borderColor: "#B8986A", color: "#FFFFFF", backgroundColor: "#B8986A", outline: "2px solid #B8986A", outlineOffset: "2px" }}
          data-testid="button-explore-menu"
        >
          <Utensils className="w-5 h-5" style={{ color: "#FFFFFF" }} />
          <span>{t.exploreMenu}</span>
        </button>

        {/* Rating Section */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-medium text-base" style={{ color: "#333333" }}>
            {t.rateOnGoogle}
          </p>
          <button onClick={handleReviewClick} className="hover:opacity-80 transition-opacity">
            <img
              src={googleReviewImg}
              alt="Rate us on Google"
              className="w-52 h-auto object-contain"
            />
          </button>
        </div>

        {/* Connect With Us — Maps, Call, Mail */}
        <div className="flex flex-col items-center gap-3 w-full">
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#B8986A" }}>
            Connect With Us
          </p>
          <div className="flex items-start justify-center gap-8">

            {/* Location */}
            <button
              className="flex flex-col items-center gap-1 transition-opacity hover:opacity-80"
              onClick={() => window.open("https://maps.app.goo.gl/C7K6BijrGrvWTXyBA", "_blank")}
            >
              <img src={mapsImg} alt="Google Maps" className="w-11 h-11 rounded-lg object-cover" />
              <span className="text-xs font-medium" style={{ color: "#555555" }}>Location</span>
            </button>

            {/* Phone */}
            <button
              className="flex flex-col items-center gap-1 transition-opacity hover:opacity-80"
              onClick={() => window.open("tel:+918278251111")}
            >
              <img src={callImg} alt="Call" className="w-11 h-11 rounded-full object-cover" />
              <span className="text-xs font-medium" style={{ color: "#555555" }}>Call Us</span>
            </button>

            {/* Email */}
            <button
              className="flex flex-col items-center gap-1 transition-opacity hover:opacity-80"
              onClick={() => window.open("mailto:info@barrelborn.in")}
            >
              <img src={mailImg} alt="Email" className="w-11 h-11 rounded-lg object-cover" />
              <span className="text-xs font-medium" style={{ color: "#555555" }}>Email Us</span>
            </button>

          </div>
        </div>

        {/* Website URL */}
        <p
          className="cursor-pointer text-sm"
          style={{ color: "#B8986A" }}
          onClick={() => window.open("https://www.barrelborn.in", "_blank")}
        >
          www.barrelborn.in
        </p>

        {/* Developer Credit */}
        <div className="text-center text-xs" style={{ color: "#555555" }}>
          <p>{t.developedBy}</p>
          <p
            className="font-medium cursor-pointer"
            onClick={() => window.open("http://www.airavatatechnologies.com", "_blank")}
            style={{ color: "#B8986A" }}
          >
            AIRAVATA TECHNOLOGIES
          </p>
        </div>

      </div>
    </div>
  );
}
