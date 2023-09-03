<script setup lang="ts">

</script>


<template>
<div id="loader_container">
    <svg width="200" viewBox="0 0 100 100">
        <path
            stroke="none"
            stroke-width="1"
            fill="none"
            d="M10 10 L90 10 L90 90 L10 90 Z"
        ></path>

        <rect x="10" y="10" width="80" height="10" fill="var(--color)" stroke="none"></rect>

        <rect id="r1" x="10" y="20" width="80" height="10" fill="var(--color)"></rect>
        <rect id="r2" x="10" y="30" width="80" height="10" fill="var(--border)"></rect>
        <rect id="r3" x="10" y="40" width="80" height="10" fill="var(--background)"></rect>
        <rect id="r4" x="10" y="50" width="80" height="10" fill="var(--color)"></rect>

    </svg>
    <p>Loading ...</p>
</div>    

</template>



<style scoped>
    #loader_container{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #r1{animation: animate_rect 1s linear infinite;}
    #r2{animation: animate_rect 1.1s linear infinite;}
    #r3{animation: animate_rect 1.2s linear infinite;}
    #r4{animation: animate_rect 1.3s linear infinite;}
    #r5{animation: animate_rect 1.4s linear infinite;}
    #r6{animation: animate_rect 1.5s linear infinite;}
    #r7{animation: animate_rect 1.6s linear infinite;}

    @keyframes animate_rect {
        0%{
            transform: translateX(0%) translateY(-10%);
            opacity: 0;
        }
        40%{
            transform: translateX(0%) translateY(30%);
            opacity: 0.7
        }
        60%{
            transform: translateX(0%) translateY(30%);
            opacity: 0.7
        }
        100%{
            transform: translateX(0%) translateY(-10%);
            opacity: 0;
        }
    }
</style>