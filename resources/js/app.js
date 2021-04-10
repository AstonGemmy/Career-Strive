require('./bootstrap');

// Import modules...
import { createApp, h, ref } from 'vue';
import { App as InertiaApp, plugin as InertiaPlugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';

import '../../public/css/aos.css'

import { mapMutations } from 'vuex';
import store from './Store/Index';

import Layout from './Layouts/AppLayout.vue'

const el = document.getElementById('app');

createApp({
    render: () => 
        h(InertiaApp, {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: (name) => import(`./Pages/${name}`)
            .then(({ default: page }) => {
                if (page.layout === undefined) {
                  page.layout = Layout
                }
                return page
            })
        }),

        computed: {
            ...mapMutations([
                'setFeedbackStyleState'
            ])
        },
        updated() {
            
        },
        created() {
            store.commit('setFeedbackStyleState')
        },
        mounted() {
        }
    
})
    .mixin({ methods: { route } })
    .use(InertiaPlugin)
    .use(store)
    .mount(el);

InertiaProgress.init({ color: 'rgba(157, 23, 77, 1)' });