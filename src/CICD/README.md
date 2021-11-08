# Complete guide to full-stack CI/CD workflows with AWS Amplify

by Rene Brandel | on 01 JUL 2021 | in [Announcements](https://aws.amazon.com/blogs/mobile/category/post-types/announcements/ "View all posts in Announcements"), [AWS Amplify](https://aws.amazon.com/blogs/mobile/category/mobile-services/aws-amplify/ "View all posts in AWS Amplify"), [Best Practices](https://aws.amazon.com/blogs/mobile/category/post-types/best-practices/ "View all posts in Best Practices"), [Front-End Web & Mobile](https://aws.amazon.com/blogs/mobile/category/mobile-services/ "View all posts in Front-End Web & Mobile"), [Technical How-to](https://aws.amazon.com/blogs/mobile/category/post-types/technical-how-to/ "View all posts in Technical How-to"), [Top Posts](https://aws.amazon.com/blogs/mobile/category/top-posts/ "View all posts in Top Posts") | [Permalink](https://aws.amazon.com/blogs/mobile/complete-guide-to-full-stack-ci-cd-workflows-with-aws-amplify/) | [Comments](https://commenting.awsblogs.com/embed.html?disqus_shortname=aws-mobile-blog&disqus_identifier=5685&disqus_title=Complete+guide+to+full-stack+CI%2FCD+workflows+with+AWS+Amplify&disqus_url=https://aws.amazon.com/blogs/mobile/complete-guide-to-full-stack-ci-cd-workflows-with-aws-amplify/) | [Share](https://aws.amazon.com/fr/blogs/mobile/complete-guide-to-full-stack-ci-cd-workflows-with-aws-amplify/#)

Aujourd'hui, AWS Amplify a lancé de nouvelles améliorations de son flux de travail CI/CD pour les déploiements complets, notamment les déploiements conditionnels de backend, la génération automatique, au moment de la construction, de la configuration du cloud Amplify (fichier aws-exports.js) et la réutilisation facile des backends dans les applications Amplify. Ces fonctionnalités simplifient encore davantage la mise en place d'une application web complète et prête à être mise en production sur AWS.

AWS Amplify est un service entièrement géré de CI/CD et d'hébergement qui offre aux développeurs un moyen sans configuration de déployer leurs applications frontales à page unique (SPA) ou à rendu serveur (SSR) sur AWS en connectant simplement leur dépôt Git. Amplify construit, déploie et héberge automatiquement l'application web au niveau mondial sur un CDN alimenté par Amazon CloudFront. Une fois l'application web hébergée, Amplify facilite la création et la connexion à un backend d'application avec des fonctionnalités telles que l'authentification, les données en temps réel, le stockage de fichiers, l'IA/ML (et plus encore) pour construire des expériences d'application plus riches. Le flux de travail CI/CD d'Amplify est basé sur des branches de fonctionnalités, chaque branche étant composée d'un frontend et (en option) d'un backend. Les équipes de développement bénéficient ainsi d'une expérience rationalisée pour déployer le frontend (application web) et le backend ensemble dans un seul et même workflow à chaque validation de code.

_This post is written by Nikhil Swaminathan, Principal Product Manager at AWS Amplify._

## Démarrez - Déploiements frontaux sans configuration

Pour commencer, déployez votre propre application web ou utilisez l'échantillon fourni. Pour ce billet de blog, nous allons déployer un exemple de base `create-react-app` en cliquant sur le bouton ci-dessous.

[  
![Deploy to Amplify Console](https://oneclick.amplifyapp.com/button.svg)  
](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/swaminator/cra-starter)

Il vous sera demandé de connecter votre compte GitHub. Une fois connecté, Amplify va forker le dépôt d'échantillons dans votre compte et vous demander de confirmer le déploiement.

![](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-15-1-1024x487.png)

Et voilà ! Cela déclenche un pipeline CI/CD comme indiqué et dans une minute ou deux votre branche `main` devrait être hébergée dans un domaine `amplifyapp.com`.

## Créez un backend d'application avec une base de données et un point de terminaison API GraphQL.

Maintenant que notre application est hébergée, nous allons construire un backend. Naviguez vers l'onglet environnement backend et choisissez 'Get started'. Cela déclenchera un workflow pour configurer un environnement Amplify `staging` par défaut. Une fois configuré, choisissez **open Admin UI** - l'Admin UI est une interface visuelle pour créer et gérer votre backend, hébergé en dehors de la console AWS. Cela donne un accès plus facile (via email) aux développeurs et aux non-développeurs pour mettre à jour le backend Amplify.

![](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-12-1-1024x634.png)

Dans l'interface d'administration, accédez à l'onglet "Data" et créez un modèle de données. Pour cet exemple, nous allons juste créer un modèle de données de base nommé `Todo` avec un champ `description`. En cliquant sur "Enregistrer et déployer", vous créerez toutes les ressources AWS nécessaires dans le backend, comme une API AWS AppSync GraphQL pour accéder aux données et une table Amazon DynamoDB pour héberger les éléments todo. Amplify utilise CloudFormation pour déployer votre backend qui vous permet de stocker votre définition de backend en tant qu'infrastructure-as-code. En retournant à la console AWS, vous verrez le déploiement de l'environnement `staging` en cours.

![Screenshot of Admin UI data model](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-13-1024x433.png)

## Connectez votre cloud backend au frontend local

Pour vous connecter à ce backend, installez le CLI d'Amplify et exécutez `amplify pull --appId XXX --envName` staging pour tirer votre définition de backend vers le bas dans votre projet d'application. Et voilà ! Vous êtes maintenant connecté au backend de votre application. Amplify offre DataStore, une bibliothèque client qui fournit une API intuitive pour accéder et mettre à jour les données de votre base de données avec un support temps réel et hors ligne intégré. Vous pouvez . Bien que ce post n'aille pas entrer dans les détails de DataStore ([en savoir plus ici](https://aws.amazon.com/about-aws/whats-new/2019/12/introducing-amplify-datastore/)), vous pouvez vérifier le code de l'application en ouvrant le dépôt que vous avez déployé ci-dessus et en naviguant vers `src/App.js` (ou parcourir le code de l'application [ici](https://github.com/swaminator/cra-starter/blob/main/src/App.js)).

![Screenshot of Admin UI + local frontend](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/Screen-Shot-2021-06-29-at-12.22.02-PM.png)

## Connexion de la branche déployée au backend sans CI/CD (génération automatique de aws-exports.js)

Maintenant il est temps de mettre à jour notre application. Il suffit de `git push` vos changements et de regarder le déclenchement de la construction dans la console Amplify. Vous devriez observer que le build échoue avec une erreur disant `Cannot find file './aws-exports' in ./src`. Cela se produit parce que le fichier de configuration d'Amplify (`aws-exports.js`) n'est pas enregistré dans votre dépôt de sources. Le CLI d'Amplify ajoute automatiquement le fichier `aws-exports` au `.gitignore` pour éviter les conflits de fusion associés aux fichiers générés.

La nouvelle version d'Amplify corrige ce problème avec la génération automatique de la configuration Amplify au moment de la construction. Dans la console Amplify, tapez **Edit** sous la branche frontend pour vous connecter à un backend staging.

![Screenshot of Frontend and backend environments](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-5-300x166.png)

Cela ouvre une modale vous demandant de vous connecter à un backend cible. Puisque vous utilisez `staging` comme environnement sandbox pour pousser manuellement les mises à jour du backend, (soit via l'interface d'administration, soit depuis l'interface CLI en exécutant `amplify push`), décochez la case full-stack CI/CD. Décocher cette case, c'est activer le CI/CD complet, permettant à l'application de générer automatiquement la configuration Amplify au moment de la construction, tout en s'assurant qu'aucune mise à jour n'est effectuée sur votre backend au moment de la construction. Avant de cliquer sur **Save**, vous verrez des instructions sur la façon de configurer un rôle de service nécessaire à Amplify pour accéder à votre configuration backend.

![Screenshot of "Edit target backend" pop-up](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-1-2.png)

Suivez les instructions sur la façon de configurer le rôle de service. Une fois configuré dans la console IAM, retournez à la console Amplify pour utiliser ce rôle dans l'application. Allez dans _Paramètres de l'application > Général > Modifier (App settings > General > Edit)_ et choisissez le rôle de service que vous venez de créer dans la liste déroulante.

![Screenshot of "Edit App Settings: General" page](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/servicerole-300x266.png)

Déclenchez maintenant un nouveau build soit en poussant du code, soit en choisissant Redéployer cette version dans la page de détails du build. Votre build devrait maintenant passer avec succès sans faire aucune mise à jour du backend. Essayez de visiter l'application et de créer des données - vous devriez voir les données apparaître dans le navigateur ainsi que dans l'onglet Contenu de l'interface d'administration.

![Screenshot of Build Progress](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-2-1-1024x145.png)

![Screenshot of Backend Build Status](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-3-2-1024x138.png)

![Screenshot of Hosted React app](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-4-1-1024x630.png)

![Screenshot of Admin UI's data manager](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-5-2-1024x179.png)

## Configurer un flux de production

Jusqu'à présent, nous avons réussi à déployer une branche, à configurer une base de données de backend d'application, puis à connecter le backend d'application (staging) à la branche déployée (main) sans CI/CD. Je peux itérer sur ce backend en visitant l'interface d'administration pour modifier mon modèle de données, ou ajouter une nouvelle fonctionnalité comme l'authentification. Ce n'est cependant pas un flux de travail que nous voulons pour la production - imaginez ajouter manuellement un nouveau champ à votre modèle de données qui casse votre application ! Le déploiement en production devrait toujours être effectué via un pipeline CI/CD afin que vos déploiements soient sûrs et puissent être testés de manière isolée de la production. Amplify facilite la mise en place d'un flux de production.

Tout d'abord, clonez l'environnement de mise en scène et nommez-le prod. L'opération de clonage prend un certain temps, mais elle consiste essentiellement à créer un backend d'application entièrement nouveau pour vous (avec sa propre pile CloudFormation).

![Screenshot of Amplify Console's clone workflow](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-6-1-1024x380.png)

Une fois le déploiement terminé, un nouvel environnement prod apparaîtra avec sa propre base de données et son API GraphQL.

![Screenshot of Amplify Console after successful clone](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-7-1-1024x523.png)

Maintenant, configurons notre frontend de production. Créez une branche dans votre repo Git nommée prod et connectez la branche dans la console Amplify. Cette fois, ne décochez pas la case "full-stack CI/CD" et faites pointer la branche prod vers l'environnement Amplify prod - ceci donnera à Amplify la permission de déployer toutes les mises à jour du backend qu'il trouvera dans votre dossier `amplify`.

![Screenshot of "Add a repo branch"](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-8-1024x523.png)

Vous êtes maintenant prêt à gérer les déploiements de production. Pour récapituler, voici le flux de travail pour mettre de nouveaux changements en production :

1.  Ajoutez un nouveau champ à votre modèle de données dans l'environnement `staging`.
2.  Exécutez `amplify pull` pour mettre à jour la définition de votre backend dans votre projet afin que vous puissiez accéder au champ ou le mettre à jour.
3.  Poussez le code vers votre branche `main` - avec les changements de code de votre application, vous verrez également des mises à jour du dossier `amplify` avec des références au nouveau champ.
4.  Soumettez une demande d'extraction pour fusionner la branche `main` avec la branche `prod`. Passez en revue le PR avec votre équipe pour vous assurer que tout semble correct. Idéalement [ajouter des end-to-end tests](https://docs.aws.amazon.com/amplify/latest/userguide/running-tests.html).
5.  Fusionnez les changements vers `prod` - ceci déclenchera une construction Amplify CI/CD. Le nouveau champ devrait maintenant être visible dans votre modèle de données `prod`.

## Constructions conditionnelles du backend

Avec ce lancement, Amplify ajoute le support des constructions conditionnelles de backend sur toutes les branches. Cette fonctionnalité est actuellement activée par le réglage de la variable d'environnement `AMPLIFY_DIFF_BACKEND` à true. Si cette variable est définie, le système de construction CI/CD Amplify surveillera les changements de backend au moment de la construction, et ne lancera pas de construction de backend si aucun changement n'est détecté. Ceci aidera à accélérer les builds où les changements ne sont faits que sur le frontend.

![Screenshot of Amplify Console build environment variables](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-9-1024x177.png)

Pour tester cela, allez dans votre `App.js` et faites un petit changement dans votre code frontal.

![Screenshot of updated App.js file](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/conditional-1024x492.png)
Validez les changements dans votre dépôt Git pour déclencher une nouvelle construction. Vous devriez voir un journal indiquant que la construction du backend a été ignorée.

![Screenshot of skipped backend build](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-10-1024x136.png)

## Plusieurs frontaux partageant le même backend

Le lancement d'aujourd'hui facilite la réutilisation des backends sur plusieurs frontends. Les cas d'utilisation courants sont les équipes qui créent des micro-frontends, qui migrent des applications web d'une technologie à une autre ou qui travaillent dans des monodépôts. Pour tester ce flux de travail, connectez un autre dépôt pour déployer une application (sans backend). Une fois déployée, choisissez le bouton Editer comme précédemment, et choisissez un environnement backend à partir d'une autre application dans la modale qui s'affiche. Lorsque vous vous connectez à un backend dans une autre application, nous vous recommandons de ne pas activer la fonction full-stack CI/CD.

![Screenshot of Edit target backend pop-up](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2021/06/29/image-14-1-1024x436.png)

## Ressources supplémentaires

- [Amplify docs](https://docs.aws.amazon.com/amplify/latest/userguide/team-workflows-with-amplify-cli-backend-environments.html)
- [Amplify console](https://console.aws.amazon.com/amplify/home?region=us-east-1#/)
