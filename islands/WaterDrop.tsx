import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { WaveTank } from "@/components/WaveTank.ts";

function easeInCirc(x: number) {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

const waveTank = new WaveTank();

function WaterDrop() {
  const SVG_WIDTH = 100;
  const counter = useSignal(0);
  const dropy = useSignal(60);
  const width = useSignal(SVG_WIDTH);
  const widthRef = useRef(width.value);
  const springs = useSignal(waveTank.springs);
  const requestIdRef = useRef<number>();
  const grid = SVG_WIDTH / waveTank.waveLength;
  const points = [
    [0, 100],
    [0, 0],
    ...springs.value.map((x, i) => [i * grid, x.p]),
    [width.value, 0],
    [width.value, 100],
  ];
  const springsPath = `${points.map((x) => x.join(",")).join(" ")}`;
  const juice = `M18 ${63 + counter.value} C15 ${63 + counter.value} 16 ${
    63 + counter.value
  } 12 61L9 56C2 33 62 -3 80 12C103 27 44 56 29 58C27 58 25 59 24 61C20 ${
    63 + counter.value
  } 21 ${63 + counter.value} 18 ${63 + counter.value}Z`;

  function updateJuice(timestamp: number) {
    const amp = 40;
    const x = timestamp / 2000;
    const saw = x - Math.floor(x);
    if (saw < 0.6) {
      counter.value = easeInCirc(saw) * amp;
      dropy.value = -100;
    } else {
      counter.value = easeInCirc(1 - saw) * amp * 0.1;
      dropy.value = 70 + Math.pow(saw - 0.6, 2) * 10000;
    }
  }

  function update(timestamp: number) {
    updateJuice(timestamp);
    waveTank.update(waveTank.springs);
    springs.value = [...waveTank.springs];

    const offset = 500;
    const saw = (timestamp + offset) / 2000 -
      Math.floor((timestamp + offset) / 2000);
    if (saw < 0.01) {
      drop();
    }
    requestIdRef.current = globalThis.requestAnimationFrame(update);
  }

  function resize() {
    width.value = document.body.clientWidth;
  }

  function drop() {
    const dropPosition = Math.round(
      ((widthRef.current / 2 - 30) / widthRef.current) * 100,
    );
    waveTank.springs[dropPosition].p = -60;
  }

  useEffect(() => {
    widthRef.current = width.value;
  }, [width.value]);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (mediaQuery.matches) {
      return;
    }

    requestIdRef.current = requestAnimationFrame(update);
    globalThis.addEventListener("resize", resize);
    resize();

    return () => {
      globalThis.removeEventListener("resize", resize);
      if (requestIdRef.current !== undefined) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <svg
        width="100"
        height="85vh"
        viewBox="0 0 100 85vh"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mt-8"
        role="img"
        aria-label="logo"
      >
        <circle cx="18" cy={dropy.value} r="4" fill="white"></circle>
        <path
          d="M84 16c13 27 1 52-7 59 0 4-9 9-12 7-12 5-38-2-53-21-6-7 1-21 21-36 13-10 33-17 51-9Z"
          fill="#FFD80B"
        />
        <path d={juice} fill="white" />
        <path
          d="M69 15c15-1 9 10-6 19L44 44c-2 1-4-2-6 0l-3 6c-3 1-13 3-16 2-5-2-5-9 5-18l7-4c-1-2-1-2 2-5 3-2 19-10 29-11l1 2 6-1Z"
          fill="#FFED4E"
        />
        <path
          d="M38 35c1-1 3-2 3-4l8-3c0 1-1 3 1 4-2 1-7 1-8 5-1-2-1-2-4-2Z"
          fill="#fff"
        />
      </svg>
      <svg
        width="100%"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon
          points={springsPath}
          fill="rgba(255, 255, 255, .3)"
          transform="translate(0, 50)"
        >
        </polygon>
      </svg>
    </>
  );
}

export default WaterDrop;
