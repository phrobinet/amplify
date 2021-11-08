# Création du module api dans le store

Plongez dans notre magasin et créez un module appelé api.js. Dans le magasin, nous allons devoir importer quelques dépendances. 
```js
import { API } from 'aws-amplify'
import * as gqlQueries from '~/src/graphql/queries'
import * as gqlMutations from '~/src/graphql/mutations'
``` 
Il s'agit donc de toutes les requêtes et de toutes les mutations qui ont été générées pour nous lorsque nous avons créé notre API dans la dernière leçon. Ensuite, allons-y et stubons notre état et nous allons commencer par un objet vide, nous allons avoir un seul getter qui s'appellera auth mode et nous avons besoin d'accéder au rootState donc faisons : state, getters, rootState et ensuite nous pouvons utiliser ce rootState pour entrer dans notre module d'authentification pour déterminer si oui ou non un utilisateur est authentifié et si un utilisateur est authentifié nous pouvons retourner "AMAZON_COGNITO_USERR_POLLS"  s'il n'est pas authentifié nous retournerons un "API_KEY".
Plus tard, lorsque nous enverrons un appel api, nous utiliserons ce module getter d'auth pour déterminer si l'appel api doit utiliser le pool d'utilisateurs Cognito ou la clé API comme méthode d'autorisation.
```js
export const state = {}

export const getters = {
	authMode: (state, getters, rootState) => ROOTSTATE.AUTH.ISAUTHENTICATED ? 'AMAZON_COGNITO_USERR_POLLS': 'API_KEY'
}
```
We're going to have a single mutation as well so we're just going to call this "set" it's going to be a universal center, so we're going to accept in a states and we're going to accept a key value pair to "set" that "state", on a "state" we're going to set whatever key we pass in as the value we pass in. 
```js
export const mutations = {
	set( state, { key, value} ) {
		state[key] = value;
	}
}
```
Et puis pour l'instant, allons-y et emballons ce fichier avec trois actions qui vont servir d'intermédiaire pour garder les choses au sec dans notre base de code. Si nous devions répéter ces étapes pour chaque appel d'api individuel au fur et à mesure que notre api se développe, cela va devenir assez massif. Donc gardons les choses concises en ajoutant ces aides. 
```js
export const actions = {
	async get({ commit, getters }, { key, query, id }) {
		const { data } = await API.graphql({
			query: gqlSueries[query],
			variables: { id },
			authMode: getters.authMode
		})
	}
}
```
Nous en avons un qui s'appelle "get" et il prendra en compte les getters de commit et acceptera un objet de key, query et id. Nous extrayons les données de { data } en faisant notre appel api, et  en utilisant "await" puis utilisons le package api que nous avons importé de aws amplify pour exécuter api. graphql qui accepte un objet avec une requête. Nous pouvons utiliser la requête de notre gqlQueries et ensuite nous passerons dans le nom de la requête que nous voulons exécuter alors cette requête ici va être une chaîne d'un nom d'une requête dans ce fichier de requêtes graphql source donc par exemple list. Comme je l'ai noté dans la dernière leçon, vous pouvez également définir votre propre requête ici, vous n'avez pas besoin d'utiliser une des requêtes générées. Nous devrons aussi passer dans les variables l'ID du champ que nous voulons récupérer et nous devons définir le mode d'authentification à utiliser pour ce getter, donc getters.authMode.

Chaque fois qu'Amplificateur renvoie le résultat de notre appel à l'API, il renvoie reponse.data et les données réelles que nous voulons obtenir se trouvent à l'intérieur de data.quel que soit le nom de la requête que nous avons exécutée, donc ce sera le même que query ici.
Donc pour extraire cette valeur, nous pouvons faire :
```js
const value = data[query]
if(key) commit('set', { key, value })
return value
```
Nous pouvons également accepter la "key" ici et nous allons la rendre optionnelle. Si nous fournissons une "key", nous voulons sauvegarder toute valeur de résultat que nous obtenons à partir de notre appel api dans notre état VueX, donc pour faire cela, nous allons utiliser notre mutation "set" pour définir la paire clé-valeur, donc cette clé sera la clé de l'objet d'état que nous voulons muter. 

Et puis les deux autres actions que nous allons créer seront relativement similaires à notre get, donc faisons un copier-coller deux fois. Changeons la première en query et la seconde en mutate. Notre requête, au lieu d'accepter un ID, acceptera des filtres et nous pouvons également changer cela dans les variables et puisque les résultats de notre action de requête vont retourner des tableaux d'éléments, nous devons nous imbriquer un peu plus profondément dans notre requête de données pour inclure également des éléments et nous pouvons voir que si nous plongeons dans les requêtes graphql source, à chaque fois que nous faisons un appel de liste, nous avons également un tableau d'éléments dans cette liste contenant chacun des éléments, donc c'est spécifique à notre requête.api
