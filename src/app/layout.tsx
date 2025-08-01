import Header from '@/components/shell/Header';
import ThemeRegistry from '@/components/theme/ThemeRegistry';
import './globals.css';

export const metadata = {
  title: 'CrowdCompute Workbench',
  description: 'Internal Evaluation Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <Header />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {children}
            </main>
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}