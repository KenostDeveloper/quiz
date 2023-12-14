<template>
    <div class="quiz-container">
        <!-- {{ question[0] }} -->
        <div class="quiz-container__quiz-start" v-if="getCurrentQuestion.index == -1">
            <div class="quiz-container__img">
                <img v-bind:src="getCurrentQuestion.image" v-bind:alt="getCurrentQuestion.name" />
            </div>
            <div class="quiz-container__info">
                <h1 class="quiz-container__header">{{ getCurrentQuestion.name }}</h1>
                <p class="quiz-container__desc">{{ getCurrentQuestion.description }}</p>

                <div class="bonuses" >
                    <p class="bonuses__header">После теста вы получите:</p>
                    <div v-for="(item, index) in question[0].bonuses" v-bind:key="index" class="bonuses__el">
                        <img src="../assets/lock.svg" alt="" />
                        <p>{{item.name}}</p>
                    </div>
                </div>

                <div class="quiz-container__button" @click="NextQuestion">
                    {{
                        getCurrentQuestion.btn_start != '' ? getCurrentQuestion.btn_start : 'Начать'
                    }}
                </div>
            </div>
        </div>

        <div class="quiz-container__quiz-start" v-if="ifPassed">
            <div class="quiz-container__img">
                <img
                    v-bind:src="
                        question[0].answer_image != ''
                            ? question[0].answer_image
                            : question[0].image
                    "
                    v-bind:alt="getCurrentQuestion.name"
                />
            </div>
            <div class="quiz-container__info">
                <p class="quiz-container__desc">{{ question[0].answer }}</p>
                <a
                    v-if="question[0].btn_answer != ''"
                    :href="question[0].btn_answer_link"
                    class="quiz-container__button"
                >
                    {{ question[0].btn_answer }}
                </a>
            </div>
        </div>
        <div
            class="quiz-container__quiz-start"
            v-if="currentQuestion == question[0].steps.length && !ifPassed"
        >
            <div class="quiz-container__img">
                <img v-bind:src="getCurrentQuestion.image" v-bind:alt="getCurrentQuestion.name" />
            </div>
            <div class="quiz-container__info quiz-container_center">
                <h6>Куда вам удобнее отправить?</h6>
                <div class="quiz-container__contact">
                    <div class="quiz-container__el" @click="changeContat(1)">
                        <div
                            class="quiz-container__image-contact quiz-container__image-contact-whatsapp"
                        >
                            <img src="../assets/contact/whatsapp.svg" alt="" />
                        </div>
                        <p>WhatsApp</p>
                    </div>
                    <div class="quiz-container__el" @click="changeContat(2)">
                        <div
                            class="quiz-container__image-contact quiz-container__image-contact-viber"
                        >
                            <img src="../assets/contact/viber.svg" alt="" />
                        </div>
                        <p>Viber</p>
                    </div>
                    <div class="quiz-container__el" @click="changeContat(3)">
                        <div
                            class="quiz-container__image-contact quiz-container__image-contact-telegram"
                        >
                            <img src="../assets/contact/telegram.svg" alt="" />
                        </div>
                        <p>Telegram</p>
                    </div>
                    <div class="quiz-container__el" @click="changeContat(4)">
                        <div
                            class="quiz-container__image-contact quiz-container__image-contact-mail"
                        >
                            <img src="../assets/contact/email.svg" alt="" />
                        </div>
                        <p>Email</p>
                    </div>
                </div>

                <div class="quiz-container__inputs">
                    <input
                        v-on:change="actionElem"
                        class="quiz-input__input"
                        type="text"
                        :placeholder="inputText"
                        name="tel"
                    />
                    <input
                        v-if="inputText == 'Укажите ваш телефон'"
                        v-on:change="actionElem"
                        for="email"
                        class="quiz-input__input"
                        type="email"
                        name="mail"
                        placeholder="Укажите вашу почту"
                    />
                </div>

                <button
                    @click="dartQuizSubmit"
                    id="dartquiz-form"
                    class="then-button then-button-submit"
                >
                    {{
                        getCurrentQuestion.btn_submit != ''
                            ? getCurrentQuestion.btn_submit
                            : 'Отправить'
                    }}
                </button>
                <p class="errorform"></p>
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
                        <div class="quiz-container__description" v-if="getCurrentQuestion.correction != ''">
                            <div class="quiz-container__description-text">{{getCurrentQuestion.correction}}</div>
                        </div>
                        <div class="imageAndOptions" v-if="getCurrentQuestion.type == 1">
                            <QuizRadioButton
                                @addElem="addElemCheack"
                                class="imageAndOptions__options quiz-colom-2"
                                :options="getCurrentQuestion"
                                :quiz_id="question[0].id"
                            ></QuizRadioButton>
                            <img
                                v-if="getCurrentQuestion.image != ''"
                                :src="getCurrentQuestion.image"
                                alt=""
                            />
                        </div>
                        <div class="imageAndOptions" v-if="getCurrentQuestion.type == 2">
                            <QuizCheckbox
                                @addElem="addElem"
                                class="imageAndOptions__options quiz-colom-2"
                                :options="getCurrentQuestion"
                                :quiz_id="question[0].id"
                            ></QuizCheckbox>
                            <img
                                v-if="getCurrentQuestion.image != ''"
                                :src="getCurrentQuestion.image"
                                alt=""
                            />
                        </div>
                        <div class="imageAndOptions" v-if="getCurrentQuestion.type == 3">
                            <QuizInput
                                @addElem="addElem"
                                class="imageAndOptions__options quiz-colom-2"
                                :options="getCurrentQuestion"
                                :quiz_id="question[0].id"
                            ></QuizInput>
                            <img
                                v-if="getCurrentQuestion.image != ''"
                                :src="getCurrentQuestion.image"
                                alt=""
                            />
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
                                @addElem="addElemCheack"
                                :class="
                                    getCurrentQuestion.image == ''
                                        ? 'imageAndOptions__options quiz-colom-4'
                                        : 'imageAndOptions__options quiz-colom-3'
                                "
                                :options="getCurrentQuestion"
                                :quiz_id="question[0].id"
                            ></QuizRadioButtonImage>
                            <img
                                v-if="getCurrentQuestion.image != ''"
                                :src="getCurrentQuestion.image"
                                alt=""
                            />
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
                            <img
                                v-if="getCurrentQuestion.image != ''"
                                :src="getCurrentQuestion.image"
                                alt=""
                            />
                        </div>
                        <div class="quiz-container__skip" v-if="getCurrentQuestion.skip == 1">
                            <div class="quiz-button-radio">
                                <input @click="NextQuestionTimeOut" v-on:change="actionElem" class="quiz-button-radio__input" name="radio" id="radio_skip" type="radio">
                                <label class="quiz-button-radio__label" for="radio_skip">Пропустить</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="quiz-container-bottom-menu"
                v-if="currentQuestion < question[0].steps.length"
            >
                <div class="quiz-container__step-count">
                    <span>{{ currentQuestion + 1 }}</span
                    >/ {{ question[0].steps.length }}
                    <div class="quiz-container__progress-bar" v-if="question[0].progress == 1">
                        <div class="quiz-container__progress"></div>
                    </div>
                </div>
                <div class="buttons">
                    <button
                        @click="PrevQuestion"
                        :disabled="buttonPrevDisabled"
                        class="then-button"
                    >
                        {{ question[0].btn_prev != '' ? question[0].btn_prev : 'Далее' }}
                    </button>
                    <button @click="NextQuestion" :disabled="buttonDisabled" class="then-button">
                        {{ question[0].btn_next != '' ? question[0].btn_next : 'Назад' }}
                    </button>
                </div>
            </div>
        </div>
        <div
            class="quiz-info"
            v-if="getCurrentQuestion.index > -1 && currentQuestion != question[0].steps.length"
        >
            <div class="quiz-info__menbager">
                <img :src="question[0].manager_image" alt="" />
                <div class="quiz-info__menbager-name">
                    <div class="text">
                        {{ question[0].manager_name != "" ? question[0].manager_name : "Иванов Иван" }}
                    </div>
                    <div class="quiz-info__online">Онлайн</div>
                </div>
                <p>
                    {{ question[0].manager_description }}
                </p>
            </div>
            <div class="bonuses bonuses-padding">
                <p class="bonuses__header">После теста вы получите:</p>
                <div v-for="(item, index) in question[0].bonuses" v-bind:key="index" class="bonuses__el">
                    <img src="../assets/lock.svg" alt="" />
                    <p>{{item.name}}</p>
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
            ifPassed: false,
            valueObj: '',
            result: [],
            currentQuestion: -1,
            currentQuestionProcent: '0%',
            inputText: 'Укажите ваш телефон в WhatsApp',
            sosial: 'WhatsApp'
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
            this.valueObj.question = this.getCurrentQuestion.name

            this.buttonDisabled = false
        },

        addElemCheack(data) {
            this.valueObj = data
            this.valueObj.question = this.getCurrentQuestion.name
            this.buttonDisabled = false
            setTimeout(() => {
                this.NextQuestion()
            }, 500)
        },

        changeContat(number) {
            if (number == 1) {
                this.inputText = 'Укажите ваш телефон в WhatsApp'
                this.sosial = "WhatsApp"
            } else if (number == 2) {
                this.inputText = 'Укажите ваш телефон в Viber'
                this.sosial = "Viber"
            } else if (number == 3) {
                this.inputText = 'Укажите ваш телефон в Telegram'
                this.sosial = "Telegram"
            } else if (number == 4) {
                this.inputText = 'Укажите ваш телефон'
                this.sosial = "Почта"
            }
        },

        NextQuestionTimeOut(){
            this.valueObj = [{ value: 'Пропуск шага'}],
            this.valueObj.question = this.getCurrentQuestion.name
            setTimeout(() => {
                this.NextQuestion()
            }, 500)
        },

        NextQuestion() {
            // console.log(this.currentQuestion, this.question[0].steps.length - 1)
            if (this.currentQuestion == 0) {
                this.buttonPrevDisabled = false
            }

            if (this.currentQuestion <= this.question[0].steps.length - 1) {
                this.currentQuestion++
                if (this.currentQuestion != -1) {
                    this.currentQuestionProcent =
                        (100 / this.question[0].steps.length) * this.currentQuestion + '%'
                    // console.log(this.currentQuestion)

                    try {
                        if (this.question[0].steps[this.currentQuestion - 1].type != 5) {
                            this.result[this.currentQuestion - 1] = this.valueObj
                        } else {
                            this.result[this.currentQuestion - 1] = { question: 'Инфо-блок' }
                        }

                        if (this.question[0].steps[this.currentQuestion].type != 5) {
                            this.buttonDisabled = true
                        } else {
                            this.buttonDisabled = false
                        }
                    } catch {
                        null
                    }
                }
                return
            }
        },

        PrevQuestion() {
            if (this.currentQuestion == 1) {
                this.buttonPrevDisabled = true
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

        dartQuizSubmit() {
            const errorMes = document.querySelectorAll('.errorform')
            errorMes[0].innerText = ' '

            if (document.querySelector('input[name="tel"]').value == '') {
                errorMes[0].innerText = 'Пожалуйста, введите номер телефона!'
            }

            if(document.querySelector('input[name="mail"]')){
                if (
                document.querySelector('input[name="mail"]').value == '' &&
                this.inputText == 'Укажите ваш телефон'
                ) {
                    errorMes[0].innerText = 'Пожалуйста, введите свою почту!'
                }
            }
            

            if (document.querySelector('input[name="tel"]').value != '') {
                const data = {
                    dq_action: 'quiz/send',
                    phone: document.querySelector('input[name="tel"]').value,
                    data: this.result,
                    sosial: this.sosial
                }

                if(document.querySelector('input[name="mail"]')){
                    data.email = document.querySelector('input[name="mail"]').value;
                }

                

                fetch('/assets/components/dartquiz/action.php', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    this.ifPassed = true
                })
            }
        }
    },
    computed: {
        getCurrentQuestion() {
            if (
                this.currentQuestion != -1 &&
                this.currentQuestion != this.question[0].steps.length
            ) {
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

.quiz-button-radio{
    // margin-bottom: 16px;
    &__label{
        width: fit-content;
        padding: 10px 40px 10px 16px;
        background: #ffffff;
        color: #000000;
        font-size: 16px;
        display: flex;
        align-items: center;
        position: relative;
        border-radius: 8px;
        border: 3px solid #c9c9c9;
        border-bottom: 5px solid #c9c9c9;
    }

    &__input{
        display: none;
    }

    &__label:after,
    &__label:before {
        content: "";
        position: absolute;
        border-radius: 50%;
    }
    &__label:after {
        height: 19px;
        width: 19px;
        border: 2px solid #c9c9c9;
        right: 16px;
    }
    &__input:checked ~ label {
        border-color: #d13980;
    }
    &__input:checked ~ label::before {
        background: #d13980;
        height: 17px;
        width: 17px;
        content: "";
        position: absolute;
        opacity: 1;
        right: 17px;
        visibility: visible;
        transform: scale(1);
    }
}
.bonuses {
    margin-bottom: 20px;

    &__header {
        font-weight: 700;
        font-size: 14px;
        color: #363636;
        margin: 0px 0px 10px 0;
    }

    &__el {
        display: flex;
        position: relative;
        align-items: center;
        background: #d1398030;
        border-radius: 5px;
        padding: 10px 10px 10px 10px;
        gap: 5px;
        margin-bottom: 10px;

        img {
            width: 20px;
            height: 20px;
            fill: #ae2f6a;
        }

        p {
            font-size: 14px;
            line-height: 1;
        }
    }

    &-padding {
        padding: 5px 20px;

        .bonuses__header {
            font-size: 12px;
            margin: 10px 0 6px 0;
        }
    }
}

.quiz-info {
    width: 30%;
    min-width: 210px;
    font-family: 'Roboto', sans-serif;
    padding: 30px 0px 30px 0px;
    background: #e3e3e3;
    border-radius: 0 32px 32px 0;

    &__menbager-name {
        position: relative;
    }

    &__menbager {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .text {
            background: #d13980;
            border-radius: 5px;
            transform: skew(-10deg);
            padding: 6px 15px;
            font-weight: 400;
            font-size: 14px;
            line-height: 1;
            text-align: center;
            letter-spacing: 0.05em;
            color: #ffffff;
            width: 120px;
            position: relative;
            word-spacing: 100vw
        }

        p {
            font-weight: 300;
            font-size: 12px;
            line-height: 1;
            text-align: center;
            padding: 10px 20px 0 20px;
        }
    }

    &__online {
        background: #25D366;
        border-radius: 500px;
        padding: 0 20px 0 10px;
        height: 20px;
        font-weight: 400;
        font-size: 12px;
        line-height: 1;
        text-align: center;
        letter-spacing: 0.02em;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: -25px;
        top: -14px;
        border: solid 1px #25D366;

        &::before {
            content: '';
            position: absolute;
            z-index: 1;
            width: 10px;
            height: 10px;
            background: #fff;
            animation: blinker 0.5s ease infinite alternate;
            border-radius: 50%;
            right: 6px;
        }
    }
}

@keyframes blinker {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.errorform {
    color: #db3e3e;
    margin-top: 3px;
    font-size: 14px;
}

.buttons {
    display: flex;

    button {
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
    margin-top: 16px;

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

.then-button-submit {
    width: 90%;
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
    flex-direction: column-reverse;
    width: 100%;
    gap: 20px;

    &__options {
        width: 100%;
        overflow-y: auto;
    }

    img {
        max-width: 200px;
        position: sticky;
        top: 0;
    }
}
.quiz-container {
    display: flex;
    background-color: #ffffff;
    border-radius: 32px;

    &__skip{
        margin-top: 10px;
    }

    
    &__description{
        background: #d1398062;
        border: solid 1px #d13980;
        width: fit-content;
        padding: 3px 10px;
        border-radius: 6px;
        margin-bottom: 8px;
    }

    &__contact {
        display: flex;
    }

    &__inputs {
        width: 90%;
        margin-top: 20px;
        display: flex;
        gap: 12px;
        flex-direction: column;
    }

    &__el {
        width: 25%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        cursor: pointer;
    }

    &__image-contact {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;

        img {
            width: 30px;
            height: 30px;
        }

        width: 60px;
        height: 60px;

        &-whatsapp {
            background: #25d266;
        }

        &-viber {
            background: #7460f3;
        }

        &-telegram {
            background: #00a2f2;
        }

        &-mail {
            background: #36c14a;
        }
    }

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
        padding: 30px 20px 30px 50px;
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

        h6 {
            font-size: 18px;
            margin-bottom: 13px;
        }
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

    .quiz-colom-3 {
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
    .quiz-container-bottom-menu {
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
    .quiz-info {
        display: none;
    }
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
