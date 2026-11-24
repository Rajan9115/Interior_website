import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { servicesData } from "@/data/services";
import { fetchPublishedProjects } from "@/lib/api/public-client";

export const metadata: Metadata = {
  title: "Electrical Installation & Electronic Works | MAMA INTERIORS Hyderabad",
  description:
    "Expert concealed electrical installations, fire-retardant wiring, distribution boards, safety switches, and architectural lighting in Hyderabad by Ritesh Kumar Soni.",
};

export default async function ElectricalServicePage() {
  const service = servicesData.find((s) => s.id === "electrical");

  if (!service) {
    notFound();
  }

  const relatedProjects = await fetchPublishedProjects({ category: "electrical" });

  return (
    <ServiceDetailTemplate
      service={service}
      relatedProjects={relatedProjects}
    />
  );
}
