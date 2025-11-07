# Protosphere

Éditeur 3D collaboratif développé avec Next.js, React Three Fiber et TypeScript qui permet de créer et manipuler des scènes 3D en temps réel.

https://github.com/user-attachments/assets/bb657967-6176-4fb1-ab97-a20ce817beb1

## Prérequis

1. Node.js 18+
2. pnpm (recommandé) ou npm
3. Navigateur moderne avec support WebGL

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Déplacez-vous dans le répertoire du projet
3. Exécutez la commande `pnpm install` pour installer les dépendances.

## Utilisation

1. Exécutez la commande `pnpm run dev` pour démarrer le serveur de développement.
2. Accédez à http://localhost:3000 dans votre navigateur pour utiliser l'application.

## Fonctionnalités

- **Éditeur 3D interactif** avec manipulation d'objets en temps réel
- **Objets 3D primitifs** : cubes, sphères, cylindres, cônes, torus, plans et pyramides
- **Outils de transformation** : déplacement (G), rotation (R), et mise à l'échelle (S)
- **Système de propriétés** : modification des matériaux, couleurs, métallicité et rugosité
- **Gestion de scène** : hiérarchie d'objets avec visibilité et organisation par calques
- **Historique d'actions** : annulation (Ctrl+Z) et rétablissement (Ctrl+Y)
- **Presse-papiers** : copier (Ctrl+C), couper (Ctrl+X) et coller (Ctrl+V)

## Technologies

- **Next.js 15** : Framework React avec App Router
- **React Three Fiber** : Rendu 3D avec Three.js
- **Zustand** : Gestion d'état globale
