import { defineClientConfig } from 'vuepress/client'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export default defineClientConfig({
  setup() {
    const route = useRoute()

    function updateVersionLabel() {
      const path = route.path
      let label = 'v1.1.2'
      if (path.startsWith('/v1.1.3')) {
        label = 'v1.1.3'
      }

      document.querySelectorAll('.vp-navbar-dropdown-wrapper').forEach(wrapper => {
        const hasVersionLinks = wrapper.querySelector('.vp-navbar-dropdown-item a[href*="/v1.1."]')
        if (hasVersionLinks) {
          const title = wrapper.querySelector('.vp-navbar-dropdown-title')
          if (title && title.textContent !== label) {
            title.textContent = label
          }
        }
      })
    }

    onMounted(() => nextTick(updateVersionLabel))
    watch(() => route.path, () => nextTick(updateVersionLabel))
  },
})
