
# GamerChallenges 🎮

Développeur : Younes Bigardene
Projet : Titre Professionnel - Développeur Web et Web Mobile
Date : 2025

https://gamerchallenges.vercel.app

## 📋 Description

GamerChallenges est une plateforme communautaire permettant aux gamers de proposer, relever et partager des défis sur leurs jeux vidéo préférés. Le projet a été réalisé dans le cadre de l'obtention du Titre Professionnel de Développeur Web et Web Mobile.
## 🌐 Liens du Projet
- **🚀 Application en ligne (Frontend) :** [https://gamerchallenges.vercel.app](https://gamerchallenges.vercel.app)
- **⚙️ API Backend :** `https://gamerchallenges-backend.up.railway.app`
- **📂 Repository GitHub :** `https://github.com/YounesBigardene/gamerchallenges`
## 🎯 Fonctionnalités
### MVP (Minimum Viable Product)

- ✅ **Page d'accueil** - Présentation et défis populaires
- ✅ **Authentification** - Inscription et connexion sécurisée
- ✅ **Création de défis** - Les utilisateurs peuvent proposer des challenges
- ✅ **Détail des défis** - Description complète avec règles
- ✅ **Participation** - Soumission de preuves vidéo (YouTube, Twitch, etc.)
- ✅ **Système de votes** - Like/Unlike des participations
- ✅ **Classement** - Tableau des leaders et meilleurs joueurs

    
### Évolutions possibles

    💬 Système de commentaires

    🔍 Filtres de recherche avancés

    🏅 Système de badges et récompenses

    🔔 Notifications en temps réel

## 🛠️ Stack Technique
### Frontend

    Framework : SvelteKit (SSR, Routing natif)

    Langage : JavaScript ES6+

    Styling : CSS Modules avec dark theme gaming

    Gestion d'état : Svelte stores + localStorage

### Backend

    Runtime : Node.js avec Express

    Base de données : PostgreSQL (modèle relationnel)

    Authentification : JWT (JSON Web Tokens)

    Validation : Express Validator

    - 🖥️ Repository GitHub (Backend) : `https://github.com/younesbgd93/Gamerchallenges/gamerchallenges-backend

### Outils & Services

    Versionning : Git + GitHub

    Déploiement : Vercel (Frontend) + Railway (Backend)

    API Externe: `https://gamerchallenges-backend.up.railway.app'



## 🚀 Installation & Démarrage
### Prérequis

    Node.js 18+

    PostgreSQL 14+

    npm ou yarn

### Backend
```bash
# Cloner le repository
git clone https://github.com/YounesBigardene/gamerchallenges.git
cd gamerchallenges-backend

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec tes configurations

# Démarrer le serveur
npm run dev
```
### Frontend
```bash

cd ../gamerchallenges-frontend
npm install
npm run dev
```
## 📁 Structure du Projet
```bash

text

gamerchallenges/
├── frontend/                 # Application SvelteKit
│   ├── src/
│   │   ├── routes/          # Pages de l'application
│   │   ├── lib/             # Composants et utilitaires
│   │   └── app.html         # Template principal
│   └── package.json
│
├── backend/                  # API Express
│   ├── routes/
│   │   ├── auth.js          # Authentification
│   │   ├── challenges.js    # Gestion des défis
│   │   └── participations.js # Participations et votes
│   ├── models/              # Modèles de données
│   ├── middleware/          # Middleware (auth, validation)
│   └── server.js            # Point d'entrée
│
└── README.md                # Cette documentation
```
## 🔧 API Endpoints
### Authentification

    POST /api/auth/register - Inscription

    POST /api/auth/login - Connexion

#### Défis

    GET /api/challenges - Liste des défis

    GET /api/challenges/:id - Détail d'un défi

    POST /api/challenges - Créer un défi

### Participations

    GET /api/participations - Liste des participations

    POST /api/participations - Soumettre une participation

    POST /api/participations/:id/vote - Voter pour une participation

## 🎨 Design & UX
### Charte Graphique

    Couleurs principales : Noir (#000000), Cyan (#00FFFF), Blanc (#FFFFFF)

    Typographie : Polices gaming modernes

    Style : Dark theme inspiré des plateformes de streaming

### Wireframes

![Wireframe Gamer Challenge](images/MonWireframeGamerChallenge.excalidraw(1).png)



## 📊 Base de Données
### Schéma simplifié
```sql

-- Table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des défis
CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    rules TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```
| Contrainte            | Statut                        |
|----------------------|-------------------------------|
| Responsive Design     | ✅ Mobile First               |
| Accessibilité WCAG    | ✅ Partiellement              |
| Sécurité (XSS, SQL)  | ✅ JWT, Validation            |
| Versionning Git       | ✅ GitHub                      |
| Déploiement           | ✅ Procédure documentée       |
| API externe           | ✅ gamerchallenges-production.up.railway.app             |
| SEO                   | ✅ Métadonnées, URLs sémantiques |

### 🏆 Fonctionnalités Avancées Implémentées

    Système de votes flexible : Like/Unlike avec persistence

    Upload vidéo externe : Support YouTube, Twitch, etc.

    Classement en temps réel : Mise à jour dynamique

    Validation côté client/serveur : Double sécurité

    Routing avancé : Pages dynamiques avec SvelteKit

### 📈 Évolutions Futures

    V1.1 : Système de commentaires et notifications

    V1.2 : API Twitch/YouTube intégration

    V1.3 : Application mobile (React Native)

    V2.0 : Mode équipe et tournois

## 🐛 Dépannage
### Problèmes courants
```bash

# Erreur de connexion à la base de données
Vérifier les variables d'environnement dans .env

# CORS errors
S'assurer que le backend autorise les requêtes du frontend

# Authentification JWT
Vérifier que le token est bien envoyé dans les headers
```

## 👥 Contribution

    Fork le projet

    Créer une branche (git checkout -b feature/AmazingFeature)

    Commit les changements (git commit -m 'Add AmazingFeature')

    Push vers la branche (git push origin feature/AmazingFeature)

    Ouvrir une Pull Request

## 📝 Licence

Ce projet est réalisé à des fins pédagogiques dans le cadre du Titre Professionnel DWWM.

## 👤 Auteur

Younes Bigardene

    GitHub: @YounesBigardene


## 🙏 Remerciements

    Équipe pédagogique pour l'accompagnement

    Communauté Svelte et Express pour les ressources

    Les testeurs et contributeurs
**⭐ N'hésitez pas à star le projet si vous l'appréciez !**

