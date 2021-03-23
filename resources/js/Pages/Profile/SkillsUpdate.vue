<template>
    <div>
        
        <div class="relative flex justify-between px-6 py-3 border-b-2 border-gray-100 text-blue-600 text-xl uppercase">
            <h1 class="">
                <i class="fa fa-brain mr-3"></i>
                Update Skills information
            </h1>
            <span class="flex justify-center items-center h-6 w-6 bg-white rounded-full cursor-pointer" @click.prevent="closeUpdaters">
                <i class="fa text-red-400 fa-times"></i>
            </span>
        </div>
        
        <div class="relative text-center w-full" v-bind:class="{ 'text-green-700 bg-green-200 px-8 py-2': feedbackStyle.skills.success, 'text-red-700 bg-red-200 px-8 py-2': feedbackStyle.skills.error }">{{ feedbackMessages.skills }}</div>

        <form method="POST" @submit.prevent="updateSkills" class="relative md:px-8 h-full">
            
            <div class="relative py-8 md:p-8 h-full">
                
                <div class="relative top-auto left-auto pt-4 px-0 md:p-8 overflow-x-hidden overflow-y-auto invisible-scrollbar h-144 mx-4 text-pink-800">
                    
                    <div class="w-full mb-2 mx-auto text-xl text-blue-600">
                        
                        <div class="p-4">
                            
                            <div class="relative">                        
                                <label for="time-management" class="absolute left-3 flex justify-start w-3/4 items-center text-gray-900 rounded-full bg-gray-100 px-3 py-1 shadow transition-all ease-in-out">
                                    <i class="fa rounded-full w-4 h-4 mr-2 bg-gray-100 border-white shadow"></i>
                                    Time Management
                                </label>
                                <select v-model="skills.time_management" class="text-xl p-4 focus:ring-pink-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" id="time-management">
                                    <option v-for="time_management in experience_level" :key="time_management">{{ time_management }}</option>
                                </select>
                            </div>

                            <div class="relative mt-14">                        
                                <label for="team-work" class="absolute left-3 flex justify-start w-3/4 items-center text-gray-900 rounded-full bg-gray-100 px-3 py-1 shadow transition-all ease-in-out">
                                    <i class="fa rounded-full w-4 h-4 mr-2 bg-gray-100 border-white shadow"></i>
                                    Team Work
                                </label>
                                <select v-model="skills.team_work" class="text-xl p-4 focus:ring-pink-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" id="team-work">
                                    <option v-for="team_work in experience_level" :key="team_work">{{ team_work }}</option>
                                </select>
                            </div>

                            <div class="relative mt-14">                        
                                <label for="problem-solving" class="absolute left-3 flex justify-start w-3/4 items-center text-gray-900 rounded-full bg-gray-100 px-3 py-1 shadow transition-all ease-in-out">
                                    <i class="fa rounded-full w-4 h-4 mr-2 bg-gray-100 border-white shadow"></i>
                                    Problem Solving
                                </label>
                                <select v-model="skills.problem_solving" class="text-xl p-4 focus:ring-pink-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" id="problem-solving">
                                    <option v-for="problem_solving in experience_strength" :key="problem_solving">{{ problem_solving }}</option>
                                </select>
                            </div>

                            <div class="relative mt-14">                        
                                <label for="customer-skill" class="absolute left-3 flex justify-start w-3/4 items-center text-gray-900 rounded-full bg-gray-100 px-3 py-1 shadow transition-all ease-in-out">
                                    <i class="fa rounded-full w-4 h-4 mr-2 bg-gray-100 border-white shadow"></i>
                                    Customer Skill
                                </label>
                                <select v-model="skills.customer_service" class="text-xl p-4 focus:ring-pink-300 w-full rounded-full outline-none border-0 focus: shadow-xl bg-transparent" id="customer-skill">
                                    <option v-for="customer_service in experience_strength" :key="customer_service">{{ customer_service }}</option>
                                </select>
                            </div>

                        </div>

                    </div>
                    
                </div>
                
            </div>
            
            <div class="px-6 py-4 border-t-2 border-gray-100">
                
                <button class="relative border-pink-800 bg-blue-600 text-white rounded-lg shadow text-xl px-6 py-2 mr-4" type="submit">Save</button>
                
            </div>
        
        </form>
    </div>
    <!-- CV Box Ends -->
</template>

<script>

    import { mapState, mapActions } from 'vuex'

  export default {

    computed: {
        ...mapState([
            'experience_level',
            'experience_strength',            
            'skills',
            'feedbackStyle',
            'feedbackMessages'
        ])
    },

    methods: {
        ...mapActions([
            'updateSkills',
            'closeUpdaters'
        ])
    }

  }

</script>