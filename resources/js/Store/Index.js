import { createStore } from 'vuex';

const store = createStore({
   
   state: {
      authUser: window.AuthUser,
      loginState: false,
      isLoading: false,
      overlay: false,
      modal: false,
      updater: {
         target: null,
         modal: false
      },
      output: {
         personal: {},
         skill: {},
         contact: {},
         experience: {},
      },
      skill: {},
      test: {
         score: 0
      },
      contact: {},
      personal: {},
      experience: {},
      feedbackStyle: {},
      update_status: {
         skill: false,
         contact: false,
         personal: false,
         experience: false
      },
      update_before: {
         skill: false,
         contact: false,
         personal: false,
         experience: false
      },
      feedbackMessages: {
         login: null,
         register: null,
         email_verification: null,
         test: null,
         skill: null,
         contact: null,
         personal: null,
         experience: null,
         global_alert: null
      },
      job_opening: [
         'Service design manager',
         'Computer operator',
         'Systems design architect',
         'Hardware service manager',
         'ICT cordinator',
         'Computer analyst',
         'Software engineer',
         'Public adminstrator',
         'Financial secretary',
         'Senior sales manager',
         'Marketing manager',
         'Human resource personnel',
         'Fire systems operator',
         'Safety personnel',
         'Field director/supervisor',
         'Technical partner',
      ],   
      experience_duration: [
         'Less than one year',
         '1 year',
         '2 years',
         '3 years',
         '4 years',
         '5 years',
         'Greater than 5 years'
      ],
      qualifications: ['PHD','Doctorate','Masters','Degree','HND','OND','SSCE','FSLC'],
      experience_level: ['Not experienced','Less experienced','Reasonably experienced','Experienced','Very experienced','Expert'],
      experience_strength: ['Low','Good','Very Good','Excellent'],
      gender: ['Select', 'Male', 'Female'],
      confirmation_modal: {
         source: null,
         triggered: null,
         heading: null,
         message: null,
         action: null,
         closeable: false,
         close: false
      },
      testAccessories: {
         timer: "00:25",
         timer_loop: '',
         timer_alert_message: 'Enough time remaining!',
         submission_is_disabled: false,
         all_questions_answered: false,
         questions: null,
         answered_questions: 0,
         total_questions: 0,
         answerPayload: {
            question_one: null,
            question_two: null,
            question_three: null,
            question_four: null,
            question_five: null,
            question_six: null,
         }
      }

   },
   
   getters: {
      
      getAuthUserFirstname: state => {
         return state.authUser.name.split(' ')[0]
      },
      
      properCase: state => {
         return state.authUser.name.charAt(0).toUpperCase() + state.authUser.name.slice(1);
      },

      getProperFormat: state => {
         return state.updater.target.charAt(0).toUpperCase() + state.updater.target.slice(1);
      },

      targetObjectIsEmpty: state => {
         let set_object_field_length = 0;
         Object.keys(state[state.updater.target]).forEach(key => {
            if (key !== 'id' && key !== 'status') {
               if (state[state.updater.target][key] == '' || state[state.updater.target][key] == undefined || state[state.updater.target][key] == null) {
                  set_object_field_length = set_object_field_length + 1;
               }
            }
         })
         if (set_object_field_length == Object.keys(state[state.updater.target]).length - 1) { // Completely empty
            return true
         } else {
            return false
         }
      },

      getMandatoryUpdateStatus: state => {
         let def_val = true;
         Object.keys(state.update_status).forEach(key => {
            if (state.update_status[key] === false) {
               def_val = false;
            }
         })
         return def_val
      }
   
   },
   
   mutations: {

      setAuthUser(state, payload) {
         state.authUser = {...payload}
      },

      setLoader(state, val) {
         state.isLoading = val;
      },

      setUpdater(state, {target, status}) {
         if (!target) {
            state.updater.target = null
            state.updater.modal = false
            return
         }         
         state.updater.target = target
         state.updater.modal = status
      },

      setOverlay(state, val) {
         state.overlay = false
         state.overlay = val
      },

      setModal(state, val) {
         state.modal = false,
         state.modal = val
      },

      setLoginState(state, val) {
         state.loginState = val
      },

      setFeedbackStyleState(state, payload) {
         Object.keys(state.feedbackMessages).forEach(key => {
            state.feedbackStyle[key] = {
               success: null,
               error: null
            }
         })
      },

      setFeedbackStyleError(state, target) {
         state.feedbackStyle[target].success = false
         state.feedbackStyle[target].error = true
      },
      
      setFeedbackStyleSuccess(state, target) {
         state.feedbackStyle[target].success = true
         state.feedbackStyle[target].error = false
      },

      resetFeedbackStyle(state, target) {
         setTimeout(() => {
            state.feedbackStyle[target].error = null
            state.feedbackStyle[target].success = null
         }, 4000)
      },

      setFeedbackMessage(state, {target, message}) {
         state.feedbackMessages[target] = message
      },

      resetFeedbackMessage(state, target) {
         setTimeout(() => {
            state.feedbackMessages[target] = null
         }, 5000)
      },

      setTest(state, payload) {
         state.test = payload
      },

      setSkill(state, payload) {
         state.skill = payload
         const {time_management, team_work, problem_solving, customer_service} = payload
         state.output.skill = {time_management, team_work, problem_solving, customer_service}
      },

      setContact(state, payload) {
         state.contact = payload
         // state conflicts with vuex state keyword, thus the tweak
         // Order is necessary here
         state.output.contact.country = payload.country
         state.output.contact.state = payload.state // Conflict line
         state.output.contact.address = payload.address
         state.output.contact.phone = payload.phone
      },

      setPersonal(state, payload) {
         state.personal = payload
         let {name, email, gender, date_of_birth} = payload
         state.output.personal = {name, email, gender, date_of_birth}
      },

      setUserStatus(state, val) {
         state.personal.status = val
      },

      setExperience(state, payload) {
         state.experience = payload
         let {job, qualification, duration} = payload
         state.output.experience = {job, qualification, duration}
      },

      setUpdateStatus(state, {target, value}) {
         state.update_status[target] = value
      },

      setUpdatedBefore(state, {target, value}) {
         state.update_before[target] = value
      },

      setProfilePhotoPath(state, path) {
         state.personal.profile_photo_path = path
      },

      setLastTimerValue(state, value) {
         state.testAccessories.timer = value
      },

      setTimerMessage(state, message) {
         state.testAccessories.message = message
      }
   
   },
   
   actions: {
      
      // AUTHENTICATION
   
         // Confirms and triggers login state value
         isAuthenticated(context) {
            if (Object.keys(this.state.authUser).length !== 0) {
               context.commit('setLoginState', true)
               return;
            }
            context.commit('setLoginState', false)
         },

         // Destroys session
         async logoutUser(context) {
            const logout = await window.axios.post('/logout')
            .then(response => {
            if (response.data.status == 'success') {
                  context.commit('setLoginState', false)
                  context.dispatch('redirectTo', {intended: '/'})
               }
            })
            .catch(error => {
               context.commit('setLoginState', true)
            })
         },

         // Authenticate User
         async loginUser(context, {login}) {
            context.commit('setLoader', true)
            context.dispatch('addLoader', 'login_loader')
            const attempt_login = await window.axios.post('/authenticate', login)
            .then(response => {
               if (response.data.status == 'success') {
                  context.commit('setLoginState', true)
                  context.dispatch('toggleResponseFeedback', {
                     target: 'login',
                     message: 'Logged in!',
                     type: 'success'
                  })
                  const intended = response.data.intended_url;
                  context.dispatch('redirectTo', {intended});
               } else {
                  context.commit('setLoginState', false)
                  context.dispatch('toggleResponseFeedback', {
                     target: 'login',
                     message: 'The provided credentials do not match our records.',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.commit('setLoginState', false)
               context.dispatch('toggleResponseFeedback', {
                  target: 'login',
                  message: 'Login error!',
                  type: 'error'
               })
            })
            context.commit('setLoader', false)
            context.dispatch('removeLoader', 'login_loader')
         },

      // AUTHENTICATION ENDS

      // REGISTRATION

         // Registers new user
         async registerUser(context, {register}) {
            context.commit('setLoader', true)
            context.dispatch('addLoader', 'register_loader')
            const attempt_registration = await window.axios.post('/api/users', register)
            .then(response => {
               if (response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'register',
                     message: 'Registration successful! A verification email has been sent to your email!',
                     type: 'success'
                  })
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'register',
                     message: 'Registration not successful! Try again later!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'register',
                  message: 'Registration error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
            context.dispatch('removeLoader', 'register_loader')
         },

         // Sends verification message on registration if it fails
         async resendVerificationEmail(context) {
            context.commit('setLoader', true)
            const resend_verification_email = await window.axios.post('/email/verification-notification')
            .then(response => {
               if (response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'email_verification',
                     message: 'A new verification link has been sent to the email address you provided during registration.',
                     type: 'success'
                  })
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'email_verification',
                     message: 'Verification link could not be sent.',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'email_verification',
                  message: 'Verification link error.',
                  type: 'error'
               })
            })
            context.commit('setLoader', false)
         },

      // REGISTRATION ENDS

      // REDIRECTIONS

         // Redirects to a specified route
         redirectTo(context, {intended}) {
            window.location = intended
         },
         
         // Redirects to a specified route if user is authenticated
         redirectAuthenticated(context, {intended}) {
            context.dispatch('isAuthenticated')
            if (this.state.loginState == true) {
               if (intended == '') {
                  return
               }
               context.dispatch('redirectTo', {intended: intended})
            }
            return;
         },

         // Redirects away from protected/unauthorized pages to authentication page if user is not authenticated
         protectedRouteRedirect(context) {
            context.dispatch('isAuthenticated')
            if (this.state.loginState == true) {
               return
            }
            context.dispatch('redirectTo', {intended: '/#/authenticate'});
         },

      // REDIRECTIONS ENDS

      // FETCHES

         // Fetch user skill
         async fetchSkill(context) {
            context.commit('setLoader', true)
            const fetch_skill = await window.axios.get(`/api/skill/${this.state.authUser.id}`)
            .then(response => {
               if (response.status == 200 && response.data.data.length !== 0) {
                  context.commit('setSkill', response.data.data)
                  context.dispatch('isPreviouslyUpdated', 'skill')
                  context.dispatch('isAllFieldsSet', 'skill')
               } else {
                  context.commit('setSkill', {})
               }         
            })
            .catch(error => {
               context.commit('setSkill', {})
            })
            context.dispatch('confirmAndUpdateStatus')
            context.commit('setLoader', false)
         },

         // Fetch user test data and history
         async fetchTests(context) {
            context.commit('setLoader', true)
            const fetch_tests = await window.axios.get(`/api/test/${this.state.authUser.id}`)
            .then(response => {
               if (response.status == 200 && response.data.data.length !== 0) {
                  context.commit('setTest', response.data.data)
               } else {
                  context.commit('setTest', {})
               }
            })
            .catch(error => {
               context.commit('setTest', {})
            })
            context.dispatch('confirmAndUpdateStatus')
         },

         // Fetch user's personal information
         async fetchPersonal(context) {
            context.commit('setLoader', true)
            const fetch_personal = await window.axios.get(`/api/users/${this.state.authUser.id}`)
            .then(response => {
               if (response.status == 200 && response.data.data.length !== 0) {
                  context.commit('setPersonal', response.data.data)
                  context.dispatch('isPreviouslyUpdated', 'personal')
                  context.dispatch('isAllFieldsSet', 'personal')
               } else {
                  context.commit('setPersonal', {})
               }
            })
            .catch(error => {
               context.commit('setPersonal', {})
            })
            context.dispatch('confirmAndUpdateStatus')
            context.commit('setLoader', false)
         },

         // Fetch user contact details
         async fetchContact(context) {
            context.commit('setLoader', true)
            const fetch_contact = await window.axios.get(`/api/contact/${this.state.authUser.id}`)
            .then(response => {
               if (response.status == 200 && response.data.data.length !== 0) {
                  context.commit('setContact', response.data.data)
                  context.dispatch('isPreviouslyUpdated', 'contact')
                  context.dispatch('isAllFieldsSet', 'contact')
               } else {
                  context.commit('setContact', {})
               }
            })
            .catch(error => {
               context.commit('setContact', {})
            })
            context.dispatch('confirmAndUpdateStatus')
            context.commit('setLoader', false)
         },

         // Fetch user experience data
         async fetchExperience(context) {
            context.commit('setLoader', true)
            const fetch_experience = await window.axios.get(`/api/experience/${this.state.authUser.id}`)
            .then(response => {
               if (response.status == 200 && response.data.data.length !== 0) {
                  context.commit('setExperience', response.data.data)
                  context.dispatch('isPreviouslyUpdated', 'experience')
                  context.dispatch('isAllFieldsSet', 'experience')
               } else {
                  context.commit('setExperience', {})
               }
            })
            .catch(error => {
               context.commit('setExperience', {})
            })
            context.dispatch('confirmAndUpdateStatus')
            context.commit('setLoader', false)
         },

      // FETCHES ENDS

      // UPDATES

         // Updates user skill data
         async updateSkill(context) {
            context.commit('setLoader', true)

            const update_skill = await window.axios.put(`/api/skill/${this.state.authUser.id}`, this.state.skill)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'skill',
                     message: 'Skill successfully updated!',
                     type: 'success'
                  })
                  context.dispatch('fetchSkill')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'skill',
                     message: 'Skill not successfully updated!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'skill',
                  message: 'Skill update error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Updates user contact data
         async updateContact(context) {
            context.commit('setLoader', true)
            
            const update_contact = await window.axios.put(`/api/contact/${this.state.authUser.id}`, this.state.contact)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'contact',
                     message: 'Contact successfully updated!',
                     type: 'success'
                  })
                  context.dispatch('fetchContact')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'contact',
                     message: 'Contact not successfully updated!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'contact',
                  message: 'Contact update error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Updates user's personal data
         async updatePersonal(context) {
            context.commit('setLoader', true)
            const update_personal = await window.axios.put(`/api/users/${this.state.authUser.id}`, this.state.personal)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'personal',
                     message: 'Personal successfully updated!',
                     type: 'success'
                  })
                  context.dispatch('fetchPersonal')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'personal',
                     message: 'Personal not successfully updated!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'personal',
                  message: 'Personal update error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Updates user experience data
         async updateExperience(context) {
            context.commit('setLoader', true)

            const update_experience = await window.axios.put(`/api/experience/${this.state.authUser.id}`, this.state.experience)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'experience',
                     message: 'Experience successful updated!',
                     type: 'success'
                  })
                  context.dispatch('fetchExperience')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'experience',
                     message: 'Experience not successfully updated!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'experience',
                  message: 'Experience update error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Updates user profile photo
         async updateProfilePhoto(context, e) {

            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
               return;
            }
            let formData = new FormData();
            formData.append('profile_photo_path', files[0]);

            context.commit('setLoader', true)
            const update_profile_photo = await window.axios.post(`/upload/profile-photo/${this.state.authUser.id}`, formData)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'global_alert',
                     message: 'Profile photo successfully updated!',
                     type: 'success'
                  })
                  context.dispatch('fetchPersonal')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'global_alert',
                     message: 'Profile photo not successfully updated!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'global_alert',
                  message: 'Profile photo update error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Updates user cover photo
         async updateCoverPhoto(context, e) {

            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
               return;
            }
            let formData = new FormData();
            formData.append('cover_photo_path', files[0]);

            context.commit('setLoader', true)
            const update_cover_photo = await window.axios.post(`/upload/cover-photo/${this.state.authUser.id}`, formData)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'global_alert',
                     message: 'Cover photo successfully updated!',
                     type: 'success'
                  })
                  context.dispatch('fetchPersonal')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'global_alert',
                     message: 'Cover photo not successfully updated!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'global_alert',
                  message: 'Cover photo update error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

      // UPDATES ENDS

      // INSERTS
         
         // Adds contact data
         async addContact(context) {
            context.commit('setLoader', true)
            this.state.contact.id = this.state.authUser.id;
            const add_contact = await window.axios.post('/api/contact', this.state.contact)
            .then(response => {
               if (response.status == 201 && response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'contact',
                     message: 'Contact successfully saved!',
                     type: 'success'
                  })
                  context.dispatch('fetchContact')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'contact',
                     message: 'Contact not successfully saved!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'contact',
                  message: 'Contact saving error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Adds skill data
         async addSkill(context) {
            context.commit('setLoader', true)

            this.state.skill.id = this.state.authUser.id;

            const add_skill = await window.axios.post('/api/skill', this.state.skill)
            .then(response => {
               if (response.status == 201 && response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'skill',
                     message: 'Skill successfully saved!',
                     type: 'success'
                  })
                  context.dispatch('fetchSkill')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'skill',
                     message: 'Skill not successfully saved!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'skill',
                  message: 'Skill saving error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Adds test records
         async addTest(context) {
            context.commit('setLoader', true)

            this.state.test.id = this.state.authUser.id;

            const add_test = await window.axios.post('/api/test', this.state.test)
            .then(response => {
               if (response.status == 201 && response.data.status == 'success') {
                  
               } else {
                  
               }
            })
            .catch(error => {
               
            });
            context.commit('setLoader', false)
         },

         // Adds experienc data
         async addExperience(context) {
            context.commit('setLoader', true)

            this.state.experience.id = this.state.authUser.id;

            const add_experience = await window.axios.post('/api/experience', this.state.experience)
            .then(response => {
               if (response.status == 201 && response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'experience',
                     message: 'Experience successfully saved!',
                     type: 'success'
                  })
                  context.dispatch('fetchExperience')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'experience',
                     message: 'Experience not successfully saved!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'experience',
                  message: 'Experience saving error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

      // INSERTS ENDS

      // DELETES

         // Deletes test data
         async deleteTests(context) {
            context.commit('setLoader', true)
            const delete_tests = await window.axios.delete(`/api/test/${this.state.authUser.id}`)
            .then(response => {
               if (response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'test',
                     message: 'Test successfully deleted!',
                     type: 'success'
                  })
                  context.dispatch('fetchTests')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'test',
                     message: 'Test not successfully deleted!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'test',
                  message: 'Test deleting error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Deletes skill data
         async deleteSkill(context) {
            context.commit('setLoader', true)
            const delete_skill = await window.axios.delete(`/api/skill/${this.state.authUser.id}`)
            .then(response => {
               if (response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'skill',
                     message: 'Skill successfully deleted!',
                     type: 'success'
                  })
                  context.dispatch('fetchSkill')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'skill',
                     message: 'Skill not successfully deleted!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'skill',
                  message: 'Skill deleting error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Deletes contact data
         async deleteContact(context) {
            context.commit('setLoader', true)
            const delete_contact = await window.axios.delete(`/api/contact/${this.state.authUser.id}`)
            .then(response => {
               if (response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'contact',
                     message: 'Contact successfully deleted!',
                     type: 'success'
                  })
                  context.dispatch('fetchContact')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'contact',
                     message: 'Contact not successfully deleted!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'contact',
                  message: 'Contact deleting error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Deletes personal data
         async deletePersonal(context) {
            context.commit('setLoader', true)
            const delete_personal = await window.axios.delete(`/api/users/${this.state.authUser.id}`)
            .then(response => {
               if (response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'personal',
                     message: 'Account successfully deleted!',
                     type: 'success'
                  })
                  context.dispatch('fetchPersonal')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'personal',
                     message: 'Account not successfully deleted!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'personal',
                  message: 'Account error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

         // Deletes experienc data
         async deleteExperience(context) {
            context.commit('setLoader', true)
            const delete_experience = await window.axios.delete(`/api/experience/${this.state.authUser.id}`)
            .then(response => {
               if (response.data.status == 'success') {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'experience',
                     message: 'Experience successfully deleted!',
                     type: 'success'
                  })
                  context.dispatch('fetchExperience')
               } else {
                  context.dispatch('toggleResponseFeedback', {
                     target: 'experience',
                     message: 'Experience not successfully deleted!',
                     type: 'error'
                  })
               }
            })
            .catch(error => {
               context.dispatch('toggleResponseFeedback', {
                  target: 'experience',
                  message: 'Experience deleting error!',
                  type: 'error'
               })
            });
            context.commit('setLoader', false)
         },

      // DELETES ENDS

      // CHECKS

         // Checks if a target section has been updated previously
         isPreviouslyUpdated(context, target) {
            if (Object.keys(this.state[target]) == 0) {
               context.commit('setUpdatedBefore', {target: target, value: false})
            } else {
               context.commit('setUpdatedBefore', {target: target, value: true})
            }
         },
         
         // Toggles response messages with appropriate feedback styles
         toggleResponseFeedback(context, {target, message, type}) {
            if (type == 'error') {
               context.commit('setFeedbackStyleError', target);
            }
            if (type == 'success') {
               context.commit('setFeedbackStyleSuccess', target);
            }

            context.commit('setFeedbackMessage', {
               target: target,
               message: message
            })
            context.commit('resetFeedbackStyle', target);
            context.commit('resetFeedbackMessage', target)
            context.commit('setLoader', false)
         },

         // Triggers creation or update call for each section update
         createOrUpdate(context, target) {
            // If this section of the user data has been updated since account creation
            // Update it with provided data object
            if (this.state.update_before[target]) {
               // If the data object to be updated is empty
               if (context.getters.targetObjectIsEmpty) {
                  // Alert the user to fill in data
                  context.dispatch('toggleResponseFeedback', {
                     target: target,
                     message: 'Can not update empty data!',
                     type: 'error'
                  })
               } else {
                  // Update target section with given data
                  context.dispatch(`update${context.getters.getProperFormat}`)
               }
            } else { // Create a new model in the DB with provided data
               // If the data object to be created is empty
               if (Object.keys(this.state[target]).length == 0) {
                  // Alert the user to fill in data
                  context.dispatch('toggleResponseFeedback', {
                     target: target,
                     message: 'Can not update empty data!',
                     type: 'error'
                  })
               } else {
                  // Create target section with given data
                  context.dispatch(`add${context.getters.getProperFormat}`)
               }
            }
         },

         // Checks if all fields for an object is defined
         isAllFieldsSet(context, target) {
            
            let def_val = true;
            let active_object = this.state[target]
            Object.keys(active_object).forEach(key => {
               if (key !== 'id' && key !== 'status') {
                  if (active_object[key] == '' || active_object[key] == undefined || active_object[key] == null) {
                     def_val = false;
                  }
               }
            })

            if (def_val) {  // All fields for this object are set
               context.commit('setUpdateStatus', {target: target, value: true})  // Update status for this object to true
            } else { // Some field in object is not set
               context.commit('setUpdateStatus', {target: target, value: false})  // Update status for this object to false
            }
         },

         confirmAndUpdateStatus(context) {            
            // If all update sections are set to true, update user status
            if (context.getters.getMandatoryUpdateStatus) {
               if (!this.state.personal.status) {
                  context.commit('setUserStatus', true)
                  context.dispatch('updatePersonal')
               }
            } else {
               if (this.state.personal.status) {
                  context.commit('setUserStatus', false)
                  context.dispatch('updatePersonal')
               }
            }
         },

         // Checks if user has updated all required fields and is eligible to take test
         checkTestEligibilityStatus(context) {
            // If all fields are set, go to test portal
            if (context.getters.getMandatoryUpdateStatus) {
               context.dispatch('redirectTo', {intended: '/test-portal'})
            } else {
               context.dispatch('toggleResponseFeedback', {
                  target: 'global_alert',
                  message: 'You are not eligible to take tests. Update all mandatory informatioin to be eligible.',
                  type: 'error'
               })
            }
         },

      // CHECKS ENDS

      // DISPLAYS

         // Displays data update modal      
         showUpdater(context, selected) {
            context.commit('setUpdater', {target: selected, status: true})
            context.commit('setOverlay', true)
         },

         // Displays confirmation modal      
         showModal(context) {
            context.commit('setModal', true)
            context.commit('setOverlay', true)
         },

      // DISPLAYS ENDS

      // REMOVERS
         
         // Removes data updater modal
         closeUpdater(context) {
            context.commit('setUpdater', {status: false})
            context.commit('setLoader', false)
            context.commit('setOverlay', false)
         },

         // Removes confirmation modal
         closeModal(context) {
            context.commit('setModal', false)
            context.commit('setLoader', false)
            this.state.confirmation_modal.can_close = false
            context.commit('setOverlay', false)
         },

      // REMOVERS ENDS

      // HELPERS

         calculateScore(context, total_questions) {
            context.commit('setLoader', true)
            let correct_answer = 0
            const Answers = require('../Data/Answers.json')
            Object.keys(this.state.testAccessories.answerPayload).forEach(answer => {            
               if (this.state.testAccessories.answerPayload[answer] == Answers[answer]) {
                  correct_answer = correct_answer + 1
               }
            })
            const score = correct_answer / total_questions
            context.dispatch('showScore', score)
         },
         
         showScore(context, score) {
            this.state.test.score = `${Math.trunc(score * 100)}`;
            this.state.test.status = "true"
            setTimeout(() => {
               context.commit('setLoader', false)
            }, 5000)
            context.dispatch('addTest', score)
         },
         
         fetchQuestions(context) {
            context.commit('setLoader', true)
            const Questions = require('../Data/Questions.json')
            this.state.testAccessories.questions = Questions
            this.state.testAccessories.total_questions = Object.keys(Questions).length
            context.commit('setLoader', false)
         },
      
      // HELPERS ENDS

      // OTHER GLOBAL UTILITIES

         setOnClick(context, e) {
            
            // ACCORDION EFFECT
            // All marked selectors for accordion effect
            const accordions = document.querySelectorAll('.accordion');

            // Targetted element
            const event_target = e.target;

            // Clear target selector's identifier
            event_target.classList.add('selected')            

            // If targetted selector is really among marked selectors
            if (event_target.className.includes('accordion'))  {

               // Run desired effect for targetted selector
               event_target.classList.toggle('accordion-active');
               const panel = event_target.nextElementSibling;
               if (panel.style.maxHeight) {      
                  panel.style.maxHeight = null;
                  panel.style.padding = '0px 18px';          
               } else {          
                  panel.style.maxHeight = (panel.scrollHeight + 20) + 'px';
                  panel.style.padding = '10px 18px';          
               }

               // Remove effect for all marked selectors besides selected target
               accordions.forEach(accordion => {
                  if (!accordion.className.includes('selected')) {
                     accordion.classList.remove('accordion-active')
                     const panel = accordion.nextElementSibling;
                     if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                        panel.style.padding = '0px 18px';
                     }
                  }
               });

               // Clear target selector's identifier
               event_target.classList.remove('selected')
               
            }

         },

         setOnMouseDown(context, e) {

            // RIPPLE EFFECT

            // Targetted selector
            const event_target = e.target;

            // If targetted button is a desired selector type for which effect should be applied
            if (event_target.className.includes('ripple-node')
               || event_target.className.includes('button')
               || event_target.nodeName.toLowerCase() == 'button') {
            
               const rect = event_target.getBoundingClientRect();
               let ripple = document.querySelector('.ripple');
               
               if (ripple) {
                  ripple.remove();
               }				
               
               ripple = document.createElement('span');
               ripple.className = 'ripple';
               ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
               event_target.appendChild(ripple);
               const top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop;
               const left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft;
               ripple.style.top = top + 'px';
               ripple.style.left = left + 'px';
               return false;
            
            }

         },

         setInputOnFocus(context, e) {

            // Targetted selector
            const event_target = e.target;

            // Targetted selector label
            const selected_field_label = event_target.previousElementSibling;

            // If targetted input field is really among marked selectors
            if ( (event_target.nodeName.toLowerCase() == 'input' && event_target.type == 'text')
               || (event_target.nodeName.toLowerCase() == 'input' && event_target.type == 'email')
               || (event_target.nodeName.toLowerCase() == 'input' && event_target.type == 'password')
               || (event_target.nodeName.toLowerCase() == 'select')
               || event_target.nodeName.toLowerCase() == 'textarea') {

               selected_field_label.classList.remove('top-3')
               selected_field_label.classList.add('-top-5')

            }

         },

         setInputOnBlur(context, e) {

            // Targetted selector
            const event_target = e.target;

            // Targetted selector label
            const selected_field_label = event_target.previousElementSibling;
                  
            // If targetted button is really among marked selectors
            if ( (event_target.nodeName.toLowerCase() == 'input' && event_target.type == 'text')
               || (event_target.nodeName.toLowerCase() == 'input' && event_target.type == 'email')
               || (event_target.nodeName.toLowerCase() == 'input' && event_target.type == 'password')
               || (event_target.nodeName.toLowerCase() == 'select')
               || event_target.nodeName.toLowerCase() == 'textarea') {
            
               if (event_target.value !== '') {
                  selected_field_label.classList.remove('top-3')
                  selected_field_label.classList.add('-top-5')
               } else {
                  selected_field_label.classList.remove('-top-5')
                  selected_field_label.classList.add('top-3')
               }

            }

         },

         setAllInputsProperly(context) {

            // Marked input selectors
            const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], select, textarea');
            
            inputs.forEach(input => {
               if (input.value !== '') {
                  input.previousElementSibling.classList.remove('top-3')
                  input.previousElementSibling.classList.add('-top-5')
               }
            })

         },

         addLoader(context, e) {
            document.querySelector(`#${e}`).classList.remove('hidden')
         },

         removeLoader(context, e) {
            document.querySelector(`#${e}`).classList.add('hidden')
         }

      // OTHER GLOBAL UTILITIES ENDS

   }

});

export default store;
