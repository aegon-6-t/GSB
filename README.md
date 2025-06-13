# 📚 Projet GSB - BTS SIO SLAM Épreuve E5

## 🎯 Contexte du Projet

Ce projet s'inscrit dans le cadre de l'**épreuve E5 "Support et mise à disposition de services informatiques"** du BTS SIO (Services Informatiques aux Organisations) spécialité SLAM (Solutions Logicielles et Applications Métiers).

### 📋 Informations Académiques
- **Formation** : BTS SIO - Spécialité SLAM
- **Épreuve** : E5 - Support et mise à disposition de services informatiques
- **Durée** : 40 minutes (10 min présentation + 30 min entretien)
- **Coefficient** : 4
- **Type** : Épreuve orale basée sur un portefeuille de compétences

## 🏢 Présentation du Projet GSB

### Vue d'ensemble
GSB (Galaxy Swiss Bourdin) est un laboratoire pharmaceutique fictif pour lequel nous développons une application web complète de gestion des frais des visiteurs médicaux.

### 🎯 Objectifs du Projet
- Digitaliser le processus de gestion des notes de frais
- Automatiser les workflows de validation
- Améliorer la traçabilité et le suivi des remboursements
- Optimiser l'expérience utilisateur pour les visiteurs médicaux

## 📊 Compétences BTS SIO Développées

### 🔧 Bloc 1 : Support et mise à disposition de services informatiques

#### C1 - Gérer le patrimoine informatique
- **Recenser et identifier les ressources numériques**
  - Documentation de l'architecture applicative GSB
  - Inventaire des technologies utilisées (React.js, Chart.js, Node.js, MongoDB, AWS S3, Render)
  - Gestion des versions et des dépendances

- **Exploiter des référentiels, normes et standards**
  - Respect des conventions de codage JavaScript/React
  - Utilisation de Git pour la gestion de versions
  - Documentation selon les standards techniques

- **Mettre en place et vérifier les niveaux d'habilitation**
  - Système d'authentification JWT
  - Gestion des rôles utilisateurs (User, Admin)
  - Contrôle d'accès aux fonctionnalités

#### C2 - Répondre aux incidents et aux demandes d'assistance
- **Traiter des demandes concernant les applications**
  - Débogage et correction des dysfonctionnements
  - Maintenance corrective de l'application GSB

#### C3 - Développer la présence en ligne de l'organisation
- **Participer à la valorisation de l'image**
  - Interface utilisateur moderne et responsive
  - Respect de l'identité visuelle GSB
  - Optimisation de l'expérience utilisateur

- **Référencer les services en ligne**
  - Documentation API REST

#### C4 - Travailler en mode projet
- **Analyser les objectifs et modalités d'organisation**
  - Analyse du cahier des charges GSB

- **Évaluer les indicateurs de suivi**
  - Suivi de l'avancement des développements

#### C6 - Organiser son développement professionnel
- **Mettre en place son environnement d'apprentissage**
  - Veille technologique sur React.js et Node.js
  - Formation continue sur les nouvelles technologies
  - Participation à des communautés de développeurs

- **Gérer son identité professionnelle**
  - Portfolio GitHub des réalisations
  - Présence sur LinkedIn avec projets
  - Contribution à des projets open source

### 🔧 Bloc 2 : Conception et développement d'applications (SLAM)

#### Concevoir et développer une solution applicative
- **Analyser un besoin exprimé**
  - Étude du cahier des charges GSB
  - Conception de l'architecture applicative
  - Modélisation de la base de données

- **Exploiter les ressources du framework**
  - Utilisation avancée de React.js (hooks, context, routing)
  - Framework Express.js pour l'API backend
  - Middleware d'authentification et de validation

#### Assurer la maintenance d'une solution applicative
- **Analyser et corriger un dysfonctionnement**
  - Debugging avec les outils de développement
  - Correction des bugs et optimisations
  - Tests de régression

- **Mettre à jour les documentations**
  - Documentation technique du code
  - Guide d'installation et de déploiement
  - Changelog des versions

#### Gérer les données
- **Concevoir une base de données**
  - Modélisation conceptuelle et logique
  - Normalisation des données
  - Définition des contraintes d'intégrité

- **Exploiter des données avec un langage de requêtes**
  - Requêtes no SQL 
  - Optimisation des performances
  - Procédures stockées si nécessaire

### 🛡️ Bloc 3 : Cybersécurité des services informatiques

#### Protéger les données à caractère personnel

#### Sécuriser les équipements et usages
- **Authentification et autorisation**
  - Mots de passe robustes et hashage sécurisé
  - Tokens JWT avec expiration
  - Contrôle d'accès basé sur les rôles

#### Assurer la cybersécurité d'une solution applicative
- **Prévention des attaques**
  - Protection contre l'injection SQL
  - Validation et sanitisation des entrées
  - Protection CSRF et XSS
  - Headers de sécurité HTTP

## 🏗️ Architecture Technique

### Stack Technologique
- **Frontend** : React.js 18, HTML5, CSS3, JavaScript ES2022
- **Backend** : Node.js 18, Express.js 4.18
- **Base de données** : MySQL 8.0
- **Authentification** : JWT (JSON Web Tokens)
- **Outils** : Git, FORK de VSCode, Postman, Compass

### 📐 Structure du Projet
```
GSB/
├── bts-gsbfrontend/          # Application React frontend
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   ├── services/        # Services API
│   │   ├── contexts/        # Contextes React
│   │   └── utils/           # Utilitaires
├── bts-gsbbackend/          # API Node.js backend
│   ├── controllers/         # Contrôleurs métier
│   ├── models/             # Modèles de données
│   ├── routes/             # Routes API
│   ├── middleware/         # Middlewares (auth, validation)
│   └── utils/
└── docs/                   # Documentation projet
```

## 🚀 Fonctionnalités Implémentées

### 👤 Gestion des Utilisateurs
- [x] Inscription et connexion sécurisée
- [x] Gestion des profils (User, Admin)
- [x] Modification des informations personnelles
- [x] Changement de mot de passe sécurisé avec hashage SHA-256

### 📝 Gestion des Notes de Frais
- [x] Création de nouvelles notes de frais
- [x] Saisie des frais (hébergement, transport, repas)
- [x] Upload de justificatifs (avec validation)

### ✅ Workflow de Validation
- [x] Soumission des notes de frais
- [x] Validation par les administrateurs
- [x] Historique des modifications
- [x] Notifications des changements d'état

### 📊 Reporting et Statistiques
- [x] Dashboard avec indicateurs clés
- [x] Export des données (format CSV)
- [x] Graphiques de suivi des dépenses
- [x] Rapports de synthèse par période

## 🎓 Préparation de l'Épreuve E5

### 📋 Portefeuille de Compétences

Ce projet constitue un élément central du **portefeuille de compétences** présenté lors de l'épreuve E5. Le portefeuille comprend :

#### 1. Tableau de Synthèse des Réalisations
| Réalisation | Compétences mobilisées | Période | Contexte |
|-------------|----------------------|---------|----------|
| Application GSB Frontend | C5, C2.B1, C2.B2 | Sept-Déc 2024 | Projet pédagogique |
| API REST Backend | C2.B1, C2.B3, C3.B5 | Oct-Jan 2025 | Projet pédagogique |
| Base de données | C2.B3, C3.B1, C3.B5 | Sept-Oct 2024 | Projet pédagogique |
| Déploiement et sécurité | C5, C3.B1, C3.B4 | Jan-Fév 2025 | Projet pédagogique |

#### 2. Fiches Descriptives des Réalisations

**Réalisation 1 : Développement Frontend React.js**
- **Contexte** : Application de gestion des frais professionnels
- **Objectifs** : Interface utilisateur moderne et responsive
- **Technologies** : React.js,, Chart.js,
- **Compétences** : Conception d'interfaces, programmation orientée composants
- **Livrables** : Application web fonctionnelle, documentation technique

**Réalisation 2 : API REST Node.js/Express**
- **Contexte** : Backend pour l'application GSB
- **Objectifs** : Services web sécurisés et performants
- **Technologies** : Node.js, Express.js, JWT,
- **Compétences** : Architecture API, sécurisation,
- **Livrables** : API REST documentée,

### 🎯 Objectifs Pédagogiques de l'Épreuve E5

L'épreuve E5 vise à évaluer :
- **La valorisation du parcours professionnel** durant la formation
- **L'analyse réflexive** sur les activités réalisées
- **La projection professionnelle** et les perspectives d'évolution
- **Les compétences de communication** technique et professionnelle

## 📈 Évolution du Projet

### Phase 1 : Analyse et Conception (Réalisée)
- ✅ Analyse des besoins utilisateurs
- ✅ Modélisation de la base de données
- ✅ Maquettage des interfaces
- ✅ Architecture technique définie

### Phase 2 : Développement Core (Réalisée)
- ✅ Mise en place de l'authentification JWT
- ✅ Développement des CRUD de base
- ✅ Intégration frontend/backend

### Phase 3 : Fonctionnalités Avancées (En cours)
- ⏳ Workflow de validation des notes de frais

### Phase 4 : Déploiement et Maintenance (Prévue)
- 📅 Déploiement en environnement de production
- 📅 Monitoring et surveillance applicative
- 📅 Documentation utilisateur finale
- 📅 Formation des utilisateurs finaux

## 🔧 Installation et Lancement

### Prérequis
- Node.js v18 ou supérieur
- MongoDB
- Git v2.30 ou supérieur

### Installation
```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd GSB

# Installation des dépendances backend
cd bts-gsbbackend
npm install

# Installation des dépendances frontend
cd ../bts-gsbfrontend
npm install
```

### Configuration
2. **Variables d'environnement**
   ```bash
   # Backend (.env)
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=gsb_frais
   JWT_SECRET=votre_secret_jwt
   SALT=votre_salt_hachage
   ```

### Lancement
```bash
# Terminal 1 - Backend (http://localhost:3001) ou votre adrese du back
cd bts-gsbbackend
npm start

# Terminal 2 - Frontend (http://localhost:3000) ou votre adresse du front
cd bts-gsbfrontend
npm run dev
```

## 📝 Documentation pour l'Épreuve E5

### Documents Constituant le Portefeuille
- [Tableau de synthèse des réalisations](docs/portefeuille/tableau_synthese.pdf)
- [Fiche descriptive - Développement Frontend](docs/portefeuille/fiche_frontend.pdf)
- [Fiche descriptive - API Backend](docs/portefeuille/fiche_backend.pdf)
- [Attestation de stage - Période 1](docs/portefeuille/attestation_stage_1.pdf)
- [Attestation de stage - Période 2](docs/portefeuille/attestation_stage_2.pdf)
- [Attestation de non-plagiat](docs/portefeuille/attestation_non_plagiat.pdf)

### Documentation Technique
- [Guide d'installation](docs/technique/installation.md)
- [Documentation API](docs/technique/api.md)
- [Guide utilisateur](docs/technique/user-guide.md)
- [Documentation technique](docs/technique/technical.md)
- [Guide de déploiement](docs/technique/deployment.md)

### Supports pour l'Oral
- [Présentation PowerPoint](docs/portefeuille/presentation_e5.pptx)
- [Démonstration vidéo](docs/portefeuille/demo_application.mp4)
- [Portfolio en ligne](https://monportfolio.fr/gsb-project)
- [Repository GitHub](https://github.com/moncompte/gsb-project)


### Perspectives d'Évolution
- Intégration d'une solution de notification push
- Développement d'une application mobile compagnon
- Migration vers une architecture microservices
- Intégration de solutions d'IA pour l'analyse des dépenses


---

*Ce projet est réalisé dans le cadre du BTS SIO pour l'épreuve E5. Il démontre la capacité à concevoir, développer et déployer une application web complète en respectant les contraintes techniques et fonctionnelles d'un cahier des charges professionnel, tout en développant les compétences du référentiel BTS SIO.*

---

## 🎯 Résumé pour l'Épreuve E5

**Projet** : Application web de gestion des frais professionnels GSB
**Contexte** : Laboratoire pharmaceutique (visiteurs médicaux)
**Technologies** : React.js / Node.js / MongoDB
**Équipe** : Projet individuel avec encadrement pédagogique
**Enjeux** : Digitalisation des processus, sécurisation des données, expérience utilisateur
