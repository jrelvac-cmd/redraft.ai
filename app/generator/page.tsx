"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Upload, X, FileText } from "lucide-react";
import { AuthModal } from "@/components/shared/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";

interface UploadedFile {
  file: File;
  preview: string;
  type: "image" | "pdf";
}

export default function GeneratorPage() {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const savedDescription = localStorage.getItem("initial_description");
    if (savedDescription) {
      setDescription(savedDescription);
      localStorage.removeItem("initial_description");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > 5) {
      setError("Maximum 5 fichiers autorisés");
      return;
    }

    selectedFiles.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        setError(`Le fichier ${file.name} dépasse 10 MB`);
        return;
      }

      const fileType = file.type.startsWith("image/") ? "image" : "pdf";

      if (fileType === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFiles((prev) => [
            ...prev,
            {
              file,
              preview: reader.result as string,
              type: fileType,
            },
          ]);
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        setFiles((prev) => [
          ...prev,
          {
            file,
            preview: "",
            type: "pdf",
          },
        ]);
      } else {
        setError("Format non supporté. Utilisez PNG, JPEG ou PDF");
      }
    });

    setError(null);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (description.trim().length < 50) {
      setError("Veuillez décrire votre SaaS en au moins 50 caractères");
      return;
    }

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
          name: "Nouveau projet",
          description: description,
          status: "draft",
          input_data: {
            description: description,
            uploaded_files_count: files.length,
          },
        })
        .select()
        .single();

      if (projectError) throw projectError;

      if (files.length > 0) {
        const uploadPromises = files.map(async ({ file }) => {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${user.id}/${project.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("project-assets")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const {
            data: { publicUrl },
          } = supabase.storage.from("project-assets").getPublicUrl(filePath);

          await supabase.from("assets").insert({
            project_id: project.id,
            user_id: user.id,
            type: file.type.startsWith("image/") ? "screenshot" : "mockup",
            storage_path: filePath,
            public_url: publicUrl,
            original_filename: file.name,
          });

          return publicUrl;
        });

        await Promise.all(uploadPromises);
      }

      router.push(`/generator/${project.id}/questions`);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    handleSubmit();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Redraft.AI</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold">
              Décrivez votre SaaS
            </h1>
            <p className="text-muted-foreground">
              Plus vous êtes précis, meilleure sera votre landing page
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Description de votre SaaS
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Un outil qui transforme les réunions Zoom en résumés actionnables pour les managers. On analyse automatiquement les conversations, extrait les points clés et génère des todo lists. Notre IA détecte aussi les décisions prises et les actions à mener..."
                className="w-full h-40 px-4 py-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {description.length} / 50 caractères minimum
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Images (optionnel)
              </label>
              <p className="text-sm text-muted-foreground mb-3">
                Logo, screenshots, mockups... (max 5 fichiers, 10 MB chacun)
              </p>

              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/jpeg,application/pdf"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  disabled={files.length >= 5}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Cliquez pour uploader ou glissez vos fichiers ici
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPEG, PDF • {files.length}/5 fichiers
                  </p>
                </label>
              </div>

              {files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="relative border rounded-lg p-2 group"
                    >
                      {file.type === "image" ? (
                        <img
                          src={file.preview}
                          alt={file.file.name}
                          className="w-full h-24 object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-24 flex items-center justify-center bg-muted rounded">
                          <FileText className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="mt-1 text-xs truncate">
                        {file.file.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || description.trim().length < 50}
              className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                  Création du projet...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Continuer
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        redirectTo={`/generator`}
      />
    </div>
  );
}
