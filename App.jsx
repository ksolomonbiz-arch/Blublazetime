import { useState, useEffect, useRef } from "react";

const ACTIVITIES = [
  { id: 1, name: "Make-It Monday", emoji: "🎨", type: "craft", desc: "Craft or recipe night", color: "#FF6B6B" },
  { id: 2, name: "Wonder Wednesday", emoji: "🔭", type: "explore", desc: "Museum video or star-gazing", color: "#845EF7" },
  { id: 3, name: "Fresh-Air Friday", emoji: "🌿", type: "outdoor", desc: "Park walk or bike ride", color: "#51CF66" },
  { id: 4, name: "Game Night", emoji: "🎲", type: "indoor", desc: "Board games & card games", color: "#FF922B" },
  { id: 5, name: "Kitchen Crew", emoji: "👨‍🍳", type: "craft", desc: "Cook a new recipe together", color: "#F06595" },
  { id: 6, name: "Backyard Olympics", emoji: "🏅", type: "outdoor", desc: "Relay races & obstacle courses", color: "#20C997" },
  { id: 7, name: "Movie Marathon", emoji: "🍿", type: "indoor", desc: "Theme movie night with snacks", color: "#CC5DE8" },
  { id: 8, name: "Nature Detectives", emoji: "🔍", type: "outdoor", desc: "Scavenger hunt in the park", color: "#94D82D" },
  { id: 9, name: "Story Builders", emoji: "📖", type: "indoor", desc: "Create a family story together", color: "#339AF0" },
  { id: 10, name: "Dance Party", emoji: "💃", type: "indoor", desc: "Playlist + living room dance-off", color: "#E64980" },
  { id: 11, name: "Volunteer Day", emoji: "💛", type: "service", desc: "Help at a local shelter or cleanup", color: "#FCC419" },
  { id: 12, name: "Photo Walk", emoji: "📸", type: "outdoor", desc: "Capture your neighborhood", color: "#4DABF7" },
  { id: 13, name: "Science Lab", emoji: "🧪", type: "explore", desc: "DIY experiments at home", color: "#38D9A9" },
  { id: 14, name: "Puzzle Hour", emoji: "🧩", type: "indoor", desc: "Jigsaw or brain teasers", color: "#748FFC" },
  { id: 15, name: "Garden Time", emoji: "🌻", type: "outdoor", desc: "Plant something & watch it grow", color: "#69DB7C" },
  { id: 16, name: "Art Gallery", emoji: "🖼️", type: "explore", desc: "Visit a local gallery or create one", color: "#DA77F2" },
  { id: 17, name: "Bike Adventure", emoji: "🚲", type: "outdoor", desc: "Explore a new trail together", color: "#66D9E8" },
  { id: 18, name: "Letter Writing", emoji: "✉️", type: "craft", desc: "Write to grandparents or friends", color: "#F783AC" },
  { id: 19, name: "Stargazing Night", emoji: "⭐", type: "outdoor", desc: "Blankets, hot cocoa & constellations", color: "#5C7CFA" },
  { id: 20, name: "Talent Show", emoji: "🎤", type: "indoor", desc: "Everyone performs something", color: "#FF8787" },
  { id: 21, name: "Community Walk", emoji: "🏘️", type: "service", desc: "Meet neighbors & explore", color: "#63E6BE" },
  { id: 22, name: "Build Something", emoji: "🔨", type: "craft", desc: "Birdhouse, fort, or Lego city", color: "#FFA94D" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const LOCAL_EVENTS = [
  { title: "Family Art Festival", source: "Eventbrite", date: "Mar 8", location: "City Park", free: true },
  { title: "Kids Science Workshop", source: "Local Library", date: "Mar 12", location: "Main Library", free: true },
  { title: "Outdoor Movie Night", source: "Parks & Rec", date: "Mar 15", location: "Riverside Park", free: true },
  { title: "Family Cooking Class", source: "Eventbrite", date: "Mar 18", location: "Community Center", free: false },
  { title: "Spring Nature Walk", source: "Nature Center", date: "Mar 22", location: "Greenway Trail", free: true },
  { title: "Family Game Tournament", source: "Local Shop", date: "Mar 25", location: "Board Game Cafe", free: false },
];

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        tick();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}+</span>;
}

// ─── HERO ────────────────────────────────────────
function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(160deg, #0f0c29 0%, #1a1a4e 30%, #24243e 60%, #0f0c29 100%)",
    }}>
      {/* Floating emojis */}
      {["🎨","🌿","🎲","⭐","🚲","🍿","💃","📸","🧪","🌻"].map((e, i) => (
        <div key={i} style={{
          position: "absolute",
          fontSize: `${20 + Math.random() * 30}px`,
          left: `${5 + (i * 9.5)}%`,
          top: `${10 + Math.random() * 75}%`,
          opacity: visible ? 0.15 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: `all 1.2s ease ${0.2 + i * 0.15}s`,
          animation: `floaty ${4 + i * 0.7}s ease-in-out infinite alternate`,
          pointerEvents: "none",
        }}>{e}</div>
      ))}

      <div style={{
        textAlign: "center",
        padding: "2rem",
        maxWidth: 800,
        position: "relative",
        zIndex: 2,
      }}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease 0.2s",
        }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #FF6B6B, #FF922B)",
            borderRadius: 50,
            padding: "8px 24px",
            fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            color: "#fff",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 28,
          }}>🔥 Family Time, Reimagined</div>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          color: "#fff",
          margin: "0 0 24px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s ease 0.4s",
        }}>
          <span style={{ color: "#FF6B6B" }}>Blu</span>Blaze<span style={{ color: "#FFD43B" }}>Time</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.7,
          maxWidth: 560,
          margin: "0 auto 40px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease 0.6s",
        }}>
          Stop scrolling for ideas. Start making memories. Your family's weekly adventure plan — built in seconds.
        </p>

        <div style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.8s",
        }}>
          <a href="#routine-builder" onClick={(e) => { e.preventDefault(); document.getElementById("routine-builder")?.scrollIntoView({ behavior: "smooth" }); }} style={{
            background: "linear-gradient(135deg, #FF6B6B, #FF922B)",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            padding: "16px 36px",
            fontSize: 16,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
            boxShadow: "0 8px 30px rgba(255,107,107,0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}>Build My Routine →</a>
          <a href="#activity-matcher" style={{
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 50,
            padding: "16px 36px",
            fontSize: 16,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
            transition: "background 0.2s",
          }}>Find Local Events</a>
        </div>

        <div style={{
          display: "flex",
          gap: 48,
          justifyContent: "center",
          marginTop: 60,
          opacity: visible ? 1 : 0,
          transition: "all 1s ease 1s",
        }}>
          {[
            { num: 22, label: "Activity Ideas" },
            { num: 7, label: "Days Covered" },
            { num: 0, label: "Cost to Start" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                fontWeight: 900,
                color: "#FFD43B",
              }}>{s.num === 0 ? "$0" : <AnimatedCounter target={s.num} />}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginTop: 4,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes floaty {
          from { transform: translateY(-8px) rotate(-3deg); }
          to { transform: translateY(8px) rotate(3deg); }
        }
      `}</style>
    </section>
  );
}

// ─── NARRATIVE SECTION ───────────────────────────
function Narrative() {
  const [step, setStep] = useState(0);
  const [animDir, setAnimDir] = useState("right");

  const cards = [
    {
      num: "01",
      emoji: "💡",
      color: "#FF6B6B",
      grad: "linear-gradient(135deg, #FF6B6B, #FF922B)",
      bg: "radial-gradient(circle at 30% 40%, #FF6B6B18 0%, transparent 60%)",
      headline: "It doesn't happen by accident.",
      message: "The best family moments come from a little structure — not a perfect plan. 15 minutes after dinner counts just as much as a full Saturday.",
      spark: "Connection > Perfection",
    },
    {
      num: "02",
      emoji: "🔄",
      color: "#845EF7",
      grad: "linear-gradient(135deg, #845EF7, #5C7CFA)",
      bg: "radial-gradient(circle at 70% 30%, #845EF718 0%, transparent 60%)",
      headline: "Four buckets. One month.",
      message: "Rotate indoor, outdoor, community, and service activities. Quick hits on weeknights. One big anchor on weekends. Theme nights make it automatic.",
      spark: "Make-It Monday → Wonder Wednesday → Fresh-Air Friday",
    },
    {
      num: "03",
      emoji: "🎯",
      color: "#51CF66",
      grad: "linear-gradient(135deg, #51CF66, #20C997)",
      bg: "radial-gradient(circle at 40% 60%, #51CF6618 0%, transparent 60%)",
      headline: "Meet them where they are.",
      message: "Toddlers want sensory play. School-age kids want to tinker. Teens want a say in what happens. Match the activity to the age and everyone wins.",
      spark: "Their sweet spot = your sweet spot",
    },
    {
      num: "04",
      emoji: "💰",
      color: "#FFD43B",
      grad: "linear-gradient(135deg, #FFD43B, #FF922B)",
      bg: "radial-gradient(circle at 60% 40%, #FFD43B18 0%, transparent 60%)",
      headline: "Free is underrated.",
      message: "Libraries, parks, nature centers, museums — your neighborhood is packed with free workshops and family days. Pair them with the occasional splurge.",
      spark: "Library Monday → Mini-golf Saturday",
    },
    {
      num: "05",
      emoji: "🚀",
      color: "#339AF0",
      grad: "linear-gradient(135deg, #339AF0, #4DABF7)",
      bg: "radial-gradient(circle at 50% 50%, #339AF018 0%, transparent 60%)",
      headline: "Track it. Celebrate it. Repeat.",
      message: "Keep a shared note of what worked. Celebrate the small wins. Stay flexible. The goal isn't a perfect schedule — it's showing up consistently.",
      spark: "You're already a great parent. This just makes it easier.",
    },
  ];

  const goNext = () => {
    if (step < cards.length - 1) {
      setAnimDir("right");
      setStep(s => s + 1);
    }
  };
  const goPrev = () => {
    if (step > 0) {
      setAnimDir("left");
      setStep(s => s - 1);
    }
  };

  const c = cards[step];

  return (
    <section style={{
      padding: "80px 24px 100px",
      background: "linear-gradient(180deg, #0f0c29 0%, #13112e 70%, #1a1a2e 100%)",
    }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 50,
            padding: "6px 20px",
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 20,
          }}>📖 The Playbook</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.2,
          }}>5 Things Every Family Should Know</h2>
        </div>

        {/* Progress dots */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 32,
        }}>
          {cards.map((cd, i) => (
            <button key={i} onClick={() => { setAnimDir(i > step ? "right" : "left"); setStep(i); }} style={{
              width: i === step ? 36 : 10,
              height: 10,
              borderRadius: 50,
              background: i === step ? cd.grad : i < step ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              padding: 0,
            }} />
          ))}
        </div>

        {/* THE CARD */}
        <div style={{
          position: "relative",
          minHeight: 380,
        }}>
          <div key={step} style={{
            background: c.bg + ", rgba(255,255,255,0.04)",
            borderRadius: 32,
            padding: "clamp(32px, 6vw, 52px)",
            border: `1px solid ${c.color}25`,
            position: "relative",
            overflow: "hidden",
            animation: `cardEnter${animDir === "right" ? "R" : "L"} 0.45s cubic-bezier(0.4, 0, 0.2, 1) both`,
          }}>
            {/* Big background number */}
            <div style={{
              position: "absolute",
              top: -20,
              right: -10,
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(120px, 20vw, 180px)",
              fontWeight: 900,
              color: c.color,
              opacity: 0.06,
              lineHeight: 1,
              pointerEvents: "none",
            }}>{c.num}</div>

            {/* Step badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${c.color}15`,
              borderRadius: 50,
              padding: "8px 18px",
              marginBottom: 28,
            }}>
              <span style={{ fontSize: 18 }}>{c.emoji}</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 800,
                color: c.color,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}>Step {c.num} of 05</span>
            </div>

            {/* Headline */}
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 20,
            }}>{c.headline}</h3>

            {/* Message */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.85,
              marginBottom: 28,
              maxWidth: 480,
            }}>{c.message}</p>

            {/* Spark quote */}
            <div style={{
              background: `${c.color}10`,
              borderLeft: `3px solid ${c.color}`,
              borderRadius: "0 12px 12px 0",
              padding: "14px 20px",
              display: "inline-block",
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: c.color,
                fontStyle: "italic",
              }}>{c.spark}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 28,
          padding: "0 4px",
        }}>
          <button onClick={goPrev} style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            borderRadius: 50,
            background: step > 0 ? "rgba(255,255,255,0.06)" : "transparent",
            border: step > 0 ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
            color: step > 0 ? "rgba(255,255,255,0.6)" : "transparent",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            cursor: step > 0 ? "pointer" : "default",
            transition: "all 0.3s",
          }}>
            ← Back
          </button>

          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.25)",
          }}>{step + 1} / {cards.length}</span>

          <button onClick={() => {
            if (step < cards.length - 1) {
              goNext();
            } else {
              document.getElementById("routine-builder")?.scrollIntoView({ behavior: "smooth" });
            }
          }} style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            borderRadius: 50,
            background: step < cards.length - 1 ? c.grad : "rgba(255,255,255,0.06)",
            border: "none",
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: step < cards.length - 1 ? `0 6px 24px ${c.color}30` : "none",
          }}>
            {step < cards.length - 1 ? "Next →" : "🎉 Let's Build!"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes cardEnterR {
          from { opacity: 0; transform: translateX(40px) scale(0.97); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes cardEnterL {
          from { opacity: 0; transform: translateX(-40px) scale(0.97); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{
      padding: "100px 24px",
      background: "#faf9f7",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 900,
          color: "#1a1a2e",
          marginBottom: 12,
        }}>How It Works</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 18,
          color: "#666",
          marginBottom: 60,
        }}>Three steps. Zero stress.</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 32,
        }}>
          {[
            { step: "01", icon: "👨‍👩‍👧‍👦", title: "Tell Us About Your Family", desc: "Ages, interests, and how much free time you actually have." },
            { step: "02", icon: "✨", title: "Get Your Custom Routine", desc: "A weekly plan with activities that fit your life — not someone else's." },
            { step: "03", icon: "📍", title: "Discover Local Events", desc: "We pull real events near you so you always have fresh ideas." },
          ].map((item, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 24,
              padding: "48px 32px 40px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              position: "relative",
              border: "1px solid rgba(0,0,0,0.04)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.04)"; }}
            >
              <div style={{
                position: "absolute",
                top: -16,
                left: 32,
                background: "linear-gradient(135deg, #FF6B6B, #FF922B)",
                borderRadius: 12,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 800,
                fontSize: 14,
                color: "#fff",
              }}>{item.step}</div>
              <div style={{ fontSize: 48, marginBottom: 20 }}>{item.icon}</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: 12,
              }}>{item.title}</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "#777",
                lineHeight: 1.7,
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROUTINE BUILDER (MINI APP) ──────────────────
function RoutineBuilder({ activityList, selectedDays, setSelectedDays }) {
  const [filter, setFilter] = useState("all");
  const [familySize, setFamilySize] = useState(4);
  const [kidsAge, setKidsAge] = useState("school");

  const filtered = filter === "all" ? activityList : activityList.filter(a => a.type === filter);

  const toggleDay = (actId, day) => {
    const key = `${actId}-${day}`;
    setSelectedDays(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Count how many activities are assigned to each day
  const dayCounts = {};
  DAYS.forEach(d => {
    dayCounts[d] = Object.entries(selectedDays).filter(([k, v]) => v && k.endsWith(`-${d}`)).length;
  });

  const assignedCount = new Set(
    Object.entries(selectedDays).filter(([, v]) => v).map(([k]) => k.split("-")[1])
  ).size;

  return (
    <section id="routine-builder" style={{
      padding: "100px 24px",
      background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,107,107,0.15)",
            borderRadius: 50,
            padding: "6px 20px",
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            color: "#FF6B6B",
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 20,
          }}>⚡ Interactive App</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "#fff",
            marginBottom: 12,
          }}>Weekly Routine Builder</h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: "rgba(255,255,255,0.5)",
          }}>Pick activities. Assign them to days. Your family plan is done.</p>
        </div>

        {/* Family Config */}
        <div style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          marginBottom: 32,
          flexWrap: "wrap",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 16,
            padding: "16px 24px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Family Size</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[2,3,4,5,6].map(n => (
                <button key={n} onClick={() => setFamilySize(n)} style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: familySize === n ? "linear-gradient(135deg, #FF6B6B, #FF922B)" : "rgba(255,255,255,0.06)",
                  border: familySize === n ? "none" : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer",
                }}>{n}</button>
              ))}
            </div>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 16,
            padding: "16px 24px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Kids Age Range</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { v: "toddler", l: "0-3" },
                { v: "preschool", l: "4-6" },
                { v: "school", l: "7-12" },
                { v: "teen", l: "13+" },
              ].map(a => (
                <button key={a.v} onClick={() => setKidsAge(a.v)} style={{
                  padding: "8px 14px", borderRadius: 10,
                  background: kidsAge === a.v ? "linear-gradient(135deg, #845EF7, #5C7CFA)" : "rgba(255,255,255,0.06)",
                  border: kidsAge === a.v ? "none" : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer",
                }}>{a.l}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          maxWidth: 400,
          margin: "0 auto 32px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: 50,
          height: 8,
          overflow: "hidden",
        }}>
          <div style={{
            width: `${(assignedCount / 7) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #FF6B6B, #FFD43B)",
            borderRadius: 50,
            transition: "width 0.4s ease",
          }} />
        </div>
        <p style={{
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: assignedCount === 7 ? "#51CF66" : "rgba(255,255,255,0.4)",
          marginBottom: 32,
          fontWeight: 600,
        }}>{assignedCount}/7 days planned {assignedCount === 7 ? "🎉 Week complete!" : ""}</p>

        {/* Filter */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32, flexWrap: "wrap" }}>
          {[
            { v: "all", l: "All" },
            { v: "indoor", l: "🏠 Indoor" },
            { v: "outdoor", l: "🌿 Outdoor" },
            { v: "craft", l: "🎨 Craft" },
            { v: "explore", l: "🔭 Explore" },
            { v: "service", l: "💛 Service" },
          ].map(f => (
            <button key={f.v} onClick={() => setFilter(f.v)} style={{
              padding: "8px 18px",
              borderRadius: 50,
              background: filter === f.v ? "rgba(255,255,255,0.12)" : "transparent",
              border: filter === f.v ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
              color: filter === f.v ? "#fff" : "rgba(255,255,255,0.4)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}>{f.l}</button>
          ))}
        </div>

        {/* Activity Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
          maxHeight: 520,
          overflowY: "auto",
          paddingRight: 8,
        }}>
          {filtered.map(act => {
            const actDays = DAYS.filter(d => selectedDays[`${act.id}-${d}`]);
            return (
              <div key={act.id} style={{
                background: actDays.length > 0
                  ? `linear-gradient(135deg, ${act.color}15, ${act.color}08)`
                  : "rgba(255,255,255,0.03)",
                borderRadius: 16,
                padding: "20px",
                border: actDays.length > 0 ? `1px solid ${act.color}40` : "1px solid rgba(255,255,255,0.06)",
                transition: "all 0.3s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{act.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>{act.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{act.desc}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {DAYS.map(d => {
                    const isSelected = selectedDays[`${act.id}-${d}`];
                    const count = dayCounts[d];
                    const otherCount = isSelected ? count - 1 : count;
                    return (
                      <button key={d} onClick={() => toggleDay(act.id, d)} style={{
                        flex: 1,
                        padding: "6px 0",
                        borderRadius: 8,
                        background: isSelected ? act.color : "rgba(255,255,255,0.06)",
                        border: "none",
                        color: isSelected ? "#fff" : "rgba(255,255,255,0.3)",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        position: "relative",
                      }}>
                        {d}
                        {otherCount > 0 && (
                          <span style={{
                            position: "absolute",
                            top: -7,
                            right: -3,
                            background: isSelected ? "#FFD43B" : "#FF6B6B",
                            color: isSelected ? "#1a1a2e" : "#fff",
                            fontSize: 9,
                            fontWeight: 800,
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                            lineHeight: 1,
                          }}>{otherCount}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── ACTIVITY MATCHER ────────────────────────────
function ActivityMatcher({ eventList }) {
  const [zip, setZip] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);

  const doSearch = () => {
    if (!zip) return;
    setSearching(true);
    setTimeout(() => {
      setResults(eventList);
      setSearching(false);
    }, 1500);
  };

  return (
    <section id="activity-matcher" style={{
      padding: "100px 24px",
      background: "#faf9f7",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(81,207,102,0.12)",
            borderRadius: 50,
            padding: "6px 20px",
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            color: "#2B8A3E",
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 20,
          }}>📍 Local Discovery</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "#1a1a2e",
            marginBottom: 12,
          }}>Activity Matcher</h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: "#888",
          }}>Real events near you — pulled from Eventbrite, libraries, parks & more.</p>
        </div>

        {/* Search */}
        <div style={{
          display: "flex",
          gap: 12,
          maxWidth: 480,
          margin: "0 auto 40px",
        }}>
          <input
            value={zip}
            onChange={e => setZip(e.target.value)}
            placeholder="Enter your zip code"
            style={{
              flex: 1,
              padding: "16px 24px",
              borderRadius: 50,
              border: "2px solid #eee",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "#FF6B6B"}
            onBlur={e => e.target.style.borderColor = "#eee"}
            onKeyDown={e => e.key === "Enter" && doSearch()}
          />
          <button onClick={doSearch} style={{
            background: "linear-gradient(135deg, #FF6B6B, #FF922B)",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            padding: "16px 32px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}>{searching ? "Searching..." : "Find Events"}</button>
        </div>

        {/* Results */}
        {results && (
          <div style={{ display: "grid", gap: 16 }}>
            {results.map((evt, i) => (
              <div key={i} style={{
                background: "#fff",
                borderRadius: 20,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.04)",
                flexWrap: "wrap",
                gap: 12,
                animation: `slideUp 0.4s ease ${i * 0.1}s both`,
              }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: "#1a1a2e", marginBottom: 4 }}>{evt.title}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999" }}>
                    {evt.date} · {evt.location} · <span style={{ color: "#845EF7", fontWeight: 600 }}>{evt.source}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{
                    background: evt.free ? "rgba(81,207,102,0.1)" : "rgba(255,146,43,0.1)",
                    color: evt.free ? "#2B8A3E" : "#E8590C",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: 50,
                  }}>{evt.free ? "FREE" : "PAID"}</span>
                  <button onClick={(e) => {
                    // Parse the date (e.g. "Mar 8" -> 20260308)
                    const months = { Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12" };
                    const parts = evt.date.split(" ");
                    const mo = months[parts[0]] || "03";
                    const dy = (parts[1] || "1").padStart(2, "0");
                    const dateStr = `2026${mo}${dy}`;
                    const nextDay = `2026${mo}${String(parseInt(dy)+1).padStart(2,"0")}`;

                    const ics = [
                      "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//BluBlazeTime//EN",
                      "BEGIN:VEVENT",
                      `DTSTART;VALUE=DATE:${dateStr}`,
                      `DTEND;VALUE=DATE:${nextDay}`,
                      `SUMMARY:${evt.title}`,
                      `DESCRIPTION:${evt.title} at ${evt.location}. Source: ${evt.source}. Found on BluBlazeTime.`,
                      `LOCATION:${evt.location}`,
                      `UID:bbt-${dateStr}-${Date.now()}@blublazetime.com`,
                      "STATUS:CONFIRMED",
                      "END:VEVENT","END:VCALENDAR"
                    ].join("\r\n");

                    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${evt.title.replace(/\s+/g, "-")}.ics`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    e.currentTarget.textContent = "✓ Added!";
                  }} style={{
                    background: "#1a1a2e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 50,
                    padding: "10px 20px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}>+ Calendar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ─── CALENDAR PREVIEW ────────────────────────────
function CalendarPreview({ selectedDays: selectedDaysProp, activities: activitiesProp }) {
  const [syncedTo, setSyncedTo] = useState(null);
  const [exported, setExported] = useState(false);

  const selectedDays = selectedDaysProp || {};
  const activities = activitiesProp || [];

  // March 2026: starts on Sunday. Mon=0 ... Sun=6
  const marchStartDow = 6; // March 1 is Sunday
  const marchDays = 31;
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Build blank cells + real day cells
  const blanks = Array.from({ length: marchStartDow }, (_, i) => ({ blank: true, key: `b${i}` }));
  const realDays = Array.from({ length: marchDays }, (_, i) => ({ day: i + 1, key: `d${i + 1}` }));
  const calCells = [...blanks, ...realDays];

  // Get day-of-week name for a March date
  const getDow = (dayNum) => dayNames[(marchStartDow + dayNum - 1) % 7];

  // Get activities assigned to a specific day-of-week name
  const getActivitiesForDow = (dowName) => {
    const matched = [];
    Object.entries(selectedDays).forEach(([key, val]) => {
      if (!val) return;
      const parts = key.split("-");
      const actDay = parts[parts.length - 1];
      const actId = parseInt(parts[0]);
      if (actDay === dowName) {
        const act = activities.find(a => a.id === actId);
        if (act) matched.push(act);
      }
    });
    return matched;
  };

  const hasSelections = Object.values(selectedDays).some(v => v);

  // Build export list
  const buildExportEvents = () => {
    const out = [];
    for (let d = 1; d <= marchDays; d++) {
      getActivitiesForDow(getDow(d)).forEach(act => {
        out.push({ day: d, name: `${act.emoji} ${act.name}`, desc: `${act.desc}. Planned with BluBlazeTime.` });
      });
    }
    return out;
  };

  const generateICS = () => {
    const evts = buildExportEvents();
    const lines = [
      "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//BluBlazeTime//EN",
      "CALSCALE:GREGORIAN","METHOD:PUBLISH","X-WR-CALNAME:BluBlazeTime Family Activities",
    ];
    evts.forEach(evt => {
      const ds = String(evt.day).padStart(2, "0");
      const nd = evt.day + 1 > 31 ? "20260401" : `202603${String(evt.day + 1).padStart(2, "0")}`;
      lines.push("BEGIN:VEVENT",
        `DTSTART;VALUE=DATE:202603${ds}`, `DTEND;VALUE=DATE:${nd}`,
        `SUMMARY:${evt.name}`, `DESCRIPTION:${evt.desc}`,
        `UID:bbt-${ds}-${evt.name.replace(/[^a-zA-Z0-9]/g, "")}-${Date.now()}@blublazetime.com`,
        "STATUS:CONFIRMED", "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
  };

  const downloadICS = () => {
    const blob = new Blob([generateICS()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = "BluBlazeTime-My-Family-Routine.ics";
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const syncApple = () => { downloadICS(); setSyncedTo("apple"); setExported(true); };
  const syncGoogle = () => {
    const evts = buildExportEvents();
    if (evts.length > 0) {
      const f = evts[0]; const ds = String(f.day).padStart(2, "0"); const nd = String(f.day + 1).padStart(2, "0");
      window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(f.name)}&dates=202603${ds}/202603${nd}&details=${encodeURIComponent(f.desc + "\n\nImport the downloaded .ics file to add all events → Google Calendar → Settings → Import & Export → Import")}`, "_blank");
    }
    downloadICS(); setSyncedTo("google"); setExported(true);
  };

  const totalEvents = buildExportEvents().length;

  return (
    <section style={{
      padding: "100px clamp(12px, 4vw, 24px)",
      background: "linear-gradient(180deg, #16213e 0%, #1a1a2e 100%)",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          background: "rgba(255,212,59,0.12)",
          borderRadius: 50, padding: "6px 20px", fontSize: 13,
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
          color: "#FFD43B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 20,
        }}>📅 Your Personal Calendar</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", marginBottom: 12,
        }}>Family Calendar</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 16,
          color: "rgba(255,255,255,0.5)", marginBottom: 16,
        }}>
          {hasSelections
            ? `${totalEvents} activities scheduled this month from your routine.`
            : "Build your routine above — your choices will appear here automatically."}
        </p>

        {/* Empty state nudge */}
        {!hasSelections && (
          <button onClick={() => document.getElementById("routine-builder")?.scrollIntoView({ behavior: "smooth" })} style={{
            background: "linear-gradient(135deg, #FF6B6B, #FF922B)",
            color: "#fff", border: "none", borderRadius: 50,
            padding: "14px 32px", fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 40,
            boxShadow: "0 6px 24px rgba(255,107,107,0.3)",
          }}>↑ Build My Routine First</button>
        )}

        {/* Sync Buttons - only show when they have selections */}
        {hasSelections && (
          <div style={{
            display: "flex", gap: 10, justifyContent: "center",
            marginBottom: 28, flexWrap: "wrap", padding: "0 4px",
          }}>
            <button onClick={syncGoogle} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px clamp(16px, 4vw, 28px)", borderRadius: 50,
              background: syncedTo === "google" ? "linear-gradient(135deg, #4285F4, #34A853)" : "rgba(255,255,255,0.06)",
              border: syncedTo === "google" ? "none" : "1px solid rgba(255,255,255,0.12)",
              color: "#fff", fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(12px, 3vw, 14px)", fontWeight: 700, cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: syncedTo === "google" ? "0 6px 24px rgba(66,133,244,0.35)" : "none",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {syncedTo === "google" ? `✓ ${totalEvents} Events Synced` : "Sync to Google Calendar"}
            </button>

            <button onClick={syncApple} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px clamp(16px, 4vw, 28px)", borderRadius: 50,
              background: syncedTo === "apple" ? "linear-gradient(135deg, #FF3B30, #FF6B6B)" : "rgba(255,255,255,0.06)",
              border: syncedTo === "apple" ? "none" : "1px solid rgba(255,255,255,0.12)",
              color: "#fff", fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(12px, 3vw, 14px)", fontWeight: 700, cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: syncedTo === "apple" ? "0 6px 24px rgba(255,59,48,0.35)" : "none",
            }}>
              <svg width="16" height="18" viewBox="0 0 16 20" fill="currentColor">
                <path d="M13.34 10.05c-.02-2.26 1.84-3.34 1.93-3.4-1.05-1.54-2.69-1.75-3.27-1.77-1.39-.14-2.72.82-3.43.82-.71 0-1.81-.8-2.97-.78-1.53.02-2.94.89-3.73 2.26-1.59 2.76-.41 6.85 1.14 9.09.76 1.1 1.66 2.33 2.85 2.29 1.14-.05 1.57-.74 2.95-.74 1.38 0 1.77.74 2.97.71 1.23-.02 2.01-1.12 2.76-2.22.87-1.27 1.23-2.51 1.25-2.57-.03-.01-2.4-.92-2.42-3.66zM11.07 3.28c.63-.76 1.05-1.82.94-2.88-.91.04-2.01.61-2.66 1.37-.59.68-1.1 1.76-.96 2.8 1.01.08 2.04-.52 2.68-1.29z"/>
              </svg>
              {syncedTo === "apple" ? `✓ ${totalEvents} Events Synced` : "Sync to Apple Calendar"}
            </button>
          </div>
        )}

        {exported && syncedTo && (
          <div style={{
            textAlign: "center", marginBottom: 24, padding: "16px 20px",
            background: syncedTo === "google" ? "rgba(66,133,244,0.1)" : "rgba(255,59,48,0.1)",
            borderRadius: 16, maxWidth: 520, margin: "0 auto 24px",
            border: `1px solid ${syncedTo === "google" ? "rgba(66,133,244,0.2)" : "rgba(255,59,48,0.2)"}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>✅</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
                color: syncedTo === "google" ? "#4285F4" : "#FF3B30",
              }}>
                {totalEvents} events downloaded!
              </span>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0,
            }}>
              {syncedTo === "apple"
                ? "Open the .ics file on your iPhone, iPad, or Mac — it'll add your activities to Apple Calendar automatically."
                : "We opened Google Calendar with your first event. Import the downloaded .ics file to add all events: Settings → Import & Export → Import."}
            </p>
          </div>
        )}

        {/* Calendar Grid */}
        <div style={{
          background: "rgba(255,255,255,0.04)", borderRadius: 24,
          padding: "clamp(16px, 4vw, 32px)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden",
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700,
            color: "#fff", marginBottom: 24,
          }}>March 2026</div>

          {/* Day headers */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
            gap: "clamp(3px, 1vw, 8px)", marginBottom: 12,
          }}>
            {dayNames.map(d => (
              <div key={d} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(9px, 2.5vw, 12px)", fontWeight: 700,
                color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
                letterSpacing: "clamp(0px, 0.3vw, 1px)", padding: "8px 0", textAlign: "center",
              }}>{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
            gap: "clamp(3px, 1vw, 8px)",
          }}>
            {calCells.map(cell => {
              if (cell.blank) {
                return <div key={cell.key} style={{ aspectRatio: "1" }} />;
              }
              const d = cell.day;
              const dow = getDow(d);
              const dayActs = getActivitiesForDow(dow);
              const hasActs = dayActs.length > 0;
              const firstAct = dayActs[0];
              const actColor = firstAct ? firstAct.color : null;

              return (
                <div key={cell.key} title={hasActs ? dayActs.map(a => a.name).join(", ") : ""} style={{
                  aspectRatio: "1",
                  borderRadius: "clamp(6px, 1.5vw, 12px)",
                  background: hasActs ? `${actColor}20` : "rgba(255,255,255,0.02)",
                  border: hasActs ? `1px solid ${actColor}40` : "1px solid rgba(255,255,255,0.04)",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", gap: 1, transition: "transform 0.2s",
                  cursor: hasActs ? "pointer" : "default", minWidth: 0, position: "relative",
                }}
                onMouseEnter={e => { if (hasActs) e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(10px, 2.5vw, 13px)", fontWeight: 600,
                    color: hasActs ? "#fff" : "rgba(255,255,255,0.3)",
                  }}>{d}</span>
                  {hasActs && (
                    <span style={{ fontSize: "clamp(10px, 3vw, 16px)", lineHeight: 1 }}>
                      {dayActs.length <= 2
                        ? dayActs.map(a => a.emoji).join("")
                        : `${firstAct.emoji}+${dayActs.length - 1}`}
                    </span>
                  )}
                  {dayActs.length > 1 && (
                    <span style={{
                      position: "absolute", top: 2, right: 3,
                      background: actColor, color: "#fff",
                      fontSize: 8, fontWeight: 800, width: 14, height: 14,
                      borderRadius: "50%", display: "flex", alignItems: "center",
                      justifyContent: "center", lineHeight: 1,
                    }}>{dayActs.length}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────
function CTA() {
  return (
    <section style={{
      padding: "100px 24px",
      background: "#faf9f7",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ fontSize: 56, marginBottom: 24 }}>🔥</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          fontWeight: 900,
          color: "#1a1a2e",
          marginBottom: 16,
        }}>Ready to Make Time Count?</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 17,
          color: "#888",
          lineHeight: 1.7,
          marginBottom: 40,
        }}>
          Your family deserves more than "I don't know, what do you want to do?" Start building your routine now — it's free.
        </p>
        <a href="#routine-builder" onClick={(e) => { e.preventDefault(); document.getElementById("routine-builder")?.scrollIntoView({ behavior: "smooth" }); }} style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #FF6B6B, #FF922B)",
          color: "#fff",
          border: "none",
          borderRadius: 50,
          padding: "18px 48px",
          fontSize: 17,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          cursor: "pointer",
          textDecoration: "none",
          boxShadow: "0 8px 30px rgba(255,107,107,0.3)",
        }}>Build My Family Routine →</a>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: "48px 24px 32px",
      background: "#0f0c29",
      textAlign: "center",
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 24,
        fontWeight: 900,
        color: "#fff",
        marginBottom: 12,
      }}>
        <span style={{ color: "#FF6B6B" }}>Blu</span>Blaze<span style={{ color: "#FFD43B" }}>Time</span>
      </div>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: "rgba(255,255,255,0.3)",
        marginBottom: 24,
      }}>Making family time effortless.</p>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        color: "rgba(255,255,255,0.2)",
      }}>© 2026 BluBlazeTime. Built by Solomon Builds.</div>
    </footer>
  );
}

// ─── WRAPPERS (pass admin data to components) ────
function RoutineBuilderWrapper({ activities, selectedDays, setSelectedDays }) {
  return <RoutineBuilder activityList={activities} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />;
}
function ActivityMatcherWrapper({ events }) {
  return <ActivityMatcher eventList={events} />;
}

// ─── ADMIN PANEL ─────────────────────────────────
function AdminPanel({ activities, setActivities, events, setEvents, onClose }) {
  const [tab, setTab] = useState("activities");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const emptyActivity = { name: "", emoji: "🎯", type: "indoor", desc: "", color: "#FF6B6B" };
  const emptyEvent = { title: "", source: "Eventbrite", date: "", location: "", free: true };
  const [form, setForm] = useState(emptyActivity);

  const typeOptions = ["indoor", "outdoor", "craft", "explore", "service"];
  const colorOptions = ["#FF6B6B","#845EF7","#51CF66","#FF922B","#F06595","#20C997","#CC5DE8","#339AF0","#FFD43B","#5C7CFA","#94D82D","#66D9E8"];
  const emojiOptions = ["🎨","🌿","🎲","🔭","👨‍🍳","🏅","🍿","🔍","📖","💃","💛","📸","🧪","🧩","🌻","🖼️","🚲","✉️","⭐","🎤","🏘️","🔨","🎯","🎵","🏕️","🧘","📚","🎭","🎸","🌊"];

  const startAdd = () => {
    setEditingId(null);
    setForm(tab === "activities" ? emptyActivity : emptyEvent);
    setShowForm(true);
  };

  const startEdit = (item) => {
    setEditingId(item.id || item.title);
    setForm({ ...item });
    setShowForm(true);
  };

  const saveItem = () => {
    if (tab === "activities") {
      if (editingId) {
        setActivities(prev => prev.map(a => a.id === editingId ? { ...form, id: editingId } : a));
      } else {
        const newId = Math.max(...activities.map(a => a.id), 0) + 1;
        setActivities(prev => [...prev, { ...form, id: newId }]);
      }
    } else {
      if (editingId) {
        setEvents(prev => prev.map(e => e.title === editingId ? { ...form } : e));
      } else {
        setEvents(prev => [...prev, { ...form }]);
      }
    }
    setShowForm(false);
    setForm(tab === "activities" ? emptyActivity : emptyEvent);
    setEditingId(null);
  };

  const deleteItem = (item) => {
    if (tab === "activities") {
      setActivities(prev => prev.filter(a => a.id !== item.id));
    } else {
      setEvents(prev => prev.filter(e => e.title !== item.title));
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: 1,
    display: "block",
    marginBottom: 6,
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(12px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "40px 16px",
      overflowY: "auto",
    }}>
      <div style={{
        background: "linear-gradient(180deg, #1a1a3a, #13112e)",
        borderRadius: 28,
        width: "100%",
        maxWidth: 700,
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 28px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 900,
              color: "#fff",
              margin: 0,
            }}>⚙️ Admin Panel</h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              margin: "4px 0 0",
            }}>Manage activities & events</p>
          </div>
          <button onClick={onClose} style={{
            width: 40, height: 40, borderRadius: 12,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", fontSize: 20, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: 8,
          padding: "20px 28px 0",
        }}>
          {["activities", "events"].map(t => (
            <button key={t} onClick={() => { setTab(t); setShowForm(false); }} style={{
              padding: "10px 24px",
              borderRadius: 50,
              background: tab === t ? "linear-gradient(135deg, #FF6B6B, #FF922B)" : "rgba(255,255,255,0.04)",
              border: tab === t ? "none" : "1px solid rgba(255,255,255,0.08)",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              textTransform: "capitalize",
            }}>{t === "activities" ? `🎯 Activities (${activities.length})` : `📍 Events (${events.length})`}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "20px 28px 28px" }}>
          {/* Add button */}
          <button onClick={startAdd} style={{
            width: "100%",
            padding: "14px",
            borderRadius: 14,
            border: "2px dashed rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.02)",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 16,
            transition: "all 0.2s",
          }}>+ Add New {tab === "activities" ? "Activity" : "Event"}</button>

          {/* Form */}
          {showForm && (
            <div style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 20,
              padding: 24,
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 20,
              animation: "fadeSlideAdmin 0.3s ease both",
            }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 20,
              }}>{editingId ? "Edit" : "New"} {tab === "activities" ? "Activity" : "Event"}</div>

              {tab === "activities" ? (
                <div style={{ display: "grid", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Activity Name</label>
                    <input style={inputStyle} value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Movie Marathon" />
                  </div>
                  <div>
                    <label style={labelStyle}>Description</label>
                    <input style={inputStyle} value={form.desc || ""} onChange={e => setForm({...form, desc: e.target.value})} placeholder="e.g. Theme movie night with snacks" />
                  </div>
                  <div>
                    <label style={labelStyle}>Emoji</label>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {emojiOptions.map(em => (
                        <button key={em} onClick={() => setForm({...form, emoji: em})} style={{
                          width: 36, height: 36, borderRadius: 10, fontSize: 18,
                          background: form.emoji === em ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)",
                          border: form.emoji === em ? "2px solid #FF6B6B" : "1px solid rgba(255,255,255,0.06)",
                          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{em}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Type</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {typeOptions.map(t => (
                        <button key={t} onClick={() => setForm({...form, type: t})} style={{
                          padding: "8px 18px", borderRadius: 50,
                          background: form.type === t ? "linear-gradient(135deg, #845EF7, #5C7CFA)" : "rgba(255,255,255,0.04)",
                          border: form.type === t ? "none" : "1px solid rgba(255,255,255,0.08)",
                          color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                          cursor: "pointer", textTransform: "capitalize",
                        }}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Color</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {colorOptions.map(clr => (
                        <button key={clr} onClick={() => setForm({...form, color: clr})} style={{
                          width: 32, height: 32, borderRadius: 10,
                          background: clr,
                          border: form.color === clr ? "3px solid #fff" : "2px solid transparent",
                          cursor: "pointer", transition: "transform 0.2s",
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Event Title</label>
                    <input style={inputStyle} value={form.title || ""} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Family Art Festival" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Date</label>
                      <input style={inputStyle} value={form.date || ""} onChange={e => setForm({...form, date: e.target.value})} placeholder="e.g. Mar 8" />
                    </div>
                    <div>
                      <label style={labelStyle}>Location</label>
                      <input style={inputStyle} value={form.location || ""} onChange={e => setForm({...form, location: e.target.value})} placeholder="e.g. City Park" />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Source</label>
                      <input style={inputStyle} value={form.source || ""} onChange={e => setForm({...form, source: e.target.value})} placeholder="e.g. Eventbrite" />
                    </div>
                    <div>
                      <label style={labelStyle}>Free?</label>
                      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                        {[true, false].map(v => (
                          <button key={String(v)} onClick={() => setForm({...form, free: v})} style={{
                            flex: 1, padding: "10px", borderRadius: 12,
                            background: form.free === v ? (v ? "linear-gradient(135deg, #51CF66, #20C997)" : "linear-gradient(135deg, #FF922B, #FF6B6B)") : "rgba(255,255,255,0.04)",
                            border: form.free === v ? "none" : "1px solid rgba(255,255,255,0.08)",
                            color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer",
                          }}>{v ? "✓ Free" : "$ Paid"}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save / Cancel */}
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button onClick={saveItem} style={{
                  flex: 1, padding: "14px", borderRadius: 14,
                  background: "linear-gradient(135deg, #FF6B6B, #FF922B)",
                  border: "none", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(255,107,107,0.3)",
                }}>{editingId ? "Save Changes" : "Add"}</button>
                <button onClick={() => setShowForm(false)} style={{
                  padding: "14px 24px", borderRadius: 14,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer",
                }}>Cancel</button>
              </div>
            </div>
          )}

          {/* Item list */}
          <div style={{ display: "grid", gap: 8, maxHeight: 400, overflowY: "auto" }}>
            {(tab === "activities" ? activities : events).map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 16,
                padding: "16px 20px",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                  {tab === "activities" && (
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `${item.color}20`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, flexShrink: 0,
                    }}>{item.emoji}</div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>{item.name || item.title}</div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)",
                    }}>{item.desc || `${item.date} · ${item.location}`}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {tab === "activities" && (
                    <span style={{
                      padding: "4px 10px", borderRadius: 50,
                      background: `${item.color}18`, color: item.color,
                      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
                      textTransform: "capitalize",
                    }}>{item.type}</span>
                  )}
                  <button onClick={() => startEdit(item)} style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)", fontSize: 14, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>✏️</button>
                  <button onClick={() => deleteItem(item)} style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: "rgba(255,59,48,0.1)", border: "1px solid rgba(255,59,48,0.15)",
                    color: "#FF3B30", fontSize: 14, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeSlideAdmin {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────
export default function BluBlazeTime() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [activities, setActivities] = useState(ACTIVITIES);
  const [events, setEvents] = useState(LOCAL_EVENTS);
  const [selectedDays, setSelectedDays] = useState({});

  return (
    <div style={{ margin: 0, padding: 0, background: "#0f0c29", minHeight: "100vh" }}>
      {/* Admin FAB */}
      <button onClick={() => setShowAdmin(true)} style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        width: 56,
        height: 56,
        borderRadius: 16,
        background: "linear-gradient(135deg, #1a1a2e, #2a2a4e)",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "#fff",
        fontSize: 24,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      title="Admin Panel"
      >⚙️</button>

      {showAdmin && (
        <AdminPanel
          activities={activities}
          setActivities={setActivities}
          events={events}
          setEvents={setEvents}
          onClose={() => setShowAdmin(false)}
        />
      )}

      <Hero />
      <Narrative />
      <HowItWorks />
      <RoutineBuilderWrapper activities={activities} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
      <ActivityMatcherWrapper events={events} />
      <CalendarPreview selectedDays={selectedDays} activities={activities} />
      <CTA />
      <Footer />
    </div>
  );
}
