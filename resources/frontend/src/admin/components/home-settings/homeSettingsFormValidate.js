import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.facebook) {
        errors.facebook = getFormattedMessage('home-settings.input.facebook.validate.label');
    }
    if (!formValues.github) {
        errors.github = getFormattedMessage('home-settings.input.github.validate.label');
    }
    if (!formValues.linkedin) {
        errors.linkedin = getFormattedMessage('home-settings.input.linkedin.validate.label');
    }
    if (!formValues.twitter) {
        errors.twitter = getFormattedMessage('home-settings.input.twitter.validate.label');
    }
    if (!formValues.contact_email) {
        errors.contact_email = getFormattedMessage('home-settings.input.contact_email.validate.label');
    }
    const emailExpression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/;
    if (formValues.contact_email && !emailExpression.test(formValues.contact_email)) {
        errors.contact_email = getFormattedMessage('profile.input.email-invalid.validate.label');
    }
    if (!formValues.contact_phone) {
        errors.contact_phone = getFormattedMessage('home-settings.input.contact_phone.validate.label');
    }
    if (!formValues.company_description) {
        errors.company_description = getFormattedMessage('home-settings.input.company_description.validate.label');
    }
    if (!formValues.website) {
        errors.website = getFormattedMessage('home-settings.input.website.validate.label');
    }
    if (!formValues.hero_image_title) {
        errors.hero_image_title = getFormattedMessage('home-settings.input.hero_image_title.validate.label');
    }
    if (!formValues.hero_image_description) {
        errors.hero_image_description = getFormattedMessage('home-settings.input.hero_image_description.validate.label');
    }
    if (!formValues.about_us_text) {
        errors.about_us_text = getFormattedMessage('home-settings.input.about_us_text.validate.label');
    }
    if (!formValues.genres_text) {
        errors.genres_text = getFormattedMessage('home-settings.input.genres_text.validate.label');
    }
    if (!formValues.popular_books_text) {
        errors.popular_books_text = getFormattedMessage('home-settings.input.popular_books_text.validate.label');
    }
    return errors;
};
