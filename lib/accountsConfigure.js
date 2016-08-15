AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    overrideLoginErrors: false,
    sendVerificationEmail: true,
    enforceEmailVerification:true,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: true,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    // privacyUrl: 'privacy',
    // termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 3000,

    // Hooks
    // onLogoutHook: myLogoutFunc,
    // onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,
    // postSignUpHook: myPostSubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Register Now!"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
    reCaptcha: {
        siteKey: "6LdckicTAAAAAHU7prBhD6wu2eKd-RswivHq0Ja5",
        theme: "light",
        data_type: "image",
    },
    showReCaptcha: true

});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@purdue.edu/i,
      errStr: 'Invalid email (Only @purdue.edu is accepted)',
  },
  {
      _id: 'username_and_email',
      placeholder: 'Username or Email',
      type: 'text',
      required: true,
      displayName: "Login",
  },
  pwd
]);