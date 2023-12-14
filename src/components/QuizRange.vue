<template>
    <div class="quiz-range">
        <label class="quiz-range__label" >{{ inputValue }}</label>
        <input v-model="data.value[0]" v-on:change="actionElem" v-on:input="sliderChange" :min="settings[0].sliderMinValue" :max="settings[0].sliderMaxValue" :step="settings[0].sliderStepValue" class="quiz-range__input" type="range" placeholder="Введите текст">
    </div>
</template>

<script>
    export default {
        name: 'QuizRange',
        emits: ['addElem', 'ElemEnabled'],
        props: {
            settings: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            fieldsResult: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return{
                data: {value: [0]},
                inputValue: '0',
                inputMaxValue: 0,
                inputMinValue: 0,
                cssInputValue: '0%',
                inputStep: 0,
            }
        },
        methods: {
            actionElem () {
                this.$emit('addElem', this.data)
            },
            sliderChange(evt) {
                this.inputMaxValue = evt.target.max
                this.inputValue = evt.target.value
                this.inputStep = evt.target.step
                this.inputMinValue = evt.target.min
                this.cssInputValue = this.inputValue / (this.inputMaxValue / 100) + "%"
            }
        },
        mounted() {
            if (Object.keys(this.fieldsResult).length != 0) {
                for(let i = 0; i < this.fieldsResult.value.length; i++){
                    this.data.value[i] = this.fieldsResult.value[i];
                    this.cssInputValue = this.fieldsResult.value[i] + "%"
                    this.inputValue = this.fieldsResult.value[i]
                    this.$emit('ElemEnabled')
                }
            }
        }
    }
</script>

<style scoped lang="scss">

.quiz-range{
    display: flex;
    flex-direction: column;
    padding: 0 0 30px 0;

    &__label{
        color: #828282;
        font-size: 16px;
        margin-bottom: 8px;
    }

    
    &__input {
        background: linear-gradient(to right, #d13980 0%, #d13980 v-bind(cssInputValue), #f091bd v-bind(cssInputValue), #f091bd 100%);
      /*   border: solid 2px #2F445F; */
        border-radius: 8px;
        height: 8px;
        width: 400px;
        outline: none;
        transition: background 450ms ease-in;
        -webkit-appearance: none;
    }
      
    &__input::-webkit-slider-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        -webkit-appearance: none;
        cursor: ew-resize;
        background: #d13980;
    }
}

@media only screen and (max-width: 991px) { 
    .quiz-range{
        &__input{
            height: 6px;
            width: 300px;
        }

        &__input::-webkit-slider-thumb {
        width: 15px;
        height: 15px;
        }
    }
}

@media only screen and (max-width: 768px) {

}

@media only screen and (max-width: 600px) { 
    .quiz-range{
        &__input{
            height: 6px;
            width: 100%;
        }
    }
}

@media only screen and (max-width: 430px) { 

}
</style>
