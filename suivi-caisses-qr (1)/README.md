
# Suivi de Caisses (QR) — Next.js + Vercel Postgres

## 1) Prérequis
- **Node.js 18+** (installez depuis nodejs.org)
- Un compte **Vercel** (gratuit)

## 2) Installation en local
```bash
# Dans un terminal
npm install
cp .env.example .env.local
# Ouvrez .env.local et remplissez DATABASE_URL et NEXTAUTH_SECRET
```

### 2.1 Créer la base Vercel Postgres
- Allez sur **vercel.com** > votre projet > **Storage** > **Postgres** > **Create**.
- Copiez la **DATABASE_URL** et collez-la dans `.env.local`.

### 2.2 Lancer les migrations et la seed
```bash
npx prisma migrate dev
npx prisma db seed
```

### 2.3 Démarrer le site
```bash
npm run dev
# Ouvrez http://localhost:3000
# Connectez-vous : admin@exemple.com / Admin@1234
```

## 3) Déploiement sur Vercel
- Poussez le projet sur GitHub/GitLab/Bitbucket (ou importez le dossier sur Vercel).
- Sur Vercel, configurez les **Environment Variables** :
  - `DATABASE_URL` (depuis Vercel Postgres)
  - `NEXTAUTH_SECRET` (générez une chaîne aléatoire)
  - `AUTH_TRUST_HOST=true`
- Déployez. La caméra fonctionne en **HTTPS**.

## 4) Utilisation
- Menu **Scanner** : flashez le QR d'une caisse (la valeur doit être **exactement** `Case.qrCode` par exemple `QR-CASE-001`).
- La page de la caisse s'ouvre : choisissez le **client**, cochez **Dégâts** si besoin, écrivez des **notes**, puis **Enregistrer**.
- Menu **Caisses** : liste des caisses et accès rapide.
- **Dashboard** : compteurs globaux.

## 5) Ajouter vos caisses / clients
- Via API (exemples dans `src/app/api`).
- Ou en base via `npx prisma studio`.

## 6) Sécurité
- Changez tous les mots de passe du **seed**.
- Activez la 2FA sur Vercel. Donnez le rôle **ADMIN** uniquement aux responsables.
