const {Resend} = require('resend');
const resend = new Resend(process.env.RESEND_API_TOKEN)

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string) => {

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'mmaks522@gmail.com', //email
        subject: 'Confirm your email',
        html: `<p>Your 2FA code : '${token}'</p>`
    });

    }

export const sendVerificationEmail = async (
    email:string, 
    token:string) => {

    const link = `http://localhost:3000/auth/verification?token=${token}`;

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'mmaks522@gmail.com', //email
        subject: 'Confirm your email',
        html: `<p>Click <a href='${link}'>here</a> to confirm your email.</p>`
    });
};

export const sendPasswordResetEmail = async (
    email:string, 
    token:string) => {

    const link = `http://localhost:3000/auth/resetPassword?token=${token}`;

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'mmaks522@gmail.com', //email
        subject: 'Reset your password',
        html: `<p>Click <a href='${link}'>here</a> to reset your password.</p>`
    });
};
