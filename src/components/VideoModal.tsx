import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sliders, MessageSquare, Check, Sparkles, Clock, Share2 } from 'lucide-react';
import { VideoProject, TimecodedComment, UserRole } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface VideoModalProps {
  project: VideoProject;
  onClose: () => void;
  currentRole: UserRole;
  onAddComment: (projectId: string, comment: Omit<TimecodedComment, 'id' | 'createdAt'>) => void;
  onToggleResolveComment: (projectId: string, commentId: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  project,
  onClose,
  currentRole,
  onAddComment,
  onToggleResolveComment,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'color_grade' | 'breakdown'>('video');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeekToComment = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const timeFormatted = formatSeconds(currentTime);
    onAddComment(project.id, {
      timestamp: timeFormatted,
      seconds: Math.floor(currentTime),
      author: currentRole === 'admin' ? 'Muawiya (Admin)' : currentRole === 'collaborator' ? 'Leo Vance (Editor)' : 'Client Reviewer',
      role: currentRole,
      text: commentText.trim(),
      resolved: false,
    });
    setCommentText('');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white font-display truncate max-w-md">
              {project.title}
            </h3>
            <span className="text-xs text-neutral-400 hidden sm:inline">
              · {project.client}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Copy link"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs (Interactive Segmented Buttons) */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-neutral-800/80 bg-neutral-900/40 shrink-0">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'video'
                ? 'bg-amber-400 text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Video Master Player
          </button>

          {project.beforeAfterGrading && (
            <button
              onClick={() => setActiveTab('color_grade')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'color_grade'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Before & After Grade</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('breakdown')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'breakdown'
                ? 'bg-amber-400 text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Editing Breakdown & Pacing
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {activeTab === 'video' && (
            <div className="space-y-4">
              {/* HTML5 Video Player Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800 group shadow-2xl">
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  poster={project.posterUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={togglePlay}
                  playsInline
                />

                {/* Big Center Play Overlay when paused */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                      <Play className="w-7 h-7 fill-black ml-1" />
                    </div>
                  </div>
                )}

                {/* Sleek Custom Timeline & Controls Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                  {/* Timeline Scrubber */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-mono text-neutral-300 w-10 text-right tabular-nums">
                      {formatSeconds(currentTime)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      aria-label="Video scrubber"
                      className="flex-1 accent-amber-400 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                    />
                    <span className="text-[11px] font-mono text-neutral-400 w-10 tabular-nums">
                      {formatSeconds(duration || 0)}
                    </span>
                  </div>

                  {/* Buttons Toolbar */}
                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg hover:bg-neutral-800 text-white cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>
                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.muted = !isMuted;
                            setIsMuted(!isMuted);
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-neutral-400">
                        HD 1080p · ProRes 422 HQ
                      </span>
                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            if (videoRef.current.requestFullscreen) {
                              videoRef.current.requestFullscreen();
                            }
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 cursor-pointer"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timecoded Revision Comment Track */}
              {project.comments && project.comments.length > 0 && (
                <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-neutral-400">
                      TIMECODED REVISION MARKERS ({project.comments.length})
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      Click any stamp to jump player directly to frame
                    </span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {project.comments.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSeekToComment(c.seconds)}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-colors flex items-center gap-1.5 shrink-0 ${
                          c.resolved
                            ? 'bg-neutral-950 text-neutral-400 border-neutral-800 line-through'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{c.timestamp}</span>
                        <span className="text-[10px] text-neutral-300">{c.author.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'color_grade' && project.beforeAfterGrading && (
            <BeforeAfterSlider
              beforeImage={project.beforeAfterGrading.beforeImage}
              afterImage={project.beforeAfterGrading.afterImage}
              title="DaVinci Resolve Studio 19 · Color Grade Comparison"
              subtitle="Scrub the divider to analyze highlight rolloff, skin tone vector alignment, and custom 35mm film halation."
            />
          )}

          {activeTab === 'breakdown' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DIRECTOR CUT BREAKDOWN</span>
                </div>
                <h4 className="text-xl font-bold text-white font-display">
                  Story Structure & Retention Strategy
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {project.breakdown}
                </p>
              </div>

              {/* Techniques list */}
              <div>
                <h5 className="text-xs font-mono uppercase text-neutral-400 mb-3">
                  Applied Editing Techniques
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.editingTechniques.map((tech, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs text-neutral-200"
                    >
                      <span>{tech}</span>
                      <span className="font-mono text-amber-400">Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-neutral-800">
            {/* Meta details */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-neutral-500">Project Overview</span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Client / Channel</span>
                  <span className="text-white font-medium">{project.client}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Category</span>
                  <span className="text-amber-400 font-medium">{project.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Audience Metric</span>
                  <span className="text-white font-mono">{project.viewsMetric}</span>
                </div>
                {project.retentionBoost && (
                  <div className="flex justify-between py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400">Retention Boost</span>
                    <span className="text-emerald-400 font-mono">{project.retentionBoost}</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Master Duration</span>
                  <span className="text-white font-mono">{project.duration}</span>
                </div>
              </div>
            </div>

            {/* Software used */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-neutral-500">Post-Production Pipeline</span>
              <div className="flex flex-wrap gap-2">
                {project.softwareUsed.map((sw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-mono"
                  >
                    {sw}
                  </span>
                ))}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                All media ingested in native log colour spaces, transcoded to Apple ProRes 422 HQ, and mastered for web delivery at -14 LUFS.
              </p>
            </div>

            {/* Collaborators & RBAC note */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-neutral-500">Credits & Collaborators</span>
              <div className="space-y-2 text-xs">
                {project.collaborators && project.collaborators.length > 0 ? (
                  project.collaborators.map((collab, idx) => (
                    <div key={idx} className="flex justify-between items-center text-neutral-300">
                      <span className="font-medium text-white">{collab.name}</span>
                      <span className="text-neutral-500">{collab.role}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-neutral-400">Sole Editor: Muawiya</div>
                )}
              </div>
            </div>
          </div>

          {/* Timecoded Comments & Collaboration Section */}
          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white font-display">
                  Reviewer & Collaborator Timecoded Notes
                </h4>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Active Role: <span className="text-amber-400 uppercase">{currentRole}</span>
              </span>
            </div>

            {/* Post a timecoded note */}
            <form onSubmit={handlePostComment} className="flex flex-col sm:flex-row gap-2">
              <div className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-amber-400 flex items-center gap-1.5 shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>At {formatSeconds(currentTime)}</span>
              </div>
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Leave frame-specific edit note (e.g. 'Punch in tighter at 0:24', 'Fade music earlier')..."
                className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white placeholder-neutral-500 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Post Note
              </button>
            </form>

            {/* Comment list */}
            <div className="space-y-2.5 pt-2">
              {project.comments && project.comments.length > 0 ? (
                project.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                      comment.resolved
                        ? 'bg-neutral-950/40 border-neutral-800/60 opacity-60'
                        : 'bg-neutral-950 border-neutral-800'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <button
                        onClick={() => handleSeekToComment(comment.seconds)}
                        className="px-2 py-1 rounded bg-neutral-900 border border-neutral-700 font-mono text-amber-400 text-xs shrink-0 hover:border-amber-400"
                        title="Jump to frame"
                      >
                        {comment.timestamp}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{comment.author}</span>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase">
                            [{comment.role}]
                          </span>
                          <span className="text-neutral-500 text-[11px]">{comment.createdAt}</span>
                        </div>
                        <p className={`text-neutral-300 mt-0.5 ${comment.resolved ? 'line-through' : ''}`}>
                          {comment.text}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleResolveComment(project.id, comment.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors shrink-0 self-end sm:self-center cursor-pointer ${
                        comment.resolved
                          ? 'border-neutral-700 text-neutral-400 hover:text-white'
                          : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                      }`}
                    >
                      {comment.resolved ? 'Reopen' : 'Mark Resolved'}
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-xs text-neutral-500 text-center py-2">
                  No timecoded notes yet. Type a note above to attach revision comments to the current playback frame.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
