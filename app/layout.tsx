import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'HomeLab Dashboard', description: 'Modern Home Lab / Dell iDRAC dashboard' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body className="min-h-screen grid-bg antialiased"><div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(61,220,255,.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(84,246,164,.10),transparent_28%)]" />{children}</body></html>}
