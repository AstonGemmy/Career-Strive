<template>
    <div v-if="isLoading" class="lds-overlay">
        <div class="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState([
                'isLoading'
            ])
        }
    }
</script>

<style scoped>
    
    .lds-overlay {
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        align-items: center;
        display: flex;
        justify-content: center;
        overflow: hidden;
        z-index: 9999;
        opacity: 0.5;
        background: #fff;
    }
    
    .lds-ripple {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-ripple div {
        position: absolute;
        border: 4px solid rgba(157, 23, 77, 1);
        background-color:rgba(157, 23, 77, 0.7);
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    }

</style>