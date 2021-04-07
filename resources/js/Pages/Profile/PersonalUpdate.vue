<template>
    <!-- CV Box -->
    <div>
        
        <div class="relative flex justify-between px-6 py-3 border-b-2 border-gray-100 text-blue-600 text-xl uppercase">
            <h1 class="">
                <i class="fa fa-user mr-3"></i>
                Update Personal information
            </h1>
            <span class="flex justify-center items-center h-6 w-6 bg-white rounded-full cursor-pointer" @click.prevent="closeUpdaters">
                <i class="fa text-red-400 fa-times"></i>
            </span>
        </div>

        <div class="relative text-center w-full" v-bind:class="{ 'text-green-700 bg-green-200 px-2 md:px-8 py-2': feedbackStyle.personal.success, 'text-red-700 bg-red-200 px-8 py-2': feedbackStyle.personal.error }">{{ feedbackMessages.personal }}</div>
        
        <form method="POST" @submit.prevent="updatePersonal" class="relative md:px-8 h-full">
            
            <div class="relative py-8 md:p-8 h-full">
                
                <div class="relative top-auto left-auto pt-4 px-0 md:p-8 overflow-x-hidden overflow-y-auto invisible-scrollbar h-144 mx-4 text-pink-800">
                    
                    <div class="w-full mb-2 mx-auto text-xl text-blue-600">
                        
                        <div class="p-4">
                            <TextInput v-for="item in Experience" :key="item.id" :options="item.options" :type="item.type" :value="item.value" v-model="item.value" :title="item.title" :id="item.id" :placeholder="item.placeholder" />
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
    import TextInput from '../../Components/Common/TextInput.vue'

  export default {

    data() {
        
    },

    computed: {
        ...mapState([
            'gender',
            'personal',
            'contact',
            'job_opening',
            'experience_duration',
            'qualifications',
            'experiences',
            'experience_level',
            'experience_strength',            
            'skills',
            'feedbackStyle',
            'feedbackMessages'
        ]),
        Personal() {
            return [
                {
                    id: 'name',
                    type: 'text',
                    placeholder: 'Name',
                    title: 'Name',
                    value: this.personal.name
                },
                {
                    id: 'gender',
                    type: 'select',
                    options: this.gender,
                    title: 'Gender',
                    value: this.personal.gender
                },
                {
                    id: 'date-of-birth',
                    type: 'text',
                    placeholder: 'DD//MM/YYYY',
                    title: 'Date of Birth',
                    value: this.personal.date_of_birth
                },
                {
                    id: 'email',
                    type: 'email',
                    placeholder: '@',
                    title: 'Email',
                    value: this.personal.email
                },
                {
                    id: 'bio',
                    type: 'textarea',
                    placeholder: 'Bio',
                    title: 'Bio',
                    value: this.personal.bio
                }
            ]
        },
        Contact() {
            return [
                {
                    id: 'country',
                    type: 'text',
                    placeholder: 'Country',
                    title: 'Country',
                    value: this.contact.country
                },
                {
                    id: 'gender',
                    type: 'text',
                    placeholder: 'State',
                    title: 'State',
                    value: this.contact.state
                },
                {
                    id: 'address',
                    type: 'text',
                    placeholder: 'Address',
                    title: 'Address',
                    value: this.contact.address
                },
                {
                    id: 'phone',
                    type: 'text',
                    placeholder: 'Phone',
                    title: 'Phone',
                    value: this.contact.phone
                }
            ]
        },
        Experience() {
            return [
                {
                    id: 'work-experience',
                    type: 'select',
                    options: this.job_opening,
                    title: 'Work Experience',
                    value: this.experiences.job
                },
                {
                    id: 'duration',
                    type: 'select',
                    options: this.experience_duration,
                    title: 'Work Experience Duration Duration academy',
                    value: this.experiences.duration
                },
                {
                    id: 'qualification',
                    type: 'select',
                    options: this.qualifications,
                    title: 'Qualification',
                    value: this.experiences.qualification
                }
            ]
        },
        Skills() {
            return [
                {
                    id: 'time-management',
                    type: 'select',
                    options: this.experience_level,
                    title: 'Time Management',
                    value: this.skills.time_management
                },
                {
                    id: 'team-work',
                    type: 'select',
                    options: this.experience_level,
                    title: 'Team Work',
                    value: this.skills.team_work
                },
                {
                    id: 'problem-solving',
                    type: 'select',
                    options: this.experience_strength,
                    title: 'Problem Solving',
                    value: this.skills.problem_solving
                },
                {
                    id: 'customer-service',
                    type: 'select',
                    options: this.experience_strength,
                    title: 'Customer Service',
                    value: this.skills.customer_service
                }
            ]
        }
    },

    methods: {
        ...mapActions([
            'updatePersonal',
            'closeUpdaters'
        ])
    
    },

    components: { TextInput }

  }

</script>