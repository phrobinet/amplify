# Chatbot

Un moyen simple d'ajouter une interface utilisateur conversationnelle à votre application est d'utiliser notre composant ChatBot.

ChatBot rend automatiquement une interface complète de messagerie instantanée qui peut être utilisée telle quelle ou être personnalisée en utilisant le support thématique.

## Installation

```js
yarn add aws-amplify @aws-amplify/ui-vue
```

## Utilisation

_main.js_

```js
import Vue from "vue";
import App from "./App.vue";
import "@aws-amplify/ui-vue";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

_App.vue_

```Html
<template>
  <amplify-chatbot
    bot-name="yourBotName"
    bot-title="My ChatBot"
    welcome-message="Hello, how can I help you?"
  />
</template>
```

## Propriétés

`amplify-chatbot` fournit les propriétés suivantes pour configurer le composant.

|  botName    |                       |
| ----------- | --------------------- |
| Attribut    |  bot-name             |
| Description |  Nom du robot         |
| Type        |  chaîne de caractères |

|  botTitle           |                                       |
| ------------------- | ------------------------------------- |
| Attribut            |  bot-title                            |
| Description         |  Texte placé dans l'en-tête supérieur |
| Type                |  chaîne de caractères                 |
| Valeur par défaut : |  Translations.CHATBOT_TITLE           |

|  clearOnComplete    |                                                           |
| ------------------- | --------------------------------------------------------- |
| Attribut            |  clear-on-complete                                        |
| Description         |  Efface les messages lorsque la conversation est terminée |
| Type                |  booléen                                                  |
| Valeur par défaut : |  false                                                    |

|  conversationModeOn |                                                                            |
| ------------------- | -------------------------------------------------------------------------- |
| Attribut            |  conversation-mode-on                                                      |
| Description         |  Continuer à écouter les utilisateurs après qu'ils aient envoyé le message |
| Type                |  booléen                                                                   |
| Valeur par défaut : |  false                                                                     |

|  silenceThreshold |                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------- |
| Attribut          |  silence-seuil                                                                            |
| Description       |  Seuil de bruit entre -1 et 1. Tout ce qui est en dessous est considéré comme un silence. |
| Type              |  nombre                                                                                   |
| Défaut            |  0.2                                                                                      |

|  silenceTime      |                                       |
| ----------------- | ------------------------------------- |
| Attribut          |  silence-time                         |
| Description       |  Durée du silence (en ms) à attendre. |
| Type              |  nombre                               |
| Valeur par défaut |  1500                                 |

|  textEnabled |                                        |
| ------------ | -------------------------------------- |
| Attribut     |  text-enabled                          |
| Description  |  Indique si le chat textuel est activé |
| Type         |  booléen                               |
| Par défaut,  |  true                                  |

|  voiceEnabled       |                                       |
| ------------------- | ------------------------------------- |
| Attribut            |  voice-enabled                        |
| Description         |  Indique si le chat vocal est activé. |
| Type                |  booléen                              |
| Valeur par défaut : |  false                                |

|  welcomeMessage |                                             |
| --------------- | ------------------------------------------- |
| Attribut        |  welcome-message                            |
| Description     |  Message d'accueil affiché aux utilisateurs |
| Type            |  chaîne de caractères                       |

## Cas d'utilisation

### Configuration du chat vocal

Pour que la saisie vocale fonctionne avec Amazon Lex, vous devrez peut-être activer la voix de sortie dans la console de gestion AWS (https://console.aws.amazon.com/console/home). Sous le service Amazon Lex, cliquez sur votre chatbot Lex configuré et allez dans Paramètres -> Général et choisissez la voix de sortie souhaitée.

### Écoute de l'exécution de la conversation

Une fois qu'une session de conversation est terminée, `amplify-chatbot` émet un événement personnalisé `chatCompleted` que votre application peut écouter :

```html
<script>
  const handleChatComplete = (event) => {
    const { data, err } = event.detail;
    if (data) alert("success!\n" + JSON.stringify(data));
    if (err) alert(err);
  };

  export default {
    name: "App",
    mounted() {
      const chatbotElement = this.$el.querySelector("amplify-chatbot");
      chatbotElement.addEventListener("chatCompleted", handleChatComplete);
    },
    beforeDestroy() {
      const chatbotElement = this.$el.querySelector("amplify-chatbot");
      chatbotElement.removeEventListener("chatCompleted", handleChatComplete);
    },
  };
</script>
```

## Propriétés CSS personnalisées

`amplify-chatbot` fournit les [propriétés css](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) suivantes pour modifier le style au niveau du composant.

|  Nom                                             |  Description                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------- |
|  `--bot-background-color`                        |  Couleur de fond des messages du robot                                    |
|  `--bot-dot-color` (Couleur des points du robot) |  Couleur de base de l'animation des messages de chargement du bot         |
|  `--bot-text-color`                              |  Couleur du texte des messages du robot                                   |
|  `--header-color`                                |  Couleur du texte de l'en-tête                                            |
|  `--header-size`                                 |  Taille du texte dans l'en-tête                                           |
|  `--height`                                      |  Hauteur du conteneur                                                     |
|  `--user-background-color`                       |  Couleur de fond des messages de l'utilisateur                            |
|  `--user-dot-color`                              |  Couleur de base de l'animation du message de chargement de l'utilisateur |
|  `--user-text-color`                             |  Couleur du texte des messages de l'utilisateur                           |
|  `--width`                                       |  Largeur du conteneur                                                     |

## Emplacements

`amplify-chatbot` fournit les slots suivants, basés sur l'élément [Web Components slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).

| Nom      |  Description                    |
| -------- | ------------------------------- |
| `header` |  Contenu du titre placé en haut |

```css
amplify-chatbot {
  --width: 30rem;
  --height: 40rem;
}
```

## Migration

Pour migrer de l'ancien composant chatbot vers le dernier composant chatbot, suivez les étapes ci-dessous :

### Installation

```diff
- yarn add aws-amplify-vue
+ yarn add @aws-amplify/ui-vue
```

### Utilisation

_main.js_

```diff
import Vue from 'vue';
import App from "./App.vue";
- import Amplify, * as AmplifyModules from 'aws-amplify'
- import { AmplifyPlugin } from 'aws-amplify-vue'
+ import '@aws-amplify/ui-vue';
+ import Amplify from 'aws-amplify';
+ import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

new Vue({
  render: h => h(App),
}).$mount('#app');
```
