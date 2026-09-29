import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Trophy,
  Award,
  Sparkles,
  ExternalLink,
  Clock,
  ShieldCheck,
  Flame,
  Info,
  CheckCircle2,
  Users,
} from "lucide-react";

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpeningDoors, setIsOpeningDoors] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fireballs, setFireballs] = useState([]);
  const [sponsorIndex, setSponsorIndex] = useState(0);
  const [ripples, setRipples] = useState([]);

  const audioRef = useRef(null);

  // Global touch / click ripple effect
  const handleScreenClick = (e) => {
    const id = Date.now() + Math.random();
    const x = e.clientX;
    const y = e.clientY;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  // Door click -> open animation -> play music -> enter website
  const handleOpenDoors = () => {
    setIsOpeningDoors(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.65;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay blocked or audio not found:", err);
          setIsPlaying(false);
        });
    }

    setTimeout(() => {
      setHasEntered(true);
    }, 1200);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  // Realistic compact fire-volleyball trajectory
  useEffect(() => {
    if (!hasEntered) return;

    const spawnFireball = () => {
      const id = Date.now() + Math.random();
      const startY = Math.floor(Math.random() * 55) + 15;
      const duration = (Math.random() * 0.7 + 1.5).toFixed(2);
      const size = Math.floor(Math.random() * 8) + 20;

      setFireballs((prev) => [...prev, { id, startY, duration, size }]);

      setTimeout(() => {
        setFireballs((prev) => prev.filter((item) => item.id !== id));
      }, duration * 1000 + 300);
    };

    const firstTimer = setTimeout(spawnFireball, 1200);
    const loopInterval = setInterval(spawnFireball, 6000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(loopInterval);
    };
  }, [hasEntered]);

  // Sponsor carousel auto-rotation
  const sponsors = [
    { id: 1, name: "Apex Builders", category: "Title Sponsor", tier: "Platinum" },
    { id: 2, name: "Travancore Motors", category: "Associate Partner", tier: "Gold" },
    { id: 3, name: "City Hypermarket", category: "Beverage Partner", tier: "Silver" },
    { id: 4, name: "Malabar Gold & Diamonds", category: "Trophy Sponsor", tier: "Gold" },
    { id: 5, name: "Highland Spices", category: "Kit Sponsor", tier: "Silver" },
    { id: 6, name: "Kerala Feeds", category: "Community Partner", tier: "Bronze" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSponsorIndex((prev) => (prev + 1) % sponsors.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [sponsors.length]);

  const individualAwards = [
    { title: "Best Player", prize: "Cash Award + Gold Trophy" },
    { title: "Best Attacker", prize: "Cash Award + Trophy" },
    { title: "Best Libro", prize: "Cash Award + Trophy" },
    { title: "Best Setter", prize: "Cash Award + Trophy" },
    { title: "Best Blocker", prize: "Cash Award + Trophy" },
  ];

  const rulesList = [
    "FIVB standard rally point scoring system across all matches.",
    "Deciding set will be 15 points with minimum 2 points lead.",
    "Official referee decisions remain final and irrevocable.",
    "Discipline and sportsmanship must be maintained inside the arena at all times.",
  ];

  return (
    <div
      onClick={handleScreenClick}
      className="min-h-screen bg-[#05070e] text-slate-100 font-sans selection:bg-red-600 selection:text-white overflow-x-hidden relative"
    >
      <audio ref={audioRef} src="/song/bg.mp3" loop preload="auto" />

      {/* Screen Click Dynamic Ripple FX */}
      {ripples.map((rip) => (
        <span
          key={rip.id}
          className="fixed pointer-events-none rounded-full border-2 border-red-500/80 animate-ping z-50"
          style={{
            left: rip.x - 25,
            top: rip.y - 25,
            width: 50,
            height: 50,
          }}
        />
      ))}

      {/* ========================================================================= */}
      {/* 1. REALISTIC DOUBLE DOORS WITH MAGNETIC WAX SEAL                          */}
      {/* ========================================================================= */}
      {!hasEntered && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center [perspective:1600px] bg-black">
          {/* Left Door */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#060914] via-[#0a1024] to-[#111933] border-r-4 border-red-600/90 shadow-[30px_0_70px_rgba(0,0,0,0.95)] z-20 origin-left transition-transform duration-[1200ms] ease-in-out flex flex-col justify-between py-16 pr-8 items-end ${
              isOpeningDoors ? "-rotate-y-[105deg]" : "rotate-y-0"
            }`}
          >
            <div className="w-4/5 h-1/3 border-2 border-blue-900/40 rounded-xl bg-black/40 flex items-center justify-center shadow-inner">
              <div className="w-3/4 h-3/4 border border-red-900/30 rounded-lg" />
            </div>
            <div className="w-4 h-36 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-200 mr-2" />
            <div className="w-4/5 h-1/3 border-2 border-blue-900/40 rounded-xl bg-black/40 flex items-center justify-center shadow-inner">
              <div className="w-3/4 h-3/4 border border-red-900/30 rounded-lg" />
            </div>
          </div>

          {/* Right Door */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#060914] via-[#0a1024] to-[#111933] border-l-4 border-red-600/90 shadow-[-30px_0_70px_rgba(0,0,0,0.95)] z-20 origin-right transition-transform duration-[1200ms] ease-in-out flex flex-col justify-between py-16 pl-8 items-start ${
              isOpeningDoors ? "rotate-y-[105deg]" : "rotate-y-0"
            }`}
          >
            <div className="w-4/5 h-1/3 border-2 border-blue-900/40 rounded-xl bg-black/40 flex items-center justify-center shadow-inner">
              <div className="w-3/4 h-3/4 border border-red-900/30 rounded-lg" />
            </div>
            <div className="w-4 h-36 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-200 ml-2" />
            <div className="w-4/5 h-1/3 border-2 border-blue-900/40 rounded-xl bg-black/40 flex items-center justify-center shadow-inner">
              <div className="w-3/4 h-3/4 border border-red-900/30 rounded-lg" />
            </div>
          </div>

          {/* Magnetic Center Wax Seal Plaque */}
          <div
            onClick={handleOpenDoors}
            className={`relative z-30 max-w-sm w-[88%] sm:w-full bg-gradient-to-b from-[#0f172a] via-[#090d1a] to-[#04060d] border-2 border-red-500 rounded-3xl p-8 text-center shadow-[0_0_80px_rgba(239,68,68,0.4)] cursor-pointer transform transition-all duration-700 hover:scale-105 active:scale-95 group ${
              isOpeningDoors ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            {/* Pulsing seal */}
            <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-red-600 via-amber-400 to-rose-600 p-1 shadow-[0_0_35px_rgba(239,68,68,0.7)] mb-5">
              <div className="w-full h-full bg-[#080d1a] rounded-full flex items-center justify-center text-4xl group-hover:rotate-180 transition-transform duration-700">
                🏐
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-60" />
            </div>

            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 block mb-1">
              Royal Invitation
            </span>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              സാൻജോസ് ക്ലബ്ബ് മുക്കൂർ
            </h1>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">
              San Jose Arts & Sports • Mukoor
            </p>

            <div className="h-[2px] w-24 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent my-4" />

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
              വോളിബോൾ മാമാങ്കത്തിലേക്ക് ഏവർക്കും സാദരം സ്വാഗതം!
            </p>

            {/* Intuitive Touch Callout */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs uppercase px-5 py-2.5 rounded-full shadow-lg group-hover:shadow-red-600/50">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>പ്രവേശിക്കുക • Touch to Unseal</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. COMPACT FIRE VOLLEYBALL PARTICLES                                      */}
      {/* ========================================================================= */}
      {fireballs.map((ball) => (
        <div
          key={ball.id}
          className="pointer-events-none fixed z-30 flex items-center justify-center"
          style={{
            top: `${ball.startY}%`,
            left: "-90px",
            animation: `smashAcross ${ball.duration}s cubic-bezier(0.2, 0.9, 0.4, 1) forwards`,
          }}
        >
          <div
            className="absolute right-3 h-4 bg-gradient-to-l from-red-600 via-amber-500 to-transparent rounded-full blur-[2px] opacity-90"
            style={{ width: `${ball.size * 3.8}px` }}
          />
          <div
            className="relative rounded-full flex items-center justify-center select-none shadow-[0_0_15px_#ef4444]"
            style={{
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              fontSize: `${ball.size * 0.75}px`,
              animation: "spinBall 0.28s linear infinite",
            }}
          >
            🏐
          </div>
        </div>
      ))}

      {/* GLOBAL KEYFRAME ANIMATIONS */}
      <style>{`
        @keyframes smashAcross {
          0% { transform: translate3d(0, 0, 0) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate3d(calc(100vw + 160px), 80px, 0) scale(1.05); opacity: 0; }
        }
        @keyframes spinBall {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinVinyl {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ribbonSlide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(12deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(16px) rotate(-12deg); }
        }
        @keyframes netWave {
          0% { transform: skewX(0deg) translateX(0px); }
          50% { transform: skewX(2deg) translateX(8px); }
          100% { transform: skewX(0deg) translateX(0px); }
        }
        @keyframes crowdCheer {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-8px) scaleY(1.04); }
          50% { transform: translateY(2px) scaleY(0.98); }
          75% { transform: translateY(-6px) scaleY(1.02); }
        }
        @keyframes lightSweep {
          0% { transform: rotate(-35deg); opacity: 0.15; }
          50% { transform: rotate(35deg); opacity: 0.35; }
          100% { transform: rotate(-35deg); opacity: 0.15; }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 3. ROTATING CD VINYL MUSIC CONTROLLER                                     */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={toggleAudio}
          aria-label="Toggle Theme Music"
          className="group relative flex items-center justify-center p-1.5 rounded-full bg-slate-900 border-2 border-red-600/70 shadow-[0_4px_20px_rgba(220,38,38,0.4)] hover:scale-105 active:scale-95 transition-transform"
        >
          <div
            className={`w-14 h-14 rounded-full bg-neutral-950 border-2 border-neutral-800 flex items-center justify-center relative shadow-inner ${
              isPlaying ? "animate-[spinVinyl_3s_linear_infinite]" : ""
            }`}
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle, #1a1a1a 0, #1a1a1a 2px, #0a0a0a 3px, #0a0a0a 4px)",
            }}
          >
            <div className="w-6 h-6 rounded-full bg-red-600 border border-amber-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 shadow-md">
            {isPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 4. NAVIGATION BAR                                                         */}
      {/* ========================================================================= */}
      <nav className="sticky top-0 z-40 bg-[#070b16]/95 backdrop-blur-md border-b border-red-900/40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl border-2 border-red-600 flex items-center justify-center bg-gradient-to-tr from-red-950 via-blue-950 to-black text-2xl shadow-md shadow-red-900/40">
              🏐
            </div>
            <div>
              <span className="block font-black text-base sm:text-lg tracking-tight text-white uppercase leading-tight">
                സാൻജോസ് <span className="text-red-500">Arts & Sports Club</span>
              </span>
              <span className="text-xs text-blue-400 font-bold tracking-wider">
                Mukoor, Kollam
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-7 font-bold text-xs uppercase tracking-wider">
            <a href="#hero" className="hover:text-red-400 transition-colors">Home</a>
            <a href="#about-club" className="hover:text-red-400 transition-colors">About Club</a>
            <a href="#prizes" className="hover:text-red-400 transition-colors">Prizes</a>
            <a href="#sponsors" className="hover:text-red-400 transition-colors">Sponsors</a>
            <a href="#rules" className="hover:text-red-400 transition-colors">Rules</a>
            <a href="#venue" className="hover:text-red-400 transition-colors">Venue & Contact</a>
            <a
              href="https://maps.app.goo.gl/cKVcQfL5mp38QKhXA?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-red-900/50"
            >
              <MapPin className="w-3.5 h-3.5" /> Map Location
            </a>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
            >
              {navOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 space-y-2 bg-[#0a0f1e] border-b border-red-950">
            {["Home", "About-Club", "Prizes", "Sponsors", "Rules", "Venue"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setNavOpen(false)}
                className="block px-3 py-2.5 rounded-lg font-bold text-sm text-slate-200 hover:text-red-400 hover:bg-red-950/20"
              >
                {item.replace("-", " ")}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ========================================================================= */}
      {/* 5. HERO SECTION: FULL-WIDTH 12x12 RESPONSIVE POSTER + DYNAMIC COURT FX    */}
      {/* ========================================================================= */}
      <section id="hero" className="relative pt-4 sm:pt-8 pb-14 bg-gradient-to-b from-[#080d1e] via-[#050813] to-[#04060d] overflow-hidden">
        {/* Animated Background Court Lines & Moving Whistles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 text-4xl animate-[floatSlow_7s_easeInOut_infinite]">🏐</div>
          <div className="absolute top-1/3 right-8 text-3xl animate-[floatReverse_9s_easeInOut_infinite]">📣</div>
          <div className="absolute bottom-20 left-16 text-3xl animate-[floatSlow_8s_easeInOut_infinite]">⚡</div>
          {/* Sweeping Stadium Light Beam */}
          <div className="absolute -top-32 left-1/2 w-96 h-[600px] bg-gradient-to-b from-blue-400/20 to-transparent blur-3xl origin-top animate-[lightSweep_10s_easeInOut_infinite]" />
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-6 relative z-10">
          {/* Fully Filled 12x12 / Square Responsive Banner */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-red-600/80 shadow-[0_20px_60px_rgba(220,38,38,0.35)] mb-8 bg-black">
            <div className="w-full aspect-square sm:aspect-[16/9] relative">
              <img
                src="/image.png"
                alt="San Jose Arts and Sports Presents Floodlit Volleyball 2026"
                className="w-full h-full object-cover sm:object-contain object-center block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-95" />
            </div>

            {/* Poster Badges Floating over Bottom */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 text-white px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black tracking-widest uppercase mb-1 shadow-lg">
                  <Flame className="w-3.5 h-3.5 animate-pulse text-amber-300" /> All Kerala Mega Tournament
                </span>
                <h2 className="text-2xl sm:text-5xl font-black uppercase text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                  വോളിബോൾ മാമാങ്കം 2026
                </h2>
                <p className="text-xs sm:text-sm text-blue-300 font-semibold mt-1">
                  San Jose Arts & Sports Club • Mukoor Ground
                </p>
              </div>
              <div className="bg-[#0b1224]/95 border-2 border-red-500/60 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl text-right shadow-2xl backdrop-blur-md">
                <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-300 block">Dates</span>
                <span className="text-sm sm:text-xl font-black text-red-500">ഒക്ടോബർ 16 – 19</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0c1429]/95 border border-blue-900/60 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl mx-auto backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-red-500 shrink-0" />
              <div>
                <span className="block text-[11px] uppercase text-slate-400 font-bold">തിയതി</span>
                <span className="text-base sm:text-lg font-black text-white">ഒക്ടോബർ 16 – 19</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-red-500 shrink-0" />
              <div>
                <span className="block text-[11px] uppercase text-slate-400 font-bold">സമയം</span>
                <span className="text-base sm:text-lg font-black text-white">വൈകിട്ട് 7:00 PM മുതൽ</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-red-500 shrink-0" />
              <div>
                <span className="block text-[11px] uppercase text-slate-400 font-bold">വേദി</span>
                <span className="text-sm sm:text-base font-black text-white">സെന്റ് ജോസഫ് ഗ്രൗണ്ട്, മുക്കൂർ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS MOVING VOLLEYBALL DIVIDER RIBBON */}
      <div className="w-full overflow-hidden bg-gradient-to-r from-red-950 via-blue-950 to-red-950 py-2.5 border-y border-red-800/40 relative">
        <div
          className="whitespace-nowrap flex items-center gap-8 w-max text-xs sm:text-sm font-black uppercase tracking-widest text-amber-300"
          style={{ animation: "ribbonSlide 18s linear infinite" }}
        >
          <span>🏐 SAN JOSE ARTS & SPORTS CLUB MUKOOR</span>
          <span>★ ALL KERALA FLOODLIT VOLLEYBALL FESTIVAL 2026</span>
          <span>🏐 7 PREMIER TEAMS BATTLING UNDER FLOODLIGHTS</span>
          <span>★ BACKSIDE OF ST. JOSEPH CHURCH GROUND MUKOOR</span>
          <span>🏐 SAN JOSE ARTS & SPORTS CLUB MUKOOR</span>
          <span>★ ALL KERALA FLOODLIT VOLLEYBALL FESTIVAL 2026</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. ABOUT THE CLUB (With 3D Court Markings & Floating Players Background) */}
      {/* ========================================================================= */}
      <section id="about-club" className="py-20 bg-[#070b16] relative overflow-hidden">
        {/* Animated Court Ground SVG Canvas Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full animate-[netWave_14s_easeInOut_infinite]" viewBox="0 0 800 600" preserveAspectRatio="none">
            {/* Volleyball Court Boundary Lines */}
            <rect x="100" y="80" width="600" height="440" fill="none" stroke="#ef4444" strokeWidth="4" />
            <line x1="400" y1="80" x2="400" y2="520" stroke="#3b82f6" strokeWidth="6" />
            <line x1="300" y1="80" x2="300" y2="520" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,6" />
            <line x1="500" y1="80" x2="500" y2="520" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,6" />
          </svg>
          {/* Floating silhouette player & ball icons */}
          <div className="absolute top-1/4 left-1/5 text-5xl animate-[floatSlow_9s_infinite]">🏃‍♂️</div>
          <div className="absolute bottom-1/4 right-1/4 text-5xl animate-[floatReverse_11s_infinite]">🏐</div>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-600/40 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" /> Club Heritage & Spirit
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mb-6">
            സാൻജോസ് ആർട്സ് & സ്പോർട്സ് ക്ലബ്, <span className="text-red-500">മുക്കൂർ (Mukoor)</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-6">
            San Jose Arts & Sports Club has always stood as a pillar of community sports, youth fitness, and high-octane sportsmanship in Mukoor. Volleyball is at the very heart and soul of our club culture.
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-10">
            This championship is conducted to celebrate the raw power, unity, and thrill of volleyball by welcoming elite State, University, and Department players to compete on our professional floodlit ground right behind St. Joseph's Church. We humbly seek everyone’s gracious support and presence to make this sports festival an unforgettable success.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-[#0b1328]/90 border border-blue-900/50 shadow-xl relative overflow-hidden group hover:border-red-500/60 transition-colors">
              <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 group-hover:scale-125 transition-transform">🏐</div>
              <h4 className="text-red-500 font-black text-3xl mb-1">7</h4>
              <p className="text-xs uppercase font-bold text-slate-300 tracking-wider">Elite Teams</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0b1328]/90 border border-blue-900/50 shadow-xl relative overflow-hidden group hover:border-red-500/60 transition-colors">
              <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 group-hover:scale-125 transition-transform">⚡</div>
              <h4 className="text-red-500 font-black text-3xl mb-1">4 Days</h4>
              <p className="text-xs uppercase font-bold text-slate-300 tracking-wider">Floodlit Battles</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0b1328]/90 border border-blue-900/50 shadow-xl relative overflow-hidden group hover:border-red-500/60 transition-colors">
              <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 group-hover:scale-125 transition-transform">🏆</div>
              <h4 className="text-red-500 font-black text-3xl mb-1">₹ 80,000+</h4>
              <p className="text-xs uppercase font-bold text-slate-300 tracking-wider">Total Prize Pool</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS MOVING VOLLEYBALL DIVIDER RIBBON */}
      <div className="w-full overflow-hidden bg-gradient-to-r from-red-950 via-blue-950 to-red-950 py-2.5 border-y border-red-800/40 relative">
        <div
          className="whitespace-nowrap flex items-center gap-8 w-max text-xs sm:text-sm font-black uppercase tracking-widest text-amber-300"
          style={{ animation: "ribbonSlide 18s linear infinite" }}
        >
          <span>🏐 WITNESS THE SMASHES & BLOCKS</span>
          <span>★ CASH PRIZES & EVER-ROLLING TROPHIES</span>
          <span>🏐 SAN JOSE VOLLEYBALL ARENA MUKOOR</span>
          <span>★ FAIR PLAY & UNMATCHED SPORTSMANSHIP</span>
          <span>🏐 WITNESS THE SMASHES & BLOCKS</span>
          <span>★ CASH PRIZES & EVER-ROLLING TROPHIES</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. SLIDING SPONSORS CAROUSEL (4 Desktop, 2 Mobile)                         */}
      {/* ========================================================================= */}
      <section id="sponsors" className="py-16 bg-[#05070f] border-b border-slate-900 relative overflow-hidden">
        {/* Background Rotating Volley mesh */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase text-red-500 tracking-widest block">
                Proud Supporters
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                ഔദ്യോഗിക സ്പോൺസർമാർ
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 hidden sm:block">
              Auto-rotating sponsors
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((offset) => {
              const currentSponsor = sponsors[(sponsorIndex + offset) % sponsors.length];
              const isHighlight = offset === 0;

              return (
                <div
                  key={`${currentSponsor.id}-${offset}`}
                  className={`p-4 rounded-2xl border transition-all duration-500 transform ${
                    isHighlight
                      ? "bg-gradient-to-b from-red-950/40 to-[#0e162f] border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)] scale-[1.02]"
                      : "bg-[#090f20] border-blue-950/60 opacity-80"
                  }`}
                >
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-2 ${
                      isHighlight ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {currentSponsor.tier}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-white truncate">
                    {currentSponsor.name}
                  </h4>
                  <p className="text-xs text-blue-400 mt-0.5 truncate">
                    {currentSponsor.category}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PRIZE POOL SECTION                                                     */}
      {/* ========================================================================= */}
      <section id="prizes" className="py-20 bg-[#04060d] relative overflow-hidden">
        {/* Animated Trophy & Floodlight Background Glow */}
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-red-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/10 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="text-red-500 text-xs font-black uppercase tracking-widest block mb-2">
              Tournament Cash Awards
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
              സമ്മാന <span className="text-red-500">വിവരങ്ങൾ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-14">
            <div className="relative bg-gradient-to-b from-red-950/50 via-[#0d162d] to-[#040816] border-2 border-red-600 rounded-3xl p-8 text-center shadow-[0_0_40px_rgba(220,38,38,0.25)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white font-black text-xs uppercase px-4 py-1 rounded-full shadow">
                First Prize Winner
              </div>
              <Trophy className="w-16 h-16 text-amber-400 mx-auto mt-2 mb-3" />
              <div className="text-5xl sm:text-6xl font-black text-white mb-1">
                ₹ 50,000
              </div>
              <p className="text-red-400 font-extrabold text-sm uppercase">
                Cash Prize + എവർറോളിംഗ് ട്രോഫി
              </p>
            </div>

            <div className="relative bg-gradient-to-b from-blue-950/40 via-[#0c142b] to-[#040816] border border-blue-600/60 rounded-3xl p-8 text-center shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-black text-xs uppercase px-4 py-1 rounded-full shadow">
                Second Prize Runner-Up
              </div>
              <Award className="w-16 h-16 text-blue-300 mx-auto mt-2 mb-3" />
              <div className="text-5xl sm:text-6xl font-black text-white mb-1">
                ₹ 30,000
              </div>
              <p className="text-blue-300 font-extrabold text-sm uppercase">
                Cash Prize + ട്രോഫി
              </p>
            </div>
          </div>

          <div className="bg-[#090f22] border border-red-900/40 rounded-3xl p-6 sm:p-8">
            <h3 className="text-center text-sm sm:text-base font-black uppercase tracking-widest text-red-500 mb-6 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" /> Individual Performance Awards
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {individualAwards.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#050914] border border-blue-950 p-4 rounded-2xl text-center"
                >
                  <span className="block font-bold text-sm text-slate-200">{item.title}</span>
                  <span className="text-xs text-red-400 font-semibold mt-1 block">{item.prize}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. VOLLEYBALL INSTRUCTIONS & MATCH RULES (With Whistle Watermark)           */}
      {/* ========================================================================= */}
      <section id="rules" className="py-16 max-w-5xl mx-auto px-4 relative">
        <div className="bg-[#0a1124] border border-blue-900/50 rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Whistle Background Emblem */}
          <div className="absolute top-2 right-4 text-7xl opacity-5 pointer-events-none">📣</div>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <Info className="w-6 h-6 text-red-500 shrink-0" />
            <h3 className="text-2xl font-black uppercase text-white">
              ടൂർണമെന്റ് നിബന്ധനകൾ & നിർദ്ദേശങ്ങൾ
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {rulesList.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-[#050814] p-4 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm font-medium">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. VENUE & CHEERING CROWD ANIMATION BACKGROUND (MUKOOR GROUND)           */}
      {/* ========================================================================= */}
      <section id="venue" className="py-20 bg-[#060a17] border-t border-red-950/40 relative overflow-hidden">
        {/* DYNAMIC CHEERING STADIUM CROWD SILHOUETTE */}
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-20 overflow-hidden flex items-end justify-around">
          <div className="w-full flex items-end justify-between px-2 text-2xl sm:text-3xl animate-[crowdCheer_2.4s_ease-in-out_infinite]">
            <span>🙌</span><span>🙋‍♂️</span><span>👏</span><span>🎉</span><span>🙋‍♀️</span><span>🙌</span><span>👏</span><span>🙋‍♂️</span><span>🎉</span><span>🙌</span><span>🙋‍♂️</span><span>👏</span><span>🎉</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-red-500 font-bold uppercase text-xs tracking-widest block mb-2">
                Ground Location & Help Desk
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mb-4">
                വേദിയും വിവരങ്ങളും
              </h2>
              <p className="text-slate-300 font-medium leading-relaxed mb-6">
                സെന്റ് ജോസഫ് മലങ്കര കത്തോലിക്കാ പള്ളിയുടെ പുറകുവശത്തുള്ള ഫ്ലഡ് ലൈറ്റ് സ്റ്റേഡിയം ഗ്രൗണ്ട്,{" "}
                <span className="text-red-400 font-bold">മുക്കൂർ (Mukoor)</span>, കൊല്ലം ജില്ല.
                <br />
                <span className="text-xs text-blue-300">
                  (Located right on the backside / adjacent ground of St. Joseph's Malankara Catholic Church, Mukoor).
                </span>
              </p>

              <a
                href="https://maps.app.goo.gl/cKVcQfL5mp38QKhXA?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black px-6 py-3.5 rounded-2xl shadow-lg transition-all mb-8"
              >
                <MapPin className="w-5 h-5 text-white" />
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
              </a>

              <div className="space-y-4">
                <span className="block text-xs uppercase text-slate-400 font-bold tracking-wider">
                  ബന്ധപ്പെടാനുള്ള നമ്പറുകൾ & ഇമെയിൽ:
                </span>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:8111861494"
                    className="flex items-center gap-2 bg-[#0d162f] hover:bg-red-950/50 px-5 py-3 rounded-2xl font-bold text-white border border-red-600/30 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-red-500" /> 8111861494
                  </a>
                  <a
                    href="tel:9526977947"
                    className="flex items-center gap-2 bg-[#0d162f] hover:bg-red-950/50 px-5 py-3 rounded-2xl font-bold text-white border border-red-600/30 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-red-500" /> 9526977947
                  </a>
                  <a
                    href="mailto:sanjosemukoor@gmail.com"
                    className="flex items-center gap-2 bg-[#0d162f] hover:bg-red-950/50 px-5 py-3 rounded-2xl font-bold text-white border border-red-600/30 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-red-500" /> sanjosemukoor@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Location Map iframe pointing directly to St. Joseph's Church Mukoor */}
            <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-red-600/40 shadow-2xl relative">
              <iframe
                title="Ground Location Mukoor"
                src="https://maps.google.com/maps?q=St.+Joseph's+Malankara+Catholic+Church+Mukkoodu&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FOOTER                                                                */}
      {/* ========================================================================= */}
      <footer className="py-8 bg-black border-t border-slate-900 text-center text-xs text-slate-500">
        <p className="mb-2">© 2026 സാൻജോസ് ആർട്സ് & സ്പോർട്സ് ക്ലബ് മുക്കൂർ (Mukoor). All Rights Reserved.</p>
        <p className="text-[11px] text-slate-600">San Jose Floodlit Stadium • Volleyball Championship 2026</p>
      </footer>
    </div>
  );
}