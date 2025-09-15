# Gestion d'outillage via QR

Ce projet est une petite application Next.js permettant de gérer des outils grâce à des QR codes.

## Rôles

- **Admin** : accès aux pages `Scan` et `Outils` (une page d'administration pourra être ajoutée plus tard).
- **Tech** : accès aux pages `Scan` et `Outils`.

## Fonctionnalités

- Authentification par identifiant/mot de passe (NextAuth).
- Page **Scan** : lecture d'un QR code (hash) et édition des informations de l'outil.
- Page **Outils** : liste filtrable de tous les outils avec possibilité de modification.
- Les données sont stockées côté client pour l'exemple ; le hash sert d'identifiant unique.

## Développement

```bash
npm install
npm run dev
```

Comptes de test :

- `admin` / `admin`
- `tech` / `tech`
