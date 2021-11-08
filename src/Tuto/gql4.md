# Créer ses propres requêtes

Nous avons donc maintenant un nouveau fichier qui répertorie toutes les types, queries, subscriptions, ...

Il convient également de noter que vous n'avez pas nécessairement besoin d'utiliser ces abonnements ou mutations de requêtes. Vous pouvez créer les vôtres en fonction de vos besoins. Ainsi, si vous n'avez pas nécessairement besoin de beaucoup d'informations, vous pouvez exclure ces informations et créer la requête vous-même.
Ainsi, disons que nous voulons avoir un type de préférences qui contient un thème et d'autres préférences
```graphql
type Preferences {
	theme: String
}
```
Nous pourrions utiliser ce type de préférences à l'intérieur de notre modèle d'utilisateur en définissant les préférences et le type de "Preference" dans notre modèle d'utilisateur en définissant les préférences et le champ sera un objet de type préférences. 
```graphql
type User {
preferences: Preferences
}
```
