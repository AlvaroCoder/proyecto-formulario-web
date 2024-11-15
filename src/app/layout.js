import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata = {
  title: "Formulario ASME",
  description: "Formulario para el voluntariado ASME de la UDEP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
    <body>
        <main>{children}</main>
        <Toaster/>
      </body>
    </html>
  );
}
