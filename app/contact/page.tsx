import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { contactConfig } from "@/data/siteConfig";
import { buildWhatsAppUrl, buildTelUrl } from "@/lib/whatsapp";
import {
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Request an Itemized Estimate | Shan Contracting",
  description:
    "Get in touch directly with the contractor for electrical wiring, custom modular carpentry, painting finishes, and designer false ceiling works in India.",
};

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl();
  const telUrl = buildTelUrl();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Page Hero */}
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        kicker="Direct Contractor Access"
        title="Let’s Build Something Lasting Together"
        description="Planning a home renovation, new build, or workspace upgrade? Reach out to Mama Interior for complete interior contracting—from custom carpentry and false ceilings to electrical wiring, painting, and more. Book a site visit or ask for an estimate today."
      />

      {/* 2. Form & Contact Details Section */}
      <section className="py-4 sm:py-8 bg-[#F7F5F0] border-b border-[#E5E0D7]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left 7 Columns: Interactive Enquiry Form */}
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>

            {/* Right 5 Columns: Direct Contact Channels & Verification Badges */}
            <div className="lg:col-span-5 space-y-6">
             

              {/* Direct Telephone Channel Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D7] shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#172B40]/10 text-[#172B40]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#172B40]">
                      Phone Consultation
                    </h3>
                    <p className="text-xs text-[#687381]">
                      Direct discussion with contractor
                    </p>
                  </div>
                </div>

                <div>
                  <a
                    href={telUrl}
                    className="text-base font-bold text-[#172B40] hover:text-[#B58A58] transition-colors block"
                  >
                    {contactConfig.phoneDisplay}
                  </a>
                  {!contactConfig.verifiedStatus.isPhoneVerified && (
                    <span className="text-[11px] text-[#687381] italic block mt-0.5">
                      (Phone number pending contractor verification)
                    </span>
                  )}
                </div>
              </div>

              {/* Operations & Service Area Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D7] shadow-xs space-y-4 text-xs text-[#172B40]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B58A58] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-sm">
                      Operating Coverage
                    </span>
                    <span className="text-[#687381] leading-relaxed block mt-0.5">
                      {contactConfig.serviceAreaSummary}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#E5E0D7]">
                  <Clock className="w-4 h-4 text-[#B58A58] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-sm">
                      Working Hours
                    </span>
                    <span className="text-[#687381] leading-relaxed block mt-0.5">
                      {contactConfig.workingHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quality & Integrity Reassurance Box */}
              <div className="p-6 rounded-2xl bg-[#172B40] text-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B58A58]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Contractor Commitments</span>
                </div>
                <ul className="space-y-2 text-xs text-[#E9E3D9]/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B] shrink-0 mt-0.5" />
                    <span>Itemized bill of materials before work begins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B] shrink-0 mt-0.5" />
                    <span>Dedicated on-site contractor supervision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B] shrink-0 mt-0.5" />
                    <span>Zero hidden charges or subcontracting markup</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
