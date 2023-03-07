const sgMail = require('@sendgrid/mail');
const { isRequestTrusted } = require('./recaptcha');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMail =  async (req, res) => {
    // Set CORS headers for preflight requests
    // Allows GETs from any origin with the Content-Type header
    // and caches preflight response for 3600s

    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }

    if (!isRequestTrusted(req.body.token)) {
        res.send({
            success: false,
            errorType: 'recaptcha-validation'
        });
    }

    // TODO: add mail handling
    res.send({
        success: true
    });
};