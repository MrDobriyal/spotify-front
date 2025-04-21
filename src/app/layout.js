
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";
import { AudioProvider } from "@/context/AudioContext";
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=''
      >
        <AudioProvider>
          <Navbar />
          {children}
          <AudioPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
