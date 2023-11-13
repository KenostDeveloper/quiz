<script setup>
import QuizTitle from './QuizTitle.vue';
import QuizRadioButton from './QuizRadioButton.vue';
import QuizCheckbox from './QuizCheckbox.vue';
import QuizInput from './QuizInput.vue';
import QuizRange from './QuizRange.vue';
import {ref, computed} from 'vue';

const props = defineProps(['question'])
const questions = props.question

const currentQuestion = ref(0);

const getCurrentQuestion = computed(() => {
	let question = questions[currentQuestion.value]
	question.index = currentQuestion.value
	return question
})

//Следующий шаг
const NextQuestion = () => {
	if (currentQuestion.value < questions.length - 1) {
		currentQuestion.value++
		return
	}
}

</script>

<template>
    <div class="quiz-container">
        <div class="quiz-container__quiz-start" v-if="getCurrentQuestion.type == 0" :options=getCurrentQuestion.options>
            <div class="quiz-container__img">
                <img v-bind:src="getCurrentQuestion.imgPath" alt="">
            </div>
            <div class="quiz-container__info">
                <h1 class="quiz-container__header">{{ getCurrentQuestion.question }}</h1>
                <p class="quiz-container__desc">{{ getCurrentQuestion.description }}</p>
                <div class="quiz-container__button" @click="NextQuestion">{{ getCurrentQuestion.buttonText }}</div>
            </div>
            
        </div>
        <div v-if="getCurrentQuestion.type > 0" class="quiz-container__quiz">
            <QuizTitle :title=getCurrentQuestion.question></QuizTitle>
            <div class="quiz-container__content">
                <div class="quiz-container__items">
                    <QuizRadioButton v-if="getCurrentQuestion.type == 1" :options=getCurrentQuestion.options></QuizRadioButton>
                    <QuizCheckbox v-if="getCurrentQuestion.type == 2" :options=getCurrentQuestion.options></QuizCheckbox>
                    <QuizInput v-if="getCurrentQuestion.type == 3" :options=getCurrentQuestion.options ></QuizInput>
                    <QuizRange v-if="getCurrentQuestion.type == 4" :options=getCurrentQuestion.options :settings=getCurrentQuestion.settings></QuizRange>
                </div>
            </div>
            <div class="quiz-container-bottom-menu">
                <div class="quiz-container__step-count"><span>{{currentQuestion }}</span>/ {{questions.length - 1}}</div>
                <div @click="NextQuestion" class="then-button">Далее</div>
            </div>
        </div>
        
    </div>
    
</template>

<style scoped lang="scss">
.quiz-container{
        display: flex;
        background-color: #ffffff;
        border-radius: 32px;

        &__quiz-start{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            overflow: hidden;
            border-radius: 32px;
        }

        &__quiz{
            padding: 30px 50px;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            height: 100%;
        }

        &__header{
            font-size: 18px;
            font-weight: 700;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.1;
            letter-spacing: normal;
            font-family: 'Roboto', sans-serif;
            margin-bottom: 16px;
        }

        &__desc{
            font-family: 'Roboto', sans-serif;
            font-size: 14px;
            font-weight: 500;
            opacity: 0.8;
            margin-bottom: 20px;
        }

        &__button{
            background: #d13980;
            color: #fff;
            padding: 8px 24px;
            border-radius: 24px;
            cursor: pointer;
            transition: all 0.3s;
            &:hover{
                background: #ae2f6a;
            }
        }

        &__img{
            width: 60%;
            height: 100%;

            img{
                height: 100%;
                height: 100% !important;
                object-fit: cover;
            }
        }

        &__info{
            width: 40%;
            padding: 0 40px;
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }
        

        &__content{
            width: 100%;
            height: calc(100% - 80px);
            overflow-y: auto;
        }

        &__items{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: min-content;
            grid-gap: 16px;
            padding-bottom: 6px;
            max-height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }

        &__step-count{
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 2px;

            span{
                font-size: 18px;
            }
        }
    }

    .quiz-container-bottom-menu{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .then-button{
        background: #d13980;
        color: #fff;
        padding: 8px 24px;
        border-radius: 24px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover{
            background: #ae2f6a;
        }
    }
</style>
