<template>
    <div class="relative mb-14">
        <label :for="id" class="whitespace-nowrap overflow-ellipsis overflow-hidden ... absolute top-3 left-3 flex justify-start w-3/4 items-center text-gray-900 bg-white px-3 py-1 transition-all ease-in-out">
            {{ title }}
        </label>
        <input v-if="type == 'text' || type == 'email' || type == 'password'" :value="value" @input="$emit('update:modelValue', $event.target.value)" ref="input" class="text-xl p-4 focus:ring-pink-300 w-full ring-1 ring-blue-600 rounded-lg outline-none border-0 focus: bg-white" :placeholder="placeholder" :type="type" :id="id">
        <!-- <v-select v-if="type == 'select'" :options="options" :value="value" @input="$emit('update:modelValue', $event.target.value)" class="text-xl p-4 focus:ring-pink-300 w-full ring-1 ring-blue-600 rounded-lg outline-none border-0 focus: bg-white" :id="id"></v-select> -->
        <select v-if="type == 'select'" :value="value" @input="$emit('update:modelValue', $event.target.value)" ref="select" class="text-xl p-4 focus:ring-pink-300 w-full ring-1 ring-blue-600 rounded-lg outline-none border-0 focus: bg-white" :id="id">
            <option v-for="option in options" :key="option">{{ option }}</option>
        </select>
        <textarea v-if="type == 'textarea'" :value="value" @input="$emit('update:modelValue', $event.target.value)" ref="textarea" class="text-xl h-56 p-4 focus:ring-pink-300 w-full ring-1 ring-blue-600 rounded-lg outline-none border-0 focus: bg-white" :placeholder="placeholder" :id="id"></textarea>
        <!-- Dynamic classes to be included during TailwindCSS production build -->
        <span class="hidden top-3 -top-5 block -translate-y-full translate-y-16 text-green-700 bg-green-200 text-red-700 bg-red-200 right-0 md:right-2/5 md:right-1/5 md:right-3/5 -right-full bg-green-400 bg-blue-400 text-green-400 text-blue-400 left-0 -left-full fa-times fa-chevron-left fa-chevron-right"></span>
    </div>
</template>

<script>
    // import vSelect from 'vue-select'
    import { mapActions } from 'vuex'
    // import 'vue-select/dist/vue-select.css';
    export default {
        props: ['id', 'title', 'type', 'value', 'options', 'placeholder'],    
        emits: ['update:modelValue'],
        // components: {vSelect},
        methods: {
            focus(e) {
                const target_ref = e.target.nodeName.toLowercase()
                this.$refs[target_ref].focus()
            },
            ...mapActions([
                'labelClick'
            ])
        },
        mounted() {
            // this.labelClick()
        }
    }
</script>