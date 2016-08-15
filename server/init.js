Meteor.startup(function () {
	process.env.MAIL_URL = "smtp://postmaster%40findingmyroommate.com:2490147e827c8e571f83511078b05ef5@smtp.mailgun.org:587";
});

AccountsTemplates.configure({
    reCaptcha: {
        secretKey: "6LdckicTAAAAAE8pkwAOZITtJ22oVbGdnKCJ4fWE"
    }
});