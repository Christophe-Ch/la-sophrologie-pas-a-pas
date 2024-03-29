# La sophrologie pas à pas

![website deployment badge](https://github.com/Christophe-Ch/la-sophrologie-pas-a-pas/actions/workflows/website.yml/badge.svg) ![contact form api deployment badge](https://github.com/Christophe-Ch/la-sophrologie-pas-a-pas/actions/workflows/contact-form-backend.yml/badge.svg)

**La sophrologie pas à pas** is a website developed for Anne AVENEL DUBOIS, and accessible at: [lasophrologiepasapas.fr](https://www.lasophrologiepasapas.fr).

## Hosting and architecture

As of now, **La sophrologie pas à pas** is being hosted on OVH, but is to be deployed on Google Cloud. This repository thus holds workflows to automatically build and deploy this project to Google Cloud.

This project is divided into two parts:
- the website, built using **Angular 14** and hosted with **Cloud Run**.
- a **Cloud Function** acting as an endpoint to send messages through the contact form of the website.

The cloud function takes advantage of Google Cloud's **Recaptcha Enterprise** technology to prevent bots from sending spam through the contact form.