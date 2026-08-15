"use client";

import { useReducedMotion } from "framer-motion";

const PARTICLES = [
  { left: "6%", bottom: "18%", size: 3, delay: "0s", duration: "18s" },
  { left: "14%", bottom: "28%", size: 4, delay: "2s", duration: "22s" },
  { left: "22%", bottom: "12%", size: 2, delay: "4s", duration: "16s" },
  { left: "31%", bottom: "34%", size: 5, delay: "1s", duration: "24s" },
  { left: "39%", bottom: "20%", size: 3, delay: "6s", duration: "19s" },
  { left: "48%", bottom: "40%", size: 2, delay: "3s", duration: "21s" },
  { left: "57%", bottom: "16%", size: 4, delay: "5s", duration: "17s" },
  { left: "66%", bottom: "30%", size: 3, delay: "1.5s", duration: "23s" },
  { left: "74%", bottom: "22%", size: 2, delay: "7s", duration: "20s" },
  { left: "82%", bottom: "36%", size: 4, delay: "2.5s", duration: "18s" },
  { left: "90%", bottom: "14%", size: 3, delay: "4.5s", duration: "25s" },
  { left: "11%", bottom: "48%", size: 2, delay: "8s", duration: "15s" },
  { left: "28%", bottom: "52%", size: 3, delay: "0.8s", duration: "26s" },
  { left: "53%", bottom: "8%", size: 5, delay: "3.2s", duration: "19s" },
  { left: "71%", bottom: "46%", size: 2, delay: "6.4s", duration: "22s" },
  { left: "88%", bottom: "50%", size: 3, delay: "1.1s", duration: "16s" },
];

export function SunriseScene() {
  const reduce = useReducedMotion();

  return (
    <div className="sunrise" aria-hidden="true">
      <div className="sunrise-sky" />
      <div className="sunrise-blur" />
      <div className="sunrise-rays" />
      <div className="sunrise-orb sunrise-orb-a" />
      <div className="sunrise-orb sunrise-orb-b" />
      <div className="sunrise-orb sunrise-orb-c" />
      <div className="sunrise-sun" />
      <div className="sunrise-glow" />
      <div className="sunrise-haze" />
      <div className="sunrise-horizon" />
      {!reduce
        ? PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="sunrise-particle"
              style={{
                left: particle.left,
                bottom: particle.bottom,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))
        : null}
    </div>
  );
}
