// Edited extract from https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

const client = new RecaptchaEnterpriseServiceClient();
const projectPath = client.projectPath(process.env.PROJECT_ID);

module.exports = async (token) => {
    // Build the assessment request.
    const request = ({
        assessment: {
            event: {
                token,
                siteKey: process.env.RECAPTCHA_SITE_KEY,
            },
        },
        parent: projectPath,
    });

    // client.createAssessment() can return a Promise or take a Callback
    const [response] = await client.createAssessment(request);

    // Check if the token is valid.
    if (!response.tokenProperties.valid) {
        return false;
    }

    // Check if the expected action was executed.
    // The `action` property is set by user client in the
    // grecaptcha.enterprise.execute() method.
    if (response.tokenProperties.action === process.env.RECAPTCHA_ACTION) {

        // Get the risk score and the reason(s).
        // For more information on interpreting the assessment,
        // see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
        return response.riskAnalysis.score >= process.env.RECAPTCHA_SCORE_THRESHOLD;
    } else {
        return false;
    }
}