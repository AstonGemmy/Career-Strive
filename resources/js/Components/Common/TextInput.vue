<template>
    <div class="relative mb-14">
        <label :for="id" class="whitespace-nowrap overflow-ellipsis overflow-hidden ... absolute top-3 left-3 flex justify-start w-3/4 items-center text-gray-900 bg-white px-3 py-1 transition-all ease-in-out">
            {{ title }}
        </label>
        <input v-if="type == 'text' || type == 'email' || type == 'password'" :value="value" @input="$emit('update:modelValue', $event.target.value)" ref="input" class="text-xl p-4 focus:ring-pink-300 w-full ring-1 ring-blue-600 rounded-lg outline-none border-0 focus: bg-white" :placeholder="placeholder" :type="type" :id="id">
        <select v-if="type == 'select'" :value="value" @input="$emit('update:modelValue', $event.target.value)" ref="select" class="text-xl p-4 focus:ring-pink-300 w-full ring-1 ring-blue-600 rounded-lg outline-none border-0 focus: bg-white" :id="id">
            <option v-for="option in options" :key="option">{{ option }}</option>
        </select>
        <textarea v-if="type == 'textarea'" :value="value" @input="$emit('update:modelValue', $event.target.value)" ref="textarea" class="text-xl h-56 p-4 focus:ring-pink-300 w-full ring-1 ring-blue-600 rounded-lg outline-none border-0 focus: bg-white" :placeholder="placeholder" :id="id"></textarea>
    </div>
</template>

<script>
export default {
    props: ['id', 'title', 'type', 'value', 'options', 'placeholder'],    
    emits: ['update:modelValue'],
    methods: {
        focus(e) {
            const target_ref = e.target.nodeName.toLowercase()
            this.$refs[target_ref].focus()
        }
    }
}
</script>