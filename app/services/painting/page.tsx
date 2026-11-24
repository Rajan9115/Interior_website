import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { servicesData } from "@/data/services";
import { fetchPublishedProjects } from "@/lib/api/public-client";

export const metadata: Metadata = {
  title: "Interior & Exterior Painting & Polish Finishes | MAMA INTERIORS Hyderabad",
  description:
    "Professional surface preparation, dual-coat acrylic wall putty, luxury interior emulsions, texture coatings, and wood polish in Hyderabad by Ritesh Kumar Soni.",
};

export default async function PaintingServicePage() {
  const service = servicesData.find((s) => s.id === "painting");

  if (!service) {
    notFound();
  }

  const relatedProjects = await fetchPublishedProjects({ category: "painting" });

  return (
    <ServiceDetailTemplate
      service={service}
      relatedProjects={relatedProjects}
    />
  );
}

