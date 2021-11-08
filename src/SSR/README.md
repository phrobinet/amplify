# Démarrer avec le Server-Side Rendering (SSR)

Pour fonctionner correctement avec des pages rendues par le serveur, Amplify JS nécessite de légères modifications par rapport à la façon dont vous l'utiliseriez dans un environnement exclusivement client.

## Amplify

### Activation de SSR

Lorsque vous utilisez la CLI d'Amplify, le fichier **aws-exports.js** est créé et mis à jour automatiquement pour vous en fonction des ressources que vous avez ajoutées et configurées.

Pour les applications client seulement, `Amplify.configure(awsExports)` est tout ce dont vous avez besoin.

Pour activer le support SSR, fournissez également `ssr : true` :

```js
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });
```

En fournissant `ssr : true`, Amplify persiste les informations d'identification sur le client dans des cookies afin que les requêtes ultérieures au serveur y aient accès.

> **Note** : Une fois que [](https://github.com/vercel/next.js/issues/16977)vercel/next.js#16977 est résolu, vous pouvez hisser `Amplify.configure` dans **pages/\_app.js**. En attendant, assurez-vous que toutes les **pages/\*** exécutent `Amplify.configure({ ...awsExports, ssr : true })`.

### withSSRContext

Une fois qu'une application a été configurée avec `ssr : true`, les informations d'identification côté client sont transmises au serveur via des cookies.

L'utilitaire `withSSRContext` crée une instance de `Amplify` pour une seule requête (`req`) en utilisant les informations d'identification du cookie.

Pour le code côté client rendu dans le navigateur, votre page devrait continuer à utiliser les importations de haut niveau comme d'habitude :

```js
import { Amplify, API } from "aws-amplify";
import awsExports from "../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });

export default function HomePage({ posts = [] }) {
  const [posts, setPosts] = useState(posts);

  useEffect(() => {
    // 👇 Notice how the client correctly uses the top-level `API` import
    API.graphql({ query: listPosts }).then(({ data }) => setPosts(data.listPosts.items));
  }, [])

  return ( ... );
}
```

Sur le serveur, utilisez `withSSRContext({ req? : ServerRequest })` :

```js
import { Amplify, API, withSSRContext } from "aws-amplify";

export async function getServerSideProps({ req }) {
  // 👇 Notice how the server uses `API` from `withSSRContext`, instead of the top-level `API`.
  const SSR = withSSRContext({ req });
  const { data } = await SSR.API.graphql({ query: listPosts });

  return {
    props: {
      posts: data.listPosts.items,
    },
  };
}
```

Les fonctions côté serveur qui n'ont pas d'objet `req` (par exemple, `getStaticProps` et `getStaticPaths` de Next.js) doivent quand même utiliser `withSSRContext()``.

## DataStore

### Serializing

Pour Next.js, les `props` retournés par le serveur doivent être du JSON valide. Parce que `DataStore.query(Model)` renvoie _instances_ de `Model`, nous avons besoin de l'aide `serializeModel` pour le convertir en JSON à la place :

```js
import { serializeModel } from '@aws-amplify/datastore/ssr';
import { Amplify, withSSRContext } from "aws-amplify";

...

export async function getServerSideProps({ req }) {
    const SSR = withSSRContext({ req });
    const posts = await SSR.DataStore.query(Post);

    return {
        props: {
      // 👇 This converts Post instances into serialized JSON for the client
      posts: serializeModel(posts),
        },
    };
}
```

### Désérialisation

Si votre code côté client ne fait que lire les props côté serveur et n'effectue aucune mise à jour de ces modèles, alors votre code côté client n'aura pas besoin d'être modifié.

Cependant, si vous recevez des modèles du serveur et que vous avez besoin de les modifier avec `DataStore.delete(model)` ou `DataStore.save(...)`, vous aurez besoin de l'utilitaire `deserializeModel` pour les convertir à partir de JSON adapté au serveur en _instances_ de modèle :

```js
import { deserializeModel } from '@aws-amplify/datastore/ssr';
import { Amplify, withSSRContext } from "aws-amplify";

import { Post } from "../src/models";

export default function HomePage(initialData) {
    // 👇 This converts the serialized JSON back into Post instances
    const [posts, setPosts] = useState(deserializeModel(Post, initialData.posts));

    ...
}
```
