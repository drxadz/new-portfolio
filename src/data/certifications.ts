export interface Certification {
  title: string;
  issuer: string;
  href?: string;
  issuedOn?: string;
  badgeSrc?: string;
  category?: 'Offensive' | 'Cloud' | 'AppSec' | 'Network' | 'General';
}

export const certifications: Certification[] = [
  {
    title: "OSCP — Offensive Security Certified Professional",
    issuer: "Offensive Security",
    href: "https://www.credly.com/badges/dd331917-7bce-4524-88d0-adb9dcde2108/linked_in_profile",
    issuedOn: "2023",
    category: "Offensive"
  },
  {
    title: "CPTS — HTB Certified Penetration Testing Specialist",
    issuer: "Hack The Box",
    href: "",
    issuedOn: "2023",
    category: "Offensive"
  },
  {
    title: "CRTP — Certified Red Team Professional",
    issuer: "Pentester Academy",
    href: "",
    issuedOn: "2023",
    category: "Offensive"
  },
  {
    title: "MCRTA — Multi-Cloud Red Team Analyst",
    issuer: "Purple Synapz",
    href: "",
    issuedOn: "2024",
    category: "Cloud"
  },
  {
    title: "CNSP — Certified Network Security Practitioner",
    issuer: "The SecOps Group",
    href: "",
    issuedOn: "2024",
    category: "Network"
  },
  {
    title: "CAP — Certified AppSec Practitioner",
    issuer: "The SecOps Group",
    href: "",
    issuedOn: "2024",
    category: "AppSec"
  }
];

export const certificationCategories = [
  { id: 'all', label: 'All', count: certifications.length },
  { id: 'offensive', label: 'Offensive', count: certifications.filter(c => c.category === 'Offensive').length },
  { id: 'cloud', label: 'Cloud', count: certifications.filter(c => c.category === 'Cloud').length },
  { id: 'appsec', label: 'AppSec', count: certifications.filter(c => c.category === 'AppSec').length },
  { id: 'network', label: 'Network', count: certifications.filter(c => c.category === 'Network').length }
];