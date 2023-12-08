<template>
  <div class="quiz-container">
    <!-- {{ question }} -->
    <div class="quiz-container__quiz-start" v-if="getCurrentQuestion.index == -1">
      <div class="quiz-container__img">
        <img v-bind:src="getCurrentQuestion.image" v-bind:alt="getCurrentQuestion.name" />
      </div>
      <div class="quiz-container__info">
        <h1 class="quiz-container__header">{{ getCurrentQuestion.name }}</h1>
        <p class="quiz-container__desc">{{ getCurrentQuestion.description }}</p>
        <div class="quiz-container__button" @click="NextQuestion">
          {{ getCurrentQuestion.btn_start }}
        </div>
      </div>
    </div>

    <div class="quiz-container__quiz-start" v-if="currentQuestion == question[0].steps.length">
      <div class="quiz-container__img">
        <img v-bind:src="getCurrentQuestion.image" v-bind:alt="getCurrentQuestion.name" />
      </div>
      <div class="quiz-container__info quiz-container_center">
        <form class="QuizFormFields__form" onsubmit="return false;">
          <div class="quiz-input">
            <label class="quiz-input__label" id="name">Введите ваше имя</label>
            <input
              v-on:change="actionElem"
              for="name"
              class="quiz-input__input"
              type="text"
              placeholder="Иван"
            />
          </div>

          <div class="quiz-input">
            <label class="quiz-input__label" id="phone">Введите ваш номер телефона</label>
            <input
              v-on:change="actionElem"
              class="quiz-input__input"
              type="text"
              placeholder="+7(999)999-99-99"
            />
          </div>

          <div class="quiz-input">
            <label class="quiz-input__label" id="email">Введите вашу почту</label>
            <input
              v-on:change="actionElem"
              for="email"
              class="quiz-input__input"
              type="email"
              placeholder="name@gmail.com"
            />
          </div>

          <button @click="dartQuizSubmit" id="dartquiz-form" class="then-button then-button-submit">{{ getCurrentQuestion.btn_submit }}</button>
        </form>
      </div>
    </div>
    <div
      v-if="getCurrentQuestion.index > -1 && currentQuestion != question[0].steps.length"
      class="quiz-container__quiz"
    >
      <QuizTitle
        v-if="currentQuestion <= question[0].steps.length - 1"
        :title="getCurrentQuestion.name"
      ></QuizTitle>
      <div class="quiz-container__content">
        <div v-for="(item, index) in question[0].steps" v-bind:key="index">
          <div v-if="index == currentQuestion">
            <div class="imageAndOptions" v-if="getCurrentQuestion.type == 1">
              <QuizRadioButton
                @addElem="addElem"
                class="imageAndOptions__options quiz-colom-2"
                :options="getCurrentQuestion"
                :quiz_id="question[0].id"
              ></QuizRadioButton>
              <img v-if="getCurrentQuestion.image != ''" :src="getCurrentQuestion.image" alt="" />
            </div>
            <div class="imageAndOptions" v-if="getCurrentQuestion.type == 2">
              <QuizCheckbox
                @addElem="addElem"
                class="imageAndOptions__options quiz-colom-2"
                :options="getCurrentQuestion"
                :quiz_id="question[0].id"
              ></QuizCheckbox>
              <img v-if="getCurrentQuestion.image != ''" :src="getCurrentQuestion.image" alt="" />
            </div>
            <div class="imageAndOptions" v-if="getCurrentQuestion.type == 3">
              <QuizInput
                @addElem="addElem"
                class="imageAndOptions__options quiz-colom-2"
                :options="getCurrentQuestion"
                :quiz_id="question[0].id"
              ></QuizInput>
              <img v-if="getCurrentQuestion.image != ''" :src="getCurrentQuestion.image" alt="" />
            </div>
            <div class="imageAndOptions" v-if="getCurrentQuestion.type == 4">
              <QuizRange
                @addElem="addElem"
                class="imageAndOptions__options"
                :settings="getCurrentQuestion.fields"
              ></QuizRange>
              <img :src="getCurrentQuestion.imgPath" alt="" />
            </div>
            <QuizTextAndImage
              v-if="getCurrentQuestion.type == 5"
              :imgPath="getCurrentQuestion.image"
              :text="getCurrentQuestion.description"
            ></QuizTextAndImage>

            <div class="imageAndOptions" v-if="getCurrentQuestion.type == 6">
              <QuizRadioButtonImage
                @addElem="addElem"
                :class="
                  getCurrentQuestion.image == ''
                    ? 'imageAndOptions__options quiz-colom-4'
                    : 'imageAndOptions__options quiz-colom-3'
                "
                :options="getCurrentQuestion"
                :quiz_id="question[0].id"
              ></QuizRadioButtonImage>
              <img v-if="getCurrentQuestion.image != ''" :src="getCurrentQuestion.image" alt="" />
            </div>
            <div class="imageAndOptions" v-if="getCurrentQuestion.type == 7">
              <QuizCheackboxImage
                @addElem="addElem"
                :class="
                  getCurrentQuestion.image == ''
                    ? 'imageAndOptions__options quiz-colom-4'
                    : 'imageAndOptions__options quiz-colom-3'
                "
                :options="getCurrentQuestion"
                :quiz_id="question[0].id"
              ></QuizCheackboxImage>
              <img v-if="getCurrentQuestion.image != ''" :src="getCurrentQuestion.image" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div class="quiz-container-bottom-menu" v-if="currentQuestion < question[0].steps.length">
        <div class="quiz-container__step-count">
          <span>{{ currentQuestion + 1 }}</span
          >/ {{ question[0].steps.length }}
          <div class="quiz-container__progress-bar">
            <div class="quiz-container__progress"></div>
          </div>
        </div>
        <div class="buttons">
            <button @click="PrevQuestion" :disabled="buttonPrevDisabled" class="then-button">{{ question[0].btn_prev }}</button>
            <button @click="NextQuestion" :disabled="buttonDisabled" class="then-button">{{ question[0].btn_next }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import QuizTitle from './QuizTitle.vue'
import QuizRadioButton from './QuizRadioButton.vue'
import QuizCheckbox from './QuizCheckbox.vue'
import QuizInput from './QuizInput.vue'
import QuizRange from './QuizRange.vue'
import QuizCheackboxImage from './QuizCheackboxImage.vue'
import QuizRadioButtonImage from './QuizRadioButtonImage.vue'
import QuizTextAndImage from './QuizTextAndImage.vue'
// import QuizFormFields from './QuizFormFields.vue'
</script>

<script>


export default {
  data() {
    return {
      buttonDisabled: true,
      buttonPrevDisabled: true,
      valueObj: '',
      result: [],
      currentQuestion: -1,
      currentQuestionProcent: '0%'
    }
  },
  props: {
    question: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    addElem(data) {
      this.valueObj = data
      // console.dir(this.result)
      // console.log(Object.values(data).filter(item => item).length === 1);
      this.buttonDisabled = false
    },

    NextQuestion() {
      // console.log(this.currentQuestion, this.question[0].steps.length - 1)
      if(this.currentQuestion == 0){
        this.buttonPrevDisabled = false;
      }

      if (this.currentQuestion <= this.question[0].steps.length - 1) {
        this.currentQuestion++
        if (this.currentQuestion != -1) {
          this.currentQuestionProcent =
            (100 / this.question[0].steps.length) * this.currentQuestion + '%'
          // console.log(this.currentQuestion)
          this.result[this.currentQuestion - 1] = this.valueObj

          if (this.question[0].steps[this.currentQuestion].type != 5) {
            this.buttonDisabled = true
          } else {
            this.buttonDisabled = false
          }
        }
        return
      }
    },

    PrevQuestion(){
        if(this.currentQuestion == 1){
            this.buttonPrevDisabled = true;
        }

        if (this.currentQuestion <= this.question[0].steps.length - 1) {
        this.currentQuestion--
        if (this.currentQuestion != -1) {
          this.currentQuestionProcent =
            (100 / this.question[0].steps.length) * this.currentQuestion + '%'
          // console.log(this.currentQuestion)
          this.result[this.currentQuestion - 1] = this.valueObj

          if (this.question[0].steps[this.currentQuestion].type != 5) {
            this.buttonDisabled = true
          } else {
            this.buttonDisabled = false
          }
        }
        return
      }
    },

    dartQuizSubmit(){
        const data = {
            'dq_action': "Ivan"
        }
        fetch('/assets/components/dartquiz/action.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
    }
  },
  computed: {
    getCurrentQuestion() {
      if (this.currentQuestion != -1 && this.currentQuestion != this.question[0].steps.length) {
        let question = this.question[0].steps[this.currentQuestion]
        question.index = this.currentQuestion

        if (question.type == 1) {
          let testStepImg = true

          for (let i = 0; i < question.fields.length; i++) {
            if (question.fields[i].image == '') {
              testStepImg = false
            }
          }

          if (testStepImg) {
            question.type = 6
          }
        } else if (question.type == 2) {
          let testStepImg = true

          for (let i = 0; i < question.fields.length; i++) {
            if (question.fields[i].image == '') {
              testStepImg = false
            }
          }

          if (testStepImg) {
            question.type = 7
          }
        }
        return question
      } else {
        let question = this.question[0]
        question.index = this.currentQuestion
        return question
      }
    }
  }
}
</script>

<style scoped lang="scss">

.buttons{
    display: flex;
    
    button{
        margin-top: 0;
    }
}

.QuizFormFields {
  display: flex;
  gap: 30px;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;

  &__info {
    width: 100%;

    img {
      // border-radius: 33% 67% 70% 30% / 62% 41% 59% 38%;
      //max-width: 446px;
      //max-height: 446px;
    }
  }

  &__text {
    margin-bottom: 8px;
    color: #414141;
    font-size: 16px;
    max-width: 400px;
  }

  &__form {
    max-width: 400px;
    min-width: 250px;
    width: 100%;
  }

  &__header {
    font-size: 18px;
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.1;
    letter-spacing: normal;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 16px;
    max-width: 400px;
  }
}

.quiz-input {
  display: flex;
  flex-direction: column;
  color: #363636;
  font-size: 16px;
  margin-bottom: 16px;

  &__input {
    width: 100%;
    padding: 10px 16px;
    background: #ffffff;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 8px;
    color: #000000;
    font-size: 16px;
    border: 3px solid #c9c9c9;
    border-bottom: 5px solid #c9c9c9;
    outline: none;
  }

  &__label {
    margin-bottom: 6px;
    font-size: 18px;
  }
}

.then-button {
  font-family: 'Roboto', sans-serif;
  background: #d13980;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 8px 24px;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 25px;
  margin-right: 10px;
  &:hover {
    background: #ae2f6a;
  }
}

.then-button-submit{
    width: 100%;
}

.quiz-colom-2 {
  grid-template-columns: 1fr 1fr;
}

.quiz-colom-4 {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.quiz-colom-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.imageAndOptions {
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 20px;

  &__options {
    width: 100%;
    overflow-y: auto;
  }

  img {
    width: 50%;
    position: sticky;
    top: 0;
  }
}
.quiz-container {
  display: flex;
  background-color: #ffffff;
  border-radius: 32px;

  &__progress {
    width: v-bind(currentQuestionProcent);
    transition: all 1s;
    height: 6px;
    background: linear-gradient(
      42deg,
      rgba(174, 47, 106, 1) 0%,
      rgba(210, 132, 168, 1) 4%,
      rgba(174, 47, 106, 1) 8%,
      rgba(210, 132, 168, 1) 12%,
      rgba(174, 47, 106, 1) 16%,
      rgba(210, 132, 168, 1) 20%,
      rgba(174, 47, 106, 1) 24%,
      rgba(210, 132, 168, 1) 28%,
      rgba(174, 47, 106, 1) 32%,
      rgba(210, 132, 168, 1) 36%,
      rgba(174, 47, 106, 1) 40%,
      rgba(210, 132, 168, 1) 44%,
      rgba(174, 47, 106, 1) 48%,
      rgba(210, 132, 168, 1) 52%,
      rgba(174, 47, 106, 1) 56%,
      rgba(210, 132, 168, 1) 60%,
      rgba(174, 47, 106, 1) 64%,
      rgba(210, 132, 168, 1) 68%,
      rgba(174, 47, 106, 1) 72%,
      rgba(210, 132, 168, 1) 76%,
      rgba(174, 47, 106, 1) 80%,
      rgba(210, 132, 168, 1) 84%,
      rgba(174, 47, 106, 1) 88%,
      rgba(210, 132, 168, 1) 92%,
      rgba(174, 47, 106, 1) 96%,
      rgba(210, 132, 168, 1) 100%
    );
    position: relative;
    left: 3px;
    border-radius: 5px;
  }

  &__progress-bar {
    width: 70%;
    height: 10px;
    background-color: #c9c9c9;
    border-radius: 8px;
    margin-left: 15px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
  }

  &__quiz-start {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    border-radius: 32px;
  }

  &__quiz {
    padding: 30px 50px;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    display: flex;
  }

  &__header {
    font-size: 18px;
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.1;
    letter-spacing: normal;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 16px;
  }

  &__desc {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
    opacity: 0.8;
    margin-bottom: 20px;
  }

  &__button {
    background: #d13980;
    color: #fff;
    padding: 8px 24px;
    border-radius: 24px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: #ae2f6a;
    }
  }

  &__img {
    width: 60%;
    height: 100%;

    img {
      height: 100%;
      height: 100% !important;
      object-fit: cover;
    }
  }

  &__info {
    width: 40%;
    padding: 0 40px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  &_center {
    align-items: center;
  }

  &__content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  &__step-count {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 2px;
    width: 100%;

    span {
      font-size: 18px;
    }
  }
}

.quiz-container-bottom-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

.then-button {
  font-family: 'Roboto', sans-serif;
  background: #d13980;
  color: #fff;
  padding: 8px 24px;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  &:hover {
    background: #ae2f6a;
  }
  &:disabled {
    background: #c67199;
    cursor: unset;
  }
}

@media only screen and (max-width: 1200px) {
  .QuizFormFields__form {
    max-width: 350px;
  }

  .quiz-container {
    &__img {
      width: 50%;
    }
    &__info {
      width: 50%;
    }
  }

  .quiz-colom-4 {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .imageAndOptions {
    .quiz-colom-2 {
      grid-template-columns: 1fr;
    }
  }
}

@media only screen and (max-width: 991px) {
  .quiz-container {
    &__quiz-start {
      flex-direction: column;
    }

    &__img {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      height: auto;

      img {
        width: 100% !important;
      }
    }

    &__info {
      width: 100%;
      height: auto;
      padding: 50px 40px;
    }
  }

  .quiz-colom-4 {
    grid-template-columns: 1fr 1fr;
  }

  .quiz-colom-3{
    grid-template-columns: 1fr 1fr;
  }

  .imageAndOptions {
    flex-direction: column-reverse;
    width: 100%;
    padding: 0 20px;

    &__options {
      width: 100%;
    }

    img {
      position: relative;
      width: 50%;
    }
  }
}

@media only screen and (max-width: 768px) {
    .quiz-container-bottom-menu{
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }


  .QuizFormFields {
    flex-direction: column-reverse;
    align-items: flex-start;

    &__form {
        padding: 20px 0;
      max-width: unset;
    }
  }
  .quiz-colom-2 {
    grid-template-columns: 1fr;
  }

  .imageAndOptions img {
    width: 100%;
    max-height: 180px;
    object-fit: cover;
  }

  .quiz-container__quiz {
    padding: 20px 20px 10px 20px;
  }
}

@media only screen and (max-width: 600px) {
  .quiz-container {
    &__img {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      height: auto;

      img {
        width: 100% !important;
      }
    }

    &__info {
      width: 100%;
      height: auto;
    //   padding: 0 16px;
    }
  }

  .quiz-colom-4 {
    grid-template-columns: 1fr;
  }

  .quiz-title {
    margin-bottom: 10px;
  }
}

@media only screen and (max-width: 430px) {
  .quiz-range__input {
    width: 100%;
  }

  .quiz-input__label {
    font-size: 14px;
    margin-bottom: 4px;
  }

  .quiz-input__input {
    padding: 5px 8px;
    font-size: 14px;
    border: 2px solid #c9c9c9;
    border-bottom: 3px solid #c9c9c9;
  }

  .QuizFormFields__form {
    min-width: unset;
  }

  .QuizFormFields__header {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .QuizFormFields__text {
    font-size: 12px;
  }

  .QuizFormFields {
    justify-content: center;
  }
}
</style>
