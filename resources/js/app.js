require('./bootstrap');

// Import modules...
import { createApp, h } from 'vue';
import { App as InertiaApp, plugin as InertiaPlugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';

import Store from './Store/Index';
import { mapActions, mapMutations } from 'vuex';
import store from './Store/Index';

// import GlobalAlert from './components/common/GlobalAlert.vue'

const el = document.getElementById('app');

createApp({
    render: () => 
        h(InertiaApp, {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: (name) => require(`./Pages/${name}`).default,
        }),
        computed: {
            ...mapMutations([
                'setFeedbackStyleState'
            ])
        },
        methods: {
            ...mapActions([
                // 'setFeedbackStyleState',
                'utility'
            ])
        },
        updated() {
            // this.utility()
        },
        created() {
            store.commit('setFeedbackStyleState')
        },
        mounted() {
            // this.utility()
        } 
    
})
    .mixin({ methods: { route } })
    .use(InertiaPlugin)
    .use(Store)
    .mount(el);

InertiaProgress.init({ color: '#4B5563' });