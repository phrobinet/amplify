# Appliquer des balises aux ressources générées

Les balises sont des étiquettes composées de paires clé-valeur qui facilitent la gestion, la recherche et le filtrage des ressources. Voici quelques cas d'utilisation populaires :

- Organisation des ressources
- Répartition des coûts
- Soutien aux opérations
- le contrôle d'accès
- Gestion des risques de sécurité

Vous pouvez en savoir plus sur le fonctionnement des balises [ici](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html), ainsi que sur les meilleures pratiques en matière de balisage [ici](https://d1.awsstatic.com/whitepapers/aws-tagging-best-practices.pdf).

## Configurer les balises dans un nouveau projet

En exécutant `amplify init`, un fichier `tags.json` est automatiquement généré dans le répertoire `amplify/backend/`, contenant des balises prédéfinies.

La structure du fichier est la suivante :

```json
[
  {
    "Key": "user:Stack",
    "Value": "{project-env}"
  },
  {
    "Key": "user:Application",
    "Value": "{project-name}"
  }
]
```

**Note:** For projects created before CLI version 4.28.0. Creating a `tags.json` file under `amplify/backend/` directory with the desired tags will ensure tags being applied to existing resources after invoking `amplify push`.

## Utilisation de variables prédéfinies

Il existe des balises prédéfinies qui vous permettent d'être plus spécifique avec les informations sur le projet en cours, tout en vous donnant la possibilité de structurer les balises selon ce qui vous convient.

Les 2 balises prédéfinies sont les suivantes :

- {project-env} - Se réfère à l'environnement du projet (par exemple, prod, env, etc.)
- {project-name} - Se réfère au nom du projet actuel (par exemple, mytestproject)

Il existe de nombreux cas différents dans lesquels ces variables de balises peuvent être utilisées. Voici un exemple de la façon dont elles peuvent être utilisées ensemble et ce que serait la sortie :

```json
[
  {
    "Key": "myawesomekey",
    "Value": "myvalue-{project-name}-{project-env}"
  }
]
```

Lorsqu'on les pousse, les ressources se transforment en.. :

```json
[
  {
    "Key": "myawesomekey",
    "Value": "myvalue-myamplifyproject-dev"
  }
]
```

Les valeurs des balises ne sont pas obligatoires, elles peuvent donc être vides.

```json
[
  {
    "Key": "MY_TAG_KEY",
    "Value": ""
  }
]
```

## Ajouter et mettre à jour des balises

Vous pouvez mettre à jour ou ajouter des balises supplémentaires dans le fichier `tags.json` situé dans le dossier `amplify/backend/` en éditant le fichier lui-même. Le fichier doit être au format JSON et doit suivre cette structure :

```json
[
	{
		"Key": “MY_TAG_KEY”,
		"Value": “MY_TAG_VALUE"
	}
]
```

Pour mettre à jour les ressources AWS de votre projet Amplify, exécutez simplement `amplify push`.

## Restrictions

- Vous pouvez ajouter jusqu'à 50 balises dans le fichier `amplify/backend/tags.json`.
- Les clés et les valeurs des balises sont sensibles à la casse.
- Les doublons de clés de balises ne sont pas autorisés.

Pour plus d'informations sur les limites et les restrictions des conventions de balisage, veuillez consulter [ce lien](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html).
