// Edited extract from https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

const client = new RecaptchaEnterpriseServiceClient();
const projectPath = client.projectPath('la-sophrologie-pas-a-pas');

exports.isRequestTrusted = async (token) => {
    // Build the assessment request.
    const request = ({
        assessment: {
            event: {
                token,
                siteKey: '6LeRTS8mAAAAACeRGigW3nNW1XSBNxJadCZeWWnh',
            },
        },
        parent: projectPath,
    });

    // client.createAssessment() can return a Promise or take a Callback
    const [response] = await client.createAssessment(request);

    // Check if the token is valid.
    if (!response.tokenProperties.valid) {
        console.log(`Invalid properties for token: ${token}`);
        return false;
    }

    // Check if the expected action was executed.
    // The `action` property is set by user client in the
    // grecaptcha.enterprise.execute() method.
    if (response.tokenProperties.action === 'SEND_MAIL') {

        // Get the risk score and the reason(s).
        // For more information on interpreting the assessment,
        // see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
        console.log(`Score: ${response.riskAnalysis.score}`);
        return response.riskAnalysis.score >= 0.8;
    } else {
        console.log(`Invalid action: ${response.tokenProperties.action}`)
        return false;
    }
}