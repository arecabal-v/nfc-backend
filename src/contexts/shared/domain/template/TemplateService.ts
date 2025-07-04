export interface TemplateService {
  generateContactPage(data: ContactPageData): string;
}

export interface ContactPageData {
  serialNumber: string;
  contactInfo: ContactInfo[];
}

export interface ContactInfo {
  type: string;
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  position?: string;
}
