const mailgun = require("mailgun-js");

const apiKey = process.env.MAIL_GUN_API_KEY
const domain = process.env.MAIL_GUN_DOMAIN_URL;
const mg = mailgun({ apiKey, domain });

const sendMail = ({ to, from, subject, text, html }) => {
        mg.messages().send({
            to,
            from: 'Mailgun Sandbox <postmaster@sandbox325619e96fee46c986d87a32e38610eb.mailgun.org>',
            subject,
            html
        }).catch((e) => {
            console.log('Sending failed')
        })
}

module.exports = sendMail