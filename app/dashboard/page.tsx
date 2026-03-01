"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { DashboardNav } from "@/components/shared/DashboardNav";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Plus, Loader2, Search } from "lucide-react";
import type { Project } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const { user, profile, loading: authLoading } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      loadProjects();
    }
  }, [authLoading, user]);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user!.id)
        .order("updated_at", { ascending: false });

      if (error) {
        throw error;
      }

      setProjects(data as Project[]);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewProject = () => {
    router.push("/generator");
  };

  const handleView = (id: string) => {
    router.push(`/generator/${id}/preview`);
  };

  const handleEdit = (id: string) => {
    router.push(`/generator/${id}/editor`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      return;
    }

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) {
        throw error;
      }

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Erreur lors de la suppression. Veuillez réessayer.");
    }
  };

  const handleExport = (id: string) => {
    router.push(`/generator/${id}/editor?export=true`);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={handleNewProject}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center"
          >
            <Plus className="w-5 h-5" />
            Nouveau projet
          </button>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            {searchQuery ? (
              <div className="space-y-4">
                <Search className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">
                  Aucun projet trouvé pour "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">
                    Aucun projet pour le moment
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Créez votre première landing page en quelques minutes
                  </p>
                  <button
                    onClick={handleNewProject}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Créer mon premier projet
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onExport={handleExport}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
