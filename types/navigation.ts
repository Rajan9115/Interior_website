export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

export interface SiteContactInfo {
  businessName: string;
  tradingName: string;
  proprietorName?: string;
  tagline: string;
  phoneDisplay: string;
  phoneRaw: string;
  secondaryPhoneDisplay?: string;
  secondaryPhoneRaw?: string;
  whatsappDisplay: string;
  whatsappRaw: string;
  email: string;
  addressSummary: string;
  fullAddress?: string;
  serviceAreaSummary: string;
  workingHours: string;
  verifiedStatus: {
    isPhoneVerified: boolean;
    isWhatsAppVerified: boolean;
    isAddressVerified: boolean;
  };
}

