<template>
  <div class="fixed left-2/4 transform text-center text-xl transition-top ease-in-out duration-500 top-1 -translate-x-2/4 z-50 rounded-xl w-4/5 lg:w-6/12" v-bind:class="{ 'text-green-700 bg-green-200 border-2 border-green-300 px-8 py-4 top-8': feedbackStyle.global_alert.success, 'text-red-700 bg-red-200 border-2 border-red-300 px-8 py-4 top-8': feedbackStyle.global_alert.error }">
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
      ])
    }
    
  }

</script>