import type { NavbarData } from "@/components/Navbar";

export const navbarData: NavbarData = {
  company: "Typedef",
  logo: "/assets/images/logo-white.svg",
  centerMenu: [
    { name: "Features", link: "/#features" },
    { name: "Pricing", link: "/#pricing" },
    { name: "Company", link: "/#company" },
  ],
  rightMenu: [
    { name: "Log in", link: "/auth/login" },
    { name: "Sign up", link: "/auth/register", variant: "outline-light" },
  ],
};
