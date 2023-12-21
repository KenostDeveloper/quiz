

<script setup>
    const props = defineProps(['text', 'imgPath', 'btn_text'])
</script>


<template>
    <div class="QuizTextAndImage">
        <div class="QuizTextAndImage__container">
            <p class="QuizTextAndImage__text">{{ props.text }}</p>
            <div class="quiz-button-radio">
                <input v-on:change="actionElem" class="quiz-button-radio__input" name="radio" id="radio_skip" type="radio">
                <label class="quiz-button-radio__label" for="radio_skip">{{ props.btn_text != "" ? props.btn_text : "Теперь знаю!" }}</label>
            </div>
        </div>
        <img class="QuizTextAndImage__image" v-bind:src="props.imgPath" alt="">
        
    </div>
    
</template>


<script>
  export default {
        name: 'QuizTextAndImage',
        emits: ['ElemEnabled'],
        methods: {
            actionElem () {
                this.$emit('ElemEnabled')
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

.QuizTextAndImage{
    display: flex;
    gap: 20px;  
    align-items: flex-start;

    &__container{
        width: 100%;
    }

    &__image{
        // max-height: 300px;
        // width: 500px;
        object-fit: cover;
        margin-bottom: 16px;
        width: 50%;
    }

    &__text{
        margin-bottom: 8px;
        color: #414141;
        font-size: 16px;
        width: 100%;
    }
}

@media only screen and (max-width: 991px) { 
    .QuizTextAndImage{
        flex-direction: column-reverse;

        &__image{
            margin: 0;
            width: 50%;
        }
    }
}

@media only screen and (max-width: 768px) {
    .QuizTextAndImage__image{
        width: 100%;
        max-height: 180px;
        object-fit: cover;
    }
}

@media only screen and (max-width: 600px) { 
}

@media only screen and (max-width: 430px) { 
    .QuizTextAndImage__text{
        font-size: 14px;
    }
}

</style>
