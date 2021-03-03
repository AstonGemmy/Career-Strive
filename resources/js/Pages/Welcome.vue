<template>
  <div>
    <div>
      <Header />
      <!-- Container -->
      <div class="relative flex flex-col lg:flex-row justify-between items-start p-4 lg:p-16">

          <div class="relative w-full lg:w-2/4">	
              <div class="px-16">
                  <img src="images/intro-cover.jpg" class="" width="100%" height="100%">
              </div>
          </div>
          
          <div class="relative w-full lg:w-2/4">

              <div class="relative text-center w-full mb-8" data-section-card-header>
                  <h1 class="text-pink-800 text-4xl">Job Opening</h1>
              </div>
              
              <div class="relative px-16">

                  <button class="accordion p-2 focus:outline-none">
                      <i class="fa fa-laptop mr-4"></i>
                      Computer Hardware/software
                  </button>
                  
                  <div class="panel">
                      <div class="text-left text-gray-600">
                          <a href="login.php" class="">Computer operator</a><br/>
                          <a href="login.php" class="">Systems design architect</a><br/>
                          <a href="login.php" class="">Hardware service manager</a><br/>
                          <a href="login.php" class="">ICT cordinator</a><br/>
                          <a href="login.php" class="">Computer analyst</a><br/>
                          <a href="login.php" class="">Software engineer</a><br/>
                      </div>
                  </div>
                  
                  <button class="accordion p-2 focus:outline-none">
                      <i class="fa fa-chalkboard-teacher mr-4"></i>
                      Public Administration
                  </button>
                  
                  <div class="panel">
                  
                      <div class="text-left text-gray-600">
                          <a href="login.php" class="">Public adminstrator</a><br/>
                          <a href="login.php" class="">Financial secretary</a><br/>
                          <a href="login.php" class="">Front desk operator</a><br/>
                      </div>
                      
                  </div>
                  
                  <button class="accordion focus:outline-none p-2">
                      <i class="fa fa-chart-line mr-4"></i>
                      Sales and marketing
                  </button>
                  
                  <div class="panel">
                  
                      <div class="text-left text-gray-600">
                          <a href="login.php" class="">Senior sales manager</a><br/>
                          <a href="login.php" class="">Marketing manager</a><br/>
                      </div>
                      
                  </div>
                  
                  <button class="accordion focus:outline-none p-2">
                      <i class="fa fa-brain mr-4"></i>
                      Human resource
                  </button>
                  
                  <div class="panel">
                  
                      <div class="text-left text-gray-600">
                          <a href="login.php" class="">Human resource personnel</a><br/>
                      </div>
                      
                  </div>
                  
                  <button class="accordion focus:outline-none p-2">
                      <i class="fa fa-briefcase-medical mr-4"></i>
                      Industrial safety
                  </button>
                  
                  <div class="panel">
                  
                      <div class="text-left text-gray-600">
                          <a href="login.php" class="">Fire systems operator</a><br/>
                          <a href="login.php" class="">Safety personnel</a><br/>
                          <a href="login.php" class="">Field director/supervisor</a><br/>
                      </div>
                      
                  </div>
                  
              </div>
          </div>
      </div>
      <div class="relative p-4 lg:px-32 text-center">
          <div class="relative my-8 text-2xl poppins text-gray-500">
              At career strive we care about your potential so we provide generous job opportunities for candidates to explore.
          </div>
          <inertia-link to="/login" href="/login" class="relative inline-block bg-pink-800 mt-8 text-white rounded-md py-4 px-6 box-shadow-3xl font-bold text-xl">
              Get started
          </inertia-link>

      </div>
      <Footer />
    </div>
  </div>
</template>

<script>

  import Header from '../Components/Common/Header.vue';
  import Footer from '../Components/Common/Footer.vue'

  export default {

    components: {
      Header,
      Footer
    }

  }
  
</script>