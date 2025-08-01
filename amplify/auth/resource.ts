import { defineAuth } from '@aws-amplify/backend';


export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Welcome to the Travel Destination Generator!",
      verificationEmailBody: (createCode: () => string) => `Use this code to Confirm your account:${createCode()}`,

    }
  },
});
