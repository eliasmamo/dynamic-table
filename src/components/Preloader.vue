<template lang="pug">
  .preloader(:class="{active: loading}")
    .spinner
      .bounce1
      .bounce2
      .bounce3

</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Preloader',
  computed: {
    ...mapGetters(['loading']),
  },
};
</script>

<style lang="scss" scoped>
  .preloader {
    width: 100%;
    height: 100%;
    background: rgba(47,148,194,.5);
    position: absolute;
    display: none;
    right: 0;
    top: 0;
    z-index: -1;

    &.active {
      z-index: 1000;
      display: block;
    }

    .spinner {
      width: 70px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);

      > div {
        width: 18px;
        height: 18px;
        background-color: #fff;

        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      }

      .bounce1 {animation-delay: -0.32s;}
      .bounce2 {animation-delay: -0.16s;}
    }
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
</style>

