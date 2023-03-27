const sgMail = require('@sendgrid/mail');
const { isRequestTrusted } = require('./recaptcha');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMail = async (req, res) => {
    // Set CORS headers for preflight requests
    // Allows GETs from any origin with the Content-Type header
    // and caches preflight response for 3600s

    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }

    if (!(await isRequestTrusted(req.body.token))) {
        res.send({
            success: false,
            errorType: 'recaptchaValidation'
        });
        return;
    }

    const missingFields = ["name", "subject", "email", "message"].filter(value => !Object.keys(req.body).includes(value));
    if (missingFields.length > 0) {
        res.send({
            success: false,
            errorType: 'missingField',
            missingFields
        });
        return;
    }

    const html = `<strong>Sujet : </strong> ${req.body.subject}<br><strong>Email : </strong> ${req.body.email}<br><strong>Message : </strong><br>${req.body.message}`;

    const msg = {
        to: process.env.SENDGRID_RECIPIENT_MAIL_ADDRESS,
        from: process.env.SENDGRID_SENDER_MAIL_ADDRESS,
        subject: `Nouveau message de ${req.body.name}`,
        html
    };

    console.log(msg);

    sgMail
        .send(msg)
        .then(() => {
            res.send({
                success: true
            });
        })
        .catch(() => {
            res.send({
                success: false,
                errorType: 'mailSending'
            })
        });
};