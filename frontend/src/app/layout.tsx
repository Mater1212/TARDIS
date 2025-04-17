import './globals.css';

export const metadata = {
  title: 'UGA Event Hub',
  description: 'Your all-in-one event organizer at UGA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
