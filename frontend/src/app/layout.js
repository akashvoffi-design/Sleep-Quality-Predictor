import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: "Sleep Quality Predictor - AI ML System",
  description: "Analyze your lifestyle and sleep patterns to predict your sleep quality using machine learning algorithms. 3D interactive dashboard with real-time predictions.",
  keywords: ["sleep quality", "machine learning", "health analytics", "AI prediction", "sleep tracker"],
  authors: [{ name: "Akash" }],
  openGraph: {
    title: "Sleep Quality Predictor",
    description: "AI-powered sleep quality analysis with 3D interactive dashboard",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ fontFamily: 'var(--font-body)' }}>
        {children}
      </body>
    </html>
  );
}