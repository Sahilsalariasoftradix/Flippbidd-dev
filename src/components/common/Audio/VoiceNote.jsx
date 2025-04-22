import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
// import styles from "./reactMic.module.scss";

import "./voicenote.css";
import { IMAGES } from "../../../utils/constants";

const VoiceNote = ({
  mode = "both",
  audioSrc,
  onAudioRecorded,
  initialAudio,
  onAudioDeleted,
  showDeleteIcon,
}) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const isPlayerOnly = mode === "player";
  const isRecorderOnly = mode === "recorder";
  const [audioUrl, setAudioUrl] = useState(
    isPlayerOnly ? audioSrc || null : null
  );
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);
  const chunks = useRef([]);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackTimerRef = useRef(null);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);

  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setRecording(true);
      setIsRecordingStarted(true);
      setMediaRecorder(recorder);

      chunks.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        chunks.current = [];

        if (onAudioRecorded) {
          const file = new File([blob], "recorded-audio.webm", {
            type: "audio/webm",
          }); // :white_check_mark: Create File
          onAudioRecorded(file); // :white_check_mark: Send File to parent
        }
        if (timerRef.current) clearInterval(timerRef.current);
        setSeconds(0);
      };

      recorder.start();

      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          const next = s + 1;
          if (next >= 30) {
            recorder.stop();
            setRecording(false);
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
          }
          return next;
        });
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  useEffect(() => {
    if (initialAudio) {
      if (typeof initialAudio === "string") {
        setAudioUrl(initialAudio);
      } else {
        const objectUrl = URL.createObjectURL(initialAudio);
        setAudioUrl(objectUrl);
      }
    } else {
      setAudioUrl(null);
    }
  }, [initialAudio]);

  useEffect(() => {
    if (isPlayerOnly && audioSrc) {
      setAudioUrl(audioSrc);
    }
  }, [audioSrc, isPlayerOnly]);

  useEffect(() => {
    if (
      (mode === "player" || mode === "both") &&
      (audioUrl || audioSrc) &&
      waveformRef.current
    ) {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }

      // Create a new wavesurfer instance
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#999",
        progressColor: "#0a84ff",
        height: 40,
        barWidth: 2,
        // responsive: true,
      });

      // Use a separate flag to track mounting state
      let isMounted = true;

      // Load the audio file
      const audioSource = audioUrl || audioSrc || "";
      if (audioSource) {
        // Handle load errors with a promise catch
        wavesurfer.current.load(audioSource).catch(err => {
          // Only log errors if component is still mounted
          if (isMounted && err.name !== 'AbortError') {
            console.error("Error loading audio:", err);
          }
        });
      }

      wavesurfer.current.on("play", () => {
        const currentTime = wavesurfer.current?.getCurrentTime();

        if (currentTime === 0) {
          setPlaybackSeconds(0);
        }
        setIsPlaying(true);
        if (!playbackTimerRef.current) {
          playbackTimerRef.current = setInterval(() => {
            setPlaybackSeconds((s) => s + 1);
          }, 1000);
        }
      });

      wavesurfer.current.on("pause", () => {
        setIsPlaying(false);
        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current);
          playbackTimerRef.current = null;
        }
      });

      wavesurfer.current.on("finish", () => {
        setIsPlaying(false);
        setPlaybackSeconds(0);
        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current);
          playbackTimerRef.current = null;
        }
      });

      return () => {
        isMounted = false; // Mark as unmounted
        
        // Safely destroy wavesurfer
        if (wavesurfer.current) {
          try {
            wavesurfer.current.destroy();
          } catch (err) {
            console.error("Error destroying wavesurfer:", err);
          }
          wavesurfer.current = null;
        }
        
        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current);
          playbackTimerRef.current = null;
        }
      };
    }
  }, [mode, audioUrl, audioSrc]);

  // Add cleanup for object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Only revoke URLs we created (not external audioSrc values)
      if (audioUrl && !audioSrc && audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl, audioSrc]);

  const handleButtonClick = () => {
    if (!isPlayerOnly && recording) {
      stopRecording();
    } else if (!isRecorderOnly && audioUrl) {
      wavesurfer.current?.playPause();
    } else if (!isPlayerOnly && !recording && !audioUrl) {
      startRecording();
    }
  };

  const handleDelete = () => {
    setAudioUrl(null);
    setIsRecordingStarted(false);
    setPlaybackSeconds(0);
    wavesurfer.current?.stop();
    wavesurfer.current?.destroy();
    wavesurfer.current = null;

    if (onAudioDeleted) onAudioDeleted();
  };

  return (
    <>
      <div className="label">Voice Note</div>
      <div className="flex items-center justify-between gap-4">
        <div className="player">
          <button
            onClick={handleButtonClick}
            className="micBtn"
            type="button"
          >
            <img
              src={
                recording
                  ? IMAGES.STOP_ICON
                  : audioUrl
                  ? isPlaying
                    ? IMAGES.PLAY_RECORD_ICON
                    : IMAGES.PLAY_ICON
                  : !isPlayerOnly
                  ? IMAGES.RECORD_ICON
                  : IMAGES.PLAY_ICON
              }
              alt="Mic Icon"
              className="icon"
            />
          </button>

          <div className="waveContainer">
            {!isRecordingStarted && !isPlayerOnly ? (
              <img
                src={IMAGES.STATIC_WAVES}
                alt="Static Waves"
                className="staticWaveImg"
              />
            ) : (
              <div ref={waveformRef} className="waveform" />
            )}
          </div>
          <div className="timer">
            {recording
              ? formatTime(seconds)
              : isPlaying
              ? formatTime(playbackSeconds)
              : "00:00"}
          </div>
        </div>
        <div>
          {(mode === "both" || (mode === "player" && showDeleteIcon)) &&
            audioUrl &&
            !recording && (
              <button
                type="button"
                onClick={handleDelete}
                className="deleteBtn"
              >
                <img src={IMAGES.DELETE_ICON} alt="Delete recording" />
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default VoiceNote;
