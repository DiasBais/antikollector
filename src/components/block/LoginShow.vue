<template>
  <div class="LoginShow">
    <div class="LoginShow__content">
      <div class="LoginShow__title">Войти в личный кабинет</div>
      <div class="LoginShow__body">
        <div class="LoginShow__input">
          <p class="LoginShow__input-name">
            ИИН
            <span class="LoginShow__input-name-require">*</span>
          </p>
          <input class="LoginShow__input-value" type="text">
        </div>
        <div class="LoginShow__input">
          <p class="LoginShow__input-name">
            Введите пароль
            <span class="LoginShow__input-name-require">*</span>
          </p>
          <input class="LoginShow__input-value" type="text">
        </div>
        <div class="LoginShow__links">
          <p>Нет аккаунта?
            <router-link to="/step1show">
              <span>Зарегестрируйтесь</span>
            </router-link>
          </p>
          <p>Забыли пароль?</p>
        </div>
      </div>
      <div class="LoginShow__footer">
        <input class="LoginShow__input-submit" type="button" value="Войти">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
@import url('/css/block/LoginShow.css');
@import url('/css/block/mobile/LoginShow.css');
</style>
