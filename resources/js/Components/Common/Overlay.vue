<template>
    <div :class="toggleOverlay" class="fixed z-20 left-0 top-0 w-full h-full bg-black md:bg-white bg-opacity-75 md:bg-opacity-75 overflow-hidden overscroll-contain"></div>
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
