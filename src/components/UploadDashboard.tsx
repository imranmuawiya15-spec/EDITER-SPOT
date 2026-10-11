import React, { useState, useRef } from 'react';
import { UploadCloud, Film, Image as ImageIcon, X, Check, Sparkles, AlertCircle } from 'lucide-react';
import { VideoProject, ProjectCategory } from '../types';

interface UploadDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: VideoProject) => void;
}

export const UploadDashboard: React.FC<UploadDashboardProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterUrl, setPosterUrl] = useState<string>('');
  
  const [title, setTitle] = useState<string>('');
  const [client, setClient] = useState<string>('');
  const [category, setCategory] = useState<Exclude<ProjectCategory, 'All'>>('YouTube & Retention');
  const [viewsMetric, setViewsMetric] = useState<string>('1.5M Views');
  const [retentionBoost, setRetentionBoost] = useState<string>('+42% Retention');
  const [duration, setDuration] = useState<string>('03:45');
  const [description, setDescription] = useState<string>('');
  const [breakdown, setBreakdown] = useState<string>('');
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([
    'DaVinci Resolve Studio',
    'Premiere Pro',
  ]);
  const [techniquesInput, setTechniquesInput] = useState<string>('Sound Design, Pacing Hooks, Color Grade');
  const [visibility, setVisibility] = useState<'public' | 'draft'>('public');

  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [isDraggingPoster, setIsDraggingPoster] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingVideo(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
      }
    }
  };

  const handlePosterDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingPoster(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setPosterFile(file);
      setPosterUrl(URL.createObjectURL(file));
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
      }
    }
  };

  const handlePosterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPosterFile(file);
      setPosterUrl(URL.createObjectURL(file));
    }
  };

  const toggleSoftware = (name: string) => {
    if (selectedSoftware.includes(name)) {
      setSelectedSoftware(selectedSoftware.filter((s) => s !== name));
    } else {
      setSelectedSoftware([...selectedSoftware, name]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);

    // Fallback poster if none uploaded
    const finalPoster =
      posterUrl ||
      '/src/assets/images/project_cyber_narrative_1791753296297.jpg';
    const finalVideo =
      videoUrl ||
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

    const techniques = techniquesInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newProject: VideoProject = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      client: client.trim() || 'Independent Production',
      category,
      videoUrl: finalVideo,
      posterUrl: finalPoster,
      duration: duration || '02:30',
      year: '2026',
      viewsMetric: viewsMetric || 'New Release',
      retentionBoost: retentionBoost || undefined,
      softwareUsed: selectedSoftware.length > 0 ? selectedSoftware : ['DaVinci Resolve', 'Premiere Pro'],
      editingTechniques: techniques.length > 0 ? techniques : ['Sound Design', 'Rhythm Cut', 'Color Grading'],
      description: description.trim() || 'Master cut edited and optimized for dynamic viewer retention.',
      breakdown: breakdown.trim() || 'Constructed with precision frame-by-frame pacing and audio ducking.',
      visibility,
      featured: false,
      collaborators: [{ name: 'Muawiya', role: 'Lead Editor' }],
      comments: [],
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      onAddProject(newProject);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <UploadCloud className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Drag-and-Drop Video Upload Studio
              </h3>
              <p className="text-xs text-neutral-400">
                Directly upload raw video files or draft edits into Muawiya's portfolio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Body Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Dual Drop Zones: Video + Thumbnail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Video Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingVideo(true);
              }}
              onDragLeave={() => setIsDraggingVideo(false)}
              onDrop={handleVideoDrop}
              onClick={() => videoInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDraggingVideo
                  ? 'border-amber-400 bg-amber-400/10'
                  : videoFile
                  ? 'border-emerald-500/50 bg-emerald-500/5'
                  : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/40'
              }`}
            >
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
                className="hidden"
              />
              <Film className={`w-10 h-10 mb-2 ${videoFile ? 'text-emerald-400' : 'text-neutral-500'}`} />
              <div className="text-xs font-semibold text-white">
                {videoFile ? videoFile.name : 'Drag & Drop Video Master File'}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                {videoFile
                  ? `${(videoFile.size / (1024 * 1024)).toFixed(1)} MB · Ready for player`
                  : 'MP4, MOV, WebM (or paste video URL below)'}
              </div>
              {videoFile && (
                <span className="mt-2 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                  File Loaded Successfully
                </span>
              )}
            </div>

            {/* 2. Poster / Thumbnail Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingPoster(true);
              }}
              onDragLeave={() => setIsDraggingPoster(false)}
              onDrop={handlePosterDrop}
              onClick={() => posterInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDraggingPoster
                  ? 'border-amber-400 bg-amber-400/10'
                  : posterFile || posterUrl
                  ? 'border-emerald-500/50 bg-emerald-500/5'
                  : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/40'
              }`}
            >
              <input
                ref={posterInputRef}
                type="file"
                accept="image/*"
                onChange={handlePosterFileChange}
                className="hidden"
              />
              {posterUrl ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-2">
                  <img src={posterUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <ImageIcon className="w-10 h-10 mb-2 text-neutral-500" />
              )}
              <div className="text-xs font-semibold text-white">
                {posterFile ? posterFile.name : 'Drag & Drop Video Cover / Poster'}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                PNG, JPG, WebP (16:9 recommended)
              </div>
            </div>
          </div>

          {/* Optional Direct Stream Video URL fallback */}
          <div className="p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-[11px] font-mono text-neutral-400">
              OR DIRECT VIDEO URL (YouTube, Vimeo, MP4 CDN):
            </span>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://example.com/cuts/my-video.mp4"
              className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none"
            />
          </div>

          {/* Metadata Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 100-Hour Survival: The Final Cut"
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Client / Channel Name</label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Apex Studio / Creator Channel"
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400 text-white outline-none cursor-pointer"
              >
                <option value="YouTube & Retention">YouTube & Retention</option>
                <option value="Commercials & Ads">Commercials & Ads</option>
                <option value="Short-form & Reels">Short-form & Reels</option>
                <option value="Cinematic & Documentaries">Cinematic & Documentaries</option>
                <option value="Music Videos & VFX">Music Videos & VFX</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Duration & Metrics</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="04:20"
                  className="w-1/2 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400 text-white outline-none"
                />
                <input
                  type="text"
                  value={viewsMetric}
                  onChange={(e) => setViewsMetric(e.target.value)}
                  placeholder="2.4M Views"
                  className="w-1/2 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400 text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Software used toggles */}
          <div>
            <label className="block text-xs text-neutral-300 font-medium mb-2">
              Editing & Post-Production Software Used
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'DaVinci Resolve Studio',
                'Premiere Pro',
                'After Effects',
                'Soundly FX',
                'Blender',
                'CapCut Pro',
                'Topaz Video AI',
              ].map((sw) => {
                const isSelected = selectedSoftware.includes(sw);
                return (
                  <button
                    type="button"
                    key={sw}
                    onClick={() => toggleSoftware(sw)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400 text-amber-400 font-medium'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {sw}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Techniques */}
          <div>
            <label className="block text-xs text-neutral-300 font-medium mb-1">
              Key Editing Techniques (comma-separated)
            </label>
            <input
              type="text"
              value={techniquesInput}
              onChange={(e) => setTechniquesInput(e.target.value)}
              placeholder="e.g. Sound Design, Retention Hooks, Match Cuts, Anamorphic Grade"
              className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none"
            />
          </div>

          {/* Narrative & Pacing breakdown */}
          <div>
            <label className="block text-xs text-neutral-300 font-medium mb-1">
              Project Description & Pacing Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what challenges you solved in the edit, the creative direction, sound design, and audience retention structure..."
              className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none resize-none"
            />
          </div>

          {/* Visibility selector */}
          <div className="flex items-center gap-4 text-xs">
            <span className="text-neutral-400">Publish Mode:</span>
            <label className="flex items-center gap-1.5 text-neutral-200 cursor-pointer">
              <input
                type="radio"
                checked={visibility === 'public'}
                onChange={() => setVisibility('public')}
                name="visibility"
                className="accent-amber-400"
              />
              <span>Public Showcase (Visible in Gallery)</span>
            </label>
            <label className="flex items-center gap-1.5 text-neutral-400 cursor-pointer">
              <input
                type="radio"
                checked={visibility === 'draft'}
                onChange={() => setVisibility('draft')}
                name="visibility"
                className="accent-amber-400"
              />
              <span>Collaborator Draft (Reviewer Only)</span>
            </label>
          </div>

          {/* Submit Button & Progress */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading || !title.trim()}
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-semibold text-xs transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Processing & Transcoding...</span>
                </>
              ) : uploadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Published to Portfolio!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Publish to Portfolio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
