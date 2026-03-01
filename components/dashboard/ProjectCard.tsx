"use client";

import { motion } from "framer-motion";
import { MoreVertical, Eye, Edit, Trash2, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
  project: Project;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (id: string) => void;
}

export function ProjectCard({
  project,
  onView,
  onEdit,
  onDelete,
  onExport,
}: ProjectCardProps) {
  const statusColors = {
    draft: "bg-gray-500/10 text-gray-600",
    preview: "bg-blue-500/10 text-blue-600",
    unlocked: "bg-green-500/10 text-green-600",
    published: "bg-purple-500/10 text-purple-600",
  };

  const statusLabels = {
    draft: "Brouillon",
    preview: "Preview",
    unlocked: "Déverrouillé",
    published: "Publié",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div
        className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center cursor-pointer"
        onClick={() =>
          project.status === "unlocked" ? onEdit(project.id) : onView(project.id)
        }
      >
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-4xl font-bold text-muted-foreground/30">
            {project.input_data?.productName?.charAt(0) || project.name.charAt(0)}
          </p>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{project.name}</h3>
            {project.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {project.description}
              </p>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  project.status === "unlocked"
                    ? onEdit(project.id)
                    : onView(project.id)
                }
              >
                {project.status === "unlocked" ? (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Éditer
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Voir
                  </>
                )}
              </DropdownMenuItem>
              {project.status === "unlocked" && (
                <DropdownMenuItem onClick={() => onExport(project.id)}>
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => onDelete(project.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[project.status]
            }`}
          >
            {statusLabels[project.status]}
          </span>
          <span className="text-muted-foreground">
            {formatDate(project.updated_at)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
