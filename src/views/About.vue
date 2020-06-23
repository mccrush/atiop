<template>
  <div class="row" ref="row">
    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 m-auto">
      <h3 class="mt-4 text-center">ATIOP</h3>
      <p class="text-center text-muted small">
        Версия
        <a
          href="https://github.com/mccrush/atiop/releases/"
          target="_blank"
          title="Страница на Github"
        >1.0.0</a>
      </p>

      <div class="d-flex justify-content-center">
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item">
            <a href="#desc" class="btn btn-sm btn-light rounded-0">Описание</a>
          </li>
          <li class="list-group-item">
            <a href="#pages" class="btn btn-sm btn-light rounded-0">Страницы</a>
          </li>
          <li class="list-group-item">
            <a href="#props" class="btn btn-sm btn-light rounded-0">Свойства</a>
          </li>
          <li class="list-group-item">
            <a href="#contacts" class="btn btn-sm btn-light rounded-0">Контакты</a>
          </li>
        </ul>
      </div>

      <h5 class="mt-4" id="desc" :class="{'text-primary': $route.hash === '#desc'}">Описание</h5>
      <p>
        ATIOP — сервис управления задачами. Название сервиса — это аббревиатура английских слов
        <strong>A</strong>ll
        <strong>T</strong>ask
        <strong>I</strong>n
        <strong>O</strong>ne
        <strong>P</strong>lace (все задачи в одном месте). Одна из основных идей — структура представления задач: направление деятельности &Rightarrow; проект &Rightarrow; задача.
      </p>
      <p>
        Каждый уровень представляет собой ответ на соответствующий вопрос:
        <br />1. Направление —
        <strong>Зачем</strong> мы это делаем? Для чего мы вообще решили этим заниматься?
        <br />2. Проект —
        <strong>Что</strong> мы хотим получить в итоге? Что будет результатом нашей деятельности?
        <br />3. Задача —
        <strong>Как</strong> мы достигнем этого результата? Какие именно действия необходимо выполнить?
      </p>
      <p>
        Для работы с сервисом, необходимо
        <router-link to="/login#in" tag="a" title="Авторизоваться">авторизоваться</router-link>&nbsp;или
        <router-link to="/login#reg" tag="a" title="Зарегистрироваться">зарегистрироваться</router-link>.
      </p>

      <h5
        class="mt-4"
        id="pages"
        :class="{'text-primary': $route.hash === '#pages'}"
      >Назначение страниц</h5>
      <p>На странице &laquo;Проекты&raquo;, представлены списки задач существующих проектов. Можно отфильтровать проекты по направлениям для удобства работы.</p>
      <p>Страница &laquo;Обзор&raquo; служит для представления иерархической структуры направлений и проектов, что позволяет видеть общую картину всей деятельности.</p>
      <p>&laquo;Планы&raquo; представляют собой календарь месяцев на ближайший год. Если номер месяца дедлайна (срок сдачи) проекта совпадает с номером представленного месяца, то проект отображается именно в этом месяце.</p>
      <p>На странице &laquo;Создать&raquo; можно создавать направления, проекты и задачи.</p>

      <h5
        class="mt-4"
        id="props"
        :class="{'text-primary': $route.hash === '#props'}"
      >Свойства и методы</h5>
      <p>По всем вопросам и предложениям пишите на почту mccrush2027@gmail.com</p>

      <h5 class="mt-4" id="contacts" :class="{'text-primary': $route.hash === '#contacts'}">Контакты</h5>
      <p>По всем вопросам и предложениям пишите на почту mccrush2027@gmail.com</p>
      <button
        class="totop btn btn-light text-center text-muted shadow-sm mb-4 p-0 pl-3 pr-3 pb-1"
        @click="scrollTop"
      >
        <span>&wedge;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    scrollTop() {
      //window.scrollTo({ top: -59, behavior: 'smooth' })
      this.$refs.row.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.row {
  overflow-y: auto;
  /* height: fit-content; */
  max-height: 450px;
}

li {
  padding: 0;
}

li > a {
  text-decoration: none;
  color: #212529;
}

.totop {
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: -50px;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
