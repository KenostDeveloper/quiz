<template>
    <div class="QuizCheckbox">
        <div v-for="(item, index) in options.fields" v-bind:key="index">
            <div class="quiz-button-checkbox">
                <input v-model="data[index]" :value="item.name" v-on:change="actionElem" class="quiz-button-checkbox__input" name="checkbox" v-bind:id="'checkbox_'+quiz_id+'_'+options.index+'_'+index" type="checkbox">
                <label class="quiz-button-checkbox__label" v-bind:for="'checkbox_'+quiz_id+'_'+options.index+'_'+index">{{ item.name }}</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'QuizCheckbox',
        emits: ['addElem', 'ElemEnabled'],
        props: {
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            quiz_id: {
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
                data: [],
                result: { value: []}
            }
        },
        methods: {
            actionElem () {
                for(let i = 0; i < this.data.length; i++){
                    if(this.data[i] != undefined && this.data[i] != false){
                        this.result.value[i] = this.options.fields[i].name;
                    }else{
                        this.result.value[i] = null;
                    }
                }
                
                this.$emit('addElem', this.result)
            }
        },
        mounted() {
            if (Object.keys(this.fieldsResult).length != 0) {
                for(let i = 0; i < this.fieldsResult.value.length; i++){
                    if(this.fieldsResult.value[i] != null){
                        this.data[i] = true;
                    }else{
                        this.data[i] = false;
                    }
                }
                this.$emit('ElemEnabled')
            }
        }
    }
</script>

<style scoped lang="scss">

.QuizCheckbox{
    display: grid;
    grid-auto-rows: min-content;
    grid-gap: 16px;
    padding-bottom: 6px;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.quiz-button-checkbox{
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
        // border-radius: 50%;
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
