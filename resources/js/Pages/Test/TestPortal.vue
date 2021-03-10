<template>
    <div class="bg-gray-100 bg-contain">

        <div class="relative overflow-x-hidden lg:overflow-hidden lg:grid grid-flow-col grid-cols-5 gap-0 w-screen lg:h-screen h-auto">

            <div class="fixed top-0 left-0 w-3/5 p-4 h-screen z-50 lg:z-0 lg:w-full lg:relative hidden lg:block">

                <div class="relative bg-white pr-1 py-4 shadow h-full rounded-xl">

                    <div class="relative overflow-y-auto h-full">
                    
                        <h1 class="sticky -top-4 bg-white flex justify-between items-center mb-6 px-8 py-4 text-pink-800 text-xl font-bold">
                            <i class="fa fa-spinner text-blue-600"></i>
                            Overview
                        </h1>

                        <inertia-link href="/">
                            <div class="bg-gradient-to-r hover:border-blue-400 border-transparent border-l-4 hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-16 pr-4 flex items-center text-xl transition-all duration-700">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa fa-globe"></i>
                                </span>
                                <span class="text-xl">
                                    Home
                                </span>
                            </div>
                        </inertia-link>

                        <a href="#" @click.prevent="logoutUser" class="bg-gradient-to-r hover:border-red-400 border-transparent border-l-4 hover:from-red-100 hover:to-transparent hover:text-red-600 text-gray-600 py-4 pl-16 pr-4 flex items-center text-xl transition-all duration-700">
                            <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                <i class="fa fa-power-off"></i>
                            </span>
                            <span class="text-xl">
                                Logout
                            </span>
                        </a>
                        
                        <!-- Checks if mandatory information have been updated -->
                        <h1 class="sticky -top-4 bg-white flex justify-between items-center mb-6 mt-6 px-8 py-4 text-pink-800 text-xl font-bold">
                            <i class="far fa-bell text-red-600"></i>
                            Test Score Legend
                        </h1>

                        <div class="">

                            <div class="bg-gradient-to-r hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-16 pr-4 flex items-center">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa w-4 h-4 rounded-full bg-red-500"></i>
                                </span>
                                <span class="text-xl">
                                    Fail
                                </span>
                            </div>

                            <div class="bg-gradient-to-r hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-16 pr-4 flex items-center">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa w-4 h-4 rounded-full bg-yellow-500"></i>
                                </span>
                                <span class="text-xl">
                                    Pass
                                </span>
                            </div>

                            <div class="bg-gradient-to-r hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-16 pr-4 flex items-center">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa w-4 h-4 rounded-full bg-green-500"></i>
                                </span>
                                <span class="text-xl">
                                    Good
                                </span>
                            </div>

                            <div class="bg-gradient-to-r hover:from-blue-100 hover:to-transparent hover:text-blue-600 text-gray-600 py-4 pl-16 pr-4 flex items-center">
                                <span class="flex justify-center items-center mr-8 w-8 h-8 rounded-full shadow">
                                    <i class="fa w-4 h-4 rounded-full bg-blue-500"></i>
                                </span>
                                <span class="text-xl">
                                    Excellent
                                </span>
                            </div>
                            
                            <div class="p-8 text-blue-600">
                                Where do you belong?
                            </div>

                        </div>
                        
                    </div>

                </div>
                
            </div>
            
            <div class="relative p-4 lg:h-screen h-auto col-span-3">

                <div class="relative pb-16 h-full">

                    <div class="relative invisible-scrollbar overflow-y-auto h-full">
                        
                        <div class="sticky top-0 z-50 mb-4 mx-1 bg-white rounded-xl overflow-hidden shadow">

                            <div class="flex items-center justify-between py-4 px-8 bg-white shadow">
                                
                                <h1 class="text-xl font-bold uppercase text-blue-600">
                                    Career Strive Test Portal
                                </h1>

                                <span class="text-black">
                                    <i class="fa h-4 w-4 bg-green-600 rounded-full"></i>
                                </span>

                            </div>

                            <div class="relative h-full">

                                <div class="relative flex justify-between w-full px-8 py-4 lg:py-4">
                                    
                                    <div class="text-lg">
                                        Score <span class="ml-4 text-gray-600"> {{ test.score }}% </span>
                                    </div>

                                    <div class="text-lg">
                                        Remaining <span class="ml-4 text-gray-600">{{ testAccessories.timer }}</span>
                                    </div>

                                    <div class="text-lg">
                                        Status message: <span class="ml-4 text-gray-600">{{ testAccessories.timer_alert_message}}</span>
                                    </div>

                                </div>

                            </div>
                            
                                                
                        </div>

                        <div v-if="testAccessories.questions" class="relative">

                            <div class="relative lg:grid grid-flow-row grid-cols-2 grid-rows-auto gap-4 w-full h-auto px-1 py-4 my-2 mx-auto">
                                
                                <div v-for="question in testAccessories.questions" :key="question.id" class="grid grid-flow-rows grid-cols-1 grid-rows-auto items-stretch gap-4 lg:mt-0 mt-8 overflow-hidden relative rounded-xl shadow bg-white">
                                    
                                    <div class="p-4 text-lg">
                                        
                                        Question: <span class="ml-4 text-gray-600">{{ question.question }}</span>
                                        <div class="mt-4">
                                            <span class="">Options</span>
                                            <p class="p-4">
                                                <label v-for="(option, key) in question.options" :key="option" v-bind:for="question.tag.concat(key)" class="cursor-pointer text-gray-600 p-4 bg-gray-100 my-2 flex items-center rounded-full">
                                                    <input v-bind:id="question.tag.concat(key)" v-model="testAccessories.answerPayload[question.tag]" v-bind:value="key" v-bind:name="question.tag" type="radio" class="mr-4 rounded-full border-4 border-blue-500 border-opacity-50 checked:border-opacity-100"> {{ option }}
                                                </label>                                    
                                            </p>
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>

                    </div>

                    <div v-if="testAccessories.questions" class="absolute bottom-0 w-full z-50 bg-white rounded-xl overflow-hidden shadow">

                        <div class="flex items-center justify-between py-2 px-8 bg-white shadow">
                            
                            <button v-bind:disabled="testAccessories.submission_is_disabled" @click="setSubmissionConfirmationMessage" class="ripple-node text-xl bg-blue-600 px-6 py-3 rounded-xl font-bold uppercase text-blue-200">
                                Submit
                            </button>

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
                                    Test Statistics
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
                                    <i class="fa fa-spinner text-blue-600 mr-4"></i>
                                    Progress Information
                                </h1>

                                <div class="relative my-4 mx-4 py-2 px-4">
                                    
                                    <span class="text-red"> {{ `${testAccessories.answered_questions} / ${testAccessories.total_questions}` }} answered</span>

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

  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  import moment from 'moment/moment'

  export default {

    computed: {
        ...mapState([
            'test',
            'confirmation_modal',
            'testAccessories'
        ])
    },

    methods: {
        ...mapActions([
            'logoutUser',
            'showModal',
            'calculateScore',
            'fetchQuestions',
            'getCurrentDateTime',
            'protectedRouteRedirect'
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
        },

        updateTestTimer() {                
            const available_time = this.testAccessories.timer;
            const time_array = available_time.split(/[:]+/);
            let minutes = time_array[0];
            let seconds = this.formatSeconds(time_array[1] - 1)
            // Save timer value everytime
            // $.post('testTimer_update.php', {minutes: minutes, seconds: seconds}, function(timer_return) {
                
            // });

            if (minutes < 3) {
                this.testAccessories.timer_alert_message = 'Buckle up!'
            }
            
            if (seconds == 59) {minutes = (minutes - 1)} // Reduce minute everytime seconds counts down to 0            
            if (minutes == 0 && seconds == 0) { // If both minutes and seconds are equal to 0, then countdown is done                
                this.testAccessories.timer = '00:00' // Reset available time to 0
                clearTimeout(this.testAccessories.timer_loop);  // Clear timeout for counter
                this.testAccessories.timer_alert_message = 'Time is up!' // Reset timer message
            } else {
                const formatted_minutes = this.formatMinutes(minutes); // Check if minutes is less than 10 and apped a 0 to it
                this.testAccessories.timer = `${formatted_minutes}:${seconds}` // Set available time            
                this.testAccessories.timer_loop = setTimeout(this.updateTestTimer, 1000); // Run timer again after a second                
            }
                
        },

        formatSeconds(sec) {            
            if (sec < 10 && sec >= 0) {sec = "0" + sec}; // Append a zero to seconds
            if (sec < 0) {sec = "59"}; // Reset seconds
            return sec;
        },

        formatMinutes(min) {
            return min.toString().length < 2 ? '0' + min : min
        },

        allAnswered() {
            this.testAccessories.all_questions_answered = true;
        },

        setSubmissionConfirmationMessage() {
            
            this.confirmation_modal.heading = 'Test Submission Notice'
            this.confirmation_modal.source = 'submit'
            this.confirmation_modal.closeable = true
            if (this.testAccessories.all_questions_answered) {
                this.confirmation_modal.message = 'Are you sure you are ready to submit?'
            } else {
                this.confirmation_modal.message = 'You have not answered all questions, do wish to submit?'
            }
            this.showModal()

        },

        submitTest() {
            
            this.testAccessories.submission_is_disabled = true
            clearTimeout(this.testAccessories.timer_loop);  // Clear timeout for counter
            this.testAccessories.timer = '00:00' // Reset available time to 0
            this.calculateScore(this.testAccessories.total_questions)

        },

        testInitialization() {
            
            this.confirmation_modal.source = 'init'
            this.confirmation_modal.message = `You are about to begin your test and you have ${this.testAccessories.timer} minutes for this test.
            If you are ready, you can continue.`
            this.confirmation_modal.heading = 'Test Initialization Notice'
            this.confirmation_modal.action = 'Yes, I am ready'

            this.showModal()

        },

        autoSubmissionAlert() {
            
            this.confirmation_modal.source = 'submit'
            this.confirmation_modal.message = `Your time is up and test will be automatically submitted now.`
            this.confirmation_modal.heading = 'Auto Submission Notice'
            this.confirmation_modal.action = ''
            this.showModal()

            const auto_submission_timeout = setTimeout(() => {
                this.submitTest()
                clearTimeout(auto_submission_timeout)
            }, 2000)
            const auto_close_modal_timeout = setTimeout(() => {
                this.confirmation_modal.close = true
                clearTimeout(auto_close_modal_timeout)
            }, 6000)

        }

    },

    created() {
        this.protectedRouteRedirect()
        setTimeout(this.testInitialization, 1000)
    },

    watch: {
        '$store.state.testAccessories.answerPayload': {    
            deep: true,
            handler(oldState, newState) {
                const total_questions = Object.keys(newState).length
                let answered = 0
                Object.keys(newState).forEach(question => {
                    if (newState[question] !== null) {
                        answered = answered + 1
                    }
                })
                this.testAccessories.answered_questions = answered
                
                if (this.testAccessories.answered_questions == this.testAccessories.total_questions) {
                    this.allAnswered()
                }
            }
        },
        '$store.state.testAccessories.timer': {
            handler(oldTimer, newTimer) {
                if (newTimer == '00:01') {
                    this.autoSubmissionAlert()
                }
            }
        },
        '$store.state.confirmation_modal.triggered': {
            handler(newAction, oldAction) {
                if (newAction == 'init') {
                    this.fetchQuestions()
                    this.updateTestTimer()
                    this.test.started_at = moment().format()

                }
                if (newAction == 'submit') {
                    this.submitTest()
                }
            }
        }
    }

  }

</script>