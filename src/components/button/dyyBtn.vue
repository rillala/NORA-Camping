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
