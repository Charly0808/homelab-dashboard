# HomeLab Dashboard

Dashboard Next.js moderne pour centraliser les services Home Lab, les raccourcis et l'état d'un serveur Dell via iDRAC/Redfish.

## Architecture

- Next.js App Router + TypeScript strict
- Tailwind CSS dark UI responsive
- API interne côté serveur : `/api/services`, `/api/idrac`, `/api/health`
- Configuration services dans `config/services.json`
- Dell iDRAC via Redfish, credentials uniquement en variables d'environnement serveur
- Dockerfile production multi-stage, utilisateur non-root, healthcheck

## Installation locale

```bash
npm ci
cp .env.example .env
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Variables d'environnement

Voir `.env.example` :

- `SERVICES_CONFIG_PATH=./config/services.json`
- `SERVICE_CHECK_TIMEOUT_MS=3000`
- `SERVICE_SLOW_THRESHOLD_MS=1200`
- `IDRAC_HOST=`
- `IDRAC_USERNAME=`
- `IDRAC_PASSWORD=`
- `IDRAC_VERIFY_TLS=false`
- `IDRAC_TIMEOUT_MS=6000`

`IDRAC_USERNAME` et `IDRAC_PASSWORD` ne sont jamais exposés au navigateur et ne doivent jamais être commités.

## Configuration des services

Modifier `config/services.json` :

```json
[
  { "name": "Proxmox", "url": "https://proxmox.example.local", "icon": "server", "category": "Infrastructure" },
  { "name": "Grafana", "url": "https://grafana.example.local", "icon": "grafana", "category": "Monitoring", "healthUrl": "https://grafana.example.local/api/health" }
]
```

Champs : `name`, `url`, `icon`, `category`, `healthUrl` optionnel, `timeoutMs` optionnel.
Le health check est fait côté serveur pour éviter les problèmes CORS côté frontend.

## iDRAC / Redfish

L'API `/api/idrac` interroge Redfish : systèmes, managers, chassis, températures, ventilateurs, alimentation, stockage, réseau lorsque disponible.
Si une donnée n'existe pas sur le modèle iDRAC, l'UI affiche `N/A` au lieu de planter.

Pour certificat auto-signé : `IDRAC_VERIFY_TLS=false`. En production, utilisez idéalement un certificat valide et `IDRAC_VERIFY_TLS=true`.

## Docker

```bash
docker build -t homelab-dashboard .
docker run --rm -p 3000:3000 --env-file .env homelab-dashboard
```

Healthcheck : `GET /api/health` retourne `{ "status": "ok" }`.

## Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

## Coolify

Créer une Application depuis le repo GitHub, build pack Dockerfile, port exposé `3000`.
Configurer les variables d'environnement dans Coolify, notamment les variables iDRAC côté serveur. Ne pas les placer dans le repo.

## Endpoints

- `GET /api/health` → `{ "status": "ok" }`
- `GET /api/services` → statuts et temps de réponse des services configurés
- `GET /api/idrac` → état iDRAC/Redfish, ou message clair si non configuré/inaccessible

## Pages

- `/` dashboard principal
- `/services` liste, filtres catégorie, recherche
- `/server` détails serveur
- `/idrac` détails iDRAC + bouton Open iDRAC

## Troubleshooting

- iDRAC non configuré : vérifier `IDRAC_HOST`, `IDRAC_USERNAME`, `IDRAC_PASSWORD` dans Coolify.
- TLS iDRAC invalide : mettre temporairement `IDRAC_VERIFY_TLS=false`; idéalement installer un certificat valide.
- Service offline : vérifier que l'URL est accessible depuis le conteneur, pas seulement depuis votre navigateur.
- Timeout : augmenter `SERVICE_CHECK_TIMEOUT_MS` ou utiliser `healthUrl` plus léger.
- Coolify : vérifier les logs de build/runtime et le port exposé `3000`.
