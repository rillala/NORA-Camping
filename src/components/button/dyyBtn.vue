<script>
export default {
  props: ['content'],
};
</script>

<template>
  <button class="Btn">
    {{ content }}
  </button>
</template>

<style lang="scss" scoped>
.Btn {
  width: 150px;
  height: 55px;
  border-radius: 30px;
  border: none;
  background-color: $blue-4;
  color: white;
  box-shadow:
    0px 7px 7px $blue-2 inset,
    0px 5px 10px rgba(5, 5, 5, 0.212),
    0px -10px 10px $blue-4 inset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Btn:hover {
  animation: jello-horizontal 0.7s both;
}

@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
