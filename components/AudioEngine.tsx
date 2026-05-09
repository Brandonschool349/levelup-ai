"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/store/game-store";

const AUDIO_TRACKS = {
  beginner: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-loop-85-bpm-116454.mp3",
  intermediate: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_244a04d2b2.mp3?filename=dark-ambient-126233.mp3",
  advanced: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_3d1a8e9e1c.mp3?filename=cinematic-time-lapse-115672.mp3",
  boss: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=action-rhythm-106450.mp3"
};

export function AudioEngine() {
  const {
    isMuted,
    islands,
    activeIslandIndex,
    isInWorldMap,
    isInBossFight
  } = useGameStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  useEffect(() => {
    let targetTrack: string | null = null;

    if (!islands || islands.length === 0) return;

    const currentIsland = islands[activeIslandIndex];

    if (isInBossFight) {
      targetTrack = AUDIO_TRACKS.boss;
    } else if (currentIsland) {
      targetTrack = AUDIO_TRACKS[currentIsland.theme];
    }

    if (targetTrack !== currentTrack) {
      setCurrentTrack(targetTrack);
    }
  }, [
    islands,
    activeIslandIndex,
    isInWorldMap,
    isInBossFight,
    currentTrack
  ]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    if (currentTrack) {
      audio.src = currentTrack;

      audio.play().catch((e) => {
        console.log("Autoplay prevented:", e);
      });

      audio.volume = isMuted ? 0 : 0.3;
    }

    return () => {
      audio.pause();
    };
  }, [currentTrack, isMuted]);

  return null;
}