<template>
  	<div class="sticky top-0 z-50 md:px-8 lg:py-4 m-0 bg-black md:bg-transparent">
		<div class="relative flex flex-col lg:flex-row w-full lg:justify-between lg:items-center">
			<div class="relative w-full lg:w-auto bg- px-4 ml-0 lg:ml-16 z-50 flex justify-between items-center">
				<inertia-link href="/" class="text-2xl lg:text-3xl text-pink-800 px-0 pt-5 pb-3 lg:p-4 font-bold">
					<span class="">Career Strive</span>
				</inertia-link>
				<div @click="toggleNavbar" class="lg:hidden rounded-full flex justify-center items-center w-12 h-12 text-pink-800">
					<i class="fas fa-bars text-3xl transform scale-y-75"></i>
				</div>
			</div>
			<div :class="mobileNavbarToggler" class="px-8 md:px-4 py-8 md:py-4 transition-translate ease-in-out duration-500 transform lg:translate-y-0 absolute left-0 lg:relative bg-black md:bg-transparent lg:flex w-full lg:w-auto lg:mr-16">
				<div class="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between uppercase text-white">
					<inertia-link href="/profile" v-if="authUser.name" class="w-full lg:w-auto bg-pink-800 rounded-md text-center py-2 px-4 my-2 lg:my-0 lg:mr-4">{{ getAuthUserFirstname }}</inertia-link>
					<a href="#" v-if="authUser.name" @click="logoutUser" class="w-full lg:w-auto bg-pink-800 rounded-md text-center py-2 px-4 my-2 lg:my-0 lg:mr-4">Logout</a>
					<inertia-link href="/authenticate" v-else class="w-full lg:w-auto bg-pink-800 rounded-md text-center py-2 px-4 my-2 lg:my-0 lg:mr-4">Login</inertia-link>
					<!-- <inertia-link href="/about" class="w-full lg:w-auto bg-pink-800 rounded-md text-center py-2 px-4 my-2 lg:my-0 lg:mr-4">About Us</inertia-link> -->
					<!-- <inertia-link href="/contact" class="w-full lg:w-auto bg-pink-800 rounded-md text-center py-2 px-4 my-2 lg:my-0 lg:mr-0">Contact Us</inertia-link> -->
				</div>				
			</div>			
		</div>		
	</div>
</template>

<script>
  
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {

	data() {
		return {
			navbarIsOpen: true
		}
	},

	computed: {
	  ...mapState([
		'authUser',
		'loginState'
	  ]),
	  ...mapGetters([
		'getAuthUserFirstname'
	  ]),
	  mobileNavbarToggler() {
		return this.navbarIsOpen ? '-translate-y-full' : 'translate-y-16'
	  }
	},

    methods: {
      ...mapActions([
        'logoutUser'
      ]),
	  toggleNavbar() {
		this.navbarIsOpen = !this.navbarIsOpen
	  }
    }
  }

</script>