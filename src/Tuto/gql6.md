
# Implementation du Profile

Ensuite, nous créons un magasin pour gérer notre profil. Si vous le souhaitez, vous pouvez également utiliser l'app store pour cela ou vous pouvez nommer ce magasin "profil", selon vos préférences. Pour ce module, nous n'aurons pas besoin d'importer de dépendances et nos mutations d'état vont commencer de manière assez typique.
```js
export const state = {
	user: null
}

export const mutations = {
	setUser(state, user) {
		state.user = user;
	}
}

export const action = {
	async getUser({ commit, dispatch }, id) {
		const user = await dispatch('api/get', { query: 'getUser', id }, { root: true })
		commit('setUser', user)
		reutrn user
	}
}
```
Ensuite, nous allons devoir créer trois actions, exportons des actions const. Tout d'abord, nous devons être en mesure d'obtenir l'utilisateur, donc faisons async getUser et acceptons commit et dispatch pour cela, puis nous passerons un ID pour obtenir l'utilisateur. Et pour cela nous pouvons utiliser notre action api get pour communiquer avec notre api, donc faisons expert const user equals await dispatch api get et ensuite la requête que nous allons exécuter s'appelle get user et nous devrons passer l'Id comme Id pour cela et ensuite puisque nous utilisons le pattern module nous devrons dire à VueX d'exécuter ceci à travers tous les modules donc root true et enfin commit set user quel que soit l'utilisateur que nous obtenons en retour et retournons l'utilisateur également.

Nous allons créer un utilisateur et nous allons partir sur la même base sauf que la variable "id" laissera sa place a "input":
```js
async createUser({ commit, dispatch }, input){
	const user = await dispatch('api/mutate', { mutation: 'createUser', input }, { root: true})
	commit('setUser', user)
	return user
}
```
Enfin, nous voulons créer une action pour trouver ou créer un profil d'utilisateur, donc faisons finder create , cela nécessitera "dispatch" et ensuite cela acceptera "attributes" et "username" dans un objet, donc tout d'abord essayons de trouver l'utilisateur en créant une variable "user" equals await dispatch et nous allons utiliser notre action getUser à partir de ce module et nous allons passer dans le nom d'utilisateur comme l'id, parce que dans ce projet la façon dont nous l'avons configuré notre profil userId va également être le même que nos utilisateurs authentifiés / nom d'utilisateur. Si nous trouvons un utilisateur nous le retournons.
Sinon, nous devons créer l'utilisateur, donc retournons la distribution createUser et cet id sera le nom d'utilisateur, l'email sera l'attribut.email et nous passons aussi un createdAt la date du jour.
```js
async findOrCreateUser({ dispatch }, { attributes, username }) {
	const user = await dispatch('getUser', username)
	if(user) return user
return dispatch('createUser, {
	id: username,
	email: attributes.email
	createAt: Date.now()
})
}
```

Maintenant, nous allons accrocher cette action finder createUser dans notre flux d'authentification pour trouver ou créer un profil utilisateur chaque fois qu'un utilisateur se connecte. 
Allons-y et plongeons dans notre magasin d'authentification, trouvons "login" juste en dessous du commit ajoutons quelques lignes et faisons await dispatch user/findOrCreateUser passons l'utilisateur que nous avons récupéré de notre appel signin et disons à VueX de l'exécuter à partir de la racine true.
```js
await dipatch('user/findOrCreateUser', user, { root: true })
```

Nous pouvons aussi ajouter dans la fonction "load" afin de récupérer les informations de notre utilisateur s'il est authentifié.
```js
if(user) {
	await dispatch('user/getUser', user.username, { root: true })
}
```
A ce stade, nous sommes prêts à partir et à vérifier que tout fonctionne bien. Nous devrions être en mesure d'enregistrer un nouvel utilisateur et après l'enregistrement, nous devrions avoir un profil créé.
