import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaGallery } from "@/components/projects/MediaGallery";
import { VideoCard } from "@/components/projects/VideoCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TransformationSection } from "@/components/projects/TransformationSection";
import {
  fetchPublishedProjects,
  fetchPublishedProjectBySlug,
} from "@/lib/api/public-client";
import { buildWhatsAppUrl, buildTelUrl } from "@/lib/whatsapp";
import { contactConfig } from "@/data/siteConfig";
import {
  MessageSquare,
  ArrowRight,
  Phone,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await fetchPublishedProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchPublishedProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | MAMA INTERIORS",
    };
  }

  return {
    title: `${project.title} | MAMA INTERIORS Portfolio`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchPublishedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const whatsappUrl = buildWhatsAppUrl({
    service: project.category,
    project: project.title,
  });
  const telUrl = buildTelUrl();

  const allProjects = await fetchPublishedProjects();
  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  const categoryTitles: Record<string, string> = {
    electrical: "Electrical Works",
    carpentry: "Carpentry & Joinery",
    painting: "Painting & Finishes",
    ceiling: "False Ceiling & POP",
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project.title },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Page Hero with Breadcrumbs & Context CTAs */}
      <PageHero
        breadcrumbs={breadcrumbs}
        kicker={categoryTitles[project.category] || project.category}
        title={project.title}
        description={project.summary}
        actions={
          <>
            <Button
              variant="whatsapp"
              size="md"
              href={whatsappUrl}
              isExternal
              leftIcon={<MessageSquare className="w-4 h-4" />}
            >
              Enquire About Similar Work
            </Button>
            <Button
              variant="primary"
              size="md"
              href="/contact"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Request Free Estimate
            </Button>
          </>
        }
      />

      {/* 2. Main Content & Media Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E5E0D7]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
            {/* Left 8 Columns: Media Gallery & Video (Takes more than half screen on laptop) */}
            <div className="lg:col-span-8 space-y-8">
              <MediaGallery images={project.images} title={project.title} />

              {/* Video Player if Video Available */}
              {project.videos && project.videos.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#172B40] mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#B58A58]" />
                    <span>On-Site Video Documentation</span>
                  </h3>
                  <VideoCard
                    src={project.videos[0]}
                    title={`${project.title} - Site Execution Footage`}
                  />
                </div>
              )}
            </div>

            {/* Right 4 Columns: Project Specifications & Scope */}
            <div className="lg:col-span-4 space-y-8">
              {/* Privacy-Safe Metadata Card */}
              <div className="p-6 rounded-xl bg-[#F7F5F0] border border-[#E5E0D7] space-y-3.5 text-xs text-[#172B40]">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D7]">
                  <span className="text-[#687381] font-medium flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#B58A58]" />
                    <span>Discipline</span>
                  </span>
                  <span className="font-bold uppercase tracking-wider text-[#172B40] bg-white px-2.5 py-1 rounded border border-[#E5E0D7]">
                    {categoryTitles[project.category] || project.category}
                  </span>
                </div>

                {project.location && (
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D7]">
                    <span className="text-[#687381] font-medium flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#B58A58]" />
                      <span>Location</span>
                    </span>
                    <span className="font-semibold text-right">
                      {project.location}
                    </span>
                  </div>
                )}

                {project.completedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#687381] font-medium flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#B58A58]" />
                      <span>Completion Status</span>
                    </span>
                    <span className="font-semibold text-[#21865B] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{project.completedAt}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Execution Description */}
              <div>
                <h3 className="text-xl font-bold text-[#172B40] tracking-tight mb-3">
                  Scope & Execution Narrative
                </h3>
                <p className="text-sm text-[#687381] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Key Scope Highlights */}
              {project.scopeHighlights && project.scopeHighlights.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#B58A58] mb-3">
                    Technical Specifications
                  </h4>
                  <ul className="space-y-2.5">
                    {project.scopeHighlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F7F5F0] border border-[#E5E0D7] text-xs text-[#172B40]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#21865B] shrink-0 mt-0.5" />
                        <span className="font-medium leading-snug">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* 2.5 Transformation Spotlight (Before & After) */}
      {project.beforeAfterPairs && project.beforeAfterPairs.length > 0 && (
        <TransformationSection
          pairs={project.beforeAfterPairs}
          projectTitle={project.title}
        />
      )}

      {/* 3. Related Projects in Same Category */}
      {relatedProjects.length > 0 && (
        <section className="py-4 sm:py-8 bg-[#F7F5F0] border-b border-[#E5E0D7]">
          <Container size="wide">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <SectionHeading
                kicker="More Works"
                title={`Other ${categoryTitles[project.category]} Projects`}
                description="Inspect more verified on-site photographs and finishes from our portfolio."
                align="left"
              />
              <Button
                variant="outline"
                href="/projects"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shrink-0 self-start sm:self-end"
              >
                Back to All Projects
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Pre-Footer Call to Action */}
      <section className="bg-[#172B40] text-white py-4 sm:py-8">
        <Container className="text-center max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-[#B58A58] mb-2">
            Get Started
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            <span className="text-[#B58A58]">Ready to Begin Your Project?</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#E9E3D9]/80 leading-relaxed">
            Direct contractor consultation • No middleman fees • Itemized bills of material
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappUrl}
              isExternal
              leftIcon={<MessageSquare className="w-5 h-5" />}
            >
              Enquire on WhatsApp
            </Button>
            <Button
              variant="accent"
              size="lg"
              href="/contact"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Schedule Site Visit
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={telUrl}
              isExternal={Boolean(contactConfig.phoneRaw)}
              leftIcon={<Phone className="w-5 h-5" />}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {contactConfig.phoneDisplay}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
