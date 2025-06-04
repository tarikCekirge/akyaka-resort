import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    template: "%s | Akyaka Resort",
    default: "Welcome Akyaka Resort",
  },
  description: "Akyaka Resort",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased relative ${josefin.className}`}
      >
        <Header />
        <div className=' flex-1 px-8 py-12 h-full grid'>
          <main className='max-w-7xl mx-auto w-full'>{children}</main>
        </div>

        <footer>Akyaka Resort</footer>
      </body>
    </html>
  );
}
