<template>
    <!-- Main Page -->
    <div class="relative bg-login w-screen h-screen pt-10 bg-cover bg-no-repeat">
        
        <div class="relative w-4/5 md:w-3/5 lg:w-2/5 bg-gray-100 mx-auto shadow rounded-xl overflow-hidden">                       
            
            <div class="relative flex justify-between px-6 py-5 text-pink-800 text-2xl">
                
                <h1>
                    Welcome to Career Strive
                </h1>

                <div class="">
                    <inertia-link href="/" title="Home" class="flex justify-center items-center">
                        <i class="fa fa-globe"></i>
                    </inertia-link>
                </div>

            </div>
            
            <div class="relative flex flex-col md:flex-row justify-between items-start h-auto">

                <!-- Login Form -->
                <form @submit.prevent="loginUser({login: Input.login})" class="relative w-full md:w-2/5 h-full py-6 px-8" method="POST">
                    
                    <h1 class="text-lg text-gray-600 font-medium">
                        Login to gain Access
                    </h1>
                    
                    <div class="relative mt-10">                        
                        <label for="login-email" class="absolute left-3 flex justify-start w-3/4 items-center text-pink-800 rounded-full bg-gray-100 px-3 py-1 shadow transition-all ease-in-out">
                            <i class="fa rounded-full w-4 h-4 mr-2 bg-white border-2 border-pink-800 shadow"></i>Email
                        </label>                                
                        <input v-model="Input.login.email" class="p-3 focus:ring-pink-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" required type="email" autocomplete="nope" placeholder="email" id="login-email">
                    </div>
                    
                    <div class="relative mt-10">                        
                        <label for="login-pass" class="absolute left-3 flex justify-start w-3/4 items-center text-pink-800 rounded-full bg-gray-100 px-3 py-1 shadow transition-all ease-in-out">
                            <i class="fa rounded-full w-4 h-4 mr-2 bg-white border-2 border-pink-800 shadow"></i>Password
                        </label> 
                        <input v-model="Input.login.password" class="p-3 focus:ring-pink-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" required type="password" placeholder="password" autocomplete="new-password" id="login-pass" name="login-pass">                    
                    </div>
                    
                    <div class="relative mt-4" v-bind:class="{ 'text-green-500': feedbackStyle.login.success, 'text-red-500': feedbackStyle.login.error }" id="registration-feedback">{{ feedbackMessages.login }}</div>
                    
                    <a class="text-pink-800" href="fpass.php">Forgot Password?</a>
                    
                    <div class="mt-4">                        
                        <button type="submit" class="bg-white text-pink-800 px-5 py-2 text-xl rounded-md border-white shadow">
                            <i id="login_loader" class="fa fa-spinner mr-4 hidden animate-spin"></i>
                            <span class="">Log In</span>
                        </button>                    
                    </div>
                    
                </form>
                <!-- Login form Ends -->
                
                
                <!-- Registration Form -->
                <form @submit.prevent="registerUser({register: Input.register})" class="relative h-full w-full md:w-3/5 py-6 px-8" method="post" id="signup_candidate">
                    
                    <h1 class="text-lg text-pink-800 font-medium">
                        Register
                    </h1>
                    
                    <div class="relative mt-10">                        
                        <label for="register-name" class="absolute left-3 flex justify-start w-3/4 items-center text-gray-600 rounded-full bg-gray-100 px-3 py-1 shadow transition-all ease-in-out">
                            <i class="fa rounded-full w-4 h-4 mr-2 bg-white border-2 border-white shadow-theme"></i>Username
                        </label>
                        <input v-model="Input.register.name" class="p-3 focus:ring-pink-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" placeholder="name" type="text" id="register-name" required>                    
                    </div>
                    
                    <div class=""></div>
                    
                    <div class="relative mt-10">                        
                        <label for="register-email" class="absolute left-3 flex justify-start w-3/4 items-center text-gray-600 rounded-full bg-gray-100 px-3 py-1 shadow transition-all ease-in-out">
                            <i class="fa rounded-full w-4 h-4 mr-2 bg-white border-2 border-white shadow-theme"></i>Email
                        </label>                                
                        <input v-model="Input.register.email" class="p-3 focus:ring-pink-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" placeholder="email" type="email" name="email" id="register-email" required>                        
                    </div>
                    
                    <div class=""></div>
                    
                    <div class="relative mt-10">                        
                        <label for="register-pass" class="absolute left-3 flex justify-start w-3/4 items-center text-gray-600 rounded-full bg-gray-100 px-3 py-1 shadow transition-all ease-in-out">
                            <i class="fa rounded-full w-4 h-4 mr-2 border-2 bg-white border-white shadow-theme"></i>Password
                        </label>
                        <input v-model="Input.register.password" class="p-3 focus:ring-pink-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" placeholder="password" type="password" id="register-pass" autocomplete="new-password" required>                        
                    </div>
                    
                    <div class="relative mt-4" v-bind:class="{ 'text-green-500': feedbackStyle.register.success, 'text-red-500': feedbackStyle.register.error }" id="registration-feedback">{{ feedbackMessages.register }}</div>
                    
                    <div class="mt-8">
                        
                        <button type="submit" class="bg-white text-pink-800 px-5 py-2 text-xl rounded-md border-white shadow">
                            <i id="register_loader" class="fa fa-spinner mr-4 animate-spin hidden"></i>
                            <span class="">Register</span>
                        </button>
                    
                    </div>
                    
                </form>
                <!-- Registration Form Ends -->

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

                }
            }
        },

        computed: {
            ...mapState([
                'feedbackMessages',
                'feedbackStyle'
            ])
        },

        methods: {

            ...mapActions([
                'loginUser',
                'registerUser',
                'redirectAuthenticated'
            ]),

        },

        created() {
            this.redirectAuthenticated({intended: '/'})
        },
    }
</script>
