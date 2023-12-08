<template>
    <div class="QuizCheackboxImage">
        <div class="QuizCheackboxImage__item" v-for="(item, index) in options.fields" v-bind:key="index">
            <div @click="select" class="quiz-image-checkbox">
                <input v-model="data[item.id]" v-on:change="actionElem" class="quiz-image-checkbox__input" name="cheackbox_image" type="checkbox" v-bind:id="'image-cheackbox_'+quiz_id+'_'+options.index+'_'+index">
                <label class="quiz-image-checkbox__label" v-bind:for="'image-cheackbox_'+quiz_id+'_'+options.index+'_'+index">
                    <img class="quiz-image-checkbox__image" v-bind:src="item.image" alt="">
                    <p v-if="item.name != ''" class="quiz-image-checkbox__text">{{ item.name }}</p>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'QuizCheckboxImage',
        emits: ['addElem'],
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

.QuizCheackboxImage{
    display: grid;
    grid-auto-rows: min-content;
    grid-gap: 16px;
    padding-bottom: 6px;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    &__item{
        height: 100%;
    }
}

.quiz-image-checkbox{
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
        height: 100% !important;
        object-fit: cover;
        border-radius: 5px 5px 0 0;
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
    .quiz-image-checkbox__text{
        font-size: 13px;
        padding: 0 8px;
    }
}

@media only screen and (max-width: 430px) { 

}
</style>
