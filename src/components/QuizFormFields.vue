
<template>
    <div class="QuizFormFields">
        
        <form class="QuizFormFields__form" action="">
            <div class="quiz-input" v-for="(item, index) in options" v-bind:key="index">
                <label class="quiz-input__label" v-bind:id="'input_'+index">{{ item.label }}</label>
                <input v-model="data[item.id]" v-on:change="actionElem" class="quiz-input__input" type="text" v-bind:placeholder="item.placeholder">
            </div>

            <div class="then-button">{{ settings[0].buttonText }}</div>
        </form>

        <div class="QuizFormFields__info">
            <h2 class="QuizFormFields__header">{{ title }}</h2>
            <p class="QuizFormFields__text">{{ settings[0].text }}</p>
        </div>
    </div>
    
</template>


<script>
    export default {
        name: 'QuizFormFields',
        emits: ['addElem'],
        props: {
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            settings: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            title: {
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

.QuizFormFields{
    display: flex;
    gap: 30px;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;

    &__text{
        margin-bottom: 8px;
        color: #414141;
        font-size: 16px;
        max-width: 400px;
    }

    &__form{
        max-width: 400px;
        min-width: 250px;
        width: 100%;
    }

    &__header{
        font-size: 18px;
        font-weight: 700;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.1;
        letter-spacing: normal;
        font-family: "Roboto", sans-serif;
        margin-bottom: 16px;
        max-width: 400px;
    }
}


.quiz-input{
    display: flex;
    flex-direction: column;
    color: #363636;
    font-size: 16px;
    margin-bottom: 16px;
    

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

.then-button{
    font-family: "Roboto", sans-serif;
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
    &:hover{
        background: #ae2f6a;
    }
}

   
@media only screen and (max-width: 1200px) { 
    .QuizFormFields__form{
        max-width: 350px;
    }
}

@media only screen and (max-width: 991px) { 
}

@media only screen and (max-width: 768px) {
    .QuizFormFields{
        flex-direction: column-reverse;
        align-items: flex-start;
        
        &__form{
            max-width: unset;
        }
    }
}

@media only screen and (max-width: 600px) { 
}

@media only screen and (max-width: 430px) { 
    .quiz-input__label{
        font-size: 14px;
        margin-bottom: 4px;
    }

    .quiz-input__input{
        padding: 5px 8px;
        font-size: 14px;
        border: 2px solid #c9c9c9;
        border-bottom: 3px solid #c9c9c9;
    }

    .QuizFormFields__form{
        min-width: unset;
    }

    .QuizFormFields__header{
        font-size: 16px;
        margin-bottom: 10px;
    }

    .QuizFormFields__text{
        font-size: 12px;
    }

    .QuizFormFields{
        justify-content: center;
    }
}

</style>
