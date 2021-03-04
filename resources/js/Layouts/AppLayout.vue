<template>
    <div>
        <GlobalAlert />
        <slot />
    </div>
</template>

<script>

    import GlobalAlert from '../Components/Common/GlobalAlert.vue'

    export default {
        components: {
            GlobalAlert
        },

    }
</script>
