

<script setup>
    const props = defineProps(['text' , 'imgPath'])
</script>


<template>
    <div class="QuizTextAndImage">
        <p class="QuizTextAndImage__text">{{ props.text }}</p>
        <img class="QuizTextAndImage__image" v-bind:src="props.imgPath" alt="">
    </div>
    
</template>

<style scoped lang="scss">

.QuizTextAndImage{
    display: flex;
    gap: 20px;  
    align-items: flex-start;

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
