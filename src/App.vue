<template>
  <div class="dart_wrapper bacground-dark">
    <main class="dart_main dart-center">
      <section class="dart-section">
        <div class="dart_container">
          <QuizContainer class="quiz-container__full" :question="questions"></QuizContainer>
        </div>
        
      </section>
    </main>
  </div>
</template>

<script setup>
import QuizContainer from './components/QuizContainer.vue';
import {ref} from 'vue';

// const questions = ref([
//   {
//     type: 0,
//     question: "Пройди тест, чтобы рассчитать стоимость необходимых детейлинг услуг",
//     description: "После прохождения теста ты получишь индивидуальное предложение и скидку 💯!",
//     buttonText: "Расчитать",
//     imgPath: "https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg"
//   },
//   {
//     type: 1,
//     question: "Текстовый ответ?",
//     options: [
//       {id: 0, text: "Ответ 1 - 1"},
//       {id: 1, text: "Ответ 1 - 1"},
//       {id: 2, text: "Ответ 1 - 1"},
//       {id: 3, text: "Ответ 1 - 1"},
//     ],
//   },
//   {
//     type: 2,
//     question: "Текстовый ответ с несколькими вариантами?",
//     options: [
//       {id: 0, text: "Ответ 1"},
//       {id: 1, text: "Ответ 2"},
//       {id: 2, text: "Ответ 3"},
//       {id: 3, text: "Ответ 4"},
//       {id: 4, text: "Ответ 5"},
//       {id: 5, text: "Ответ 6"},
//       {id: 6, text: "Ответ 7"},
//       {id: 7, text: "Ответ 8"},
//     ],
//   },
//   {
//     type: 3,
//     question: "Поле для ввода?",
//     options: [
//       {id: 0, label: 'Имя', placeholder: 'Иван'},
//       {id: 1, label: 'Фамилия', placeholder: 'Иванов'},
//     ],
//   },
//   {
//     type: 4,
//     question: "Ползунок?",
//     settings: [
//       {minValue: 0, maxValue: 100, step: 1}
//     ]
//   },
//   {
//     type: 5,
//     question: "Выберите одно или несколько вариантов?",
//     options: [
//       {id: 0, text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg'},
//       {id: 1, text: 'Фамилия', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg'},
//       {id: 2, text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg'},
//     ],
//   },
//   {
//     type: 6,
//     question: "Выберите одно или несколько вариантов?",
//     options: [
//       {id: 0, text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg'},
//       {id: 1, text: 'Фамилия', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg'},
//       {id: 2, text: '', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg'},
//       {id: 3, text: '', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg'},
//       {id: 4, text: 'Фамилия', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg'},
//       {id: 5, text: 'Фамилия', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg'},
//       {id: 6, text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg'},
//     ],
//   },
//   {
//     type: 7,
//     question: "Выберите одно или несколько вариантов?",
//     imgPath: "https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg",
//     options: [
//       {id: 0, text: "Ответ 1"},
//       {id: 2, text: "Ответ 1"},
//       {id: 3, text: "Ответ 1"},
//       {id: 4, text: "Ответ 1"},
//       {id: 5, text: "Ответ 1"},
//       {id: 6, text: "Ответ 1"},

//     ],
//   },
//   {
//     type: 8,
//     question: "Выберите одно или несколько вариантов?",
//     imgPath: "https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg",
//     options: [
//       {id: 0, text: "Ответ 1"},
//       {id: 2, text: "Ответ 1"},
//       {id: 3, text: "Ответ 1"},
//       {id: 4, text: "Ответ 1"},
//       {id: 5, text: "Ответ 1"},
//       {id: 6, text: "Ответ 1"},
//     ],
//   },
//   {
//     type: 9,
//     question: "Выберите одно или несколько вариантов?",
//     imgPath: "https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg",
//     options: [
//       {id: 0, label: 'Имя', placeholder: 'Иван'},
//       {id: 1, label: 'Фамилия', placeholder: 'Иванов'},
//     ],
//   },
//   {
//     type: 10,
//     question: "Ползунок?",
//     imgPath: "https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg",
//     settings: [
//       {minValue: 0, maxValue: 500, step: 1}
//     ]
//   },
//   {
//     type: 11,
//     question: "А вы знали что........ ? 😉",
//     imgPath: "https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/sf7vb6hlkkvx2sbytj85.jpg",
//     text: [
//       'Кратко опишем предметную область задачи, поставленной в ходе выполнения курсовой работы.😉',
//       'Процесс автоматизации продаж автомобилей в автосалоне представить так:',
//       '• изначально менеджер или оператор автосалона вносит в программу данные, которые впоследствии не будут меняться или будут меняться достаточно редко (в частности, такой информацией являются сведения о производителях автомобилей);',
//       '• затем оператор при поступлении автомобиля на склад того или иного производителя каким-либо образом учитывает сведения о поступившем автомобиле;',
//       '• каждый имеющийся в наличии на складе автосалона автомобиль может быть охарактеризован своим производителем (например, Nissan, Mercedes и т.п.), конкретной моделью (например, Mazda 323), продажной стоимостью (в долларах США), пробегом, цветом;',
//     ],
//   },
//   {
//     type: 12,
//     question: "Оставьте свои контакты, закрепим скидку и утвердим дату уборки",
//     settings: [
//       {text: "Какрй-то текст не слишком длинный Какрй-то текст не слишком длинный Какрй-то текст не слишком длинный", buttonText: "Отправить"}
//     ],
//     options: [
//       {id: 0, label: 'Имя', placeholder: 'Иван'},
//       {id: 1, label: 'Номер телефона', placeholder: '+7 999 999 99 99'},
//       {id: 2, label: 'email', placeholder: 'email@mail.ru'},
//     ],
//   },
// ])

const questions = ref([
{
    type: 0,
    question: "Калькулятор расчёта стоимости тонировки автомобиля",
    description: "После прохождения теста ты получишь индивидуальное предложение и скидку 💯!",
    buttonText: "Расчитать",
    imgPath: "https://hgwipn3sa-res.cloudinary.com/image/upload/w_auto,f_auto,q_auto,g_auto,c_fill,h_650,dpr_1/xfcjr3mawgqsno9qesb6.jpg"
  },  
  {
    type: 5,
    question: "Выберите класс вашего автомобиля:",
    options: [
      {id: 0, text: 'Малый класс', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/d0056xfneaiojmtbazr1.png'},
      {id: 1, text: 'Средний класс', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/irlvp1lzvryloeqvblhs.png'},
      {id: 2, text: 'Бизнес класс', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/jdpeovf4eehroprjdvoi.png'},
      {id: 3, text: 'Кроссовер', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/jm6u6tbjwqd3vixeuita.png'},
      {id: 4, text: 'Внедорожник', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/y4xc5k02zyarbcwa6oa1.png'},
      {id: 5, text: 'Премиум класс', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/pmoh057i6pucn0yepxkd.png'},
      {id: 6, text: 'Минивэн', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/lhlhsutd8zomlhc6lzzc.png'},

    ],
  },
  {
    type: 6,
    question: "Выберите стёкла:",
    options: [
      {id: 0, text: 'Лобовое стекло', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_420,f_auto,q_auto,g_auto,c_fill,h_420,dpr_1/euoo19kune6h4l7cgxto.png'},
      {id: 1, text: 'Боковые стёкла', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_420,f_auto,q_auto,g_auto,c_fill,h_420,dpr_1/xed00dr0ojbh5tfqblhi.png'},
      {id: 2, text: 'Задние стёкла', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_420,f_auto,q_auto,g_auto,c_fill,h_420,dpr_1/pycvqjcgi9ehtseljpl7.png'},

    ],
  },
  {
    type: 5,
    question: "Выберите производителя плёнки:",
    options: [
      {id: 0, text: 'SunControl', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/v9qnvoq9g9rdw40vaulx.png'},
      {id: 1, text: 'SunTek', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/bdpamevzugpghfyoyili.png'},
      {id: 2, text: 'Lumar', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/bar3wry6w6q3g73k9g6j.png'},
      {id: 3, text: 'UltraVision', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/bubf48nrd3ksl0323n5q.png'},
      {id: 4, text: 'Не знаю', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_480,f_auto,q_auto,g_auto,c_fill,h_303,dpr_1/tbuulwco0doprlwqumbo.png'},
    ],
  },
  {
    type: 7,
    question: "Выберите процент тонировки:",
    imgPath: "https://hgwipn3sa-res.cloudinary.com/image/upload/w_380,f_auto,q_auto,g_auto,c_fill,h_307,dpr_1/laxao0bwhmnzdkc9nmvm.jpg",
    options: [
      {id: 1, text: '5%'},
      {id: 2, text: '15%'},
      {id: 3, text: '30%'},
      {id: 4, text: '40%'},
      {id: 5, text: '40%'},
      {id: 6, text: '70%'},
      {id: 7, text: 'Не знаю, что выбрать  🤷‍♂️'},
    ],
  },
  {
    type: 6,
    question: "Выберите дополнительные услуги:",
    options: [
      {id: 0, text: 'Снятие старой тонировки', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_420,f_auto,q_auto,g_auto,c_fill,h_420,dpr_1/afa0kpxlqidznq5rsyx8.png'},
      {id: 1, text: 'Полировка передних фар', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_420,f_auto,q_auto,g_auto,c_fill,h_420,dpr_1/s6clkbov0t0lbhzsq3j8.png'},
      {id: 2, text: 'Бронирование передних фар полиуретановой плёнкой', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_420,f_auto,q_auto,g_auto,c_fill,h_420,dpr_1/r325y1mcqjldq1uoih43.png'},
      {id: 3, text: 'Затемнение задних фонарей полиуретановой пленкой', imgPath: 'https://hgwipn3sa-res.cloudinary.com/image/upload/w_420,f_auto,q_auto,g_auto,c_fill,h_420,dpr_1/igts3ksievrxbrvrdglu.png'},
    ],
  },
  {
    type: 12,
    question: "Оставьте свои контакты, чтобы получить подарок",
    settings: [
      {text: "Наш менеджер свяжется с вами, подберёт удобное время и запишет вас на тонировку автомобиля.", buttonText: "Получить результаты"}
    ],
    options: [
      {id: 1, label: 'Имя', placeholder: 'Иван'},
      {id: 2, label: 'Номер телефона', placeholder: '+7 999 999 99 99'},
      {id: 3, label: 'email', placeholder: 'email@mail.ru'},
    ],
  },
])

</script>

<style scoped lang="scss">
  .dart-center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .quiz-container{
    &__full{
      width: 80vw;
      height: 80vh;
    }
  }
  
  @media only screen and (max-width: 1200px) { 

  }

  @media only screen and (max-width: 991px) { 

  }

  @media only screen and (max-width: 768px) {

  }

  @media only screen and (max-width: 600px) { 
  }

  @media only screen and (max-width: 430px) { 
      
  }
  </style>
