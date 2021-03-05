<template>
    <div id="globalLayoutCover">
        <GlobalAlert />
        <slot />
    </div>
</template>

<script>

    import { mapActions } from 'vuex'

    import GlobalAlert from '../Components/Common/GlobalAlert.vue'

    export default {

        methods: {
            ...mapActions([
                'setOnMouseDown',
                'setInputOnBlur',
                'setInputOnFocus',
                'setAllInputsProperly',
                'setOnClick',
            ]),
        },

        components: {
            GlobalAlert
        },

        mounted() {

            this.setAllInputsProperly()

            document.querySelector('#globalLayoutCover').addEventListener('blur', (event) => {
                this.setInputOnBlur(event)
            }, true)

            document.querySelector('#globalLayoutCover').addEventListener('focus', (event) => {
                this.setInputOnFocus(event)
            }, true)

            document.querySelector('#globalLayoutCover').addEventListener('click', (event) => {
                this.setOnClick(event)
            }, true)

            document.querySelector('#globalLayoutCover').addEventListener('mousedown', (event) => {
                this.setOnMouseDown(event)
            }, true)

        },

        updated() {
            this.setAllInputsProperly()
        }

    }
</script>
