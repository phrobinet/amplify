# Flux de travail typiques

## Initialiser un nouveau projet

Pour initialiser un nouveau projet Amplify, exécutez la commande suivante depuis le répertoire racine de votre application frontale.

```bash
amplify init
```

La commande `init` passe par les étapes suivantes :

- Analyse le projet et confirme les paramètres du frontend.
- Exécute la logique d'initialisation du frontend sélectionné.
- S'il y a plusieurs plugins de fournisseur, invite à sélectionner les plugins qui fourniront des accès aux ressources du cloud.
- Exécute, en séquence, la logique d'initialisation du ou des plugins sélectionnés.
- Insère la structure du dossier amplifié dans le répertoire racine du projet, avec la configuration initiale du projet
- Générer les fichiers de métadonnées du projet, avec les résultats du ou des plugins sélectionnés ci-dessus.
- Crée un projet cloud dans la [AWS Amplify Console](https://console.aws.amazon.com/amplify) pour visualiser et gérer les ressources de tous les environnements backend.

## Cloner un exemple de projet Amplify

Pour cloner un exemple de projet Amplify Fullstack, exécutez la commande suivante dans un répertoire vide :

`amplify init --app <github-url>`

où `<github-url>` est un exemple valide de dépôt de projet Amplify. Cliquez [ici](https://docs.amplify.aws/cli/usage/headless#--app) pour plus de détails.

### Commandes CLI communes

### amplify init

La commande `init` peut déterminer des valeurs par défaut pour le projet en se basant sur le contenu du répertoire. Pour accepter les valeurs par défaut proposées, répondez oui à :

`Initialize the project with the above configuration?`

Pendant le processus d'init, la pile racine est créée avec trois ressources :

- un rôle IAM pour les utilisateurs non authentifiés
- Rôle IAM pour les utilisateurs authentifiés
- le seau S3, le seau de déploiement, pour prendre en charge le flux de travail de ce fournisseur.

Le fournisseur enregistre les informations de la pile racine et des ressources dans le fichier de métadonnées du projet (amplify/backend/amplify-meta.json).

### amplify <category> add

Une fois l'init terminé, exécutez la commande `amplify <category> add` pour ajouter les ressources d'une catégorie au cloud. Cela placera un modèle CloudFormation pour les ressources de cette catégorie dans le sous-répertoire de la catégorie `amplify/backend/<category>` et insérera sa référence dans la pile racine mentionnée ci-dessus en tant que pile enfant imbriquée. Lorsque vous travaillez en équipe, il est bon d'exécuter un `amplify pull` avant de modifier les catégories du backend.

### amplify push

Une fois que vous avez effectué vos mises à jour de catégories, exécutez la commande `amplify push` pour mettre à jour les ressources du cloud. L'interface CLI téléchargera d'abord les dernières versions des modèles de piles imbriquées par catégorie dans le seau de déploiement S3, puis appellera l'API AWS CloudFormation pour créer/mettre à jour les ressources dans le cloud. En fonction des ressources ajoutées/mises à jour, le fichier `aws-exports.js` (pour les projets JS) et le fichier `awsconfiguration.json` (pour les projets natifs) sont créés/mises à jour. Le modèle de la pile racine se trouve dans `amplify/backend/awscloudformation`.

### amplify pull

La commande `amplify pull` fonctionne de manière similaire à un _git pull_, en récupérant les changements de définition d'environnement de backend en amont depuis le cloud et en mettant à jour l'environnement local pour correspondre à cette définition. La commande est particulièrement utile dans les scénarios d'équipe lorsque plusieurs membres de l'équipe éditent le même backend, tirent un backend dans un nouveau projet, ou lors de la connexion à [plusieurs projets frontaux](https://docs.amplify.aws/cli/teams/multi-frontend) qui partagent le même environnement de backend Amplify.

### amplify console

La commande `amplify console` lance le navigateur qui vous dirige vers votre projet cloud dans la console AWS Amplify. La console Amplify fournit un emplacement central aux équipes de développement pour visualiser et gérer leurs environnements backend, l'état du déploiement backend, des liens profonds vers les ressources backend par catégorie Amplify, et des instructions sur la façon de tirer, cloner, mettre à jour ou supprimer des environnements.

### amplify configure project

La commande `amplify configure project` est une commande avancée et n'est pas couramment utilisée pour les premiers projets de démarrage. La commande doit être utilisée pour modifier la configuration du projet présente dans le répertoire `.config/` et reconfigurer les identifiants AWS (basés sur le profil de votre machine locale) mis en place lors de l'étape `amplify init`. Le répertoire `.config/` est généré dans le répertoire `amplify/`, s'il n'est pas déjà présent, et les fichiers `local-aws-info.json`, `local-env-info.json` et `project-info.json` sont configurés pour refléter les sélections faites dans le cadre de la commande `amplify configure project`.

`amplify configure project` est également utilisé pour activer les options **Serverless Container** dans votre projet avec Amazon Elastic Container Service. Une fois cette option activée, vous pourrez créer des API avec AWS Lambda et AWS Fargate à l'aide d'un [Dockerfile](https://docs.docker.com/engine/reference/builder/) ou d'un [Docker Compose file](https://docs.docker.com/compose/compose-file/). Voir [Serverless Containers](https://docs.amplify.aws/cli/usage/containers) pour plus d'informations.

### amplify logout –appId <Amplify App Id>

Lorsque Amplify CLI est authentifié avec l'interface d'administration Amplify, des jetons Web JSON (JWT) sont stockés sur la machine du développeur. Cette commande supprimera les JWTs associés à une application Amplify particulière. L'interface CLI vous demandera également si vous souhaitez vous déconnecter de toutes les sessions. Oui' supprimera les JWTs et s'assurera qu'ils sont invalidés globalement. Non" supprimera les JWTs stockés localement mais les jetons resteront valides jusqu'à leur expiration.

## Liste des commandes

- `amplify <category> <subcommand>`
- `amplify push`
- `amplify pull`
- `amplify env <subcommand>`
- `amplify configure`
- `amplify console`
- `amplify delete`
- `amplify help`
- `amplify init`
- `amplify publish`
- `amplify run`
- `amplify status`
- `amplify logout`

### Commandes par catégorie

- `amplify <category> add`
- `amplify <category> update`
- `amplify <category> remove`
- `amplify <category> push`
