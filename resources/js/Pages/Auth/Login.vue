<template>
    <!-- Main Page -->
    <div class="relative bg-login w-screen h-screen bg-center bg-cover bg-no-repeat">

        <div class="relative h-full w-full bg-opacity-95 bg-white">
            
            <div class="absolute left-2/4 top-2/4 -translate-y-2/4 md:top-1/4 md:-translate-y-0 transform -translate-x-2/4 w-4/5 lg:w-3/5 xl:w-2/5 bg-white mx-auto shadow-2xl rounded-xl overflow-hidden">
                
                <div class="relative flex flex-col md:flex-row justify-between items-start min-h-112">

                    <!-- Login Form -->
                    <form @submit.prevent="loginUser({login: Input.login})" :class="loginFormSelector" class="bg-white absolute w-full md:w-2/5 h-full py-6 px-8 transition-all duration-700" method="POST">
                        
                        <h1 class="text-lg text-gray-600 font-medium">
                            Login to gain Access
                        </h1>
                        
                        <div class="relative mt-10">                        
                            <label for="login-email" class="absolute left-3 flex justify-start w-3/4 items-center text-white rounded-full bg-blue-300 px-3 py-1 shadow transition-all ease-in-out">
                                <i class="fa rounded-full w-4 h-4 mr-2 bg-white shadow"></i>Email
                            </label>                                
                            <input v-model="Input.login.email" class="p-3 text-blue-500 focus:ring-blue-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" required type="email" autocomplete="nope" placeholder="email" id="login-email">
                        </div>
                        
                        <div class="relative mt-10">                        
                            <label for="login-pass" class="absolute left-3 flex justify-start w-3/4 items-center text-white rounded-full bg-blue-300 px-3 py-1 shadow transition-all ease-in-out">
                                <i class="fa rounded-full w-4 h-4 mr-2 bg-white shadow"></i>Password
                            </label> 
                            <input v-model="Input.login.password" class="p-3 text-blue-500 focus:ring-blue-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" required type="password" placeholder="password" autocomplete="new-password" id="login-pass" name="login-pass">
                        </div>
                        
                        <a class="mt-6 inline-block text-blue-400" href="fpass.php">Forgot Password?</a>
                        
                        <div class="mt-4">
                            <button type="submit" class="bg-white w-full lg:w-auto text-gray-600 px-5 py-2 text-xl rounded-md border-white shadow">
                                <i id="login_loader" class="fa fa-spinner mr-4 hidden animate-spin"></i>
                                <span class="">Log In</span>
                            </button>
                        </div>
                        
                    </form>
                    <!-- Login form Ends -->

                    <!-- Registration Form -->
                    <form @submit.prevent="registerUser({register: Input.register})" :class="registerFormSelector" class="bg-white absolute h-full w-full md:w-2/5 py-6 px-8 transition-all duration-700" method="post">
                        
                        <h1 class="text-lg text-pink-800 font-medium">
                            Register
                        </h1>
                        
                        <div class="relative mt-10">                        
                            <label for="register-name" class="absolute left-3 flex justify-start w-3/4 items-center text-white rounded-full bg-green-300 px-3 py-1 shadow transition-all ease-in-out">
                                <i class="fa rounded-full w-4 h-4 mr-2 bg-white shadow-theme"></i>Username
                            </label>
                            <input v-model="Input.register.name" class="p-3 text-green-500 focus:ring-green-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" placeholder="name" type="text" id="register-name" required>                    
                        </div>
                        
                        <div class="relative mt-10">                        
                            <label for="register-email" class="absolute left-3 flex justify-start w-3/4 items-center text-white rounded-full bg-green-300 px-3 py-1 shadow transition-all ease-in-out">
                                <i class="fa rounded-full w-4 h-4 mr-2 bg-white border-2 border-white shadow-theme"></i>Email
                            </label>                                
                            <input v-model="Input.register.email" class="p-3 text-green-500 focus:ring-green-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" placeholder="email" type="email" name="email" id="register-email" required>                        
                        </div>
                        
                        <div class="relative mt-10">                        
                            <label for="register-pass" class="absolute left-3 flex justify-start w-3/4 items-center text-white rounded-full bg-green-300 px-3 py-1 shadow transition-all ease-in-out">
                                <i class="fa rounded-full w-4 h-4 mr-2 border-2 bg-white border-white shadow-theme"></i>Password
                            </label>
                            <input v-model="Input.register.password" class="p-3 text-green-500 focus:ring-green-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" placeholder="password" type="password" id="register-pass" autocomplete="new-password" required>                        
                        </div>
                        
                        <div class="mt-8">
                            
                            <button type="submit" class="bg-white w-full lg:w-auto text-pink-800 px-5 py-2 text-xl rounded-md border-white shadow">
                                <i id="register_loader" class="fa fa-spinner mr-4 animate-spin hidden"></i>
                                <span class="">Register</span>
                            </button>
                        
                        </div>
                        
                    </form>
                    <!-- Registration Form Ends -->
                    
                    <div :class="formSelector" class="absolute h-full w-auto md:w-3/5 transition-all duration-700">
                        <img src="/images/backgrounds/login-cover.jpg" class="hidden md:block absolute left-0 top-0 w-full h-full" alt="login-cover-photo">

                        <div class="absolute top-0 right-0 w-auto md:w-full h-full bg-white bg-opacity-75">

                            <div :class="formBGColor" class="absolute md:bg-white md:relative top-0 text-pink-800 right-0 h-full md:h-auto w-auto md:w-full flex flex-col md:flex-row justify-center md:justify-between px-2 md:px-6 md:py-5 text-2xl">
                                <inertia-link href="/" title="Home" class="flex mb-4 md:mb-0 justify-center items-center">
                                    <i class="fa text-white md:text-pink-800 fa-globe"></i>
                                </inertia-link>
                                <inertia-link href="/" title="Home" class="flex mb-4 md:mb-0 justify-center items-center">
                                    <i class="fab fa-facebook-f text-white md:text-blue-500"></i>
                                </inertia-link>
                                <inertia-link href="/" title="Home" class="flex mb-4 md:mb-0 justify-center items-center">
                                    <i class="fab fa-medium-m text-white md:text-black"></i>
                                </inertia-link>
                                <inertia-link href="/" title="Home" class="flex mb-4 md:mb-0 justify-center items-center">
                                    <i class="fab fa-linkedin text-white md:text-blue-900"></i>
                                </inertia-link>
                                <inertia-link href="/" title="Home" class="flex mb-4 md:mb-0 justify-center items-center">
                                    <i class="fab fa-github text-white md:text-black"></i>
                                </inertia-link>
                                <span @click="toggleForm" class="md:hidden flex mb-4 md:mb-0 justify-center items-center">
                                    <i class="fa fa-arrow-left text-white"></i>
                                </span>
                            </div>

                            <div class="hidden md:block relative mx-auto text-center text-gray-600">
                                <div :class="formTextColor" class="text-2xl uppercase font-bold pt-16 p-4">
                                    Welcome to Career Strive
                                </div>
                                <div class="text-xl p-8">
                                    Submit your login credentials to gain access to future opportunities
                                </div>
                                <button @click="toggleForm" :class="formBGColor" class="relative inline-block text-white shadow text-xl px-8 py-3 rounded-xl">
                                    {{ form_toggle_text }}
                                </button>
                            </div>
                        
                        </div>

                    </div>

                </div>

                <div :class="toggleLoginFeedbackResponse" class="px-4 py-2 w-full">
                    {{ feedbackMessages.login }}
                </div>
                <div :class="toggleRegisterFeedbackResponse" class="px-4 py-2 w-full">
                    {{ feedbackMessages.register }}
                </div>
                <!-- Classes to be included during TailwindCSS production build for dynamic usage -->
                <span class="hidden text-red-500 bg-red-200 text-green-500 bg-green-200"></span>
            </div>

        </div>

    </div>

</template>

<script>

    import { mapState, mapActions } from 'vuex'    

    export default {

        data() {
            return {
                Input: {
                
                    login: {
                        email: null,
                        password: null
                    },
                    
                    register: {
                        name: null,
                        email: null,
                        password: null
                    }

                },
                form_toggle: false,
                form_toggle_text: 'Register'
            }
        },

        computed: {
            ...mapState([
                'feedbackMessages',
                'feedbackStyle'
            ]),
            formSelector() {
                return this.form_toggle ? 'right-0 md:right-2/5' : 'right-0'
            },
            loginFormSelector() {
                return this.form_toggle ? 'md:right-1/5' : 'md:right-3/5'
            },
            registerFormSelector() {
                return this.form_toggle ? 'right-0' : '-right-full md:right-1/5'
            },
            formBGColor() {
                return this.form_toggle ? 'bg-green-400' : 'bg-blue-400'
            },
            formTextColor() {
                return this.form_toggle ? 'text-green-400' : 'text-blue-400'
            },
            toggleLoginFeedbackResponse() {
                return this.feedbackStyle.login.success
                ? 'text-green-500 bg-green-200'
                : this.feedbackStyle.login.error
                ? 'text-red-500 bg-red-200'
                : 'absolute'
            },
            toggleRegisterFeedbackResponse() {
                return this.feedbackStyle.register.success
                ? 'text-green-500 bg-green-200'
                : this.feedbackStyle.register.error
                ? 'text-red-500 bg-red-200'
                : 'absolute'
            }
        },

        methods: {

            ...mapActions([
                'loginUser',
                'registerUser',
                'redirectAuthenticated'
            ]),
            toggleForm(e) {
                this.form_toggle = !this.form_toggle
                if (window.innerWidth > 767) {
                    if (this.form_toggle_text == 'Register') {
                        this.form_toggle_text = 'Login'
                    } else {
                        this.form_toggle_text = 'Register'
                    }
                }
            }

        },

        created() {
            this.redirectAuthenticated({intended: '/'})
        },
    }
</script>
