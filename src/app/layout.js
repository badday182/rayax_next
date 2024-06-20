'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import store from "@/store/store";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "RayaX",
//   description: "design by VBerk",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
  
      <Provider store={store} className="svg">
          {/* <App className="svg"/> */}

        {children}
        </Provider>
      </body>
    </html>
  );
}
