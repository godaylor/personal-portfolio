import type { ComponentType, ReactNode } from "react";
import { HomeIcon, NotebookIcon } from "lucide-react";

type IconComponent = ComponentType<{ className?: string }>;

type PortfolioData = {
  name: string;
  initials: string;
  url: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: Array<{ name: string; icon?: IconComponent }>;
  navbar: Array<{ href: string; icon: IconComponent; label: string }>;
  contact: {
    email: string;
    tel: string;
    social: Record<string, {
      name: string;
      url: string;
      icon: IconComponent;
      navbar: boolean;
    }>;
  };
  work: Array<{
    company: string;
    href: string;
    badges: string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end?: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
  }>;
  projects: Array<{
    title: string;
    href: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    links: Array<{
      type: string;
      href: string;
      icon: ReactNode;
    }>;
    image: string;
    video: string;
  }>;
};

export const DATA: PortfolioData = {
  name: "Maxeem",
  initials: "M",
  url: "http://localhost:3000",
  description: "Frontend Developer",
  summary: "Portfolio is being prepared.",
  avatarUrl: "",
  skills: [],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "",
    tel: "",
    social: {},
  },
  work: [],
  education: [],
  projects: [],
};
