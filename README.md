# La sophrologie pas à pas

**La sophrologie pas à pas** is a website developed for Anne AVENEL DUBOIS, and accessible at: [lasophrologiepasapas.fr](https://www.lasophrologiepasapas.fr).

## Hosting and architecture

As of now, **La sophrologie pas à pas** is being hosted on OVH, but is to be deployed on Google Cloud. This repository thus holds workflows to automatically build and deploy this project to Google Cloud.

This project is divided into two parts:
- the website, built using **Angular 14** and hosted with **Cloud Run**.
- a **Cloud Function** acting as an endpoint to send messages through the contact form of the website.

The cloud function takes advantage of Google Cloud's **Recaptcha Enterprise** technology to prevent bots from sending spam through the contact form.