<template>
    <div id="globalLayoutCover">
        <!-- Global Loading Overlay -->
        <LoadingOverlay />
        <!-- Global Overlay -->
        <Overlay />
        <!-- Global Warning Modal -->
        <ConfirmationModal :confirmation="confirmation_modal" @setResponse="getResponse" />
        <!-- Global Response Alert -->
        <GlobalAlert />
        <slot />
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex'
    import GlobalAlert from '../Components/Common/GlobalAlert.vue'
    import ConfirmationModal from '../Components/Common/ConfirmationModal.vue'
    import Overlay from '../Components/Common/Overlay.vue'
    import LoadingOverlay from '../Components/Common/LoadingOverlay.vue'

    export default {

        props: {
            confirmation: Object
        },

        computed: {
            ...mapState([
                'confirmation_modal'
            ])
        },

        methods: {
            ...mapActions([
                'setOnMouseDown',
                'setInputOnBlur',
                'setInputOnFocus',
                'setAllInputsProperly',
                'setOnClick',
                'closeModal',
            ]),

            getResponse(confirmed) {
                this.confirmation_modal.triggered = confirmed
            },

            async initAOS() {
                const AOS = await import('../aos')
                AOS.init({
                    easing: 'ease-in-out-sine'
                })
            }

        },

        components: {
            GlobalAlert,
            ConfirmationModal,
            Overlay,
            LoadingOverlay
        },

        mounted() {

            this.initAOS()

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

        unmounted() {

            this.setAllInputsProperly()

            document.querySelector('#globalLayoutCover').removeEventListener('blur', (event) => {
                this.setInputOnBlur(event)
            }, true)

            document.querySelector('#globalLayoutCover').removeEventListener('focus', (event) => {
                this.setInputOnFocus(event)
            }, true)

            document.querySelector('#globalLayoutCover').removeEventListener('click', (event) => {
                this.setOnClick(event)
            }, true)

            document.querySelector('#globalLayoutCover').removeEventListener('mousedown', (event) => {
                this.setOnMouseDown(event)
            }, true)

        },

        created() {
            this.setAllInputsProperly()
        },

        updated() {
            this.initAOS()
            this.closeModal()
        }

    }
</script>
