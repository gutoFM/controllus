import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Controllus — Inteligência Epidemiológica Global',
  description:
    'Plataforma de monitoramento de surtos epidemiológicos em tempo real com visualização 3D via dados satelitais.',
  keywords: ['epidemiologia', 'saúde global', 'surtos', 'monitoramento', 'NASA', 'WHO'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
