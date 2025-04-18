import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'UGA Event Hub',
  description: 'Your all-in-one event organizer at UGA',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
