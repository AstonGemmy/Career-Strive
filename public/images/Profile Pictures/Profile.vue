<template>
    <div class="bg-gray-100 bg-contain">

        <!-- Update Field -->
        <div id="updates" style="z-index:9999" class="fixed z-50 left-2/4 top-16 transform -translate-x-2/4 w-full lg:w-4/12 bg-white rounded-lg overflow-hidden shadow-2xl">
            <personal-update class="update personal hidden" />
            <contact-update class="update contact hidden" />
            <skills-update class="update skills hidden" />
            <experience-update class="update experience hidden" />
        </div>

        <div class="relative overflow-x-hidden lg:overflow-hidden lg:grid grid-flow-col grid-cols-5 gap-0 w-screen lg:h-screen h-auto">

            <div class="fixed top-0 left-0 w-3/5 p-4 h-screen z-50 lg:z-0 lg:w-full lg:relative hidden lg:block">

                <div class="relative bg-white pr-1 py-4 shadow h-full rounded-xl">

                    <div class="relative overflow-y-auto h-full">
                    
                        <h1 class="sticky -top-4 bg-white flex justify-between items-center mb-6 px-8 py-4 text-pink-800 text-xl font-bold">
                            <i class="fa fa-spinner text-blue-600"></i>
                            Overview
                        </h1>

                        <router-link to="/">
                            <div class="bg-gradient-to-r hover:border-blue-400 border-transparent border-l-4 hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-16 pr-4 flex items-center text-xl transition-all duration-700">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa fa-globe"></i>
                                </span>
                                <span class="text-xl">
                                    Home
                                </span>
                            </div>
                        </router-link>

                        <button @click="checkTestEligibilityStatus" class="bg-gradient-to-r hover:border-blue-400 border-transparent border-l-4 hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-16 pr-4 flex items-center text-xl transition-all duration-700">
                            <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                <i class="fa fa-chart-bar"></i>
                            </span>
                            <span class="text-xl">
                                Take Test
                            </span>
                        </button>

                        <!-- <?php echo $testStatus_indicator; ?> -->
                        
                        <a href="#" @click.prevent="logoutUser" class="bg-gradient-to-r hover:border-red-400 border-transparent border-l-4 hover:from-red-100 hover:to-transparent hover:text-red-600 text-gray-600 py-4 pl-16 pr-4 flex items-center text-xl transition-all duration-700">
                            <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                <i class="fa fa-power-off"></i>
                            </span>
                            <span class="text-xl">
                                Logout
                            </span>
                        </a>
                        
                        <!-- Checks if mandatory information have been updated -->
                        <h1 class="sticky -top-4 bg-white flex justify-between items-center mb-6 px-8 py-4 text-pink-800 text-xl font-bold">
                            <i class="far fa-bell text-red-600"></i>
                            Notice
                        </h1>

                        <div v-for="(value, key) in update_status" :key="key" class="">
                            <div v-if="value" class="bg-gradient-to-r hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-16 pr-4 flex items-center">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa fa-check text-green-400"></i>
                                </span>
                                <span class="text-xl">
                                    {{ getProperFormat(key) }}
                                </span>
                            </div>
                            <div v-else class="bg-gradient-to-r hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-16 pr-4 flex items-center">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa fa-times text-red-400"></i>
                                </span>
                                <span class="text">
                                    Update <span class="text-pink-800"> {{ key }} </span> information.
                                </span>                                
                            </div>
                        </div>
                        
                    </div>

                </div>
                
            </div>
            
            <div class="relative p-4 lg:h-screen h-auto col-span-3">

                <div class="relative h-full">

                    <div class="relative invisible-scrollbar overflow-y-auto h-full">
                        
                        <div class="relative mb-4 mx-1 bg-white rounded-xl overflow-hidden shadow">

                            <div class="flex items-center justify-between py-4 px-8 bg-white shadow">
                                
                                <h1 class="text-xl font-bold uppercase text-blue-600">
                                    {{ output.personal.name }}
                                </h1>

                                <span class="text-black">
                                    <i v-if="personal.status == true" class="fa h-4 w-4 bg-green-600 rounded-full"></i>
                                    <i v-else class="fa h-4 w-4 bg-red-400 rounded-full shadow"></i>
                                </span>

                            </div>

                            <div class="relative h-full">
                                
                                <div class="relative h-32 lg:h-36 w-full">
                                    <img v-if="personal.cover_photo_path" v-bind:src="'/images/profile pictures/' + personal.cover_photo_path" class="w-full h-full">
                                    <img v-else src="/images/cover pictures/default-cover-photo.png" class="w-full h-full">
                                </div>

                                <div class="relative w-full pt-24 py-4 lg:py-4">
                                    
                                    <div class="flex mx-8 lg:ml-56">

                                        <div class="flex p-2 bg-blue-100 rounded-full">

                                            <span class="flex justify-center flex-col px-4 text-black bg-blue-400 rounded-full mr-4">
                                                <span class="text-white font-medium uppercase text-center">
                                                    Test Scores
                                                </span>
                                            </span>
                                            
                                            <span class="flex justify-center flex-col w-12 h-12 bg-blue-300 rounded-full mr-4">
                                                <span class="text-blue-800 text-center">
                                                    <span v-if="test.score">
                                                        {{ test.score }}
                                                    </span>
                                                </span>
                                            </span>

                                            <span class="flex justify-center flex-col w-12 h-12 bg-red-300 rounded-full mr-4">
                                                <span class="text-red-800 text-center">
                                                    100
                                                </span>
                                            </span>

                                            <span class="flex justify-center flex-col w-12 h-12 bg-yellow-300 rounded-full mr-4">
                                                <span class="text-yellow-800 text-center">
                                                    120
                                                </span>
                                            </span>

                                            <span class="flex justify-center flex-col w-12 h-12 bg-green-300 rounded-full mr-4">
                                                <span class="text-green-800 text-center">
                                                    150
                                                </span>
                                            </span>

                                            <span class="flex justify-center flex-col text-2xl w-12 h-12 text-white bg-blue-400 rounded-full">
                                                <i class="fa fa-plus text-center"></i>
                                            </span>

                                        </div>

                                    </div>

                                    <div class="mt-3 mb-2 mx-8 p-2 text-lg text-gray-700 text-center">
                                        {{ personal.bio }}
                                    </div>

                                </div>

                            </div>
                            
                            <div class="bg-white shadow ring-8 ring-gray-100 ring-offset-8 absolute transform -translate-x-2/4 left-2/4 lg:-translate-x-0 lg:left-16 top-24 w-36 h-36 rounded-full">
                                <img v-bind:src="'/images/profile pictures/' + personal.profile_photo_path" class="overflow-hidden bg-white w-full h-full rounded-full">
                                <!-- <img src="images/profile pictures/male-avatar.png" class="overflow-hidden bg-white w-full h-full rounded-full"> -->
                                <button @click.prevent="$refs.profile_photo_input.click()" class="absolute flex justify-center items-center bg-blue-400 w-12 h-12 rounded-full z-50 -left-6 -bottom-4">
                                    <i class="fa fa-camera text-xl text-white"></i>
                                </button>
                                <!-- Profile Photo Update -->
                                <input class="hidden" ref="profile_photo_input" @change.prevent="updateProfilePhoto" accept="image/*" type="file">
                                <!-- Profile Photo Update Ends -->
                            </div>
                                                
                        </div>

                        <div class="relative">

                            <div class="relative lg:grid grid-flow-col grid-cols-2 grid-rows-2 gap-4 w-full h-auto px-1 py-4 my-2 mx-auto">
                                
                                <div class="grid grid-flow-rows grid-cols-1 grid-rows-6 items-stretch gap-4 lg:mt-0 mt-8 overflow-hidden relative rounded-xl shadow bg-white">
                                    <h1 class="row-span-1 uppercase flex justify-between items-center py-3 px-8">
                                        <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                            <i class="fa fa-user text-yellow-500"></i>
                                        </span>
                                        <span class="text-blue-700 text-xl">
                                            Personal Details
                                        </span>
                                    </h1>

                                    <div class="row-span-4">
                                        <div v-for="(value, key) in output.personal" :key="key" class="px-6 pt-4">
                                            <div class="text-xl text-gray-600">
                                                {{ getProperFormat(value) }}
                                            </div>
                                            <div class="text-lg text-black">
                                                {{ keyToProperFormat(key) }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row-span-1 uppercase w-full flex items-center justify-between border-t-2 border-gray-100 text-xl text-green-600 px-6 py-4">
                                        <button @click="showUpdater('personal')" class="uppercase mr-4">
                                            Edit
                                        </button>
                                        <div class="flex justify-between overflow-y-hidden overflow-x-auto text-sm">
                                            <div v-for="(value, key) in personal" :key="key + 'p-check'" class="mr-4">
                                                <div v-if="!value">
                                                    <span class="text-gray-600 py-4">
                                                        {{ keyToProperFormat(key) }}
                                                    </span>
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
                                        <span class="text-blue-700 text-xl">
                                            Contact Details
                                        </span>
                                    </h1>

                                    <div class="row-span-4">
                                        <div v-for="(value, key) in output.contact" :key="key" class="px-6 pt-4">
                                            <div class="text-xl text-gray-600">
                                                {{ getProperFormat(value) }}
                                            </div>
                                            <div class="text-lg text-black">
                                                {{ keyToProperFormat(key) }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row-span-1 uppercase w-full flex items-center justify-between border-t-2 border-gray-100 text-xl text-green-600 px-6 py-4">
                                        <button @click="showUpdater('contact')" class="uppercase mr-4">
                                            Edit
                                        </button>
                                        <div class="flex justify-between overflow-y-hidden overflow-x-auto text-sm">
                                            <div v-for="(value, key) in contact" :key="key + 'c-check'" class="mr-4">
                                                <div v-if="!value">
                                                    <span class="text-gray-600 py-4">
                                                        {{ keyToProperFormat(key) }}
                                                    </span>
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
                                        <span class="text-blue-700 text-xl">
                                            Work Experience & Qualifications
                                        </span>
                                    </h1>

                                    <div class="row-span-4">
                                        <div v-for="(value, key) in output.experiences" :key="key" class="px-6 pt-4">
                                            <div class="text-xl text-gray-600">
                                                {{ getProperFormat(value) }}
                                            </div>
                                            <div class="text-lg text-black">
                                                {{ keyToProperFormat(key) }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row-span-1 uppercase w-full flex items-center justify-between border-t-2 border-gray-100 text-xl text-green-600 px-6 py-4">
                                        <button @click="showUpdater('experience')" class="uppercase mr-4">
                                            Edit
                                        </button>
                                        <div class="flex justify-between overflow-y-hidden overflow-x-auto text-sm">
                                            <div v-for="(value, key) in experiences" :key="key + 'e-check'" class="mr-4">
                                                <div v-if="!value">
                                                    <span class="text-gray-600 py-4">
                                                        {{ keyToProperFormat(key) }}
                                                    </span>
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
                                        <span class="text-blue-700 text-xl">
                                            Skills Level
                                        </span>
                                    </h1>
                                
                                    <div class="row-span-4">
                                        <div v-for="(value, key) in output.skills" :key="key" class="px-6 pt-4">
                                            <div class="text-xl text-gray-600">
                                                {{ getProperFormat(value) }}
                                            </div>
                                            <div class="text-lg text-black">
                                                {{ keyToProperFormat(key) }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row-span-1 uppercase w-full flex items-center justify-between border-t-2 border-gray-100 text-xl text-green-600 px-6 py-4">
                                        <button @click="showUpdater('skills')" class="uppercase mr-4">
                                            Edit
                                        </button>
                                        <div class="flex justify-between overflow-y-hidden overflow-x-auto text-sm">
                                            <div v-for="(value, key) in skills" :key="key + 's-check'" class="mr-4">
                                                <div v-if="!value">
                                                    <span class="text-gray-600 py-4">
                                                        {{ keyToProperFormat(key) }}
                                                    </span>
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

            <div class="relative p-4 lg:h-screen h-auto">

                <div class="bg-white h-full px-0 pb-4 rounded-xl shadow">

                    <div class="relative h-full pr-1 py-2">

                        <div class="relative h-full overflow-x-hidden px-2">

                            <div class="relative">
                                    
                                <h1 class="sticky z-10 text-xl text-blue-600 -top-2 px-8 py-4 bg-white border-b border-gray-100 border-1">
                                    <i class="fa fa-spinner text-blue-600 mr-4"></i>
                                    Job Opening
                                </h1>

                                <div class="relative my-4 mx-4 py-2 px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Computer Hardware/software
                                    </h2>

                                    <ul class="py-2 px-4 text-gray-500">
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

                                <h1 class="sticky z-10 text-xl text-blue-600 -top-2 px-8 py-4 bg-white border-b border-gray-100 border-1">
                                    <i class="fa fa-clock text-blue-600 mr-4"></i>
                                    Info Section
                                </h1>

                                <div class="relative my-4 mx-4 py-2 px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Public Administration
                                    </h2>

                                    <ul class="py-2 px-4 text-gray-500">
                                        <li class="py-2 px-4">Public adminstrator</li>
                                        <li class="py-2 px-4">Financial secretary</li>
                                        <li class="py-2 px-4">Front desk operator</li>
                                    </ul>

                                </div>

                                <div class="relative my-4 mx-4 py-2 px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Sales and marketing
                                    </h2>

                                    <ul class="py-2 px-4 text-gray-500">
                                        <li class="py-2 px-4">Senior sales manager</li>
                                        <li class="py-2 px-4">Marketing manager</li>
                                    </ul>

                                </div>

                            </div>

                            <div class="relative">

                                <h1 class="sticky z-10 text-xl text-blue-600 -top-2 px-8 py-4 bg-white border-b border-gray-100 border-1">
                                    <i class="fa fa-car text-blue-600 mr-4"></i>
                                    Travels
                                </h1>

                                <div class="relative my-4 mx-4 py-2 px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Human resource
                                    </h2>

                                    <ul class="py-2 px-4 text-gray-500">
                                        <li class="py-2 px-4">Human resource personnel</li>
                                    </ul>

                                </div>

                                <div class="relative my-4 mx-4 py-2 px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Industrial safety
                                    </h2>

                                    <ul class="py-2 px-4 text-gray-500">
                                        <li class="py-2 px-4">Fire systems operator</li>
                                        <li class="py-2 px-4">Safety personnel</li>
                                        <li class="py-2 px-4">Field director/supervisor</li>
                                    </ul>

                                </div>

                            </div>

                            <div class="relative">

                                <h1 class="sticky z-10 text-xl text-blue-600 -top-2 px-8 py-4 bg-white border-b border-gray-100 border-1">
                                    <i class="fa fa-wine-glass text-blue-600 mr-4"></i>
                                    Restaurants
                                </h1>

                                <div class="relative my-4 mx-4 py-2 px-4">
                                    
                                    <h2 class="py-2 px-4 text-gray-700">
                                        Others
                                    </h2>

                                    <ul class="py-2 px-4 text-gray-500">
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
    import PersonalUpdate from './PersonalUpdate.vue'
    import SkillsUpdate from './SkillsUpdate.vue'
    import ContactUpdate from './ContactUpdate.vue'
    import ExperienceUpdate from './ExperienceUpdate.vue'

  export default {

    computed: {
        ...mapState([
            'test',
            'output',
            'skills',
            'personal',
            'experiences',
            'contact',
            'update_status'
        ]),
        ...mapGetters([
            
        ])
    },

    methods: {
        ...mapActions([
            'logoutUser',
            'redirectAuthenticated',
            'fetchTests',
            'fetchSkills',
            'fetchContacts',
            'fetchPersonal',
            'fetchExperiences',
            'showUpdater',
            'updateProfilePhoto',
            'checkTestEligibilityStatus'
        ]),

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
        }

    },

    created() {
        this.redirectAuthenticated({intended: ''})
        this.fetchTests()
        this.fetchSkills()
        this.fetchContacts()
        this.fetchPersonal()
        this.fetchExperiences()
    },

    components: {
        PersonalUpdate,
        SkillsUpdate,
        ContactUpdate,
        ExperienceUpdate
    }

  }

</script>