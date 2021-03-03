const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: theme => ({
                'login': "url('/images/login-cover.jpg')",
                'main': "url('/images/'career-strive-bg.png)",
            }),
            scale: {
                '65': '.65',
            },
            textColor: {
                'navyblue': '#0B214A',
            },
            height: {
                '112': '26rem',
                '126': '28rem',
                '144': '32rem',
                '162': '38rem',
                '170': '46rem',
                '188': '56rem',
                '206': '68rem'
            },
            boxShadow: {
                blue: '0 4px 14px 0 rgba(19, 51, 81, 0.39)',
                theme: '0 1px 3px 0 rgba(157, 23, 77, 0.4), 0 1px 2px 0 rgba(157, 23, 77, 0.06)',
            },
        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
