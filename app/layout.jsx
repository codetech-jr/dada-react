import { Questrial } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";

const questrial = Questrial({
    variable: "--font-text",
    weight: ["400"],
    subsets: ["latin"]
});

const montserrat = Montserrat({
    variable: "--font-primary",
    weight: ["400"],
    subsets: ["latin"]
});



export const metadata = {
  title: "Dada Media Design",
  description: "Transforma tu negocio con una identidad de marca potente. Diseño de logos creativos y consultoría estratégica para que tu marca destaque y conecte.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${questrial.variable} ${montserrat.variable} text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
