<script>
export default {
  props: ['text', 'path'],
};
</script>

<template>
  <div class="next">
    <RouterLink
      v-if="path"
      :to="path"
      id="confirm-btn"
      class="white01 bg-blue-3"
    >
      <span>{{ text }}</span>
      <svg
        width="34"
        height="34"
        viewBox="0 0 74 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="37"
          cy="37"
          r="35.5"
          stroke="white"
          stroke-width="3"
        ></circle>
        <path
          d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
          fill="white"
        ></path>
      </svg>
    </RouterLink>
    <div v-else id="confirm-btn-none" class="white01 bg-blue-3">
      <span>{{ text }}</span>
      <svg
        width="34"
        height="34"
        viewBox="0 0 74 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="37"
          cy="37"
          r="35.5"
          stroke="white"
          stroke-width="3"
        ></circle>
        <path
          d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
          fill="white"
        ></path>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.next {
  width: 100%;
  padding: 10px 0 20px;

  @include desktop {
    margin: 0 auto 40px;
  }
}

#confirm-btn,
#confirm-btn-none {
  width: 280px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $radius;

  text-decoration: none;

  span {
    text-align: center;
    @include font-style(24px, 700, 1%, 125%);
    @include tablet {
      @include font-style(32px, 700, 1%, 125%);
    }
  }

  @include tablet {
    width: 600px;
    height: 75px;
  }
}

#confirm-btn,
#confirm-btn-none {
  cursor: pointer;
  transition: all 0.2s;
  padding: 10px 20px;
  border-radius: 30px;
  background: $blue-3;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  font-size: 15px;
}

#confirm-btn:hover,
#confirm-btn-none:hover {
  background: $blue-4;
}

#confirm-btn > svg,
#confirm-btn-none > svg {
  width: 34px;
  margin-left: 10px;
  transition: transform 0.3s ease-in-out;
}

#confirm-btn:hover svg,
#confirm-btn-none:hover svg {
  transform: translateX(5px);
}

#confirm-btn:active,
#confirm-btn-none:active {
  transform: scale(0.95);
}
</style>
