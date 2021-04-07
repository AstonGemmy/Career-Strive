<template>
    <div>
        <div class="relative bg-login w-full bg-top bg-no-repeat">
            <div class="relative h-full w-full bg-opacity-90 bg-black pb-4">
                <Header />
                <!-- Container -->
                <div class="relative px-8 pt-8 md:pb-16 md:pt-32 md:px-16 ">
                    <!-- <div class="relative lg:flex justify-between items-start px-8 lg:p-16"> -->

                    <div class="text-white text-center">
                        <div data-aos="zoom-in-down" data-aos-duration="700" class="text-3xl md:text-5xl lg:text-7xl my-8">
                            Welcome to Career Strive
                        </div>
                        <div class="text-xl md:text-3xl">
                            Have all your professional career qualification assessments on display for prospective recruiters.
                            <br/>
                            Have it all in one place.
                        </div>

                        <div class="grid grid-flow-cols md:grid-cols-3 justify-center gap-4 w-full xl:w-3/5 mx-auto my-8 md:my-16">
                            <div data-aos="fade-up" data-aos-duration="400" class="grid grid-flow-cols grid-cols-5 justify-between items-between bg-pink-800 text-white text-center rounded-xl text-xl overflow-hidden">
                                <span class="col-span-1 px-4 py-8 bg-pink-800">
                                    <span class="col-span-1 flex justify-center rounded-full shadow bg-white text-pink-800 items-center w-10 h-10">
                                        <i class="fa fa-shield-alt"></i>
                                    </span>
                                </span>
                                <span class="col-span-4 px-4 py-8 bg-pink-700 text-left">
                                    <h2 class="font-bold">Secure</h2>
                                    Your data is highly secure.
                                </span>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="500" class="grid grid-flow-cols grid-cols-5 justify-between items-between bg-pink-800 text-white text-center rounded-xl text-xl overflow-hidden">
                                <span class="col-span-1 px-4 py-8 bg-pink-800">
                                    <span class="col-span-1 flex justify-center rounded-full shadow bg-white text-pink-800 items-center w-10 h-10">
                                        <i class="fa fa-chart-line"></i>
                                    </span>
                                </span>
                                <span class="col-span-4 px-4 py-8 bg-pink-700 text-left">
                                    <h2 class="font-bold">Divergent</h2>
                                    Our assessments bank is diverse.
                                </span>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="600" class="grid grid-flow-cols grid-cols-5 justify-between items-between bg-pink-800 text-white text-center rounded-xl text-xl overflow-hidden">
                                <span class="col-span-1 px-4 py-8 bg-pink-800">
                                    <span class="col-span-1 flex justify-center rounded-full shadow bg-white text-pink-800 items-center w-10 h-10">
                                        <i class="fa fa-eye"></i>
                                    </span>
                                </span>
                                <span class="col-span-4 px-4 py-8 bg-pink-700 text-left">
                                    <h2 class="font-bold">Committed</h2>
                                    Your effort is sure to be seen.
                                </span>
                            </div>
                        </div>

                       <inertia-link href="/authenticate" class="ripple-node relative inline-block border-4 border-white mb-8 lg:mb-0 lg:mt-8 text-white rounded-full py-4 md:py-6 px-8 box-shadow-3xl font-bold text-xl md:text-3xl">
                            Get started
                        </inertia-link>
                        
                    </div>
                </div>
            </div>
        </div>

        <div class="relative bg-gradient-to-b from-pink-800 to-transparent py-8 px-8 lg:px-32">

            <div class="relative text-center w-full my-8">
                <h1 data-aos="fade-down" data-aos-duration="750" class="text-white font-bold text-3xl lg:text-4xl">Job Opening</h1>
                <p class="text-xl md:text-3xl text-pink-300 text-center my-8">
                    Select from a wide range of available and lucrative jobs brought to you by our service providers.
                </p>
            </div>

            <div class="flex flex-wrap py-4 md:py-16">

                <div class="relative w-full py-4 lg:p-0 lg:w-2/4">
                
                    <div class="relative md:px-16">

                        <button data-aos="fade-up" data-aos-duration="500" class="accordion px-8 py-4 text-pink-800 bg-pink-300 focus:outline-none">
                            <i class="fa fa-laptop mr-4"></i>
                            Computer Hardware/software
                        </button>
                    
                        <div class="panel bg-pink-200">
                            <div class="text-left text-gray-600">
                                <a href="login.php" class="">Computer operator</a><br/>
                                <a href="login.php" class="">Systems design architect</a><br/>
                                <a href="login.php" class="">Hardware service manager</a><br/>
                                <a href="login.php" class="">ICT cordinator</a><br/>
                                <a href="login.php" class="">Computer analyst</a><br/>
                                <a href="login.php" class="">Software engineer</a><br/>
                            </div>
                        </div>
                    
                        <button data-aos="fade-up" data-aos-duration="550" class="accordion px-8 py-4 text-pink-800 bg-pink-300 focus:outline-none">
                            <i class="fa fa-chalkboard-teacher mr-4"></i>
                            Public Administration
                        </button>
                    
                        <div class="panel bg-pink-200">
                    
                            <div class="text-left text-gray-600">
                                <a href="login.php" class="">Public adminstrator</a><br/>
                                <a href="login.php" class="">Financial secretary</a><br/>
                                <a href="login.php" class="">Front desk operator</a><br/>
                            </div>
                        
                        </div>
                    
                        <button data-aos="fade-up" data-aos-duration="600" class="accordion px-8 py-4 text-pink-800 bg-pink-300 focus:outline-none">
                            <i class="fa fa-chart-line mr-4"></i>
                            Sales and marketing
                        </button>
                    
                        <div class="panel bg-pink-200">
                    
                            <div class="text-left text-gray-600">
                                <a href="login.php" class="">Senior sales manager</a><br/>
                                <a href="login.php" class="">Marketing manager</a><br/>
                            </div>
                        
                        </div>

                        <button data-aos="fade-up" data-aos-duration="650" class="accordion px-8 py-4 text-pink-800 bg-pink-300 focus:outline-none">
                            <i class="fa fa-brain mr-4"></i>
                            Human resource
                        </button>
                    
                        <div class="panel bg-pink-200">
                    
                            <div class="text-left text-gray-600">
                                <a href="login.php" class="">Human resource personnel</a><br/>
                            </div>
                        
                        </div>
                    
                        <button data-aos="fade-up" data-aos-duration="700" class="accordion px-8 py-4 text-pink-800 bg-pink-300 focus:outline-none">
                            <i class="fa fa-briefcase-medical mr-4"></i>
                            Industrial safety
                        </button>
                    
                        <div class="panel bg-pink-200">
                    
                            <div class="text-left text-gray-600">
                                <a href="login.php" class="">Fire systems operator</a><br/>
                                <a href="login.php" class="">Safety personnel</a><br/>
                                <a href="login.php" class="">Field director/supervisor</a><br/>
                            </div>
                        
                        </div>
                    
                    </div>
                
                </div>

                <div class="relative w-full py-4 lg:p-0 lg:w-2/4">                
                    <div class="relative md:px-16 rounded-full overflow-hidden">
                        <img src="/images/illustrations/job-listing.jpeg" class="w-3/4 h-3/4 rounded-full mx-auto" alt="job listing illustration" />
                    </div>
                </div>
            </div>
        </div>
    
            
        <div data-aos="fade-up" class="relative p-8 md:px-32 text-center">
            <div class="relative my-2 md:my-8 text-xl lg:text-2xl text-gray-500">
                At career strive we care about your potential so we provide generous job opportunities for candidates to explore.
            </div>
            <div class="text-xl lg:text-2xl my-8">
                Whenever you are ready!
            </div>
            <inertia-link href="/authenticate" class="ripple-node relative inline-block bg-pink-800 text-white rounded-md py-4 px-6 box-shadow-3xl font-bold text-xl">
                Get started
            </inertia-link>
        </div>

        <Footer />
        
    </div>
</template>

<script>

  import Header from '../Components/Common/Header'
  import Footer from '../Components/Common/Footer'

  export default {

    components: {
      Header,
      Footer
    }

  }
  
</script>