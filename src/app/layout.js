import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css'
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import AuthProvider from "@/components/Auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rayax",
  description: "design by VBerk",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ReduxProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
