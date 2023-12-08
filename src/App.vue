<template>
  <div class="dart_wrapper bacground-dark">
    <main class="dart_main dart-center">
      <section class="dart-section">
        <div class="dart_container">
          <QuizContainer class="quiz-container__full" :question="quiz"></QuizContainer>
        </div>
        
      </section>
    </main>
  </div>
</template>

<script setup>
import QuizContainer from './components/QuizContainer.vue';


</script>

<script>
  export default {
    name: 'DartQuiz',
    props: {
        quiz: {
            type: Object,
            default: () => {
              return {}
            }
        }
    }
  }
</script>

<style scoped lang="scss">
  .dart-center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .quiz-container{
    &__full{
      width: 80vw;
      height: 80vh;
    }
  }

  
  @media only screen and (max-width: 1200px) { 

  }

  @media only screen and (max-width: 991px) { 

  }

  @media only screen and (max-width: 768px) {
    .quiz-container{
      &__full{
        width: 95vw;
        min-height: 80vh;
      }
    }
  }

  @media only screen and (max-width: 600px) { 

  }

  @media only screen and (max-width: 430px) { 
      
  }
  </style>
