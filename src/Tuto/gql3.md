# Auth Rules sur Posts

Déplaçons-nous vers le bas pour postuler, et décomposons à nouveau notre modèle sur sa propre ligne.

```graphql
@auth(
	rules: [
	{ allow: owner, operations: [create, update, delete] }
	]
)
```
Puisque l'identifiant de notre utilisateur était l'identifiant de l'utilisateur authentifié, ce ne sera pas le cas pour notre message, mais nous allons stocker cela sur une base par enregistrement dans l'identifiant de l'auteur, de sorte que nous puissions tirer la relation d'auteur de l'utilisateur. Ainsi, quand il s'agit de spécifier comment tirer le propriétaire, au lieu d'utiliser un champ de propriétaire, nous pouvons utiliser notre identifiant d'auteur: 
```graphql
@auth(
	rules: [
	{ allow: owner,ownerField: "authorId" operations: [create, update, delete] }
	]
)
``` 
Ensuite, croyez-le ou non, les trois autres seront exactement les mêmes que ceux de l'utilisateur. 
```graphql
@auth(
	rules: [
		{ allow: owner,ownerField: "authorId" operations: [create, update, delete] }
		{ allow: groups, groups: ["admin"], operations: [ create, update, delete] }
	{ allow: private, operations: [read] }
	{ allow: public, operations: [read]}
	]
)
```

Voilà nous avons fini de configurer notre fichier schema.graphql. Maitenant, on va retourner sur notre terminal et on va entrer:
```js
amplify push
```
Un affichage de nos différentes ressources vont apparaitre, à la question suivante nous allons répondre "Yes"
```js
? Are you sure you want to continue? (Y/n) y
```
"Yes" aussi à la question suivante:
```js
? Do you want to generate code for your newly created GraphQL API (Y/n) y
```
Nous allons resté sur du javascript:
```js
? Choose the code generation language target (Use arrow keys)
❯ javascript 
  typescript 
  flow 
``` 
 Nous allons garder les paramètres par default pour le fichier:
```js
 ? Enter the file name pattern of graphql queries, mutations and subscriptions (src/graphql/**/*.js) 
```
Puis  à la question suivante: 
```js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions (Y/n) y
```
Et enfin on garde aussi la valeur par default 
```js
? Enter maximum statement depth [increase from default if your schema is deeply nested] (2) 
``` 
