"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  PauseIcon,
  PlayIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMute01Icon,
} from "@hugeicons/core-free-icons";
import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m, useInView } from "motion/react";
import { useRef, useState } from "react";

import { productDemoStyles as styles } from "@/components/product-demo-section.stylex";

const PRODUCT_DEMO_VIDEO_SRC = "https://files.cf0.ai/website/cf0-product-demo.mp4";
const PRODUCT_DEMO_VIDEO_POSTER = "https://files.cf0.ai/website/cf0-product-demo-poster.jpg";

const PLAYBACK_SPEEDS = [0.5, 1, 1.5, 2] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

function CustomSlider({
  value,
  onChange,
  variant,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  variant: "scrub" | "volume";
  label: string;
}) {
  return (
    <div
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      tabIndex={0}
      {...stylex.props(
        styles.sliderTrack,
        variant === "scrub" ? styles.scrubTrack : styles.volumeTrack,
      )}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const percentage = ((event.clientX - rect.left) / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
      onKeyDown={(event) => {
        const step = variant === "scrub" ? 5 : 10;
        if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
          event.preventDefault();
          onChange(Math.min(Math.max(value - step, 0), 100));
        } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
          event.preventDefault();
          onChange(Math.min(Math.max(value + step, 0), 100));
        } else if (event.key === "Home") {
          event.preventDefault();
          onChange(0);
        } else if (event.key === "End") {
          event.preventDefault();
          onChange(100);
        }
      }}
    >
      <m.div
        {...stylex.props(styles.sliderFill)}
        initial={false}
        animate={{ scaleX: value / 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}

export function ProductDemoSection() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(frameRef, { once: true, margin: "200px" });
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && video.volume === 0) {
      video.volume = 1;
      setVolume(1);
    }
  }

  function handleVolumeChange(value: number) {
    const video = videoRef.current;
    if (!video) return;
    const nextVolume = value / 100;
    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video) return;
    const ratio = (video.currentTime / video.duration) * 100;
    setProgress(Number.isFinite(ratio) ? ratio : 0);
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  }

  function handleSeek(value: number) {
    const video = videoRef.current;
    if (!video?.duration) return;
    const time = (value / 100) * video.duration;
    if (Number.isFinite(time)) {
      video.currentTime = time;
      setProgress(value);
    }
  }

  function setSpeed(speed: number) {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  }

  let volumeIcon = VolumeHighIcon;
  if (isMuted || volume === 0) volumeIcon = VolumeMute01Icon;
  else if (volume <= 0.5) volumeIcon = VolumeLowIcon;

  return (
    <m.div
      ref={frameRef}
      {...stylex.props(styles.frame)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onFocus={() => setShowControls(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setShowControls(false);
        }
      }}
      onTouchStart={() => setShowControls(true)}
    >
        <img
          src={PRODUCT_DEMO_VIDEO_POSTER}
          alt="cf0 product preview"
          {...stylex.props(styles.media, styles.poster, isReady && styles.hidden)}
        />
        {isInView && (
          <video
            ref={videoRef}
            {...stylex.props(styles.media, styles.videoClickable)}
            src={PRODUCT_DEMO_VIDEO_SRC}
            poster={PRODUCT_DEMO_VIDEO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setIsReady(true)}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
          />
        )}

        <AnimatePresence>
          {isInView && showControls && (
            <m.div
              {...stylex.props(styles.controls)}
              initial={{ y: 16, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: 16, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div {...stylex.props(styles.scrubRow)}>
                <span {...stylex.props(styles.timeLabel)}>{formatTime(currentTime)}</span>
                <CustomSlider value={progress} onChange={handleSeek} variant="scrub" label="Seek" />
                <span {...stylex.props(styles.timeLabel)}>{formatTime(duration)}</span>
              </div>

              <div {...stylex.props(styles.controlsRow)}>
                <div {...stylex.props(styles.controlsGroup)}>
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    {...stylex.props(styles.iconButton)}
                  >
                    <HugeiconsIcon
                      icon={isPlaying ? PauseIcon : PlayIcon}
                      size={18}
                      strokeWidth={2}
                    />
                  </button>

                  <div {...stylex.props(styles.volumeGroup)}>
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                      {...stylex.props(styles.iconButton)}
                    >
                      <HugeiconsIcon icon={volumeIcon} size={18} strokeWidth={2} />
                    </button>
                    <CustomSlider
                      value={isMuted ? 0 : volume * 100}
                      onChange={handleVolumeChange}
                      variant="volume"
                      label="Volume"
                    />
                  </div>
                </div>

                <div {...stylex.props(styles.speedGroup)}>
                  {PLAYBACK_SPEEDS.map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => setSpeed(speed)}
                      aria-label={`${speed}x playback speed`}
                      {...stylex.props(
                        styles.speedButton,
                        playbackSpeed === speed && styles.speedButtonActive,
                      )}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
  );
}
