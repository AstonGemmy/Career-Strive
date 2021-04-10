<template>
    <div class="bg-gray-100 bg-contain">

        <!-- Update fields -->
        <Updater />

        <div class="relative overflow-x-hidden lg:overflow-hidden lg:grid grid-flow-col grid-cols-5 gap-0 w-screen lg:h-screen h-auto">

            <div :class="leftSidebarToggler" class="fixed lg:left-0 top-0 w-full md:w-2/4 lg:w-full p-4 h-screen z-20 lg:relative lg:z-0 transition-all duration-700">

                <div class="relative bg-white pr-1 py-4 shadow h-full rounded-xl">

                    <div class="relative overflow-y-auto h-full">
                    
                        <h1 class="sticky -top-4 bg-white flex justify-between items-center mb-6 px-8 md:px-4 xl:px-8 py-4 text-pink-800 font-bold">
                            <i class="fa fa-spinner text-blue-600"></i>
                            Overview
                        </h1>

                        <inertia-link href="/">
                            <div class="bg-gradient-to-r hover:border-blue-400 border-transparent border-l-4 hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-4 xl:pl-16 pr-4 flex items-center transition-all duration-700">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa fa-globe"></i>
                                </span>
                                <span class="">
                                    Home
                                </span>
                            </div>
                        </inertia-link>

                        <button @click="checkTestEligibilityStatus" class="w-full bg-gradient-to-r hover:border-blue-400 border-transparent border-l-4 hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-4 xl:pl-16 pr-4 flex items-center transition-all duration-700">
                            <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                <i class="fa fa-chart-bar"></i>
                            </span>
                            <span class="">
                                Take Test
                            </span>
                        </button>

                        <inertia-link v-if="Object.keys(test).length" href="/all-tests">
                            <div class="bg-gradient-to-r hover:border-blue-400 border-transparent border-l-4 hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-4 xl:pl-16 pr-4 flex items-center transition-all duration-700">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa fa-bezier-curve"></i>
                                </span>
                                <span class="">
                                    All Tests
                                </span>
                            </div>
                        </inertia-link>
                        
                        <a href="#" @click.prevent="logoutUser" class="bg-gradient-to-r hover:border-red-400 border-transparent border-l-4 hover:from-red-100 hover:to-transparent hover:text-red-600 text-gray-600 py-4 pl-4 xl:pl-16 pr-4 flex items-center transition-all duration-700">
                            <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                <i class="fa fa-power-off"></i>
                            </span>
                            <span class="">
                                Logout
                            </span>
                        </a>
                        
                        <!-- Checks if mandatory information have been updated -->
                        <h1 class="sticky -top-4 bg-white flex justify-between items-center mb-6 px-8 py-4 text-pink-800 font-bold">
                            <i class="far fa-bell text-red-600"></i>
                            Notice
                        </h1>

                        <div v-for="(value, key) in update_status" :key="key" class="">
                            <div v-if="value" class="bg-gradient-to-r hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-4 xl:pl-16 pr-4 flex items-center">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa fa-check text-green-400"></i>
                                </span>
                                <span class="">
                                    {{ getProperFormat(key) }}
                                </span>
                            </div>
                            <div v-else class="bg-gradient-to-r hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-4 xl:pl-16 pr-4 flex items-center">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa fa-times text-red-400"></i>
                                </span>
                                <span class="">
                                    Update <span class="text-pink-800"> {{ key }} </span> information.
                                </span>                                
                            </div>
                        </div>
                        
                    </div>

                </div>
                
            </div>
            
            <div class="relative p-4 lg:h-screen h-auto col-span-3">

                <div @click="toggleLeftSidebar" class="lg:hidden fixed bottom-6 left-8 z-50 bg-blue-400 rounded-full flex justify-center items-center w-12 h-12">
                    <i :class="leftTogglerIcon" class="fa text-xl text-white transform scale-y-75"></i>
                </div>
                <div @click="toggleRightSidebar" class="lg:hidden fixed bottom-6 right-8 z-50 bg-blue-400 rounded-full flex justify-center items-center w-12 h-12">
                    <i :class="rightTogglerIcon" class="fa text-xl text-white transform scale-y-75"></i>
                </div>

                <div class="relative h-full pb-10 lg:pb-0">

                    <div class="relative invisible-scrollbar overflow-y-auto overflow-x-hidden h-full">
                        
                        <div class="relative mb-4 mx-1 bg-white rounded-xl overflow-hidden shadow">

                            <div class="flex items-center justify-between py-4 px-8 bg-white shadow">
                                
                                <h1 class="text-xl font-bold text-blue-600">
                                    {{ output.personal.name }}
                                </h1>

                                <span class="text-black">
                                    <i v-if="personal.status == true" class="fa h-4 w-4 bg-green-600 rounded-full"></i>
                                    <i v-else class="fa h-4 w-4 bg-red-400 rounded-full shadow"></i>
                                </span>

                            </div>

                            <div class="relative h-full">
                                
                                <div class="relative h-32 lg:h-36 w-full">
                                    <img v-if="personal.cover_photo_path" v-bind:src="'/images/cover photos/' + personal.cover_photo_path" class="w-full h-full">
                                    <img v-else src="/images/cover photo/default-cover-photo.png" class="w-full h-full">

                                    <button @click.prevent="$refs.cover_photo_input.click()" class="absolute flex justify-center items-center bg-blue-400 w-12 h-12 rounded-full z-10 right-8 lg:right-12 -bottom-4">
                                        <i class="fa fa-image text-xl text-white"></i>
                                    </button>
                                    <!-- Cover Photo Update -->
                                    <input class="hidden" ref="cover_photo_input" @change.prevent="updateCoverPhoto" accept="image/*" type="file">
                                    <!-- Cover Photo Update Ends -->
                                </div>

                                <div class="relative w-full pt-24 py-4 lg:py-4">
                                    
                                    <div class="flex mx-8 lg:ml-56">

                                        <div class="relative flex mt-4 md:mt-2 w-full flex-col md:flex-row px-2 py-2 bg-blue-100 rounded-lg">

                                            <span class="absolute -top-4 md:-top-8 md:left-8 flex justify-center flex-col px-4 text-black bg-blue-400 rounded-full mr-0 md:mr-4">
                                                <span class="text-white font-medium uppercase text-center">
                                                    Scores cloud { {{ Object.keys(test).length }} }
                                                </span>
                                            </span>
                                            
                                            <div v-if="Object.keys(test).length !== 0" class="grid grid-flow-col grid-rows-4 w-full invisible-scrollbar overflow-x-auto justify-start items-start mt-2 md:mt-0 rounded-lg transition-all duration-700 ease-in-out">

                                                <div v-for="value in test" :key="value.started_at" class="cursor-pointer flex mb-1 mr-1">
                                                    <span v-if="value.score > 75" class="bg-blue-300 w-2 h-2 rounded-full"></span>
                                                    <span v-if="value.score > 50 && value.score < 76" class="bg-green-300 w-2 h-2 rounded-full"></span>
                                                    <span v-if="value.score > 25 && value.score < 51" class="bg-yellow-300 w-2 h-2 rounded-full"></span>
                                                    <span v-if="value.score < 26" class="bg-red-300 w-2 h-2 rounded-full"></span>
                                                </div>

                                            </div>
                                            <div v-else class="p-2 text-blue-600">
                                                No tests yet taken!
                                            </div>

                                        </div>

                                    </div>

                                    <div class="mt-3 mb-2 mx-8 p-2 text-lg text-gray-700 text-center">
                                        {{ personal.bio }}
                                    </div>

                                </div>

                            </div>
                            
                            <div class="bg-white shadow ring-8 ring-gray-100 ring-offset-0 absolute transform -translate-x-2/4 left-2/4 lg:-translate-x-0 lg:left-16 top-24 w-36 h-36 rounded-full">
                                <img v-if="personal.profile_photo_path" v-bind:src="'/images/profile pictures/' + personal.profile_photo_path" class="overflow-hidden bg-white w-full h-full rounded-full">
                                <!-- Defaults -->
                                <img
                                    v-if="!personal.profile_photo_path && !personal.gender
                                        || !personal.profile_photo_path && personal.gender == 'select'
                                        || !personal.profile_photo_path && personal.gender == 'male'"
                                    src="/images/profile pictures/default-profile-picture-male.png"
                                    class="overflow-hidden bg-white w-full h-full rounded-full"
                                />
                                <img v-if="!personal.profile_photo_path && personal.gender == 'female'" src="/images/profile pictures/default-profile-picture-female.png" class="overflow-hidden bg-white w-full h-full rounded-full">
                                
                                <button @click.prevent="$refs.profile_photo_input.click()" class="absolute flex justify-center items-center bg-blue-400 w-12 h-12 rounded-full z-50 -left-6 -bottom-4">
                                    <i class="fa fa-camera text-xl text-white"></i>
                                </button>
                                <!-- Profile Photo Update -->
                                <input class="hidden" ref="profile_photo_input" @change.prevent="updateProfilePhoto" accept="image/*" type="file">
                                <!-- Profile Photo Update Ends -->
                            </div>
                                                
                        </div>

                        <div class="relative">

                            <div class="relative grid grid-flow-row md:grid-cols-2 grid-rows-2 gap-4 w-full h-auto px-1 py-4 my-2 mx-auto">
                                
                                <div class="grid grid-flow-rows grid-cols-1 grid-rows-6 items-stretch gap-4 lg:mt-0 mt-8 overflow-hidden relative rounded-xl shadow bg-white">
                                    <h1 class="row-span-1 uppercase flex justify-between items-center py-3 px-8">
                                        <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                            <i class="fa fa-user text-yellow-500"></i>
                                        </span>
                                        <span class="text-blue-700">
                                            Personal Details
                                        </span>
                                    </h1>

                                    <div class="row-span-4">
                                        <div v-for="(value, key) in output.personal" :key="key" class="px-6 pt-4">
                                            <div v-if="value">
                                                <div class="text-gray-600">
                                                    {{ getProperFormat(value) }}
                                                </div>
                                                <div class="text-lg text-black">
                                                    {{ keyToProperFormat(key) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row-span-1 uppercase w-full flex items-center justify-between border-t-2 border-gray-100 text-xl text-green-600 px-6 py-4">
                                        <button @click="showUpdater('personal')" class="uppercase mr-4">
                                            Edit
                                        </button>
                                        <div class="relative whitespace-nowrap flex overflow-y-hidden overflow-x-auto text-sm invisible-scrollbar">
                                            <div v-for="(value, key) in output.personal" :key="key + 'p-check'">
                                                <div v-if="!value" class="relative px-2 text-gray-600">
                                                    {{ keyToProperFormat(key) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="grid grid-flow-rows grid-cols-1 grid-rows-6 items-stretch gap-4 lg:mt-0 mt-8 overflow-hidden relative rounded-xl shadow bg-white">
                                    <h1 class="row-span-1 uppercase flex justify-between items-center py-3 px-8">
                                        <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                            <i class="fa fa-envelope text-blue-600"></i>
                                        </span>
                                        <span class="text-blue-700">
                                            Contact Details
                                        </span>
                                    </h1>

                                    <div class="row-span-4">
                                        <div v-if="!update_before.contact" class="flex justify-center items-center">
                                            Update Your Contact Details
                                        </div>
                                        <div v-for="(value, key) in output.contact" :key="key" class="px-6 pt-4">
                                            <div v-if="value">
                                                <div class="text-gray-600">
                                                    {{ getProperFormat(value) }}
                                                </div>
                                                <div class="text-lg text-black">
                                                    {{ keyToProperFormat(key) }}
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>

                                    <div class="row-span-1 uppercase w-full flex items-center justify-between border-t-2 border-gray-100 text-xl text-green-600 px-6 py-4">
                                        <button @click="showUpdater('contact')" class="uppercase mr-4">
                                            Edit
                                        </button>
                                        <div class="relative whitespace-nowrap flex overflow-y-hidden overflow-x-auto text-sm invisible-scrollbar">
                                            <div v-for="(value, key) in output.contact" :key="key + 'c-check'">
                                                <div v-if="!value" class="relative px-2 text-gray-600">
                                                    {{ keyToProperFormat(key) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div class="grid grid-flow-rows grid-cols-1 grid-rows-6 items-stretch gap-4 lg:mt-0 mt-8 overflow-hidden relative rounded-xl shadow bg-white">
                                    <h1 class="row-span-1 uppercase flex justify-between items-center py-3 px-8">
                                        <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                            <i class="fa fa-briefcase text-red-600"></i>
                                        </span>
                                        <span class="text-blue-700">
                                            Work Experience & Qualifications
                                        </span>
                                    </h1>

                                    <div class="row-span-4">                                    
                                        <div v-if="!update_before.experience" class="flex justify-center items-center">
                                            Update Your Experience Details
                                        </div>
                                        <div v-for="(value, key) in output.experience" :key="key" class="px-6 pt-4">
                                            <div v-if="value">
                                                <div class="text-gray-600">
                                                    {{ getProperFormat(value) }}
                                                </div>
                                                <div class="text-lg text-black">
                                                    {{ keyToProperFormat(key) }}
                                                </div>
                                            </div>
                                        </div>                                        
                                    </div>

                                    <div class="row-span-1 uppercase w-full flex items-center justify-between border-t-2 border-gray-100 text-xl text-green-600 px-6 py-4">
                                        <button @click="showUpdater('experience')" class="uppercase mr-4">
                                            Edit
                                        </button>
                                        <div class="relative whitespace-nowrap flex overflow-y-hidden overflow-x-auto text-sm invisible-scrollbar">
                                            <div v-for="(value, key) in output.experience" :key="key + 'e-check'">
                                                <div v-if="!value" class="relative px-2 text-gray-600">
                                                    {{ keyToProperFormat(key) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="grid grid-flow-rows grid-cols-1 grid-rows-6 items-stretch gap-4 lg:mt-0 mt-8 overflow-hidden relative rounded-xl shadow bg-white">
                                    <h1 class="row-span-1 uppercase flex justify-between items-center py-3 px-8">
                                        <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                            <i class="fa fa-brain text-green-600"></i>
                                        </span>
                                        <span class="text-blue-700">
                                            Skills Level
                                        </span>
                                    </h1>
                                
                                    <div class="row-span-4">
                                        <div v-if="!update_before.skill" class="flex justify-center items-center">
                                            Update Your Skills Details
                                        </div>
                                        <div v-for="(value, key) in output.skill" :key="key" class="px-6 pt-4">
                                            <div v-if="value">
                                                <div class="text-gray-600">
                                                    {{ getProperFormat(value) }}
                                                </div>
                                                <div class="text-lg text-black">
                                                    {{ keyToProperFormat(key) }}
                                                </div>
                                            </div>
                                        </div>                                        
                                    </div>

                                    <div class="row-span-1 uppercase w-full flex items-center justify-between border-t-2 border-gray-100 text-xl text-green-600 px-6 py-4">
                                        <button @click="showUpdater('skill')" class="uppercase mr-4">
                                            Edit
                                        </button>
                                        <div class="relative whitespace-nowrap flex overflow-y-hidden overflow-x-auto text-sm invisible-scrollbar">
                                            <div v-for="(value, key) in output.skill" :key="key + 's-check'">
                                                <div v-if="!value" class="relative px-2 text-gray-600">
                                                    {{ keyToProperFormat(key) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div :class="rightSidebarToggler" class="fixed lg:right-0 top-0 w-full md:w-2/4 lg:w-full p-4 h-screen z-20 lg:relative lg:z-0 transition-all duration-700">

                <div class="bg-white h-full px-0 pb-4 rounded-xl shadow">

                    <div class="relative h-full pr-1 py-2">

                        <div class="relative h-full overflow-x-hidden px-2">

                            <div class="relative">
                                    
                                <h1 class="sticky z-10 text-blue-600 -top-2 px-8 md:px-1 xl:px-8 py-4 bg-white border-b border-gray-100 border-1">
                                    <i class="fa fa-spinner text-blue-600 mr-4"></i>
                                    Job Opening
                                </h1>

                                <div class="relative my-4 mx-4 md:mx-0 xl:mx-4 py-2 px-4 md:px-0 xl:px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Computer Hardware/software
                                    </h2>

                                    <ul class="py-2 px-4 md:px-0 xl:px-4 text-gray-500">
                                        <li class="py-2 px-4">Computer operator</li>
                                        <li class="py-2 px-4">Systems design architect</li>
                                        <li class="py-2 px-4">Hardware service manager</li>
                                        <li class="py-2 px-4">ICT cordinator</li>
                                        <li class="py-2 px-4">Computer analyst</li>
                                        <li class="py-2 px-4">Software engineer</li>
                                    </ul>

                                </div>

                            </div>

                            <div class="relative">

                                <h1 class="sticky z-10 text-blue-600 -top-2 px-8 md:px-1 xl:px-8 py-4 bg-white border-b border-gray-100 border-1">
                                    <i class="fa fa-clock text-blue-600 mr-4"></i>
                                    Info Section
                                </h1>

                                <div class="relative my-4 mx-4 md:mx-0 xl:mx-4 py-2 px-4 md:px-0 xl:px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Public Administration
                                    </h2>

                                    <ul class="py-2 px-4 md:px-0 xl:px-4 text-gray-500">
                                        <li class="py-2 px-4">Public adminstrator</li>
                                        <li class="py-2 px-4">Financial secretary</li>
                                        <li class="py-2 px-4">Front desk operator</li>
                                    </ul>

                                </div>

                                <div class="relative my-4 mx-4 md:mx-0 xl:mx-4 py-2 px-4 md:px-0 xl:px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Sales and marketing
                                    </h2>

                                    <ul class="py-2 px-4 md:px-0 xl:px-4 text-gray-500">
                                        <li class="py-2 px-4">Senior sales manager</li>
                                        <li class="py-2 px-4">Marketing manager</li>
                                    </ul>

                                </div>

                            </div>

                            <div class="relative">

                                <h1 class="sticky z-10 text-blue-600 -top-2 px-8 md:px-1 xl:px-8 py-4 bg-white border-b border-gray-100 border-1">
                                    <i class="fa fa-car text-blue-600 mr-4"></i>
                                    Travels
                                </h1>

                                <div class="relative my-4 mx-4 md:mx-0 xl:mx-4 py-2 px-4 md:px-0 xl:px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Human resource
                                    </h2>

                                    <ul class="py-2 px-4 md:px-0 xl:px-4 text-gray-500">
                                        <li class="py-2 px-4">Human resource personnel</li>
                                    </ul>

                                </div>

                                <div class="relative my-4 mx-4 md:mx-0 xl:mx-4 py-2 px-4 md:px-0 xl:px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Industrial safety
                                    </h2>

                                    <ul class="py-2 px-4 md:px-0 xl:px-4 text-gray-500">
                                        <li class="py-2 px-4">Fire systems operator</li>
                                        <li class="py-2 px-4">Safety personnel</li>
                                        <li class="py-2 px-4">Field director/supervisor</li>
                                    </ul>

                                </div>

                            </div>

                            <div class="relative">

                                <h1 class="sticky z-10 text-blue-600 -top-2 px-8 md:px-1 xl:px-8 py-4 bg-white border-b border-gray-100 border-1">
                                    <i class="fa fa-wine-glass text-blue-600 mr-4"></i>
                                    Restaurants
                                </h1>

                                <div class="relative my-4 mx-4 md:mx-0 xl:mx-4 py-2 px-4 md:px-0 xl:px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Others
                                    </h2>

                                    <ul class="py-2 px-4 md:px-0 xl:px-4 text-gray-500">
                                        <li class="py-2 px-4">Technical partner</li>
                                    </ul>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            
        </div>
    </div>
</template>

<script>

    import { mapState, mapGetters, mapActions } from 'vuex'
    import Updater from '../../Components/Profile/Updater.vue'

  export default {

    data() {
        return {
            lToggler: false,
            rToggler: false,
        }
    },

    computed: {
        ...mapState([
            'test',
            'output',
            'skill',
            'personal',
            'experience',
            'contact',
            'update_status',
            'update_before'
        ]),
        leftSidebarToggler() {
            return this.lToggler ? 'left-0' : '-left-full'
        },
        rightSidebarToggler() {
            return this.rToggler ? 'right-0' : '-right-full'
        },
        leftTogglerIcon() {
            return this.lToggler ? 'fa-times' : 'fa-chevron-left'
        },
        rightTogglerIcon() {
            return this.rToggler ? 'fa-times' : 'fa-chevron-right'
        }
    },

    methods: {
        ...mapActions([
            'logoutUser',
            'fetchTests',
            'fetchSkill',
            'fetchContact',
            'fetchPersonal',
            'fetchExperience',
            'showUpdater',
            'updateCoverPhoto',
            'updateProfilePhoto',
            'protectedRouteRedirect',
            'checkTestEligibilityStatus',
        ]),        

        objectAvailability(object) {
            if (Object.keys(object).length == 0) {
                return false;
            }
            return true;
        },

        keyToProperFormat(key) {
            if (key !== null) {
                key = key.split('_');
                key = key.map(word => { 
                    return word[0].toUpperCase() + word.slice(1);
                }).join(" ");
                return key
            }
        },

        getProperFormat(value) {
            if (value !== null) {
                value = value.split(' ');
                value = value.map(word => { 
                    return word[0].toUpperCase() + word.slice(1);
                }).join(" ");
                return value
            }
        },

        toggleLeftSidebar() {
            this.lToggler = !this.lToggler
            this.rToggler = false
        },

        toggleRightSidebar() {
            this.rToggler = !this.rToggler
            this.lToggler = false
        }

    },

    created() {
        this.protectedRouteRedirect()
        this.fetchSkill()
        this.fetchTests()
        this.fetchExperience()
        this.fetchPersonal()
        this.fetchContact()
    },

    components: {
        Updater
    }

  }

</script>