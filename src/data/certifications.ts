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
    issuedOn: "2025",
    category: "Offensive"
  },
  {
    title: "CPTS — HTB Certified Penetration Testing Specialist",
    issuer: "Hack The Box",
    href: "https://www.credly.com/badges/dd331917-7bce-4524-88d0-adb9dcde2108/linked_in_profile",
    issuedOn: "2024",
    category: "Offensive"
  },
  {
    title: "CRTP — Certified Red Team Professional",
    issuer: "Pentester Academy",
    href: "https://www.credential.net/defc43dd-e16b-4c2f-9a6d-b20a3e4633ac",
    issuedOn: "2024",
    category: "Offensive"
  },
  {
    title: "MCRTA — Multi-Cloud Red Team Analyst",
    issuer: "Purple Synapz",
    href: "https://labs.cyberwarfare.live/credential/achievement/67a85e360301bd2d12ee55fc",
    issuedOn: "2025",
    category: "Cloud"
  },
  {
    title: "CNSP — Certified Network Security Practitioner",
    issuer: "The SecOps Group",
    href: "https://www.credential.net/be9caa03-b534-485e-a027-16a9af06d2ce",
    issuedOn: "2025",
    category: "Network"
  },
  {
    title: "CAP — Certified AppSec Practitioner",
    issuer: "The SecOps Group",
    href: "https://www.credential.net/be9caa03-b534-485e-a027-16a9af06d2ce",
    issuedOn: "2020",
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