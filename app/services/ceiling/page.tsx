import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { servicesData } from "@/data/services";
import { fetchPublishedProjects } from "@/lib/api/public-client";

export const metadata: Metadata = {
  title: "False Ceiling & POP Solutions | Gypsum & Cove Lighting | MAMA INTERIORS Hyderabad",
  description:
    "Contemporary false ceiling designs, seamless gypsum board installations, Plaster of Paris (POP) cornices, and indirect LED cove lighting layouts in Hyderabad.",
};

export default async function CeilingServicePage() {
  const service = servicesData.find((s) => s.id === "ceiling");

  if (!service) {
    notFound();
  }

  const relatedProjects = await fetchPublishedProjects({ category: "ceiling" });

  return (
    <ServiceDetailTemplate
      service={service}
      relatedProjects={relatedProjects}
    />
  );
}

