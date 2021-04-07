<template>
    <div :class="toggleOverlay" class="fixed z-50 left-0 top-0 w-full h-full bg-white bg-opacity-75 overflow-hidden"></div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {    
        
        computed: {
            ...mapState([
                'overlay'
            ]),

            toggleOverlay() {
                return this.overlay ? 'block' : 'hidden'
            }
        }
    }

</script>
