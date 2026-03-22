import './globals.css';

export const metadata = {
  title: 'Meirro Pro — The Display Reimagined',
  description: '5K resolution. 120Hz ProMotion. Thunderbolt 5. Built for those who refuse to compromise.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
