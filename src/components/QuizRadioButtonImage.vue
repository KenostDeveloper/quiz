
<template>
    <div class="QuizRadioButtonImage">
        <div v-for="(item, index) in options" v-bind:key="index">
            <div class="quiz-image-radio">
                <input :value="item.id" v-model="data.value" v-on:change="actionElem" class="quiz-image-radio__input" name="radio_button_image" type="radio" v-bind:id="index+'_image-radio-button'">
                <label class="quiz-image-radio__label" v-bind:for="index+'_image-radio-button'">
                    <img class="quiz-image-radio__image" v-bind:src="item.imgPath" alt="">
                    <p v-if="item.name != ''" class="quiz-image-radio__text">{{ item.name }}</p>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'QuizRadioImage',
        emits: ['addElem'],
        props: {
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return{
                data: {value: ''}
            }
        },
        methods: {
            actionElem () {
                this.$emit('addElem', this.data)
            }
        }
    }
</script>



<style scoped lang="scss">

.QuizRadioButtonImage{
    display: grid;
    grid-auto-rows: min-content;
    grid-gap: 16px;
    padding-bottom: 6px;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.quiz-image-radio{
    display: flex;
    flex-direction: column;
    height: 100%;


    &__label{
        width: 100%;
        border: 3px solid #c9c9c9;
        border-bottom: 5px solid #c9c9c9;
        background: #ffffff;
        border-radius: 8px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    &__image{
        object-fit: cover;
        border-radius: 5px 5px 0 0;
        height: 100% !important;
    }

    &__text{
        color: #828282;
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 5px;
        text-align: center;
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
        top: 15px;
        right: 15px;
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
        visibility: visible;
        transform: scale(1);
        top: 15px;
        right: 15px;
    }
}

@media only screen and (max-width: 600px) { 
    .quiz-image-radio__text{
        font-size: 13px;
        padding: 0 8px;
    }
}

@media only screen and (max-width: 430px) { 

}
</style>
