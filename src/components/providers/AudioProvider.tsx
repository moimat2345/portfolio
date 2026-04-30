"use client";

import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

interface AudioContextType {
  isPlaying: boolean;
  audioLevel: number;
  toggle: () => void;
}

const AudioCtx = createContext<AudioContextType>({
  isPlaying: false,
  audioLevel: 0,
  toggle: () => {},
});

export function useAudioContext() {
  return useContext(AudioCtx);
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number>(0);

  const updateLevel = useCallback(() => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length / 255;
    setAudioLevel(avg);
    rafRef.current = requestAnimationFrame(updateLevel);
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio("/ambient-track.mp3");
      audio.loop = true;
      audioRef.current = audio;

      const ctx = new AudioContext();
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      contextRef.current = ctx;
      analyserRef.current = analyser;
    }

    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(rafRef.current);
      setAudioLevel(0);
    } else {
      audioRef.current.play();
      updateLevel();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, updateLevel]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      audioRef.current?.pause();
      contextRef.current?.close();
    };
  }, []);

  return (
    <AudioCtx.Provider value={{ isPlaying, audioLevel, toggle }}>
      {children}
    </AudioCtx.Provider>
  );
}
