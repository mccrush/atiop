<template>
  <div class="row">
    <div class="col-12 col-sm-8 col-md-6 col-lg-4 m-auto">
      <h3 class="mt-5 text-center">ATIOP</h3>
      <p class="text-center text-muted small">Версия 1.0.0</p>
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
    </div>
  </div>
</template>
