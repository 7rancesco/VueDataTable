<script setup lang="ts">

</script>


<template>
<div id="svg_container">
    <svg width="30" viewBox="0 0 100 100">

        <path
            d="M0 50 L100 50"
            stroke="black"
            stroke-width="2"
            fill="none"
        ></path>

        <path
            d="M0 50 L50 0"
            stroke="black"
            stroke-width="2"
            fill="none"
        ></path>

        <path
            d="M0 50 L50 100"
            stroke="black"
            stroke-width="2"
            fill="none"
        ></path>

    </svg>
</div>    

</template>



<style scoped>
    #svg_container{
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(204, 207, 218, 0.343);
        border-radius: 10px;
        padding: 5px;
    }

    #svg_container:hover{
        cursor: pointer;
        background: rgba(204, 207, 218, 0.866);
    }

</style>