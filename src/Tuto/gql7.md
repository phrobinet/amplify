

Avant de passer aux changements d'authentification, nous utiliserons plus tard notre ID utilisateur pour vérifier les privilèges. Prenons un moment pour étendre notre classe d'aide à l'authentification avec un getter id. Allez dans plugins/auth.js et juste ici faisons un getter ID si nous n'avons pas d'utilisateur retournons simplement pour éviter une erreur sinon retournons ceci user.username et allez-y et sauvegardez le tout.
```js
get id(){
	if(!this.user) return
	return this.user.username
}
```

Maintenant que les bits d'authentification sont réglés, nous pouvons passer à la configuration et à la gestion de nos messages.

Pour commencer, développons le magasin d'api que nous avons créé plus tôt, donc allons dans store/api et avant tout, mettons nos données d'état par défaut. 
```js
export const state = {
	posts: [],
	post: null
}
``` 
Passons aux actions CRUD de nos posts, pour commencer avec "listPost". Pour commencer, faisons async listPost et ensuite utilisons dispatch retournons cette requête dispatch de nos helpers nous allons passer dans une clé de posts et nous voulons exécuter la requête listPosts et grâce à nos helpers c'est tout ce dont nous avons besoin pour listPosts
```js
async listPosts({ dispatch }) {
	return dispatch('query', { key: 'post', query: 'listPosts' })
}
```

Donc, pour la plupart, le reste sera le même type de structure.
```js
async getPost({ dispatch }, id) {
	return dispatch('get', { key: 'post', query: 'getPost', id })
}
```
And that will accept in an id and all will run get instead of query and that will alter  post within our state instead of posts and then we'll run getPost query on that one and then we need to pass the id in as well.
```js
async createPost({ dispatch }, input) {
	return dispatch('mutate', { key: 'post', mutation: 'createPost', input })
}
```
Pour la deuxième copie nous devons changer le formulaire listPost en createPost et cela acceptera une entrée et ensuite ces trois là vont exécuter mutate au lieu de query ceci en bas et le changement clé pour poster le query change en createPost.
Et pour les deux dernières actions, nous allons resté sur le même shéma
```js
async updatePost({ dispatch }, input) {
	return dispatch('mutate', { key: 'post', mutation: 'updatePost', input })
}

async deletePost({ dispatch }, id) {
	return dispatch('mutate', { mutation: 'deletePost', input: {id} })
}
```
Et cela devrait suffire pour notre action CRUD post, alors allons-y et sauvegardons-la. Nous avons maintenant tout ce dont nous avons besoin pour communiquer avec notre API pour les applications.
