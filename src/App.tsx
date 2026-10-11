import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGallery } from './components/PortfolioGallery';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServicesRates } from './components/ServicesRates';
import { AboutMuawiya } from './components/AboutMuawiya';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { UploadDashboard } from './components/UploadDashboard';
import { AdminPortal } from './components/AdminPortal';
import { INITIAL_PROJECTS, INITIAL_COLLABORATORS } from './data/initialProjects';
import { VideoProject, CollaboratorUser, UserRole, ClientInquiry, TimecodedComment } from './types';
import { Sparkles, SlidersHorizontal, ArrowDown } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('muawiya_theme');
    return saved ? saved === 'dark' : true;
  });

  const [activeSection, setActiveSection] = useState<string>('projects');
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');

  // Projects state with LocalStorage persistence
  const [projects, setProjects] = useState<VideoProject[]>(() => {
    const saved = localStorage.getItem('muawiya_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
    return INITIAL_PROJECTS;
  });

  // Collaborators state
  const [collaborators, setCollaborators] = useState<CollaboratorUser[]>(() => {
    const saved = localStorage.getItem('muawiya_collaborators');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved collaborators', e);
      }
    }
    return INITIAL_COLLABORATORS;
  });

  // Inquiries state
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => {
    const saved = localStorage.getItem('muawiya_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved inquiries', e);
      }
    }
    return [
      {
        id: 'inq-initial',
        clientName: 'Nexus Gaming Media',
        email: 'partnerships@nexusgame.com',
        projectType: 'YouTube Long-form',
        budgetRange: '$1,000 – $2,500',
        timeline: 'Within 1 week',
        projectDetails: 'Need an editor for our weekly 15-minute challenge documentary. High retention pacing required.',
        submittedAt: '10:30 AM',
        status: 'new',
      },
    ];
  });

  // Modals state
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [prefilledService, setPrefilledService] = useState<string>('');

  // Persist projects
  useEffect(() => {
    localStorage.setItem('muawiya_projects', JSON.stringify(projects));
  }, [projects]);

  // Persist collaborators
  useEffect(() => {
    localStorage.setItem('muawiya_collaborators', JSON.stringify(collaborators));
  }, [collaborators]);

  // Persist inquiries
  useEffect(() => {
    localStorage.setItem('muawiya_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('muawiya_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers
  const handleAddProject = (newProject: VideoProject) => {
    setProjects([newProject, ...projects]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  const handleToggleProjectVisibility = (id: string) => {
    setProjects(
      projects.map((p) =>
        p.id === id
          ? { ...p, visibility: p.visibility === 'public' ? 'draft' : 'public' }
          : p
      )
    );
  };

  const handleAddCollaborator = (collab: CollaboratorUser) => {
    setCollaborators([...collaborators, collab]);
  };

  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id));
  };

  const handleAddInquiry = (inquiry: ClientInquiry) => {
    setInquiries([inquiry, ...inquiries]);
  };

  const handleUpdateInquiryStatus = (id: string, status: ClientInquiry['status']) => {
    setInquiries(
      inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const handleAddComment = (
    projectId: string,
    commentData: Omit<TimecodedComment, 'id' | 'createdAt'>
  ) => {
    const newComment: TimecodedComment = {
      ...commentData,
      id: `comm-${Date.now()}`,
      createdAt: 'Just now',
    };

    const updatedProjects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          comments: [...(p.comments || []), newComment],
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject({
        ...selectedProject,
        comments: [...(selectedProject.comments || []), newComment],
      });
    }
  };

  const handleToggleResolveComment = (projectId: string, commentId: string) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          comments: (p.comments || []).map((c) =>
            c.id === commentId ? { ...c, resolved: !c.resolved } : c
          ),
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject({
        ...selectedProject,
        comments: (selectedProject.comments || []).map((c) =>
          c.id === commentId ? { ...c, resolved: !c.resolved } : c
        ),
      });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setPrefilledService(serviceName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-amber-400 selection:text-black ${
        darkMode ? 'bg-[#08080a] text-neutral-100' : 'bg-neutral-50 text-neutral-900'
      }`}
    >
      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentRole={currentRole}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* Main Content */}
      <main id="home">
        {/* Hero Section */}
        <Hero
          onPlayShowreel={() => setSelectedProject(projects[0])}
          onExploreGallery={() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Portfolio Gallery & Search Archive */}
        <PortfolioGallery
          projects={projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenUpload={() => setIsUploadOpen(true)}
        />

        {/* Interactive Before & After Color Grading Section */}
        <section id="breakdown" className="py-16 md:py-24 border-t border-neutral-800 bg-neutral-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                <span>02</span>
                <span aria-hidden="true">·</span>
                <span>Color Science & Grading</span>
                <span aria-hidden="true">·</span>
                <span>DaVinci Studio Pipeline</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
                RAW Sensor Capture vs Final Theatrical Grade
              </h2>
              <p className="text-sm text-neutral-400 mt-2">
                Drag the divider across the frame to inspect how flat camera log files are mapped into rich, filmic tonal curves with authentic 35mm grain and accurate skin tones.
              </p>
            </div>

            <BeforeAfterSlider
              beforeImage="/src/assets/images/hero_editor_workspace_1791753279136.jpg"
              afterImage="/src/assets/images/project_cyber_narrative_1791753296297.jpg"
              beforeLabel="RAW Log Footage (Flat Profile)"
              afterLabel="Muawiya Final Master (Kodak 2383 LUT)"
            />
          </div>
        </section>

        {/* Services & Packages */}
        <ServicesRates onSelectService={handleSelectService} />

        {/* About Muawiya */}
        <AboutMuawiya />

        {/* Contact Section */}
        <ContactSection
          onAddInquiry={handleAddInquiry}
          prefilledService={prefilledService}
        />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Video Modal Player & Comments */}
      {selectedProject && (
        <VideoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          currentRole={currentRole}
          onAddComment={handleAddComment}
          onToggleResolveComment={handleToggleResolveComment}
        />
      )}

      {/* Drag & Drop Upload Dashboard */}
      <UploadDashboard
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Secure Admin & RBAC Portal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentRole={currentRole}
        onSwitchRole={setCurrentRole}
        projects={projects}
        onDeleteProject={handleDeleteProject}
        onToggleProjectVisibility={handleToggleProjectVisibility}
        collaborators={collaborators}
        onAddCollaborator={handleAddCollaborator}
        onRemoveCollaborator={handleRemoveCollaborator}
        inquiries={inquiries}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onOpenUpload={() => {
          setIsAdminOpen(false);
          setIsUploadOpen(true);
        }}
      />
    </div>
  );
}
