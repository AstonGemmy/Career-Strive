<template>
    <!-- Update Field -->
    <div v-if="updater.target" :class="toggleUpdater" class="fixed z-50 left-2/4 top-16 transform -translate-x-2/4 w-4/5 md:w-3/5 xl:w-4/12 bg-white rounded-lg overflow-hidden shadow-2xl">
        
        <div class="relative flex justify-between px-6 py-3 border-b-2 border-gray-100 text-blue-600 text-xl uppercase">
            <h1 class="">
                <i class="fa fa-user mr-3"></i>
                {{ getProperFormat(updater.target) }}
            </h1>
            <span class="flex justify-center items-center h-6 w-6 bg-white rounded-full cursor-pointer" @click.prevent="closeUpdaters">
                <i class="fa text-red-400 fa-times"></i>
            </span>
        </div>

        <div :class="toggleFeedbackStyles" class="relative text-center w-full px-2 md:px-8 py-2">
            {{ feedbackMessages[updater.target] }}
        </div>
        
        <form method="POST" @submit.prevent="updateTarget" class="relative md:px-8 h-full">
            
            <div class="relative py-8 md:p-8 h-full">
                
                <div class="relative top-auto left-auto pt-4 px-0 md:p-8 overflow-x-hidden overflow-y-auto invisible-scrollbar h-144 mx-4 text-pink-800">
                    
                    <div class="w-full mb-2 mx-auto text-xl text-blue-600">
                        
                        <div class="p-4">
                            <TextInput v-for="item in Payload[updater.target]" :key="item.id" :options="item.options" :type="item.type" :value="item.value" v-model="item.value" :title="item.title" :id="item.id" :placeholder="item.placeholder" />
                        </div>
                        
                    </div>

                </div>
                
            </div>
            
            <div class="px-6 py-4 border-t-2 border-gray-100">
                
                <button class="relative border-pink-800 bg-blue-600 text-white rounded-lg shadow text-xl px-6 py-2 mr-4" type="submit">Save</button>
                
            </div>
        
        </form>
    </div>
</template>

<script>

    import { mapState, mapActions } from 'vuex'
    import TextInput from '../Common/TextInput.vue'

  export default {

    computed: {
        ...mapState([
            'updater',
            'gender',
            'personal',
            'contact',
            'job_opening',
            'experience_duration',
            'qualifications',
            'experience',
            'experience_level',
            'experience_strength',            
            'skill',
            'feedbackStyle',
            'feedbackMessages'
        ]),

        toggleUpdater() {
            return this.updater.modal ? 'block' : 'hidden'
        },

        toggleFeedbackStyles() {
            return this.feedbackStyle[this.updater.target].success ? 'text-green-700 bg-green-200' : this.feedbackStyle[this.updater.target].error ? 'text-red-700 bg-red-200' : ''
        },

        Payload() {
            return {
                personal: [
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
                ],

                contact: [
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
                ],

                experience: [
                    {
                        id: 'work-experience',
                        type: 'select',
                        options: this.job_opening,
                        title: 'Work Experience',
                        value: this.experience.job
                    },
                    {
                        id: 'duration',
                        type: 'select',
                        options: this.experience_duration,
                        title: 'Work Experience Duration Duration academy',
                        value: this.experience.duration
                    },
                    {
                        id: 'qualification',
                        type: 'select',
                        options: this.qualifications,
                        title: 'Qualification',
                        value: this.experience.qualification
                    }
                ],

                skill: [
                    {
                        id: 'time-management',
                        type: 'select',
                        options: this.experience_level,
                        title: 'Time Management',
                        value: this.skill.time_management
                    },
                    {
                        id: 'team-work',
                        type: 'select',
                        options: this.experience_level,
                        title: 'Team Work',
                        value: this.skill.team_work
                    },
                    {
                        id: 'problem-solving',
                        type: 'select',
                        options: this.experience_strength,
                        title: 'Problem Solving',
                        value: this.skill.problem_solving
                    },
                    {
                        id: 'customer-service',
                        type: 'select',
                        options: this.experience_strength,
                        title: 'Customer Service',
                        value: this.skill.customer_service
                    }
                ]
            }
        },
    },

    methods: {
        ...mapActions([
            'updateSkill',
            'updateContact',
            'updatePersonal',
            'updateExperience',
            'closeUpdaters'
        ]),

        getProperFormat(value) {
            if (value !== null) {
                value = value.split(' ');
                value = value.map(word => { 
                    return word[0].toUpperCase() + word.slice(1);
                }).join(" ");
                return value
            }
        },

        updateTarget() {
            if (this.updater.target) {
                const targetAction = 'update' + this.getProperFormat(this.updater.target)
                this[targetAction]()
            }
        }
    
    },

    components: { TextInput }

  }

</script>