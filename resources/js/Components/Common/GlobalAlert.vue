<template>
  <div class="fixed left-2/4 transform text-center text-xl transition-all ease-in-out duration-500 -translate-x-2/4 z-50 rounded-xl w-4/5 lg:w-6/12 px-8 py-4 border-2" :class="toggleFeedbackStyle">
    {{ feedbackMessages.global_alert }}
  </div>    
</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {

    computed: {
      ...mapState([
        'feedbackMessages',
        'feedbackStyle'
      ]),

      toggleFeedbackStyle() {
        return this.feedbackStyle.global_alert.success
        ? 'text-green-700 bg-green-200 border-green-300 top-8'
        : this.feedbackStyle.global_alert.error
        ? 'text-red-700 bg-red-200 border-red-300 top-8'
        : '-top-16'
      }
    }
    
  }

</script>