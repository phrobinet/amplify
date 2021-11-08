
# Nos modèles
Nous allons donc avoir deux modèles différents, un utilisateur et un message, et nous allons commencer par définir nos modèles avant d'aborder la partie contrôle d'accès. Commençons par notre utilisateur 
```graphql
type User @model {
	id: ID!
	email: String!
	name: String
	biography: String
	website: String
	posts: [Post] @connection(name: "UserPosts", keyField: "authorID")
}
```
Jusqu'à présent, rien ne semble trop différent de notre exemple, allons-y et ajoutons également le champ createdAt. Maintenant, graphql n'a pas nativement de type date ou dateTime, donc pour ceux-ci, nous utiliserons simplement un type de chaîne et nous le rendrons obligatoire et nous le passerons comme un timestamp. 

Cela devrait faire l'affaire pour notre utilisateur, allons-y et passons à notre post.
```graphql
type Post @model {
	id: ID!
	title: String!
	summary: String!
	body: String!
	createAt: String!
	authorId: String!
	author: User! @connection(name: "UserPosts", keyField: "authorID")
}
```
Pour les champs d'auteur maintenant pour notre post puisque nous sauvegardons notre userID comme authorID pour notre relation et non userID nous avons besoin d'un moyen d'indiquer à amplify comment mettre en commun les données de l'utilisateur pour notre champ d'auteur, pour ce faire nous allons étendre notre directive de connexion avec un deuxième argument de champ clé .
Ainsi nous utilisons l'ID qui est avec un authorID pour tirer l'utilisateur par l'id de la valeur authorID pour remplir notre champ auteur maintenant il est également important de noter ici que keyField doit être défini sur les deux extrémités de la relation. Nous devons donc faire la même chose pour notre modèle d'utilisateur.

### Auth rules sur User

Passons maintenant à nos contrôles d'accès commençons par notre utilisateur déposons ce modèle sur une ligne et ajoutons la directive auth maintenant la directive auth accepte un tableau de règles c'est dans ce tableau que nous allons définir nos règles d'autorisation pour le modèle User.

Donc nous autorisons les propriétaires à mettre à jour et à supprimer les enregistrements qu'ils possèdent. 
```graphql
@auth(
	rules: [
		{ allow: owner, operations: [update, delete] }
	]
)
```
Et maintenant, nous pouvons également ajouter "create" afin de permettre à n'importe quel utilisateur authentifié de créer un enregistrement puisque vous ne pouvez pas posséder un enregistrement avant de le créer, ajouter "create" ici permet cela pour n'importe quel utilisateur authentifié. 
Maintenant, par défaut, Ampli ajoutera un champ propriétaire à notre modèle si nous ne le définissons pas explicitement, et ce champ est de type String. Cependant, pour nous, notre modèle d'utilisateur utilisera la même valeur d'ID que notre utilisateur actuellement authentifié au moment où l'enregistrement est créé, c'est ainsi que nous allons lier notre Cognito User Pool à notre utilisateur de base de données, leurs deux ID seront les mêmes. Et c'est grâce à cela que notre propriétaire peut être défini en tant qu'ID d'enregistrement. Pour cela, ajoutons ownerField pour définir le champ dont nous allons extraire l'ID du propriétaire.
```graphql
ownerField : "id"
```
Ensuite, passons à l'accès administratif. Nous voulons pouvoir donner à nos administrateurs la possibilité de faire ce qu'ils veulent et nous allons le faire en utilisant des groupes que vous pouvez créer et assigner à des groupes dans appsync. 
```graphql
{ allow: groups, groups: ["admin"], operations: [create, update, delete]}
```
Ensuite, passons à l'accès administratif. Nous voulons pouvoir donner à nos administrateurs la possibilité de faire ce qu'ils veulent et nous allons le faire en utilisant des groupes que vous pouvez créer et assigner à des groupes dans appsync. 

Nous allons donc permettre à tout utilisateur ayant le groupe admin défini dans appsync de créer, mettre à jour ou supprimer tout enregistrement dans le modèle utilisateur. Mais que se passe-t-il si un utilisateur ne correspond pas à l'un de ces deux critères ? Jusqu'à présent, il ne pourrait rien faire sur notre api à moins d'être authentifié, auquel cas il pourrait créer un utilisateur, mais ce serait tout. Nous devons donc continuer en permettant aux utilisateurs authentifiés de lire n'importe quel enregistrement dans notre modèle utilisateur. Sinon, il n'y a pas de permission de lecture définie du tout. 
Donc, il faut :
```graphql
{ allow: private, operations: [read] }
```
Enfin, que se passe-t-il si notre utilisateur n'est pas authentifié ? Ces trois éléments nécessitent que l'utilisateur soit authentifié, donc si un utilisateur n'est pas authentifié, il ne pourra rien faire sur notre site. Donc allons-y et autorisons l'accès public à notre API.
```graphql
{ allow: public, operations: [read] } 
```
Enfin, que se passe-t-il si notre utilisateur n'est pas authentifié ? Ces trois éléments nécessitent que l'utilisateur soit authentifié, donc si un utilisateur n'est pas authentifié, il ne pourra rien faire sur notre site. Donc allons-y et autorisons l'accès public à notre API.
Ainsi, dès qu'il s'agit de spécifier le type d'autorisation, notre appel à l'api doit utiliser nos groupes de propriétaires et nos règles privées, qui traitent tous des utilisateurs authentifiés. Ils peuvent donc tous utiliser le type d'autorisation Cognito User Pool, mais comme Cognito User Pool gère les contrôles d'accès des utilisateurs authentifiés, notre accès public devra utiliser le type d'autorisation secondaire de la clé api que nous avons configurée.

### Le code entier

```graphql
type User
	@model
	@auth(
		rules: [
			{ allow: owner, ownerField: "id", operations: [ create, update, delete ] }
			{ allow: groups, groups: ["admin"], operations: [ create, update, delete] }
			{ allow: private, operations: [read] }
			{ allow: public, operations: [read]}
		]
	){
	id: ID!
	email: String!
	name: String
	biographqy: String
	website: String
	createdAt: String!
	posts: [Post] @connection(name: "UserPosts", keyField: "authorId")
	}
```
