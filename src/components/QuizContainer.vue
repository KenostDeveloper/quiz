
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
            <QuizTitle v-if="currentQuestion <= question.length - 2" :title=getCurrentQuestion.question></QuizTitle>
            <div class="quiz-container__content">
                <QuizRadioButton @addElem="addElem" class="quiz-colom-2" v-if="getCurrentQuestion.type == 1" :options=getCurrentQuestion.options></QuizRadioButton>
                <QuizCheckbox @addElem="addElem" class="quiz-colom-2" v-if="getCurrentQuestion.type == 2" :options=getCurrentQuestion.options></QuizCheckbox>
                <QuizInput @addElem="addElem" class="quiz-colom-2" v-if="getCurrentQuestion.type == 3" :options=getCurrentQuestion.options ></QuizInput>
                <QuizRange @addElem="addElem" v-if="getCurrentQuestion.type == 4" :settings=getCurrentQuestion.settings></QuizRange>
                <QuizCheackboxImage @addElem="addElem" class="quiz-colom-4" v-if="getCurrentQuestion.type == 5" :options="getCurrentQuestion.options"></QuizCheackboxImage>
                <QuizRadioButtonImage @addElem="addElem" class="quiz-colom-4" v-if="getCurrentQuestion.type == 6" :options="getCurrentQuestion.options"></QuizRadioButtonImage>
                <div class="imageAndOptions" v-if="getCurrentQuestion.type == 7">
                    <QuizRadioButton @addElem="addElem" class="imageAndOptions__options quiz-colom-2" :options=getCurrentQuestion.options></QuizRadioButton>
                    <img :src="getCurrentQuestion.imgPath" alt="">
                </div>
                <div class="imageAndOptions" v-if="getCurrentQuestion.type == 8">
                    <QuizCheckbox @addElem="addElem" class="imageAndOptions__options quiz-colom-2" :options=getCurrentQuestion.options></QuizCheckbox>
                    <img :src="getCurrentQuestion.imgPath" alt="">
                </div>
                <div class="imageAndOptions" v-if="getCurrentQuestion.type == 9">
                    <QuizInput @addElem="addElem" class="imageAndOptions__options quiz-colom-2" :options=getCurrentQuestion.options></QuizInput>
                    <img :src="getCurrentQuestion.imgPath" alt="">
                </div>
                <div class="imageAndOptions" v-if="getCurrentQuestion.type == 10">
                    <QuizRange @addElem="addElem" class="imageAndOptions__options" :settings=getCurrentQuestion.settings></QuizRange>
                    <img :src="getCurrentQuestion.imgPath" alt="">
                </div>
                <QuizTextAndImage v-if="getCurrentQuestion.type == 11" :imgPath=getCurrentQuestion.imgPath :text=getCurrentQuestion.text></QuizTextAndImage>
                <QuizFormFields @addElem="addElem" v-if="getCurrentQuestion.type == 12" :title=getCurrentQuestion.question :options=getCurrentQuestion.options :settings="getCurrentQuestion.settings"></QuizFormFields>
            </div>
            <div class="quiz-container-bottom-menu" v-if="currentQuestion <= question.length - 2">
                <div class="quiz-container__step-count">
                    <span>{{currentQuestion}}</span>/ {{question.length - 2}}
                    <div class="quiz-container__progress-bar"><div class="quiz-container__progress"></div></div>
                </div>
                <button @click="NextQuestion" :disabled="buttonDisabled"  class="then-button">Далее</button>
            </div>
        </div>
        
    </div>
    
</template>

<script setup>
    import QuizTitle from './QuizTitle.vue';
    import QuizRadioButton from './QuizRadioButton.vue';
    import QuizCheckbox from './QuizCheckbox.vue';
    import QuizInput from './QuizInput.vue';
    import QuizRange from './QuizRange.vue';
    import QuizCheackboxImage from './QuizCheackboxImage.vue'
    import QuizRadioButtonImage from './QuizRadioButtonImage.vue'
    import QuizTextAndImage from './QuizTextAndImage.vue'
    import QuizFormFields from './QuizFormFields.vue'
</script>

<script>

    export default {
        data() {
            return {
                buttonDisabled: true,
                valueObj: '',
                result: [],
                currentQuestion: 0,
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
            addElem(data){
                this.valueObj = data
                // console.dir(this.result)
                // console.log(Object.values(data).filter(item => item).length === 1);
                this.buttonDisabled = false;
            },

            NextQuestion() {
                if (this.currentQuestion < this.question.length - 1) {
                    this.currentQuestion++
                    if(this.currentQuestion != 1){
                        this.currentQuestionProcent = (100 / (this.question.length - 2) * (this.currentQuestion - 1)) + '%';
                        this.result[this.currentQuestion - 2] = this.valueObj;
                        
                        if(this.question[this.currentQuestion].type != 11){
                            this.buttonDisabled = true;
                        }else{
                            this.buttonDisabled = false;
                        }
                    }
                    return
                }
            }
        },
        computed: {
            getCurrentQuestion(){
                let question = this.question[this.currentQuestion]
                question.index = this.currentQuestion
                return question
            }
        }
    }
</script>

<style scoped lang="scss">

.quiz-colom-2{
    grid-template-columns: 1fr 1fr;
}

.quiz-colom-4{
    grid-template-columns: 1fr 1fr 1fr 1fr;
}


.imageAndOptions{
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: 20px;

    &__options{
        width: 65%;
        overflow-y: auto;
    }

    img{
        width: 35%;
        position: sticky;
        top: 0;
    }
}
.quiz-container{
        display: flex;
        background-color: #ffffff;
        border-radius: 32px;

        &__progress{
            width: v-bind(currentQuestionProcent);
            transition: all 1s;
            height: 6px;
            background: linear-gradient(42deg, rgba(174,47,106,1) 0%, rgba(210,132,168,1) 4%, rgba(174,47,106,1) 8%, rgba(210,132,168,1) 12%, rgba(174,47,106,1) 16%, rgba(210,132,168,1) 20%, rgba(174,47,106,1) 24%, rgba(210,132,168,1) 28%, rgba(174,47,106,1) 32%, rgba(210,132,168,1) 36%, rgba(174,47,106,1) 40%, rgba(210,132,168,1) 44%, rgba(174,47,106,1) 48%, rgba(210,132,168,1) 52%, rgba(174,47,106,1) 56%, rgba(210,132,168,1) 60%, rgba(174,47,106,1) 64%, rgba(210,132,168,1) 68%, rgba(174,47,106,1) 72%, rgba(210,132,168,1) 76%, rgba(174,47,106,1) 80%, rgba(210,132,168,1) 84%, rgba(174,47,106,1) 88%, rgba(210,132,168,1) 92%, rgba(174,47,106,1) 96%, rgba(210,132,168,1) 100%);
            position: relative;
            left: 3px;
            border-radius: 5px;
        }

        &__progress-bar{
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
            display: flex;
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
            height: 100%;
            overflow-y: auto;
        }


        &__step-count{
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 2px;
            width: 100%;

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
        margin-top: 10px;
    }

    .then-button{
        font-family: "Roboto", sans-serif;
        background: #d13980;
        color: #fff;
        padding: 8px 24px;
        border-radius: 24px;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
        &:hover{
            background: #ae2f6a;
        }
        &:disabled{
            background: #c67199;
            cursor: unset;
        }
    }

    
@media only screen and (max-width: 1200px) { 
    .quiz-container{
        &__img{
            width: 50%;
        }
        &__info{
            width: 50%;
        }
    }

    .quiz-colom-4{
        grid-template-columns: 1fr 1fr 1fr;
    }

    .imageAndOptions{
        .quiz-colom-2{
        grid-template-columns: 1fr;
    }
    }
}

@media only screen and (max-width: 991px) { 
    .quiz-container{
        &__quiz-start{
            flex-direction: column;
        }

        &__img{
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            height: 60%;

            img{
                width: 100% !important;
            }
        }

        &__info{
            width: 100%;
            height: 40%;
        }
    }

    .quiz-colom-4{
        grid-template-columns: 1fr 1fr;
    }

    .imageAndOptions{
        flex-direction: column-reverse;
        width: 100%;

        &__options{
            width: 100%;
        }

        img{
            position: relative;
            width: 50%;
        }
    }
}

@media only screen and (max-width: 768px) {
    .quiz-colom-2{
        grid-template-columns: 1fr;
    }

    .imageAndOptions img{
        width: 100%;
        max-height: 180px;
        object-fit: cover;
    }

    .quiz-container__quiz{
        padding: 30px 20px;
    }
}

@media only screen and (max-width: 600px) { 
    .quiz-container{
        &__img{
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            height: 50%;

            img{
                width: 100% !important;
            }
        }

        &__info{
            width: 100%;
            height: 50%;
            padding: 0 16px;
        }
    }

    .quiz-colom-4{
        grid-template-columns: 1fr;
    }

    .quiz-title{
        margin-bottom: 10px;
    }
}

@media only screen and (max-width: 430px) { 
    .quiz-range__input{
        width: 100%;
    }
}
</style>
