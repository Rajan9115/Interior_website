import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { servicesData } from "@/data/services";
import { fetchPublishedProjects } from "@/lib/api/public-client";

export const metadata: Metadata = {
  title: "Modular Kitchen & Wardrobe Carpentry | MAMA INTERIORS Hyderabad",
  description:
    "Expert modular kitchen cabinetry, floor-to-ceiling wardrobes, TV entertainment units, and custom wood joinery in Hyderabad by Ritesh Kumar Soni.",
};

export default async function CarpentryServicePage() {
  const service = servicesData.find((s) => s.id === "carpentry");

  if (!service) {
    notFound();
  }

  const relatedProjects = await fetchPublishedProjects({ category: "carpentry" });

  return (
    <ServiceDetailTemplate
      service={service}
      relatedProjects={relatedProjects}
    />
  );
}

