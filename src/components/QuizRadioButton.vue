<script setup>

const props = defineProps(['options'])

</script>

<template>
    <div class="QuizRadioButton">
        <div v-for="(item, index) in props.options" v-bind:key="item.index">
            <div class="quiz-button-radio">
                <input class="quiz-button-radio__input" name="radio" v-bind:id="'radio_'+index" type="radio">
                <label class="quiz-button-radio__label" v-bind:for="'radio_'+index">{{ item }}</label>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.QuizRadioButton{
    display: grid;
    grid-auto-rows: min-content;
    grid-gap: 16px;
    padding-bottom: 6px;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.quiz-button-radio{
    // margin-bottom: 16px;
    &__label{
        width: 100%;
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
</style>
