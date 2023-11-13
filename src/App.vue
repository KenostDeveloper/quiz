<script setup>
import QuizContainer from './components/QuizContainer.vue';
import {ref} from 'vue';

const questions = ref([
  {
    type: 0,
    question: "Пройди тест, чтобы рассчитать стоимость необходимых детейлинг услуг",
    description: "После прохождения теста ты получишь индивидуальное предложение и скидку!",
    buttonText: "Расчитать",
    imgPath: "https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg"
  },
  {
    type: 1,
    question: "Текстовый ответ?",
    options: [
      'Ответ 1 - 1',
      'Ответ 2 - 1',
      'Ответ 1 - 1',
      'Ответ 2 - 1',
    ],
  },
  {
    type: 2,
    question: "Текстовый ответ с несколькими вариантами?",
    options: [
      'Ответ 1 - 2',
      'Ответ 2 - 2',
      'Ответ 1 - 1',
      'Ответ 2 - 1',
      'Ответ 1 - 2',
      'Ответ 2 - 2',
      'Ответ 1 - 1',
      'Ответ 2 - 1',
    ],
  },
  {
    type: 3,
    question: "Поле для ввода?",
    options: [
      {label: 'Имя', placeholder: 'Иван'},
      {label: 'Фамилия', placeholder: 'Иванов'},
    ],
  },
  {
    type: 4,
    question: "Ползунок?",
    options: [
      '0',
    ],
    settings: [
      {minValue: 0, maxValue: 100, step: 1, value: 20}
    ]
  }
])

</script>

<template>

  <div class="dart_wrapper bacground-dark">
    <main class="dart_main dart-center">
      <section class="dart-section">
        <div class="dart_container">
          <QuizContainer class="quiz-container__full" :question="questions"></QuizContainer>
        </div>
      </section>
    </main>
  </div>
</template>

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
</style>
