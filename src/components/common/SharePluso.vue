<template>
  <div class="pluso"
       data-background="transparent"
       data-options="big,round,line,horizontal,nocounter,theme=04"
       data-services="vkontakte,odnoklassniki,facebook,twitter,google,moimir,email,print"
  ></div>
</template>

<script>
export default {
  created () {
    (function () {
      if (window.pluso) {
        if (typeof window.pluso.start === 'function') {
          return
        }
      }

      if (window.ifpluso === undefined) {
        window.ifpluso = 1
        const s = document.createElement('script')
        const g = 'getElementsByTagName'
        s.type = 'text/javascript'
        s.charset = 'UTF-8'
        s.async = true
        s.src = (window.location.protocol === 'https:' ? 'https' : 'http') + '://share.pluso.ru/pluso-like.js'
        const h = document[g]('body')[0]
        h.appendChild(s)
      }
    })()
  }
}
</script>
