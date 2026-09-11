import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}'], theme: { extend: { colors: { lab: { bg:'#070b12', panel:'#0d1320', card:'#111827', border:'#1f2a44', cyan:'#3ddcff', green:'#54f6a4', amber:'#ffc857', red:'#ff5c7a' } }, boxShadow:{glow:'0 0 40px rgba(61,220,255,.12)'} } }, plugins: [] };
export default config;
