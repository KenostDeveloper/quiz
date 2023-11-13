<script setup>

const props = defineProps(['title'])

</script>

<template>
  <p class="quiz-title">{{props.title}}</p>
</template>

<style scoped>
  .quiz-title{
    color: #1D2330;
    font-size: 18px;
    font-weight: 700;
    line-height: 120%;
    margin-bottom: 30px;
  }
</style>
