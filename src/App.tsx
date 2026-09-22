/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Cpu, Zap, Activity, Shield, FlaskConical, Stethoscope, Leaf, Brain, BarChart3, Truck, Lightbulb, Globe, Layers, ImageOff } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  type: 'title' | 'content' | 'comparison' | 'grid';
  icon?: any;
  speaker?: string;
  comparison?: {
    left: { title: string; items: string[] };
    right: { title: string; items: string[] };
  };
  notes?: string[];
  image?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Introduction to Quantum Computing",
    subtitle: "A New Era of Problem Solving",
    speaker: "Dileep Varma",
    content: [],
    type: 'title',
    icon: Cpu
  },
  {
    id: 2,
    title: "What is Quantum Computing?",
    content: [
      "A New Paradigm: A completely different approach to computing that uses the principles of quantum mechanics.",
      "The Micro-Level: It utilizes the behavior of tiny physical particles, like electrons and atoms.",
      "Massive Power: Capable of solving specific problems that would take classical computers thousands of years to complete.",
      "Not Just \"Faster\": It doesn't just do things quicker; it solves problems in a fundamentally different way."
    ],
    image: "/quantum-computer.jpg",
    type: 'content',
    icon: Zap
  },
  {
    id: 3,
    title: "What is the Use of It?",
    content: [
      "Multitasking on a massive scale: Can process many different possibilities all at once.",
      "Solving the Unsolvable: Uniquely useful for tackling incredibly complex problems.",
      "Outpacing Traditional Tech: Offers speed and capabilities for specific tasks that normal computers simply cannot achieve."
    ],
    image: "/complex.png",
    type: 'content',
    icon: Activity
  },
  {
    id: 4,
    title: "Normal vs. Quantum Computers",
    type: 'comparison',
    content: [],
    comparison: {
      left: {
        title: "Normal Computers",
        items: ["Run on Bits (0 or 1).", "Can only store and process one value at a time."]
      },
      right: {
        title: "Quantum Computers",
        items: ["Run on Qubits.", "Can store and process multiple possibilities at once."]
      }
    },
    icon: Layers
  },
  {
    id: 5,
    title: "Understanding the \"Qubit\"",
    content: [
      "The Basic Unit: The foundational unit of quantum information.",
      "Beyond 0 and 1: While a standard bit is either exactly 0 or exactly 1, a qubit can be 0, 1, or both at the same time.",
      "Fragile Physical States: Qubits are stored inside specialized hardware (like superconducting circuits or trapped atoms).",
      "Temporary Existence: Qubits only exist temporarily. Once they are measured, the quantum state is gone, and the data must be saved on a normal computer."
    ],
    type: 'content',
    image: "/qubit.png",
    icon: Cpu
  },
  {
    id: 6,
    title: "The 4 Key Principles of Quantum",
    type: 'grid',
    content: [
      "Superposition: Allows a qubit to exist in many different states at the exact same time.",
      "Entanglement: Connects qubits together so that the state of one instantly affects the others.",
      "Interference: Helps cancel out wrong answers and amplify the correct answers.",
      "Decoherence: The challenge of quantum computing—when the fragile quantum information breaks down and is lost."
    ],
    icon: Activity
  },
  {
    id: 7,
    title: "How Quantum Solves Problems",
    type: 'comparison',
    content: [
      "The Output: Probabilities, not exacts. Quantum computers give the probability of an answer, not a definite exact number.",
      "Because of this, running the same program multiple times may give slightly different results."
    ],
    comparison: {
      left: {
        title: "Classical Approach",
        items: ["Tries every single path one by one to find the answer (slow)."]
      },
      right: {
        title: "Quantum Approach",
        items: ["Maps out the best path simultaneously using probabilities (fast)."]
      }
    },
    icon: Lightbulb
  },
  {
    id: 8,
    title: "Inside a Quantum Computer",
    content: [
      "The Chip is Tiny: The actual quantum processor chip is incredibly small.",
      "Massive Infrastructure: The tiny chip is surrounded by large, complex support systems (mostly for extreme cooling and shielding).",
      "Classical Control: A quantum computer still relies on standard, classical computers to control it and read its outputs."
    ],
    type: 'content',
    image: "/inside.png",
    icon: Cpu
  },
  {
    id: 9,
    title: "The Software Side",
    content: [
      "Modern Tools: Developers use specialized tools like Qiskit to write quantum programs.",
      "Accessible Coding: You don't need to learn a completely new language; developers can use standard languages like Python to write and run quantum code."
    ],
    type: 'content',
    image: "/softwareside.png",
    icon: Brain
  },
  {
    id: 10,
    title: "Where is Quantum Useful? (Science & Tech)",
    type: 'grid',
    content: [
      "Cybersecurity: Potential to break current encryption methods.",
      "Chemistry: Simulating complex molecules and chemical reactions.",
      "Medicine: Simulating drug behavior, reducing physical lab testing.",
      "Greener Tech: Designing better solar panels and batteries.",
      "Next-Gen AI: Improving and accelerating AI systems."
    ],
    notes: [
      "Not a Replacement: Quantum computers are not going to replace the normal computers sitting on our desks.",
      "The Right Tool: Classical computers are better for daily tasks; Quantum is for the heaviest calculations."
    ],
    icon: FlaskConical
  },
  {
    id: 11,
    title: "Real-World Industry Applications",
    type: 'grid',
    content: [
      "Finance: Advanced risk analysis and portfolio optimization.",
      "Logistics: Optimizing complex delivery routes and supply chains.",
      "Energy: Designing highly efficient power usage and grid distribution."
    ],
    icon: BarChart3
  },
  {
    id: 12,
    title: "Market Potential & Investment",
    content: [
      "Massive Growth: The quantum computing market is expected to reach $1.3 trillion by 2035.",
      "Tech Giant Backing: IBM, Google, Microsoft, Amazon are investing billions."
    ],
    type: 'content',
    image: "/marketpotential.png",
    icon: Globe
  },
  {
    id: 13,
    title: "Timeline: When will it be ready?",
    type: 'grid',
    content: [
      "Now: Early-stage usage and experimentation.",
      "~2026: Transitioning into more practical, targeted use cases.",
      "2030s: Expected to become common and highly impactful."
    ],
    icon: Activity
  },
  {
    id: 14,
    title: "Quantum Computing as a Career",
    subtitle: "Growth & Opportunities (2026–2031)",
    type: 'grid',
    content: [
      "Market Outlook: Rapid growth moving from research to real-world use in finance, healthcare, and cybersecurity.",
      "Key Roles: \n• Quantum developers\n• Hardware engineers\n• Software engineers\n• Infrastructure engineers\n• Security experts",
      "Top Employers: \n• Tech giants (IBM, Google, AWS)\n• Startups (IonQ, Rigetti)\n• Industry leaders",
      "Education: Degrees in Physics, CS, or Engineering (PhD/Masters helpful, but not always required).",
      "Core Skills: \n• Python\n• Qiskit/Cirq\n• Quantum basics\n• Simulations"
    ],
    icon: Brain
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    })
  };

  return (
    <div className="relative h-screen w-full flex flex-col quantum-gradient overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 px-6 pt-1 pb-2 md:px-8 md:pt-2 md:pb-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-1.5 glass rounded-lg">
            <Cpu className="w-4 h-4 md:w-5 md:h-5 text-cyan-600" />
          </div>
          <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-cyan-700">Quantum_Core_v1.0</span>
        </div>
        <div className="font-mono text-[10px] md:text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
          SLIDE {currentSlide + 1} / {slides.length}
        </div>
      </header>

      {/* Main Slide Content Area */}
      <main className="relative flex-1 min-h-0 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 z-10 overflow-y-auto flex flex-col justify-start pt-2 sm:pt-4 md:pt-6 pb-6">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 35 },
              opacity: { duration: 0.25 }
            }}
            className="w-full my-auto py-2"
          >
            {slide.type === 'title' ? (
              <div className="text-center space-y-4 md:space-y-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block p-4 md:p-6 glass rounded-full mb-2"
                >
                  <Icon className="w-12 h-12 md:w-16 md:h-16 text-cyan-600" />
                </motion.div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-tight md:leading-none text-slate-900">
                  {slide.title.split(' ').map((word, i) => (
                    <span key={i} className={i >= 2 ? "text-cyan-700" : ""}>{word} </span>
                  ))}
                </h1>
                <p className="text-lg md:text-xl text-slate-700 font-medium tracking-wide">{slide.subtitle}</p>
                <div className="pt-4 md:pt-8">
                  <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-slate-500">Presented by</p>
                  <p className="text-base md:text-lg font-bold mt-1 text-slate-900">{slide.speaker}</p>
                </div>
              </div>
            ) : slide.type === 'comparison' ? (
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-700" />
                  <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-slate-900">{slide.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-5">
                  <div className="glass p-4 md:p-5 rounded-2xl space-y-2.5 md:space-y-3">
                    <h3 className="text-base md:text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">
                      {slide.comparison?.left.title}
                    </h3>
                    <ul className="space-y-2 md:space-y-2.5">
                      {slide.comparison?.left.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm md:text-base leading-relaxed text-slate-800 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass p-4 md:p-5 rounded-2xl space-y-2.5 md:space-y-3 border-cyan-500/30 bg-cyan-50/50">
                    <h3 className="text-base md:text-lg font-bold text-cyan-700 border-b border-cyan-200 pb-2">
                      {slide.comparison?.right.title}
                    </h3>
                    <ul className="space-y-2 md:space-y-2.5">
                      {slide.comparison?.right.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm md:text-base leading-relaxed text-slate-900 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {slide.content.length > 0 && (
                  <div className="pt-0.5">
                    {slide.content.map((p, i) => (
                      <p key={i} className="text-slate-700 italic font-medium text-xs md:text-sm">{p}</p>
                    ))}
                  </div>
                )}
              </div>
            ) : slide.type === 'grid' ? (
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-700" />
                  <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-slate-900">{slide.title}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5">
                  {slide.content.map((item, i) => {
                    const parts = item.split(': ');
                    const showLabel = parts.length > 1 && (slide.id === 6 || slide.id === 13 || slide.id === 14);
                    const label = showLabel ? parts[0] : null;
                    const contentText = showLabel ? parts.slice(1).join(': ') : (parts.length > 1 ? parts.slice(1).join(': ') : item);
                    const isInteractive = (label === "Superposition" || label === "Entanglement" || label === "Interference" || label === "Decoherence") && slide.id === 6;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => isInteractive && setActiveModal(label?.toLowerCase() || null)}
                        className={`glass p-3.5 md:p-4 rounded-xl transition-all flex flex-col ${isInteractive ? 'cursor-pointer hover:bg-cyan-50 hover:border-cyan-500/50 group shadow-sm' : 'hover:bg-slate-50'}`}
                      >
                        {label && <div className="text-cyan-700 font-bold text-sm md:text-base mb-1">{label}</div>}
                        <div className="text-slate-800 font-medium text-xs sm:text-sm md:text-base leading-relaxed mb-2 whitespace-pre-line">{contentText}</div>
                        {isInteractive && (
                          <div className="mt-auto pt-1.5">
                            <div className="glass p-2 sm:p-2.5 rounded-xl border-cyan-500/30 bg-cyan-50 flex items-center justify-center gap-2 group-hover:bg-cyan-100 transition-colors">
                              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-700" />
                              <span className="text-[9px] sm:text-[10px] font-bold text-cyan-700 uppercase tracking-wider">View {label} Diagram</span>
                            </div>
                            <div className="text-[8px] text-center mt-1 text-cyan-700/60 font-bold animate-pulse">Click to Open Visualization</div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                {slide.notes && (
                  <div className="mt-3.5 space-y-2">
                    {slide.notes.map((note, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start gap-2.5 p-3 glass border-l-4 border-l-cyan-600 bg-cyan-50/80 rounded-r-xl"
                      >
                        <Shield className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed italic">{note}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ── CONTENT SLIDES: always two-column ── */
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-700" />
                  <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-slate-900">{slide.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] w-full gap-5 md:gap-8 items-center">
                  {/* Left column — bullet points */}
                  <div className="space-y-2.5 md:space-y-3.5">
                    {slide.content.map((item, i) => {
                      const parts = item.split(': ');
                      const contentText = parts.length > 1 ? parts.slice(1).join(': ') : item;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex gap-3 md:gap-4 group"
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-600 group-hover:scale-125 transition-transform" />
                            <div className="w-px h-full bg-slate-300 mt-1.5" />
                          </div>
                          <div className="pb-1.5 md:pb-2.5">
                            <p className="text-xs sm:text-base md:text-lg text-slate-800 font-medium leading-relaxed">{contentText}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Right column — image or placeholder */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center items-center"
                  >
                    {slide.image ? (
                      <div className="relative flex justify-center">
                        <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full scale-125" />
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="relative w-auto max-w-full max-h-[260px] sm:max-h-[300px] md:max-h-[340px] rounded-2xl shadow-xl border border-slate-200 object-contain mx-auto"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-full max-w-[240px] sm:max-w-[280px] aspect-[4/3] max-h-[220px] rounded-2xl glass border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-center p-3 mx-auto">
                        <div className="p-2.5 bg-slate-100 rounded-full">
                          <ImageOff className="w-5 h-5 text-slate-300" />
                        </div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-300 leading-relaxed">
                          No image<br />uploaded
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Controls */}
      <footer className="relative z-20 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 flex flex-row justify-between items-center gap-3 sm:gap-6 shrink-0 bg-white/70 backdrop-blur-md border-t border-slate-200/80 shadow-sm">
        <div className="flex gap-2 sm:gap-3 shrink-0">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 sm:p-2.5 md:p-3 glass rounded-full hover:bg-slate-200 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-2 sm:p-2.5 md:p-3 glass rounded-full hover:bg-slate-200 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 w-full max-w-xs sm:max-w-md h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyan-600 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>

        <div className="hidden lg:flex items-center gap-4 sm:gap-6 font-mono text-[9px] uppercase tracking-widest text-slate-600 font-bold shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 border border-slate-200 rounded bg-white/60">SPACE</span>
            <span>Navigate</span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <span>Quantum_Presentation</span>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full glass p-4 md:p-8 rounded-3xl overflow-hidden cursor-default shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Activity className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 capitalize">Quantum {activeModal} Visualization</h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6 rotate-90 text-slate-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {activeModal === 'interference' ? (
                    <>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <h4 className="text-cyan-600 font-bold mb-2 uppercase tracking-wider text-sm">Constructive Interference</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          When waves line up (peak to peak), they combine to create a stronger signal. In quantum computing, this is used to <strong>amplify</strong> the probability of the correct answer.
                        </p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <h4 className="text-purple-600 font-bold mb-2 uppercase tracking-wider text-sm">Destructive Interference</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          When waves are out of sync (peak to trough), they cancel each other out. This is used to <strong>suppress</strong> the probability of incorrect or unwanted results.
                        </p>
                      </div>
                    </>
                  ) : activeModal === 'superposition' ? (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 h-full flex flex-col justify-center">
                      <h4 className="text-cyan-600 font-bold mb-4 uppercase tracking-wider text-sm">The Power of "Both"</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Unlike a classical bit that is either 0 or 1, a qubit in superposition exists in a complex state of both 0 and 1 simultaneously.
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        This allows a quantum computer to explore millions of possibilities at once, effectively performing massive parallel calculations that would take classical computers eons.
                      </p>
                    </div>
                  ) : activeModal === 'entanglement' ? (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 h-full flex flex-col justify-center">
                      <h4 className="text-cyan-600 font-bold mb-4 uppercase tracking-wider text-sm">Spooky Action at a Distance</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Entanglement is a unique quantum connection where two or more qubits become perfectly synchronized. Changing the state of one instantly affects the other, no matter how far apart they are.
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        This correlation allows qubits to work together as a single, unified system, exponentially increasing the processing power as more qubits are added.
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 h-full flex flex-col justify-center">
                      <h4 className="text-red-600 font-bold mb-4 uppercase tracking-wider text-sm">The Fragility of Quantum</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Decoherence occurs when a quantum system interacts with its environment (heat, radiation, etc.), causing the fragile quantum state to collapse.
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        This is the "noise" that leads to errors. Scientists use extreme cooling and vacuum chambers to prevent decoherence and keep qubits stable for as long as possible.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl p-8 flex items-center justify-center shadow-2xl border-4 border-cyan-500/20">
                  <img
                    src={
                      activeModal === 'interference' ? "/waves.png?v=2" :
                      activeModal === 'superposition' ? "/super.png" :
                      activeModal === 'entanglement' ? "/entangle.png" :
                      "/decoherence.png"
                    }
                    alt={`Quantum ${activeModal} Diagram`}
                    className="w-full h-auto max-h-[65vh] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-slate-400 text-xs font-mono uppercase">Quantum_Visualization_Module // {activeModal}_Patterns</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}