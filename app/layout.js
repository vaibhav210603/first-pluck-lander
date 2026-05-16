import './globals.css';

export const metadata = {
  title: 'Temi Tea Special — The Taste of a Distant Saga',
  description: 'Hand-plucked at 5,500 ft in Sikkim. India\'s only certified organic Himalayan estate tea.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
