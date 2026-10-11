import React, { useState, useMemo } from 'react';
import { Search, Play, Filter, SlidersHorizontal, Sparkles, X, Eye } from 'lucide-react';
import { VideoProject, ProjectCategory } from '../types';

interface PortfolioGalleryProps {
  projects: VideoProject[];
  onSelectProject: (project: VideoProject) => void;
  onOpenUpload: () => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  projects,
  onSelectProject,
  onOpenUpload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('All');

  const categories: ProjectCategory[] = [
    'All',
    'YouTube & Retention',
    'Commercials & Ads',
    'Short-form & Reels',
    'Cinematic & Documentaries',
    'Music Videos & VFX',
  ];

  const softwareList = ['All', 'DaVinci Resolve', 'Premiere Pro', 'After Effects', 'Blender', 'Soundly'];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      // Category check
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Software check
      if (
        selectedSoftware !== 'All' &&
        !item.softwareUsed.some((s) => s.toLowerCase().includes(selectedSoftware.toLowerCase()))
      ) {
        return false;
      }
      // Search query (title, client, description, software, tags)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesClient = item.client.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.editingTechniques.some((t) => t.toLowerCase().includes(query));
        const matchesSoftware = item.softwareUsed.some((s) => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesClient && !matchesDesc && !matchesTags && !matchesSoftware) {
          return false;
        }
      }
      return true;
    });
  }, [projects, selectedCategory, selectedSoftware, searchQuery]);

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <span>01</span>
              <span aria-hidden="true">·</span>
              <span>Project Archive</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-mono">{projects.length} Total Cuts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
              Selected Editing Works & Commercial Campaigns
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
              Curated portfolio spanning high-retention creator formats, commercial brand films, and narrative grading. Click any project to play cut & inspect techniques.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenUpload}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-amber-400/60 text-neutral-200 text-xs font-medium hover:text-white transition-all cursor-pointer flex items-center gap-2"
            >
              <span>+ Drag & Drop Video</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Filter Controls Strip */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 sm:p-5 mb-10 backdrop-blur-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive by title, client, technique, software..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-neutral-200 placeholder-neutral-500 text-xs outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Software filter dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 hidden sm:inline">Software:</span>
              <select
                value={selectedSoftware}
                onChange={(e) => setSelectedSoftware(e.target.value)}
                aria-label="Filter by software"
                className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 focus:border-amber-400 outline-none cursor-pointer"
              >
                {softwareList.map((sw) => (
                  <option key={sw} value={sw}>
                    {sw === 'All' ? 'All Software' : sw}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Tabs (Interactive Segmented Buttons per design constitution) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-black font-semibold shadow-sm'
                      : 'bg-neutral-950/70 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid (Bento Box: Col 1-2 for featured, Col 1 for standard) */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-2xl p-8">
            <Filter className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No projects found</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              No matching projects for "{searchQuery}". Try clearing your search or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSoftware('All');
              }}
              className="mt-4 px-4 py-2 bg-neutral-800 text-white text-xs rounded-lg hover:bg-neutral-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, idx) => {
              const isLarge = idx === 0 && selectedCategory === 'All' && !searchQuery;

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-all duration-300 flex flex-col cursor-pointer ${
                    isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                  }`}
                >
                  {/* Thumbnail container */}
                  <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
                    <img
                      src={project.posterUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Measured contrast scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Duration & Views Top Overlay */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-amber-400 border border-neutral-700/60 font-semibold">
                        {project.viewsMetric}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-neutral-300 border border-neutral-700/60">
                        {project.duration}
                      </span>
                    </div>

                    {/* Hover Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 fill-black ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Zero-Pill Unboxed Metadata with typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-mono">
                        <span className="text-amber-400 font-medium">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.client}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                      </div>

                      {/* Primary Project Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Toolkit & Actions */}
                    <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                      {/* Editing techniques list */}
                      <div className="flex items-center gap-1.5 text-neutral-400 truncate max-w-[70%] font-mono">
                        <span>{project.editingTechniques.slice(0, 2).join(' · ')}</span>
                      </div>

                      <span className="text-neutral-400 group-hover:text-white transition-colors font-medium flex items-center gap-1 shrink-0">
                        <span>Play Video</span>
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
