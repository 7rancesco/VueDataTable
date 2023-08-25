<script setup lang="ts">

</script>


<template>
<div id="loader_container">
    <svg width="200" viewBox="0 0 100 100">
        <path
            stroke="black"
            stroke-width="1"
            fill="none"
            d="M10 10 L90 10 L90 90 L10 90 Z"
        ></path>

        <rect x="10" y="10" width="40" height="10" fill="white" stroke="black"></rect>
        <rect x="50" y="10" width="40" height="10" fill="white" stroke="black"></rect>

        <rect id="r1" x="10" y="20" width="40" height="10" fill="green"></rect>
        <rect id="r2" x="10" y="30" width="40" height="10" fill="orange"></rect>
        <rect id="r3" x="10" y="40" width="40" height="10" fill="pink"></rect>
        <rect id="r4" x="10" y="50" width="40" height="10" fill="purple"></rect>
        <rect id="r5" x="10" y="60" width="40" height="10" fill="blue"></rect>
        <rect id="r6" x="10" y="70" width="40" height="10" fill="yellow"></rect>
        <rect id="r7" x="10" y="80" width="40" height="10" fill="red"></rect>

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
            width: 0;
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
            width: 85px;
        }
    }
</style>