import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { servicesData } from "@/data/services";
import { buildWhatsAppUrl, buildTelUrl } from "@/lib/whatsapp";
import { contactConfig } from "@/data/siteConfig";
import {
  MessageSquare,
  ArrowRight,
  Phone,
  CheckCircle2,
  Workflow,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building2,
  Navigation,
} from "lucide-react";

export const metadata: Metadata = {
  title: "All Contracting Services | Electrical, Carpentry, Painting & Ceiling",
  description:
    "Explore our complete range of specialized on-site services in India: concealed electrical wiring, bespoke carpentry, luxury painting, and designer false ceilings.",
};

export default function ServicesPage() {
  const whatsappUrl = buildWhatsAppUrl();
  const telUrl = buildTelUrl();

  const crossTradeWorkflow = [
    {
      step: "Phase 1: Civil & Conduit Laying",
      trade: "Electrical",
      desc: "Concealed wall chasing and electrical conduits are laid before any plastering or carpentry takes place, preventing future wall damage.",
    },
    {
      step: "Phase 2: Framework & Grid Installation",
      trade: "False Ceiling",
      desc: "Heavy-gauge GI framing and gypsum ceiling boards are laser-leveled while leaving designated service hatches and wire drops.",
    },
    {
      step: "Phase 3: Modular Joinery & Fit-Out",
      trade: "Carpentry",
      desc: "Custom wardrobes, kitchen cabinets, and TV consoles are installed flush with ceiling lines and aligned with electrical outlets.",
    },
    {
      step: "Phase 4: Surface Prep & Topcoats",
      trade: "Painting & Finishes",
      desc: "Dual-coat wall putty, machine sanding, and luxury emulsion are applied last to ensure flawless, scuff-free final surfaces.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Page Hero */}
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        kicker="Disciplined Craftsmanship"
        title="Our Comprehensive Contracting Services"
        description="Four essential disciplines executed with coordinated on-site precision, premium materials, and direct contractor accountability. No fragmented subcontractors."
        actions={
          <>
            <Button
              variant="whatsapp"
              size="md"
              href={whatsappUrl}
              isExternal
              leftIcon={<MessageSquare className="w-4 h-4" />}
            >
              Enquire on WhatsApp
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

      {/* 2. Grid of Four Core Services */}
      <section className="py-4 sm:py-8 bg-white border-b border-[#E5E0D7]">
        <Container size="wide">
          <SectionHeading
            kicker="Our Disciplines"
            title="Explore Each Specialized Service"
            description="Select any service below to inspect technical specifications, confirmed on-site capabilities, and authentic portfolio examples."
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Cross-Trade Coordination Workflow */}
      <section className="py-4 sm:py-8 bg-[#F7F5F0] border-b border-[#E5E0D7]">
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E0D7] text-xs font-semibold text-[#172B40] mb-3">
              <Workflow className="w-3.5 h-3.5 text-[#B58A58]" />
              <span>Single-Point Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#172B40] tracking-tight">
              How We Coordinate All Four Trades Flawlessly
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#687381] leading-relaxed">
              When separate workers handle wiring, wood, ceiling, and paint, coordination breaks down. Here is how our single-point management guarantees seamless execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crossTradeWorkflow.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-[#E5E0D7] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading text-lg font-black text-[#B58A58]">
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#172B40] px-2 py-0.5 rounded bg-[#F7F5F0] border border-[#E5E0D7]">
                      {item.trade}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#172B40] tracking-tight mb-2">
                    {item.step}
                  </h3>
                  <p className="text-xs text-[#687381] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E5E0D7] flex items-center gap-1.5 text-xs text-[#21865B] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Synchronized schedule</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Operational Coverage & Service Areas Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E5E0D7]">
        <Container size="wide">
          <SectionHeading
            kicker="Local Contractor Presence"
            title="Where We Provide On-Site Contracting Services"
            description="Based in Borabanda, Hyderabad. We provide turnkey on-site contracting across Greater Hyderabad with direct contractor supervision and zero subcontractor handover."
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 cols: Base Workshop & Guarantees Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F7F5F0] border border-[#E5E0D7] shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#B58A58]">
                  <Building2 className="w-4 h-4 text-[#B58A58]" />
                  <span>Central Operations & Workshop</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-[#172B40]">
                    {contactConfig.businessName}
                  </h3>
                  <p className="text-xs text-[#687381]">
                    Proprietor: <strong className="text-[#172B40]">{contactConfig.proprietorName}</strong>
                  </p>
                  <p className="text-sm text-[#172B40] font-medium leading-relaxed pt-1 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#B58A58] shrink-0 mt-0.5" />
                    <span>{contactConfig.addressSummary}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5E0D7] flex items-center justify-between text-xs">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Friends+Colony+Allapur+Borabanda+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-[#B58A58] hover:underline"
                  >
                    <span>View Workshop on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] font-semibold text-[#21865B] bg-[#21865B]/10 px-2 py-0.5 rounded">
                    Verified Base
                  </span>
                </div>
              </div>

              {/* Service Commitments Box */}
              <div className="p-6 rounded-2xl bg-[#172B40] text-white space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B58A58]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>On-Site Service Standards</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#E9E3D9]/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B] shrink-0 mt-0.5" />
                    <span>In-person site visits & room measurements by master contractor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B] shrink-0 mt-0.5" />
                    <span>Authentic material samples brought directly to your doorstep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B] shrink-0 mt-0.5" />
                    <span>Zero travel or mobilization surcharge across Greater Hyderabad</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right 7 cols: Active Coverage Zones Grid */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Zone 1: Cyberabad / IT Corridor */}
                <div className="p-5 rounded-xl bg-white border border-[#E5E0D7] shadow-xs space-y-2 hover:border-[#B58A58]/50 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B58A58]">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>IT CORRIDOR & CYBERABAD</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#172B40]">
                    HITEC City, Madhapur & Gachibowli
                  </h4>
                  <p className="text-xs text-[#687381] leading-relaxed">
                    Kondapur, Financial District, Kokapet, Nanakramguda, Raidurg & Knowledge City.
                  </p>
                </div>

                {/* Zone 2: Central & Prime Residential */}
                <div className="p-5 rounded-xl bg-white border border-[#E5E0D7] shadow-xs space-y-2 hover:border-[#B58A58]/50 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B58A58]">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>CENTRAL HYDERABAD</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#172B40]">
                    Jubilee Hills & Banjara Hills
                  </h4>
                  <p className="text-xs text-[#687381] leading-relaxed">
                    Film Nagar, Somajiguda, Begumpet, Panjagutta, Ameerpet & Srinagar Colony.
                  </p>
                </div>

                {/* Zone 3: North-West Metro */}
                <div className="p-5 rounded-xl bg-white border border-[#E5E0D7] shadow-xs space-y-2 hover:border-[#B58A58]/50 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B58A58]">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>NORTH-WEST METRO</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#172B40]">
                    Borabanda, Kukatpally & Miyapur
                  </h4>
                  <p className="text-xs text-[#687381] leading-relaxed">
                    Allapur, KPHB Colony, Motinagar, Sanathnagar, Erragadda, Nizampet & Bachupally.
                  </p>
                </div>

                {/* Zone 4: Emerging Western Suburbs */}
                <div className="p-5 rounded-xl bg-white border border-[#E5E0D7] shadow-xs space-y-2 hover:border-[#B58A58]/50 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B58A58]">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>WESTERN SUBURBS</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#172B40]">
                    Manikonda, Narsingi & Tellapur
                  </h4>
                  <p className="text-xs text-[#687381] leading-relaxed">
                    Puppalguda, Gandipet, Mokila, Kollur, Appa Junction & Bandlaguda Jagir.
                  </p>
                </div>
              </div>

              {/* Quick Area Verification Strip */}
              <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E0D7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#172B40]">
                  <MapPin className="w-4 h-4 text-[#21865B] shrink-0" />
                  <span>Not sure if your colony is covered? Message us with your location details.</span>
                </div>
                <Button
                  variant="whatsapp"
                  size="sm"
                  href={buildWhatsAppUrl({ customMessage: "Hello, I want to check if you provide interior contracting services at my location in Hyderabad." })}
                  isExternal
                  leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                  className="shrink-0"
                >
                  Verify My Society
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Pre-Footer Call to Action */}
      <section className="bg-[#172B40] text-white py-4 sm:py-8">
        <Container className="text-center max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-[#B58A58] mb-2">
            Get an Estimate
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            <span className="text-[#B58A58]">Planning a Renovation or Fit-Out Project?</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#E9E3D9]/80 leading-relaxed">
            Discuss your requirements directly with the contractor. Send photos, blueprints, or book an on-site visit for a detailed, itemized quotation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappUrl}
              isExternal
              leftIcon={<MessageSquare className="w-5 h-5" />}
            >
              Direct WhatsApp Chat
            </Button>
            <Button
              variant="accent"
              size="lg"
              href="/contact"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Request Site Visit
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
