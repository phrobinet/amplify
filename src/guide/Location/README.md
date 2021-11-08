# Accéder au service de localisation d'Amazon

[](https://aws.amazon.com/location/)Amazon Location Service est un nouveau service de géolocalisation qui vous permet d'ajouter des informations de localisation à vos applications. Avec Amazon Location Service, vous pouvez créer des applications qui fournissent des cartes et des points d'intérêt. Vous pouvez également suivre des ressources, déclencher des actions en fonction de l'emplacement et convertir des adresses de rue en coordonnées géographiques.

Ce tutoriel explique comment configurer votre application pour utiliser Amazon Location Service. Pour en savoir plus sur ce service, consultez le Guide du développeur Amazon Location Service (https://docs.aws.amazon.com/location/latest/developerguide/).

## Vue d'ensemble

Dans ce tutoriel, nous allons effectuer les opérations suivantes :

- Créer une nouvelle application React qui servira de base à ce tutoriel.
- Utiliser le package AWS SDK JavaScript v2 pour les appels du SDK Amazon Location Service.
- Mettre en place une configuration de base pour Amplify avec authentification.
- Connectez votre application React au service de localisation d'Amazon.
- Utilisez les API du service de localisation d'Amazon pour rechercher des lieux.

### Création d'une nouvelle application React

Tout d'abord, nous allons créer et démarrer une nouvelle application React avec [](https://reactjs.org/docs/create-a-new-react-app.html)create-react-app, un outil CLI utilisé pour amorcer une application React en utilisant les meilleures pratiques actuelles. Nous allons ensuite ajouter Amplify et initialiser un nouveau projet. La procédure suivante vous guidera tout au long de ce processus.

**Pour créer une nouvelle application React**.

1.  Depuis votre répertoire de projets, exécutez les commandes suivantes :

```bash
npx create-react-app amazon-location-service-places
cd amazon-location-service-places
```

Cela crée une nouvelle application React dans un répertoire appelé `amazon-location-service-places` et se déplace dans ce nouveau répertoire.

2.  Maintenant que vous êtes dans le répertoire racine du projet, exécutez l'app avec la commande `npm start`. Cette commande exécute également un serveur de développement pour que vous puissiez voir la sortie générée par la construction en naviguant sur `http://localhost:3000`.

Vous avez maintenant créé et lancé avec succès votre nouvelle application React.

## Installation des dépendances du SDK

La première étape pour utiliser les SDKs dans le client est d'installer les dépendances nécessaires avec la commande suivante :

```bash
npm install aws-sdk aws-amplify
```

## Ajouter l'authentification

La prochaine fonctionnalité que vous allez ajouter à votre application React est l'authentification. Le Framework Amplify utilise [](https://aws.amazon.com/cognito/)Amazon Cognito comme principal fournisseur d'authentification. Amazon Cognito est un service d'annuaire d'utilisateurs robuste qui gère l'enregistrement des utilisateurs, l'authentification, la récupération des comptes et d'autres opérations.

Dans la procédure suivante, vous ajouterez l'authentification à votre application React en utilisant Amazon Cognito et en prenant en charge les connexions par nom d'utilisateur/mot de passe.

**Pour ajouter l'authentification à votre application React\***.

1.  Depuis votre répertoire de projets, exécutez la commande suivante et répondez aux questions posées comme indiqué.

```bash
amplify add auth

? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings?  No, I am done.
```

2.  Déployez le service en exécutant la commande `amplify push`.

## Connexion de votre application React au service de localisation d'Amazon

Dans la procédure suivante, vous allez connecter votre application React aux API du service de localisation d'Amazon.

\*\*Pour connecter votre application React au service de localisation Amazon (Amazon Location Service)

Ouvrez votre fichier `src/App.js`, et appelez la fonction suivante pour initialiser le client Amazon Location Service :

```javascript
import Amplify, { Auth } from "aws-amplify";
import Location from "aws-sdk/clients/location";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const createClient = async () => {
  const credentials = await Auth.currentCredentials();
  const client = new Location({
    credentials,
    region: awsconfig.aws_project_region,
  });
  return client;
};
```

Vous avez maintenant connecté avec succès votre application React au service de localisation d'Amazon.

## Utilisation des API d'Amazon Location Service

Afin d'accéder aux API d'Amazon Location Service, vous devez créer des ressources. Vous pouvez créer des ressources à l'aide de la console [](http://console.aws.amazon.com/location/home)Amazon Location Service ou de l'interface de ligne de commande (CLI) AWS [](https://aws.amazon.com/cli/). Une fois que vous avez créé les ressources, vous pouvez utiliser ces ressources en appelant les API.

Cette section vous propose un exemple d'utilisation des API d'Amazon Location Service. Dans cet exemple, nous allons d'abord créer un index de lieux dans la console Amazon Location Service et utiliser les API pour rechercher des lieux.

### Création d'un nouvel index de lieux

1.  Ouvrez la console [](https://console.aws.amazon.com/location/places/home#/create)Amazon Location Service pour créer un index de lieux.
2.  Entrez **MyPlaceIndex** dans **Name**.
3.  Appuyez sur **Créer un index de lieu**.

![Amazon Location Service - Créer un index de lieu](https://docs.amplify.aws/images/als/create-place-index.png)

4.  Notez le nom de ressource Amazon (ARN) de votre index de lieu. Il commencera par **arn:aws:geo** comme dans la capture d'écran ci-dessous.

![Amazon Location Service - Place index](https://docs.amplify.aws/images/als/my-place-index.png)

### Autoriser les utilisateurs invités à accéder à l'index des lieux

Maintenant que vous avez créé une ressource Index des lieux, vous devez créer une politique en ligne pour permettre aux utilisateurs de votre application d'accéder à la ressource :

1.  Naviguez à la racine de votre projet et exécutez la commande suivante :

```bash
amplify console auth
```

1.  Sélectionnez `Identity Pool` pour Which console ? lorsque vous y êtes invité.
2.  Vous serez dirigé vers la console Amazon Cognito. Cliquez sur `Editer` le pool d'identité dans le coin supérieur droit de la page.
3.  Ouvrez le menu déroulant pour les "identités non authentifiées", choisissez "Activer" l'accès aux identités non authentifiées, puis appuyez sur "Enregistrer" les modifications.
4.  Cliquez sur `Editer` le pool d'identité une fois de plus. Notez le nom du rôle `Unauthenticated`. Par exemple, `amplify-<nom_du_projet>-<nom_du_env>-<id>-unauthRole`.
5.  Ouvrez la console [](https://console.aws.amazon.com/iam/home#/roles)AWS Identity and Access Management (IAM) pour gérer les rôles.
6.  Dans le champ _Recherche_, saisissez le nom de votre rôle non authentifié noté ci-dessus et cliquez dessus.
7.  Cliquez sur _+Add inline policy_, puis cliquez sur l'onglet _JSON_.
8.  Remplissez l'espace réservé _[ARN]_ avec l'ARN de votre index de lieu que vous avez noté ci-dessus et remplacez le contenu de la politique par ce qui suit.

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "geo:SearchPlaceIndexForText",
            "Resource": "[ARN]"
        }
    ]
}
```

10. Cliquez sur le bouton "Review policy".
11. Dans le champ Nom, entrez `LocationTracker`.
12. Cliquez sur le bouton Créer la politique. Vous avez maintenant ajouté avec succès l'authentification à votre application React.

### Recherche de lieux

Le code suivant explique comment utiliser les API Amazon Location Service pour rechercher des lieux à l'aide de l'index des lieux que vous venez de créer :

```javascript
const params = {
  IndexName: "MyPlaceIndex",
  Text: "Indianapolis",
};
client.searchPlaceIndexForText(params, (err, data) => {
  if (err) console.error(err);
  if (data) console.log(data);
});
```
