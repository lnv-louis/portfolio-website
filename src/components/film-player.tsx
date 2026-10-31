import { HugeiconsIcon } from "@hugeicons/react";
import PauseIcon from "@hugeicons/core-free-icons/PauseIcon";
import PlayIcon from "@hugeicons/core-free-icons/PlayIcon";
import VolumeHighIcon from "@hugeicons/core-free-icons/VolumeHighIcon";
import VolumeLowIcon from "@hugeicons/core-free-icons/VolumeLowIcon";
import VolumeMute01Icon from "@hugeicons/core-free-icons/VolumeMute01Icon";
import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m, useInView } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { filmPlayerStyles as styles } from "@/components/film-player.stylex";

export interface FilmSource {
  src: string;
  type: string;
}

export interface Film {
  sources: FilmSource[];
  poster: string;
  // Accessible name for the player, also the poster's alt text.
  label: string;
}

const cardEnter = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

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

// Whether the visitor has asked for sound, shared by every FilmPlayer on the page:
// turning sound on in one film means the next film plays with sound once it's in view.
let soundWanted = false;
const soundListeners = new Set<() => void>();
function setSoundWanted(next: boolean) {
  soundWanted = next;
  soundListeners.forEach((listener) => listener());
}
function useSoundWanted() {
  return useSyncExternalStore(
    (listener) => {
      soundListeners.add(listener);
      return () => soundListeners.delete(listener);
    },
    () => soundWanted,
    () => false,
  );
}

// The site's film player. Autoplays muted when scrolled into view (browsers block
// autoplay with sound); the first click, tap or play press turns sound on. Sound then
// follows the screen: only the film that's mostly in view plays audio, and films that
// scroll away pause.
export function FilmPlayer({ film }: { film: Film }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(frameRef, { once: true, margin: "200px" });
  const isVisible = useInView(frameRef, { amount: 0.5 });
  const wantsSound = useSoundWanted();
  // A pause the visitor chose; scrolling back into view shouldn't override it.
  const pausedByUser = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Play with sound only while this film is the one on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible) {
      video.muted = !wantsSound;
      if (video.paused && !pausedByUser.current) void video.play().catch(() => {});
    } else {
      video.muted = true;
      if (!video.paused) video.pause();
    }
    setIsMuted(video.muted);
  }, [isVisible, wantsSound, isInView]);

  function unmute(video: HTMLVideoElement) {
    video.muted = false;
    if (video.volume === 0) {
      video.volume = 1;
      setVolume(1);
    }
    setIsMuted(false);
    setSoundWanted(true);
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      unmute(video);
      void video.play();
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  }

  // A click on a muted, playing film means "I want to hear this", not "pause".
  function handleVideoClick() {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted && !video.paused) unmute(video);
    else togglePlay();
  }

  function turnSoundOn() {
    const video = videoRef.current;
    if (!video) return;
    unmute(video);
    if (video.paused) void video.play();
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      unmute(video);
    } else {
      video.muted = true;
      setIsMuted(true);
      setSoundWanted(false);
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
    setSoundWanted(nextVolume > 0);
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
        role="group"
        aria-label={film.label}
        tabIndex={0}
        {...cardEnter}
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
          src={film.poster}
          alt={film.label}
          {...stylex.props(styles.media, styles.poster, isReady && styles.hidden)}
        />
        {isInView && (
          <video
            ref={videoRef}
            {...stylex.props(styles.media, styles.videoClickable)}
            poster={film.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setIsReady(true)}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={handleVideoClick}
          >
            {film.sources.map((source) => (
              <source key={source.type} src={source.src} type={source.type} />
            ))}
          </video>
        )}

        {isInView && isMuted && (
          <button type="button" onClick={turnSoundOn} {...stylex.props(styles.soundButton)}>
            <HugeiconsIcon icon={VolumeMute01Icon} size={16} strokeWidth={2} />
            Sound on
          </button>
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
                      aria-pressed={playbackSpeed === speed}
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
