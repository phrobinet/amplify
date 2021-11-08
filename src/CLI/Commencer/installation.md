# Installation

## Installer le CLI d'Amplify

L'interface en ligne de commande Amplify (CLI) est une chaîne d'outils unifiée permettant de créer des services cloud AWS pour votre application. Allons-y et installons la CLI Amplify.

NPMcURL (Mac et Linux)cURL (Windows)

```bash
npm install -g @aws-amplify/clicopy
```

**Note:** Parce que nous installons le CLI d'Amplify globalement, vous pouvez avoir besoin d'exécuter la commande ci-dessus avec `sudo` selon les politiques de votre système.

### Pré-requis pour l'installation

- Installez Node.js®](https://nodejs.org/en/download/) et [NPM](https://www.npmjs.com/get-npm) s'ils ne sont pas déjà sur votre machine.
- Vérifiez que vous exécutez au moins Node.js version 10.x et npm version 6.x ou supérieure en exécutant `node -v` et `npm -v` dans une fenêtre de terminal/console.
- Créer un compte AWS] (https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start). Si vous n'avez pas encore de compte AWS, vous devrez en créer un pour pouvoir suivre les étapes décrites dans ce tutoriel.

## Configurer le CLI d'Amplify

Pour installer le CLI Amplify sur votre machine locale, vous devez le configurer pour qu'il se connecte à votre compte AWS.

### Option 1 : regarder le guide vidéo

Regardez la vidéo ci-dessous pour apprendre comment installer et configurer le CLI Amplify ou passez à la section suivante pour suivre les instructions étape par étape.

<iframe width="640" height="320" src="https://www.youtube.com/embed/fWbM5DLh25U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Option 2 : Suivez les instructions

Configurez Amplify en exécutant la commande suivante :

```
amplify configure
```

`amplify configure` vous demandera de vous connecter à la console AWS.

Une fois que vous êtes connecté, Amplify CLI vous demandera de créer un utilisateur IAM.

> Amazon IAM (Identity and Access Management) vous permet de gérer les utilisateurs et leurs autorisations dans AWS. Vous pouvez en savoir plus sur Amazon IAM [ici](https://aws.amazon.com/iam/).

```console
Specify the AWS Region
? region:  # Your preferred region
Specify the username of the new IAM user:
? user name:  # User name for Amplify IAM user
Complete the user creation using the AWS console
```

Créez un utilisateur avec `AdministratorAccess` à votre compte pour provisionner les ressources AWS pour vous comme AppSync, Cognito etc.

![image](https://docs.amplify.aws/images/user-creation.gif)

Une fois l'utilisateur créé, Amplify CLI vous demandera de fournir le `accessKeyId` et le `secretAccessKey` pour connecter Amplify CLI avec votre utilisateur IAM nouvellement créé.

```console
Enter the access key of the newly created user:
? accessKeyId:  # YOUR_ACCESS_KEY_ID
? secretAccessKey:  # YOUR_SECRET_ACCESS_KEY
This would update/create the AWS Profile in your local machine
? Profile Name:  # (default)

Successfully set up the new user.
```

### Travailler au sein de votre projet frontend

Après avoir installé le CLI, naviguez à la racine d'un projet JavaScript, iOS ou Android, initialisez AWS Amplify dans le nouveau répertoire en exécutant `amplify init`. Après quelques questions de configuration, vous pouvez utiliser amplify help à tout moment pour voir la structure globale des commandes. Lorsque vous êtes prêt à ajouter une fonctionnalité, exécutez `amplify add <category>`.
