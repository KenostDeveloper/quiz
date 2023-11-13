

<script setup>
import { reactive, toRefs } from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

// export default {
//   setup() {
//     const data = reactive({ value: 0 })
//     return toRefs(data)
//   },
// }


const props = defineProps(['options', 'settings'])

</script>

<template>
    <vue-slider v-model="value" />
    <div class="quiz-range">
        <label class="quiz-range__label">{{ props.options[0] }}</label>
        <input v-bind:value="props.settings[0].value" v-bind:min="props.settings[0].minValue" v-bind:max="props.settings[0].maxValue" v-bind:step="props.settings[0].step" class="quiz-range__input" type="range" placeholder="Введите текст">
    </div>
</template>

<style scoped lang="scss">

.quiz-range{
    display: flex;
    flex-direction: column;

    &__label{
        color: #D9D9D9;
        font-size: 16px;
    }

    
    &__input {
        background: linear-gradient(to right, #6A6DCD 0%, #6A6DCD 20%, #2F445F 20%, #2F445F 100%);
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
        background: #6A6DCD;
    }
}
</style>
