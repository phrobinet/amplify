# Ajout d'une API GraphQL privée et publique


Ouvrons notre terminal, nous devons utiliser le CLI d'amplify pour ajouter une api à notre projet. 
```js 
amplify add api
```
Cela va nous guider à travers un processus d'installation où nous pourrons mettre en place notre configuration. 
- Sélectionnons GraphQL,
```js
? Please select from one of the below mentioned services: (Use arrow keys)
❯ GraphQL 
  REST 
```
 - Ensuite pour le nom de l'api, *il n'autorise pas les traits d'union*.
```js
? Provide API name: amplifygraphql
```
- Pour l'autorisation par défaut de notre api, nous allons sélectionner Amazon Cognito User Pool, ce qui nous donnera la possibilité d'utiliser la directive auth dans notre schéma, et nous donnera des contrôles d'accès fins à notre api. 
```js
? Choose the default authorization type for the API 
  API key 
❯ Amazon Cognito User Pool 
  IAM 
  OpenID Connect 
```
> Avant de poursuivre, je tiens à préciser que nous allons configurer deux types d'autorisation différents pour notre projet : Cognitio User Pool & API Key, car Cognito User Pool est idéal pour les contrôles d'accès lorsqu'un utilisateur est authentifié, mais Cognito User Pool ne peut pas fonctionner avec des utilisateurs non authentifiés. Par conséquent, si nous choisissons uniquement ce type d'autorisation, notre API sera limitée aux utilisateurs authentifiés, ce qui signifie qu'il n'y a pas d'accès public. 
- Donc, allons de l'avant avec le pool d'utilisateurs Cognito comme type d'autorisation par défaut et puisque nous devons ajouter une clé d'autorisation secondaire.
```js
? Do you want to configure advanced settings for the GraphQL API 
  No, I am done. 
❯ Yes, I want to make some additional changes. 
```
- Nous voulons faire quelques changements supplémentaires ici et faisons OUI une authentification supplémentaire
```js 
? Configure additional auth types? (y/N) Y
```
-  C'est là que nous voulons sélectionner "Clé API" 
```js
? Choose the additional authorization types you want to configure for the API 
❯◉ API key
 ◯ IAM
 ◯ OpenID Connect
```
- La description de notre clé API va juste être "accès public".
```js
? Enter a description for the API key: public access
```
Maintenant, l'inconvénient d'utiliser une clé API pour notre accès public est qu'elle expire et c'est exactement ce que cette étape demande "après combien de jours cette clé doit-elle expirer ?". Donc une fois que cela se produit, nous devrons revenir ici et recréer une nouvelle clé API d'accès public pour notre api. Dans cette leçon, nous utilisons la clé d'API comme accès public, mais si vous ne voulez pas vous occuper de l'expiration, vous pouvez utiliser quelque chose comme IAM, que nous aborderons dans une prochaine leçon. Pour l'instant, nous allons simplement définir la date d'expiration maximale de 365 jours.
```js
? After how many days from now the API key should expire (1-365): 365
```
Pour la détection de conflit, il n'y a pas vraiment d'importance à ce que vous choisissez pour cette leçon, donc nous allons juste taper "YES"
```js
? Enable conflict detection? (y/N) Y
```
```js
❯ Auto Merge 
  Optimistic Concurrency 
  Custom Lambda 
  Learn More 
```
 Nous n'avons pas de schéma graphQL annoté prêt à partir, donc nous allons taper non pour cela aussi.
```js
 ? Do you have an annotated GraphQL schema? (y/N) N
```
Et oui, nous allons faire une visite guidée de la création de schéma. Pour cette leçon, nous allons créer à la fois un modèle d'utilisateur et un modèle de blog. La relation un à un ici décrit le mieux ce que nous allons faire, alors allons-y et sélectionnons-la et ensuite, oui, allons-y et éditons notre schéma.
```js
? Choose a schema template: 
  Single object with fields (e.g., “Todo” with ID, name, description) 
❯ One-to-many relationship (e.g., “Blogs” with “Posts” and “Comments”) 
  Objects with fine-grained access control (e.g., a project management app with owner-
based authorization) 
```
Voilà vous avez réussi à créer votre gaphQL API 
```js
GraphQL schema compiled successfully.
```
Et une dernière question vous pouvez répondre "Yes" qui vous demande si vous voulez éditer votre schéma maintenant
```js
? Do you want to edit the schema now? (y/N) Y
```
 Maintenant, chaque fois que votre éditeur s'ouvre, il peut ouvrir un fichier vide ici, il ne devrait pas être vide s'il l'est, allez-y et fermez ce fichier sans l'enregistrer.
Creusons dans le dossier amplify/backend/api et il devrait y avoir votre nom de projet ici, votre nom d'api ici, allez de l'avant et sélectionnez schema.graphql ici et c'est ici que vous devriez voir l'exemple de relation un-à-plusieurs blog post comment que nous avons sélectionné, donc comme vous pouvez le voir nous avons trois types différents : blog, post et commentaire. <br/>
Chacun d'entre eux contient une directive de modèle. Cette directive de modèle stipule que chacun de ces types doit avoir une table dans notre base de données et à l'intérieur de chaque type nous avons une liste de champs avec nos types. Par exemple, le premier champ dans notre modèle de blog est id de type id et le point d'exclamation qui suit ici indique que c'est un champ requis ou non nullable. <br/>
Via la directive de connexion (@connection) chaque directive de connexion contient un argument de nom il est important de savoir ici que chaque extrémité de la relation reçoit le même nom sur sa directive de connexion donc posts sur le type blog a le nom blog posts et blog sur le type posts a le nom blog posts aussi et vous avez la même chose qui se passe avec la connexion post et comment aussi. 
