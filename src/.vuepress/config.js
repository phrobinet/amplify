const { description } = require('../../package')
const { config } = require("vuepress-theme-hope")

module.exports = config({
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Vuepress Docs Boilerplate',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,


  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/phrobinet/amplify',
    editLinks: false,
    hostname: 'https://compassionate-kirch-19ae89.netlify.app/',
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Amplify CLI',
        link: '/cli/',
      },
      {
        text: 'Amplify Library',
        link: '/Library/'
      },
      {
        text: 'Amplify UI Components',
        link: '/UIComponents/'
      },
      {
        text: 'Amplify Guide',
        link: '/guide/'
      },
      {
        taxt: 'Tuto Amplify pour NuxtJS',
        link: '/Tuto/'
      }
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
})
