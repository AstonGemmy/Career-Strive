<template>
    <div class="relative w-full p-4 md:px-16">
        <div class="md:flex p-4 justify-between items-start">            
            <div class="mx-auto md:mx-0 py-4 text-center text-lg">
                Copyright <span class="ubuntu">&copy;</span> Career strive <span class="poppins text-14">{{ new Date().getFullYear() }}</span>
            </div>
            <SocialHandles />
        </div>        
    </div>
</template>

<script>
  import SocialHandles from '../Common/SocialHandes'
  export default {
    components: {
        SocialHandles
    }
  }
</script>