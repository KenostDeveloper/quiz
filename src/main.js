
import './assets/_global.scss'
import './assets/_reset.scss'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const quizAll = document.querySelectorAll('.dartquiz');

for(let i = 0; i < quizAll.length; i++){

    let quizData = quizAll[i].getAttribute('data-quiz');

    // console.log([JSON.parse(quizData)])

    const app = createApp(App, {
        quiz: [JSON.parse(quizData)]
    })
    
    
    app.mount('#' + quizAll[i].id)
}

