//Global variables
Accounts.emailTemplates.siteName = "FindingMyRoommate.com";
Accounts.emailTemplates.from     = "noreply<noreply@findingmyroommate.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[FindingMyRoommate.com] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "gt@purdue.edu",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\nIf you did not request this verification, please ignore this email. `; //If you feel something is wrong, please contact our support team: ${supportEmail}.

    return emailBody;
  }
};