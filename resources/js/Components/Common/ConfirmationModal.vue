<template>

    <form @submit.prevent="confirmResponse" style="z-index:9999" class="fixed z-50 left-2/4 top-16 transform -translate-x-2/4 w-full lg:w-4/12 bg-white rounded-lg overflow-hidden shadow-2xl">
        
        <div class="relative flex justify-between px-6 py-3 border-b-2 border-gray-100 text-blue-600 text-xl uppercase">
            <h1 class="">
                <i class="far fa-lightbulb mr-3"></i>
                {{ confirmation.heading }}
            </h1>
            <span v-if="confirmation.closeable" class="flex justify-center items-center h-6 w-6 bg-white rounded-full cursor-pointer" @click.prevent="closeModal">
                <i class="fa text-red-400 fa-times"></i>
            </span>
        </div>

        <div class="relative px-8 h-full">
            
            <div class="relative p-8 h-full">
                
                <div class="w-full mx-auto text-xl text-blue-600">
                    {{ confirmation.message }}
                </div>
                
            </div>
            
            <div v-if="confirmation.action" class="px-6 py-4 border-t-2 border-gray-100">
                
                <button type="submit" class="ripple-node border-pink-800 bg-blue-600 text-white rounded-lg shadow text-xl px-6 py-2 mr-4"> {{ confirmation.action }} </button>
                
            </div>
        
        </div>

    </form>

</template>

<script>

    import { mapActions, mapState } from 'vuex'

    export default {

        emits: ['setResponse'],

        props: ['confirmation'],

        computed: {
            ...mapState([
                'confirmation_modal'
            ])
        },

        methods: {
            ...mapActions([
                'closeModal'
            ]),

            confirmResponse(event) {
                this.confirmation_modal.closeable = false
                this.$emit('setResponse', this.confirmation.source)
                this.closeModal()
            }

        },

        watch: {
            '$store.state.confirmation_modal.close': {
                deep:true,
                handler(newState, oldState) {
                    if (newState == true) {
                        this.closeModal()
                    }
                }
            },
        }

    }

</script>