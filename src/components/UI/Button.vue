<template>
   <button>
        <slot></slot>
   </button>
</template>

<script>
    export default {
        name: 'my-button'
    }
</script>

<style  scoped>
    button{
        font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
        background-color: #FF9966;
        border: 2px solid black;
        height: 50px;
        width: 50px;
        border-radius: 5px;
        padding: 1px;
        font-size: 14px;
        font-weight: bold;
    }
</style>