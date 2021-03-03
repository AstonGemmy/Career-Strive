<template>
  <div class="sticky top-0 z-50 bg-white p-4 m-0 mb-4">
    <div class="relative flex w-full justify-between items-center">		
			<div class="lg:hidden bg-gray-200 absolute right-4 flex justify-center items-center p-4 text-pink-800">
			    <i class="fas fa-bars text-3xl transform scale-y-75"></i>
			</div>			
			<inertia-link to="/" href="/" class="text-3xl text-pink-800 uppercase p-4 pl-0 ml-4 lg:ml-16 font-bold">
				<span class="">Career strive</span>			
			</inertia-link>
			<div class="hidden lg:flex absolute w-full lg:w-auto top-0 lg:top-auto right-0 lg:right-16 p-4">
				<div class="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between uppercase text-white">
					<inertia-link to="/profile" href="/profile" v-if="authUser.name" class="w-full lg:w-auto bg-pink-800 rounded-md text-center py-2 px-4 my-2 lg:my-0 lg:mr-4">{{ getAuthUserFirstname }}</inertia-link>
          			<a href="#" v-if="authUser.name" @click="logoutUser" class="w-full lg:w-auto bg-pink-800 rounded-md text-center py-2 px-4 my-2 lg:my-0 lg:mr-4">Logout</a>
			        <inertia-link to="/authenticate" href="/authenticate" v-else class="w-full lg:w-auto bg-pink-800 rounded-md text-center py-2 px-4 my-2 lg:my-0 lg:mr-4">Login</inertia-link>
					<inertia-link to="/about" href="/about" class="w-full lg:w-auto bg-pink-800 rounded-md text-center py-2 px-4 my-2 lg:my-0 lg:mr-4">About Us</inertia-link>
					<inertia-link to="/contact" href="/contact" class="w-full lg:w-auto bg-pink-800 rounded-md text-center py-2 px-4 my-2 lg:my-0 lg:mr-0">Contact Us</inertia-link>
				</div>				
			</div>			
		</div>		
	</div>
</template>

<script>
  
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {

	computed: {
	  ...mapState([
		'authUser',
		'loginState'
	  ]),
	  ...mapGetters([
		'getAuthUserFirstname'
	  ])
	},

    methods: {
      ...mapActions([
        'logoutUser'
      ])
    }
  }

</script>