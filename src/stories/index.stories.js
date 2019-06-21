/* eslint-disable react/react-in-jsx-scope */

import { storiesOf, addDecorator } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, number, boolean, array, select, color, date, button } from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';

import 'mapbox-gl/dist/mapbox-gl.css'
import Vue from 'vue'
import Vue2MapboxGl from '../main.js'

Vue.use(Vue2MapboxGl)

const mapTemplate = `
<v-mapbox
 map-style="mapbox://styles/mapbox/satellite-streets-v10"
 access-token="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
 style="height: 300px;"
/>
`
const navigationTemplate = `
<v-mapbox
 map-style="mapbox://styles/mapbox/satellite-streets-v10"
 access-token="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
 style="height: 300px;"
>
 <v-mapbox-navigation-control></v-mapbox-navigation-control>
</v-mapbox>
`

storiesOf('Map', module)
  .add('map', () => {
    return {
      template: mapTemplate
    }
  })
  .add('map with navigation control', () => {
    return {
      template: navigationTemplate
    }
  })
  .addDecorator(withKnobs)
  .add('map resize bug', () => {
    return {
      template: mapTemplate,
      mounted () {
        this.normal()
        setTimeout(() => {this.small}, 1000)
        setTimeout(() => {this.big}, 3000)
        setTimeout(() => {this.normal}, 4000)
        button('small', () => {
          this.small()
        })
        button('big', () => {
          this.big()
        })
        button('normal', () => {
          this.normal()
        })

      },

      methods: {
        resize() {
          this.$refs.map.map.resize()
        },
        small () {
          this.$el.style = 'height: 200px; width: 300px; border: 1px solid red;'
        },
        big () {
          this.$el.style = 'height: 800px; width: 800px; border: 1px solid red;'
        },
        normal () {
          this.$el.style = 'height: 300px; width: 600px; border: 1px solid red;'
        }
      }
    }
  })