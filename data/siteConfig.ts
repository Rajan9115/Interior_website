import { NavItem, SiteContactInfo } from "@/types/navigation";

export const siteConfig = {
  name: "MAMA INTERIORS",
  shortName: "MAMA INTERIORS",
  tagline: "Modular Kitchen • Wardrobes • Electronic • Ceiling • Paint & Polish",
  description:
    "Expert interior contracting and home finishing in Hyderabad by Ritesh Kumar Soni. Specialized in Modular Kitchens, Wardrobes, Electrical Works, False Ceilings, and Painting & Polish.",
  url: "https://shancontractor.com",
};

/**
 * Single source of truth for business and contact facts.
 * Verified directly from the official visiting card of MAMA INTERIORS.
 */
export const contactConfig: SiteContactInfo = {
  businessName: "MAMA INTERIORS",
  tradingName: "MAMA INTERIORS",
  proprietorName: "Ritesh Kumar Soni",
  tagline: "Modular Kitchen • Wardrobes • Electronic • Ceiling • Paint & Polish",
  phoneDisplay: "+91 80818 70179",
  phoneRaw: "+918081870179",
  secondaryPhoneDisplay: "+91 72378 64781",
  secondaryPhoneRaw: "+917237864781",
  whatsappDisplay: "+91 80818 70179",
  whatsappRaw: "918081870179",
  email: "riteshkumarsoni1999@gmail.com",
  addressSummary: "H. No. 14-1-89/25/A, Friends Colony, Allapur, Borabanda, Hyderabad",
  fullAddress: "H. No. 14-1-89/25/A, Friends Colony, Allapur, Borabanda, Hyderabad, Telangana",
  serviceAreaSummary: "Hyderabad, Telangana & Surrounding Regions",
  workingHours: "Mon - Sat: 9:00 AM – 7:30 PM",
  verifiedStatus: {
    isPhoneVerified: true,
    isWhatsAppVerified: true,
    isAddressVerified: true,
  },
};

export const mainNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Electrical Works",
        href: "/services/electrical",
        description: "Concealed wiring, distribution boards, architectural lighting & fittings.",
      },
      {
        title: "Carpentry & Woodwork",
        href: "/services/carpentry",
        description: "Custom modular wardrobes, kitchen cabinetry, TV units & door work.",
      },
      {
        title: "Painting & Finishes",
        href: "/services/painting",
        description: "Interior/exterior premium coatings, royal textures & waterproofing.",
      },
      {
        title: "Ceiling Solutions",
        href: "/services/ceiling",
        description: "Designer gypsum, POP, cove lighting & acoustic false ceiling layouts.",
      },
    ],
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const footerServices: NavItem[] = [
  { title: "Electrical Work", href: "/services/electrical" },
  { title: "Carpentry & Joinery", href: "/services/carpentry" },
  { title: "Painting & Finishes", href: "/services/painting" },
  { title: "False Ceiling & POP", href: "/services/ceiling" },
];

export const footerCompany: NavItem[] = [
  { title: "About Our Work", href: "/about" },
  { title: "Completed Projects", href: "/projects" },
  { title: "Request an Estimate", href: "/contact" },
  { title: "Verified Services", href: "/services" },
];

