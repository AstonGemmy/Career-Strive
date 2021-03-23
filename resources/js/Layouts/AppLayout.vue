<template>
    <div id="globalLayoutCover">
        <!-- Global Warning Modal -->
        <ConfirmationModal id="modal" :confirmation="confirmation_modal" @setResponse="getResponse" class="hidden" />
        <!-- Global Response Alert -->
        <GlobalAlert />
        <slot />
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex'
    import GlobalAlert from '../Components/Common/GlobalAlert.vue'
    import ConfirmationModal from '../Components/Common/ConfirmationModal.vue'

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

        },

        components: {
            GlobalAlert,
            ConfirmationModal
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
            this.closeModal()
        }

    }
</script>
