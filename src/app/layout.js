'use client'
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import store from "@/store/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "RayaX",
//   description: "design by VBerk",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Rayax</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
