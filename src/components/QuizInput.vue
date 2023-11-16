<template>
  <div class="QuizInput">
    <div v-for="(item, index) in options" v-bind:key="item.index">
      <div class="quiz-input">
          <label  class="quiz-input__label" v-bind:id="'input_'+index">{{ item.label }}</label>
          <input v-model="data[item.id]" v-on:change="actionElem" class="quiz-input__input" type="text" v-bind:placeholder="item.placeholder">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
        name: 'QuizInput',
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
                data: []
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

.QuizInput{
    display: grid;
    // grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
    grid-gap: 16px;
    padding-bottom: 6px;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.quiz-input{
    display: flex;
    flex-direction: column;
    color: #828282;
    font-size: 16px;
    // margin-bottom: 16px;
    

    &__input{
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

    &__label{
        margin-bottom: 6px;
        font-size: 18px;
    }
}

</style>
