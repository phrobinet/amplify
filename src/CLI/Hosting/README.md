# Vue d'ensemble

Déployez et hébergez votre application en utilisant soit la console Amplify, soit Amazon CloudFront/S3. La console Amplify offre un hébergement entièrement géré avec des fonctionnalités telles que l'invalidation instantanée du cache et les déploiements atomiques. Pour un meilleur contrôle de la configuration d'un CDN et des buckets d'hébergement, utilisez CloudFront et S3.

## Flux de travail

- `amplify add hosting`  
   Ceci ajoute les ressources d'hébergement au backend. La commande demandera d'abord la sélection de l'environnement, soit DEV ou PROD. Une fois terminé, le modèle CloudFormation pour les ressources est placé dans le répertoire amplify/backend/hosting.  
    

- `amplify configure hosting`  
   Cette commande parcourt les étapes pour configurer les différentes sections des ressources utilisées dans l'hébergement, notamment S3, CloudFront et publier ignorer. Voir ci-dessous pour plus de détails.  
    

- `amplify publish`  
   La commande `amplify publish` est conçue pour construire et publier à la fois le backend et le frontend d'un projet. Dans l'implémentation actuelle, la fonctionnalité de publication du frontend n'est disponible que pour un projet JavaScript pour un hébergement web statique.  
    

- `amplify remove hosting`  
   Ceci supprime les ressources d'hébergement localement depuis le backend. Lors de votre prochain `amplify push`, les ressources d'hébergement provisionnées seront retirées du cloud.  
    


## Utilisation de la console AWS Amplify

La console AWS Amplify est un service de déploiement continu et d'hébergement pour les applications Web Amplify. [En savoir plus](https://console.amplify.aws/).

La console AWS Amplify fournit un flux de travail basé sur Git pour construire, déployer et héberger votre application Web Amplify - à la fois le frontend et le backend - à partir du contrôle de la source. Une fois que vous avez connecté une branche de fonctionnalité, tous les commits de code sont automatiquement déployés vers un sous-domaine `amplifyapp.com` ou votre domaine personnalisé. [Démarrer](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html)

Voici les concepts que vous rencontrerez lorsque vous ajouterez la console Amplify comme option d'hébergement pour votre application Amplify.

### Type de déploiements

Si vous sélectionnez Amplify Console pour l'hébergement de votre application Amplify dans le flux `amplify add hosting`, il y a deux étapes que vous pouvez sélectionner dans le cadre du flux :

- **Déploiement continu** vous permet de publier les changements à chaque livraison de code en connectant vos dépôts GitHub, Bitbucket, GitLab ou AWS CodeCommit. En sélectionnant cette option, vous ouvrirez votre console AWS Amplify où vous pourrez connecter votre dépôt Git. Une fois votre dépôt connecté, exécutez `git push` pour déployer les changements à la fois sur votre backend et votre frontend en un seul flux de travail.
- **Déploiement manuel** vous permet de publier votre application web sur la console Amplify sans connecter un fournisseur Git. Si vous sélectionnez cette option, vous devrez exécuter la commande `amplify publish` chaque fois que vous voudrez voir vos changements reflétés dans le cloud.

Afin de changer de type de déploiement, vous devez exécuter la commande `amplify remove hosting` et ensuite `amplify add hosting` pour choisir votre nouveau type de déploiement préféré.

### Domaine personnalisé, redirections et autres

La commande `amplify configure hosting` pour l'option Amplify Console, ouvre l'onglet du navigateur AWS Amplify Console pour vous où vous pouvez configurer des paramètres tels que la réécriture/redirection d'URL, la protection par mot de passe, le domaine personnalisé. Ces paramètres ne sont pas répliqués ou clonés entre les environnements et vous devez les configurer sur une base par environnement.

**Note:**

La Console Amplify gère automatiquement l'invalidation du cache et aucune configuration supplémentaire ou commande/paramètre de ligne de commande n'est requise pour cela.

Si vous démarrez à partir de la page d'accueil de la Console Amplify et que vous connectez le dépôt de code de votre projet (en cliquant sur le bouton `Connect app`), l'environnement frontend est créé pour votre projet une fois le workflow terminé avec succès. Après avoir configuré l'hébergement dans la Console Amplify, vous ne pouvez pas exécuter la commande `amplify hosting add` à partir de votre installation locale du CLI Amplify. Pour désactiver l'hébergement, veuillez visiter la Console Amplify et déconnecter la branche à partir de la page `Paramètres de l'application > Général`.

Si vous hébergez une Single Page Web App (SPA) avec un routage tel que [`react-router`](https://reactrouter.com/web/guides/quick-start), vous devrez ajouter une [redirect](https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html#redirects-for-single-page-web-apps-spa) dans la console Amplify.

![SPA redirect](https://docs.amplify.aws/images/hosting/spa-redirect.png)

## Amazon S3 et Amazon Cloudfront

Le CLI d'Amplify vous offre la possibilité de gérer l'hébergement de votre site web statique en utilisant directement Amazon S3 et Amazon Cloudfront. Voici les concepts que vous rencontrerez lorsque vous ajouterez S3 et Cloudfront comme option d'hébergement pour votre application Amplify.

### Étapes

Si vous sélectionnez Amazon S3 & Amazon Cloudfront pour l'hébergement de votre application Amplify dans le flux `amplify add hosting`, il y a deux étapes que vous pouvez sélectionner dans le cadre du flux :

- DEV : Hébergement web statique S3
- PROD : S3 et CloudFront

Le provisionnement d'une distribution CloudFront à travers l'empreinte CDN globale peut prendre du temps, dans certains cas 15 minutes ou plus. C'est pourquoi l'interface CLI d'Amplify fournit une configuration DEV avec un site statique S3 uniquement lors du prototypage de votre application ; et une configuration PROD lorsque vous êtes prêt à déployer en production. Notez que dans la phase DEV utilisant S3, votre site statique n'aura pas de support HTTPS et donc **seulement recommandé pour le prototypage de votre application**.

Le service Amazon CloudFront peut également être ajouté ou supprimé dans votre projet Amplify par la suite, au-dessus de votre seau Amazon S3, en utilisant la commande `amplify hosting configure`. Notez que si le seau S3 d'hébergement est nouvellement créé dans des régions autres que us-east-1, vous pouvez obtenir l'erreur `HTTP 307 Temporary Redirect` au début lorsque vous accédez à votre application publiée via CloudFront. Cela est dû au fait que CloudFront transmet les demandes au point de terminaison S3 par défaut (s3.amazonaws.com), qui se trouve dans la région us-east-1, et qu'il peut falloir jusqu'à 24 heures pour que le nouveau nom du seau d'hébergement se propage à l'échelle mondiale.

Pour plus d'informations sur Amazon S3 et Amazon CloudFront, consultez leurs documents : [Hébergement web statique S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) [Guide DEV CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

### Invalidation du cache

Si vous sélectionnez Amazon S3 & Amazon Cloudfront pour l'hébergement de votre application Amplify dans le flux `amplify add hosting`, les artefacts de construction frontale seront téléchargés vers le seau d'hébergement S3, puis si Amazon CloudFront est activé en même temps, la commande `amplify publish` exécutée avec le drapeau `--invalidateCloudFront` ou `-c` enverra une demande d'invalidation au service Amazon CloudFront pour invalider son cache.

### Configurations avancées

La commande `amplify configure hosting` parcourt les étapes de configuration des différentes sections des ressources utilisées lors de l'hébergement via Amazon S3 & Amazon Cloudfront. Voici les options configurables disponibles :

- `Website`  
   Configure le seau S3 pour l'hébergement de sites web statiques. Vous pouvez définir les références du document d'index et du document d'erreur en configurant cette option. Les deux sont configurés pour être `index.html` par défaut.  
    

- `CloudFront`  
   Configure le réseau de diffusion de contenu (CDN) CloudFront. Vous pouvez configurer les TTL (Time To Live) pour le comportement du cache par défaut, et configurer des réponses d'erreur personnalisées.  
    

- `Publish`  
   Configure les modèles de publication ignorés (similaires à un fichier .gitignore dans votre projet basé sur git) pour la commande de publication. La commande de publication ignorera cet ensemble de répertoires et de fichiers dans le dossier de distribution qui ont des noms correspondant aux modèles.
