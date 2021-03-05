import { createStore } from 'vuex';

const store = createStore({
   
   state: {
      authUser: window.AuthUser,
      loginState: false,
      isLoading: false,
      output: {
         personal: {},
         skills: {},
         contact: {},
         experiences: {},
      },
      skills: {},
      test: {},
      contact: {},
      personal: {},
      experiences: {},
      feedbackStyle: {},
      update_status: {
         skills: false,
         contact: false,
         personal: false,
         experiences: false
      },
      feedbackMessages: {
         login: null,
         register: null,
         email_verification: null,
         test: null,
         skills: null,
         contact: null,
         personal: null,
         experiences: null,
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
      testAccessories: {
         timer: "01:02",
         message: 'Enough time remaining!'
      }

   },
   
   getters: {
      
      getAuthUserFirstname: state => {
         return state.authUser.name.split(' ')[0]
      },
      
      properCase: state => {
         return state.authUser.name.charAt(0).toUpperCase() + state.authUser.name.slice(1);
      }
   
   },
   
   mutations: {

      setAuthUser(state, payload) {
         state.authUser = {...payload}
      },

      setLoader(state, val) {
         state.isLoading = val
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
         }, 4000)
      },

      setTest(state, payload) {
         state.test = payload
      },

      setSkills(state, payload) {
         state.skills = payload
         const {time_management, team_work, problem_solving, customer_service} = payload
         state.output.skills = {time_management, team_work, problem_solving, customer_service}
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

      setExperiences(state, payload) {
         state.experiences = payload
         let {job, qualification, duration} = payload
         state.output.experiences = {job, qualification, duration}
      },

      setUpdateStatus(state, {target, value}) {
         state.update_status[target] = value
      },

      setProfilePhotoPath(state, path) {
         state.personal.profile_photo_path = path
      },

      setGlobalAlert(state, {message}) {
         state.feedbackMessages.global_alert = message
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
         async isAuthenticated(context) {
            if (Object.keys(this.state.authUser).length !== 0) {
               await context.commit('setLoginState', true)
               return;
            }
            await context.commit('setLoginState', false)
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
            // context.commit('setLoader', true)
            const attempt_login = await window.axios.post('/authenticate', login)
            .then(response => {
               if (response.data.status == 'success') {
                  context.commit('setLoginState', true)
                  context.commit('setFeedbackStyleSuccess', 'login');
                  context.commit('setFeedbackMessage', {
                     target: 'login',
                     message: 'Logged in!'
                  });
                  const intended = response.data.intended_url;
                  context.dispatch('redirectTo', {intended});
               } else {
                  context.commit('setLoginState', false)
                  context.commit('setFeedbackStyleError', 'login');
                  context.commit('setFeedbackMessage', {
                     target: 'login',
                     message: 'The provided credentials do not match our records.'
                  })
               }
            })
            .catch(error => {
               context.commit('setLoginState', false)
               context.commit('setFeedbackStyleError', 'login');
               context.commit('setFeedbackMessage', {
                  target: 'login',
                  message: 'Login error!'
               });
            })
            // context.commit('setLoader', false)
            context.commit('resetFeedbackStyle', 'login');
            context.commit('resetFeedbackMessage', 'login')
         },

      // AUTHENTICATION ENDS

      // REGISTRATION

         // Registers new user
         async registerUser(context, {register}) {
            // context.commit('setLoader', true)
            const attempt_registration = await window.axios.post('/api/users', register)
            .then(response => {
               if (response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'register');
                  context.commit('setFeedbackMessage', {
                     target: 'register',
                     message: 'Registration successful! A verification email has been sent to your email!'
                  })
               } else {
                  context.commit('setFeedbackStyleError', 'register');
                  context.commit('setFeedbackMessage', {
                     target: 'register',
                     message: 'Registration not successful! Try again later.'
                  })
               }
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'register');
               context.commit('setFeedbackMessage', {
                  target: 'register',
                  message: 'Registration error!'
               });
            });
            // context.commit('setLoader', false)
            context.commit('resetFeedbackStyle', 'register');
            context.commit('resetFeedbackMessage', 'register')
         },

         // Sends verification message on registration if it fails
         async resendVerificationEmail(context) {
            context.commit('setLoader', true)
            const resend_verification_email = await window.axios.post('/email/verification-notification')
            .then(response => {
               if (response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'email_verification');
                  context.commit('setFeedbackMessage', {
                     target: 'email_verification',
                     message: 'A new verification link has been sent to the email address you provided during registration.'
                  })
               } else {
                  context.commit('setFeedbackStyleError', 'email_verification');
                  context.commit('setFeedbackMessage', {
                     target: 'email_verification',
                     message: 'Verification link could not be sent!'
                  })
               }
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'email_verification');
               context.commit('setFeedbackMessage', {
                  target: 'email_verification',
                  message: 'Verification link error!'
               })
            })
            context.commit('setLoader', false)
            context.commit('resetFeedbackStyle', 'email_verification');
            context.commit('resetFeedbackMessage', 'email_verification')
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

         // Fetch user skills
         async fetchSkills(context) {
            // context.commit('setLoader', true)
            const fetch_skills = await window.axios.get(`/api/skill/${this.state.authUser.id}`)
            .then(response => {
               if (response.status == 200 && response.data.data.length !== 0) {
                  context.commit('setSkills', response.data.data)
                  context.dispatch('checkUpdateStatus', 'skills')
               } else {
                  context.commit('setSkills', {})
               }         
            })
            .catch(error => {
               context.commit('setSkills', {})
            })
            // context.commit('setLoader', false)
         },

         // Fetch user test data and history
         async fetchTests(context) {
            // context.commit('setLoader', true)
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
            // context.commit('setLoader', false)
         },

         // Fetch user's personal information
         async fetchPersonal(context) {
            // context.commit('setLoader', true)
            const fetch_personal = await window.axios.get(`/api/users/${this.state.authUser.id}`)
            .then(response => {
               if (response.status == 200 && response.data.data.length !== 0) {
                  context.commit('setPersonal', response.data.data)
                  context.dispatch('checkUpdateStatus', 'personal')
               } else {
                  context.commit('setPersonal', {})
               }
            })
            .catch(error => {
               context.commit('setPersonal', {})
            })
            // context.commit('setLoader', false)
         },

         // Fetch user contacts details
         async fetchContacts(context) {
            // context.commit('setLoader', true)
            const fetch_contacts = await window.axios.get(`/api/contact/${this.state.authUser.id}`)
            .then(response => {
               if (response.status == 200 && response.data.data.length !== 0) {
                  context.commit('setContact', response.data.data)
                  context.dispatch('checkUpdateStatus', 'contact')            
               } else {
                  context.commit('setContact', {})
               }
            })
            .catch(error => {
               context.commit('setContact', {})
            })
            // context.commit('setLoader', false)
         },

         // Fetch user experience data
         async fetchExperiences(context) {
            // context.commit('setLoader', true)
            const fetch_experiences = await window.axios.get(`/api/experience/${this.state.authUser.id}`)
            .then(response => {
               if (response.status == 200 && response.data.data.length !== 0) {
                  context.commit('setExperiences', response.data.data)
                  context.dispatch('checkUpdateStatus', 'experiences')
               } else {
                  context.commit('setExperiences', {})
               }
            })
            .catch(error => {
               context.commit('setExperiences', {})
            })
            // context.commit('setLoader', false)
         },

      // FETCHES ENDS

      // UPDATES

         // Updates user skills data
         async updateSkills(context) {
            // context.commit('setLoader', true)

            // On first(after account creation) attempt, add skills
            if (this.state.update_status.skills == false) {
               context.dispatch('addSkills')
               return;
            }

            const update_skills = await window.axios.put(`/api/skill/${this.state.authUser.id}`, this.state.skills)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'skills');
                  context.commit('setFeedbackMessage', {
                     target: 'skills',
                     message: 'Skills successful updated!'
                  })
                  context.dispatch('fetchSkills')
               } else {
                  context.commit('setFeedbackStyleError', 'skills');
                  context.commit('setFeedbackMessage', {
                     target: 'skills',
                     message: 'Skills not successfully updated!'
                  })
               }
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'skills');
               context.commit('setFeedbackMessage', {
                  target: 'skills',
                  message: 'Skill update error!'
               });
            });
            // context.commit('setLoader', false)
            context.commit('resetFeedbackStyle', 'skills');
            context.commit('resetFeedbackMessage', 'skills')
         },

         // Updates user contact data
         async updateContacts(context) {
            // context.commit('setLoader', true)
            
            // On first(after account creation) attempt, add contacts
            if (this.state.update_status.contact == false) {
               context.dispatch('addContacts')
               return;
            }

            const update_contacts = await window.axios.put(`/api/contact/${this.state.authUser.id}`, this.state.contact)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'contact');
                  context.commit('setFeedbackMessage', {
                     target: 'contact',
                     message: 'Contact successful updated!'
                  })
                  context.dispatch('fetchContacts')
               } else {
                  context.commit('setFeedbackStyleError', 'contact');
                  context.commit('setFeedbackMessage', {
                     target: 'contact',
                     message: 'Contact not successfully updated!'
                  })
               }
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'contact');
               context.commit('setFeedbackMessage', {
                  target: 'contact',
                  message: 'Contact update error!'
               });
            });
            // context.commit('setLoader', false)
            context.commit('resetFeedbackStyle', 'contact');
            context.commit('resetFeedbackMessage', 'contact')
         },

         // Updates user's personal data
         async updatePersonal(context) {
            // context.commit('setLoader', true)
            const update_personal = await window.axios.put(`/api/users/${this.state.authUser.id}`, this.state.personal)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'personal');
                  context.commit('setFeedbackMessage', {
                     target: 'personal',
                     message: 'Personal successful updated!'
                  })
                  context.dispatch('fetchPersonal')
               } else {
                  context.commit('setFeedbackStyleError', 'personal');
                  context.commit('setFeedbackMessage', {
                     target: 'personal',
                     message: 'Personal not successfully updated!'
                  })
               }
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'personal');
               context.commit('setFeedbackMessage', {
                  target: 'personal',
                  message: 'Personal update error!'
               });
            });
            // context.commit('setLoader', false)
            context.commit('resetFeedbackStyle', 'personal');
            context.commit('resetFeedbackMessage', 'personal')
         },

         // Updates user profile photo
         async updateProfilePhoto(context, e) {

            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
               return;
            }
            let formData = new FormData();
            formData.append('profile_photo_path', files[0]);

            // context.commit('setLoader', true)
            const update_profile_photo = await window.axios.post(`/upload/profile-photo/${this.state.authUser.id}`, formData)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'global_alert');
                  context.commit('setFeedbackMessage', {
                     target: 'global_alert',
                     message: 'Profile photo successful updated!'
                  })
                  context.dispatch('fetchPersonal')
               } else {
                  context.commit('setFeedbackStyleError', 'global_alert');
                  context.commit('setFeedbackMessage', {
                     target: 'global_alert',
                     message: 'Profile photo not successfully updated!'
                  })
               }
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'global_alert');
               context.commit('setFeedbackMessage', {
                  target: 'global_alert',
                  message: 'Profile photo update error!'
               });
            });
            // context.commit('setLoader', false)
            context.commit('resetFeedbackStyle', 'global_alert');
            context.commit('resetFeedbackMessage', 'global_alert')
         },

         // Updates user cover photo
         async updateCoverPhoto(context, e) {

            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
               return;
            }
            let formData = new FormData();
            formData.append('cover_photo_path', files[0]);

            // context.commit('setLoader', true)
            const update_cover_photo = await window.axios.post(`/upload/cover-photo/${this.state.authUser.id}`, formData)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'global_alert');
                  context.commit('setFeedbackMessage', {
                     target: 'global_alert',
                     message: 'Cover photo successful updated!'
                  })
                  context.dispatch('fetchPersonal')
               } else {
                  context.commit('setFeedbackStyleError', 'global_alert');
                  context.commit('setFeedbackMessage', {
                     target: 'global_alert',
                     message: 'Cover photo not successfully updated!'
                  })
               }
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'global_alert');
               context.commit('setFeedbackMessage', {
                  target: 'global_alert',
                  message: 'Cover photo update error!'
               });
            });
            // context.commit('setLoader', false)
            context.commit('resetFeedbackStyle', 'global_alert');
            context.commit('resetFeedbackMessage', 'global_alert')
         },

         // Updates user experience data
         async updateExperiences(context) {
            // context.commit('setLoader', true)

            // On first(after account creation) attempt, add experiences
            if (this.state.update_status.experiences == false) {
               context.dispatch('addExperiences')
               return;
            }

            const update_experiences = await window.axios.put(`/api/experience/${this.state.authUser.id}`, this.state.experiences)
            .then(response => {
               if (response.status == 200 && response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'experiences');
                  context.commit('setFeedbackMessage', {
                     target: 'experiences',
                     message: 'Experience successful updated!'
                  })
                  context.dispatch('fetchExperiences')
               } else {
                  context.commit('setFeedbackStyleError', 'experiences');
                  context.commit('setFeedbackMessage', {
                     target: 'experiences',
                     message: 'Experience not successfully updated!'
                  })
               }
               // context.commit('setLoader', false)
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'experiences');
               context.commit('setFeedbackMessage', {
                  target: 'experiences',
                  message: 'Experience update error!'
               });
               // context.commit('setLoader', false)
            });
            context.commit('resetFeedbackStyle', 'experiences');
            context.commit('resetFeedbackMessage', 'experiences')
         },

      // UPDATES ENDS

      // INSERTS
         
         // Adds contact data
         async addContacts(context) {
            // context.commit('setLoader', true)
            this.state.contact.id = this.state.authUser.id;
            const add_contacts = await window.axios.post('/api/contact', this.state.contact)
            .then(response => {
               if (response.status == 201 && response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'contact');
                  context.commit('setFeedbackMessage', {
                     target: 'contact',
                     message: 'Contact successful saved!'
                  })
                  context.dispatch('fetchContacts')
               } else {
                  context.commit('setFeedbackStyleError', 'contact');
                  context.commit('setFeedbackMessage', {
                     target: 'contact',
                     message: 'Contact not successfully saved!'
                  })
               }
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'contact');
               context.commit('setFeedbackMessage', {
                  target: 'contact',
                  message: 'Contact upload error!'
               });
            });
            // context.commit('setLoader', false)
            context.commit('resetFeedbackStyle', 'contact');
            context.commit('resetFeedbackMessage', 'contact')
         },

         // Adds skills data
         async addSkills(context) {
            // context.commit('setLoader', true)

            this.state.skills.id = this.state.authUser.id;

            const add_skills = await window.axios.post('/api/skill/', this.state.skills)
            .then(response => {
               if (response.status == 201 && response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'skills');
                  context.commit('setFeedbackMessage', {
                     target: 'skills',
                     message: 'Skills successful saved!'
                  })
                  context.dispatch('fetchSkills')
               } else {
                  context.commit('setFeedbackStyleError', 'skills');
                  context.commit('setFeedbackMessage', {
                     target: 'skills',
                     message: 'Skills not successfully saved!'
                  })
               }
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'skills');
               context.commit('setFeedbackMessage', {
                  target: 'skills',
                  message: 'Skills upload error!'
               });
            });
            // context.commit('setLoader', false)
            context.commit('resetFeedbackStyle', 'skills');
            context.commit('resetFeedbackMessage', 'skills')
         },

         // Adds experience data
         async addExperiences(context) {
            // context.commit('setLoader', true)

            this.state.experiences.id = this.state.authUser.id;

            const add_experiences = await window.axios.post('/api/experience/', this.state.experiences)
            .then(response => {
               if (response.status == 201 && response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'experiences');
                  context.commit('setFeedbackMessage', {
                     target: 'experiences',
                     message: 'Experience successful saved!'
                  })
                  context.dispatch('fetchExperiences')
               } else {
                  context.commit('setFeedbackStyleError', 'experiences');
                  context.commit('setFeedbackMessage', {
                     target: 'experiences',
                     message: 'Experience not successfully saved!'
                  })
               }
               // context.commit('setLoader', false)
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'experiences');
               context.commit('setFeedbackMessage', {
                  target: 'experiences',
                  message: 'Experience upload error!'
               });
               // context.commit('setLoader', false)
            });
            context.commit('resetFeedbackStyle', 'experiences');
            context.commit('resetFeedbackMessage', 'experiences')
         },

      // INSERTS ENDS

      // DELETES

         // Deletes test data
         async deleteTests(context) {
            context.commit('setLoader', true)
            const delete_tests = await window.axios.delete(`/api/test/${this.state.authUser.id}`)
            .then(response => {
               if (response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'test');
                  context.commit('setFeedbackMessage', {
                     target: 'test',
                     message: 'Test successful deleted!'
                  })
                  context.dispatch('fetchTests')
               } else {
                  context.commit('setFeedbackStyleError', 'test');
                  context.commit('setFeedbackMessage', {
                     target: 'test',
                     message: 'Test not successfully deleted!'
                  })
               }
               context.commit('setLoader', false)
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'test');
               context.commit('setFeedbackMessage', {
                  target: 'test',
                  message: 'Test delete error!'
               });
               context.commit('setLoader', false)
            });
         },

         // Deletes skills data
         async deleteSkills(context) {
            context.commit('setLoader', true)
            const delete_skills = await window.axios.delete(`/api/skill/${this.state.authUser.id}`)
            .then(response => {
               if (response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'skills');
                  context.commit('setFeedbackMessage', {
                     target: 'skills',
                     message: 'Skill successful deleted!'
                  })
                  context.dispatch('fetchSkills')
               } else {
                  context.commit('setFeedbackStyleError', 'skills');
                  context.commit('setFeedbackMessage', {
                     target: 'skills',
                     message: 'Skill not successfully deleted!'
                  })
               }
               context.commit('setLoader', false)
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'skills');
               context.commit('setFeedbackMessage', {
                  target: 'skills',
                  message: 'Skill delete error!'
               });
               context.commit('setLoader', false)
            });
         },

         // Deletes contact data
         async deleteContacts(context) {
            context.commit('setLoader', true)
            const delete_contacts = await window.axios.delete(`/api/contact/${this.state.authUser.id}`)
            .then(response => {
               if (response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'contact');
                  context.commit('setFeedbackMessage', {
                     target: 'contact',
                     message: 'Contact successful deleted!'
                  })
                  context.dispatch('fetchContacts')
               } else {
                  context.commit('setFeedbackStyleError', 'contact');
                  context.commit('setFeedbackMessage', {
                     target: 'contact',
                     message: 'Contact not successfully deleted!'
                  })
               }
               context.commit('setLoader', false)
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'contact');
               context.commit('setFeedbackMessage', {
                  target: 'contact',
                  message: 'Contact delete error!'
               });
               context.commit('setLoader', false)
            });
         },

         // Deletes personal data
         async deletePersonal(context) {
            context.commit('setLoader', true)
            const delete_personal = await window.axios.delete(`/api/users/${this.state.authUser.id}`)
            .then(response => {
               if (response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'personal');
                  context.commit('setFeedbackMessage', {
                     target: 'personal',
                     message: 'Personal successful deleted!'
                  })
                  context.dispatch('fetchPersonal')
               } else {
                  context.commit('setFeedbackStyleError', 'personal');
                  context.commit('setFeedbackMessage', {
                     target: 'personal',
                     message: 'Personal not successfully deleted!'
                  })
               }
               context.commit('setLoader', false)
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'personal');
               context.commit('setFeedbackMessage', {
                  target: 'personal',
                  message: 'Personal delete error!'
               });
               context.commit('setLoader', false)
            });
         },

         // Deletes experience data
         async deleteExperiences(context) {
            context.commit('setLoader', true)
            const delete_experiences = await window.axios.delete(`/api/experience/${this.state.authUser.id}`)
            .then(response => {
               if (response.data.status == 'success') {
                  context.commit('setFeedbackStyleSuccess', 'experiences');
                  context.commit('setFeedbackMessage', {
                     target: 'experiences',
                     message: 'Experience successful deleted!'
                  })
                  context.dispatch('fetchExperiences')
               } else {
                  context.commit('setFeedbackStyleError', 'experiences');
                  context.commit('setFeedbackMessage', {
                     target: 'experiences',
                     message: 'Experience not successfully deleted!'
                  })
               }
               context.commit('setLoader', false)
            })
            .catch(error => {
               context.commit('setFeedbackStyleError', 'experiences');
               context.commit('setFeedbackMessage', {
                  target: 'experiences',
                  message: 'Experience delete error!'
               });
               context.commit('setLoader', false)
            });
         },

      // DELETES ENDS

      // CHECKS

         // Checks if all fields for an object is defined
         async checkUpdateStatus(context, target) {
            let def_val = 0;
            Object.keys(this.state[target]).forEach(key => {
               if (this.state[target][key] == '' || this.state[target][key] == undefined) {
                  def_val = 1;
               }
            })
            if (def_val == 0) {
               await context.commit('setUpdateStatus', {target: target, value: true})
            }
         },

         // Checks if user has updated all required fields and is eligible to take test
         async checkTestEligibilityStatus(context) {
            let def_val = 0;
            Object.keys(this.state.update_status).forEach(key => {
               if (this.state.update_status[key] === false) {
                  def_val = 1;
               }
            })
            
            // If all fields are set, go to test portal
            if (def_val == 0) {
               context.dispatch('redirectTo', {intended: '/test-portal'})
            } else {
               context.commit('setGlobalAlert', {
                  message: 'You are not eligible to take tests. Update all mandatory informatioin to be eligible.'
               })
               context.commit('setFeedbackStyleError', 'global_alert');
               context.commit('resetFeedbackStyle', 'global_alert');
               context.commit('resetFeedbackMessage', 'global_alert')
            }
         },

      // CHECKS ENDS

      // DISPLAYS

         // Displays data update modal      
         showUpdater(context, selected) {
            const updaters = document.querySelectorAll('#updates .update');
            updaters.forEach(updater => {
               if (updater.classList.contains(selected)) {
                  updater.style.display = 'block'            
               } else {
                  updater.style.display = 'none'
               }
            })
         },

      // DISPLAYS ENDS

      // REMOVERS
         
         // Removes data updater modal
         closeUpdaters(context) {
            const updaters = document.querySelectorAll('#updates .update');
            updaters.forEach(updater => {
               updater.style.display = 'none'
               context.commit('setLoader', false)
            })
         },

      // REMOVERS ENDS

      // HELPERS

         // Test portal timer
      
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
               || event_target.nodeName.toLowerCase() == 'button')  {
            
               const rect = event_target.getBoundingClientRect();
               let ripple = event_target.querySelector('.ripple');				
               
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

            // If targetted button is really among marked selectors
            if ( (event_target.nodeName.toLowerCase() == 'input' && event_target.type == 'text')
               || (event_target.nodeName.toLowerCase() == 'input' && event_target.type == 'email')
               || (event_target.nodeName.toLowerCase() == 'input' && event_target.type == 'password')
               || (event_target.nodeName.toLowerCase() == 'select')
               || event_target.nodeName.toLowerCase() == 'textarea') {
                  
               if (event_target.value == '') {
                  selected_field_label.style.top = '-1.5em'
               }

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
                  selected_field_label.style.top = '-1.5em'
               } else {
                  selected_field_label.style.top = '0em'
               }

            }

         },

         setAllInputsProperly(context, e) {

            // Marked input selectors
            const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], select, textarea');
            
            inputs.forEach(input => {
               if (input.value !== '') {
                  input.previousElementSibling.style.top = '-1.5em'
               }
            })

         },

      // OTHER GLOBAL UTILITIES ENDS

   }

});

export default store;