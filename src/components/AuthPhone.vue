<template>
  <div class="phone markdown-body">
    <h1>電話番号（SMS メッセージ）による認証</h1>

    <div class="block">
      <h2>不可視の reCAPTCHA を使用した確認コード送信</h2>
      <form @submit.prevent="sendCodeWithInvisibleRecaptcha()">
        <label for="phone-invisible">phone(ex 090...): <input type="tel" id="phone-invisible" v-model="sendCodeRecaptchaPhone"></label>
        <div id="send-code-with-invisible-recaptcha"></div>
        <button type="submit">確認コード送信</button>
        <p v-if="sendCodeWithInvisibleRecaptchaMessageText">{{ sendCodeWithInvisibleRecaptchaMessageText }}</p>
        <p v-if="sendCodeWithInvisibleRecaptchaErrorText">{{ sendCodeWithInvisibleRecaptchaErrorText }}</p>
      </form>
    </div>

    <div class="block">
      <h2>可視の reCAPTCHA を使用した確認コード送信</h2>
      <form @submit.prevent="sendCodeWithVisibleRecaptcha()">
        <label for="phone-visible">phone(ex 090...): <input type="tel" id="phone-visible" v-model="sendCodeRecaptchaPhone"></label>
        <div id="send-code-with-visible-recaptcha"></div>
        <button type="submit">確認コード送信</button>
        <p v-if="sendCodeWithVisibleRecaptchaMessageText">{{ sendCodeWithVisibleRecaptchaMessageText }}</p>
        <p v-if="sendCodeWithVisibleRecaptchaErrorText">{{ sendCodeWithVisibleRecaptchaErrorText }}</p>
      </form>
    </div>

    <div class="block">
      <h2>送信された確認コードを用いたログイン</h2>
      <form @submit.prevent="loginWithCode()">
        <label for="code">code: <input type="text" id="code" v-model="loginWithCodeNumber"></label>
        <button type="submit">ログイン</button>
        <p v-if="loginWithCodeConfirmationResult">{{ loginWithCodeConfirmationResult }}</p>
        <p v-if="loginWithCodeErrorText">{{ loginWithCodeErrorText }}</p>
      </form>
    </div>

    <auth-common></auth-common>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import AuthCommon from '@/components/AuthCommon';
import helpers from '@/helpers';

export default {
  name: 'authPhone',
  mixins: [helpers],
  components: {
    AuthCommon,
  },
  data() {
    return {
      sendCodeRecapchaPhone: '',
      sendCodeRecapchaVerifier: null,

      sendCodeWithInvisibleRecaptchaMessageText: '',
      sendCodeWithInvisibleRecaptchaErrorText: '',

      sendCodeWithVisibleRecaptchaMessageText: '',
      sendCodeWithVisibleRecaptchaErrorText: '',

      loginWithCodeNumber: '',
      loginWithCodeConfirmationResult: null,
      loginWithCodeErrorText: '',
    };
  },
  mounted() {
    this.initWithInvisibleRecaptcha();
    this.initWithVisibleRecaptcha();
  },
  methods: {
    initWithInvisibleRecaptcha() {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-code-with-invisible-recaptcha', {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.sendCodeWithInvisibleRecaptchaMessageText = `recaptcha solved: ${response}`;
        },
      });
      // recaptchaVerifier.render();
      this.sendCodeRecapchaVerifier = recaptchaVerifier;
    },
    sendCodeWithInvisibleRecaptcha() {
      this.sendCodeWithInvisibleRecaptchaErrorText = '';
      firebase.auth().signInWithPhoneNumber(
        this.transInternationalPhone(this.sendCodeRecaptchaPhone),
        this.sendCodeRecapchaVerifier,
      )
        .then((confirmationResult) => {
          this.sendCodeWithInvisibleRecaptchaMessageText = `code sent: ${JSON.stringify(confirmationResult)}`;
          this.loginWithCodeConfirmationResult = confirmationResult;
        })
        .catch((error) => {
          this.sendCodeWithInvisibleRecaptchaErrorText = `${error.code} - ${error.message}`;
        });
    },
    initWithVisibleRecaptcha() {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-code-with-visible-recaptcha', {
        size: 'normal',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.sendCodeWithVisibleRecaptchaMessageText = `recaptcha solved: ${response}`;
        },
        'expired-callback': (response) => {
          this.sendCodeWithVisibleRecaptchaMessageText = `expired callback: ${response}`;
        },
      });

      recaptchaVerifier.render();
      this.sendCodeRecaptchaVerifier = recaptchaVerifier;
    },
    sendCodeWithVisibleRecaptcha() {
      this.sendCodeWithVisibleRecaptchaErrorText = '';
      firebase.auth().signInWithPhoneNumber(
        this.transInternationalPhone(this.sendCodeRecaptchaPhone),
        this.sendCodeRecaptchaVerifier,
      )
        .then((confirmationResult) => {
          this.sendCodeWithVisibleRecaptchaMessageText = `code sent: ${JSON.stringify(confirmationResult)}`;
          this.loginWithCodeConfirmationResult = confirmationResult;
        })
        .catch((error) => {
          this.sendCodeWithVisibleRecaptchaErrorText = `${error.code} - ${error.message}`;
        });
    },
    loginWithCode() {
      this.loginWithCodeErrorText = '';
      this.loginWithCodeConfirmationResult.confirm(this.loginWithCodeNumber)
        .then((result) => {
          // eslint-disable-next-line
          console.log(result);
        })
        .catch((error) => {
          this.loginWithCodeErrorText = `${error.code} - ${error.message}`;
        });
    },
  },
};
</script>
