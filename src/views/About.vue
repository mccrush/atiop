<template>
  <div class="row">
    <div class="col-12 col-sm-8 col-md-6 col-lg-4 m-auto">
      <h3 class="mt-5 text-center">ATIOP</h3>
      <p class="text-center text-muted small">Версия 1.0.0</p>

      <div id="list-example" class="list-group">
        <a class="list-group-item list-group-item-action" href="#list-item-1">Описание</a>
        <a class="list-group-item list-group-item-action" href="#list-item-2">Страницы</a>
        <a class="list-group-item list-group-item-action" href="#list-item-3">Контакты</a>
      </div>
      <div data-spy="scroll" data-target="#list-example" data-offset="0" class="scrollspy-example">
        <h4 id="list-item-1">Описание</h4>
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
          <br />1. Направление -
          <strong>Зачем</strong> мы это делаем? В чем смысл вообще этим заниматься?
          <br />2. Проект -
          <strong>Что</strong> мы хотим получить в итоге? Что будет результатом нашего проекта?
          <br />3. Задача -
          <strong>Как</strong> мы достигнем этого результата? Какие именно действия необходимо выполнить?
        </p>
        <p>
          Для работы с сервисом, необходимо
          <router-link to="/login#in" tag="a" title="Авторизоваться">авторизоваться</router-link>&nbsp;или
          <router-link to="/login#reg" tag="a" title="Зарегистрироваться">зарегистрироваться</router-link>.
        </p>
        <h4 id="list-item-2">Страницы</h4>
        <p>На странице &laquo;Проекты&raquo;, представлены списки задач существующих проектов. Можно отфильтровать проекты по направлениям для удобства работы.</p>
        <p>Страница &laquo;Обзор&raquo; служит для представления иерархической структуры направлений и проектов, что позволяет видеть общую картину всей деятельности.</p>
        <p>&laquo;Планы&raquo; представляют собой календарь месяцев на ближайший год. Если номер месяца дедлайна проекта совпадает с номером представленного месяца, то проект отображается именно в этом месяце.</p>
        <p>На странице &laquo;Создать&raquo; можно создавать направления, проекты и задачи.</p>
        <h4 id="list-item-3">Контакты</h4>
        <p>По всем вопросам и предложениям пишите на почту mccrush2027@gmail.com</p>
      </div>
    </div>
  </div>
</template>
