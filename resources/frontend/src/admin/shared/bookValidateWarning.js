import React from 'react';
import {getFormattedMessage} from "../../shared/sharedMethod";

export default formValues => {
    const warning = {};
    if (formValues.new_authors && formValues.new_authors.length > 0) {
        warning.authors = <>{getFormattedMessage('books.input.authors.warning-start.label')} "
                            {formValues.new_authors.map(({ value }) => value).join(', ')}"
                            {getFormattedMessage('books.input.authors.warning-end.label')}
        </>;
    }
    if (formValues.new_genres && formValues.new_genres.length > 0) {
        warning.genres = <>{getFormattedMessage('books.input.genres.warning-start.label')} "
                           {formValues.new_genres.map(({ value }) => value).join(', ')}"
                           {getFormattedMessage('books.input.authors.warning-end.label')}
        </>;
    }
    if (formValues.new_tags && formValues.new_tags.length > 0) {
        warning.tags = <>{getFormattedMessage('books.input.tags.warning-start.label')} "
                         {formValues.new_tags.map(({ value }) => value).join(', ')}"
                         {getFormattedMessage('books.input.authors.warning-end.label')}
        </>;
    }
    const booksArrayWarnings = [];
    if (formValues.items && formValues.items.length) {
        formValues.items.forEach((item, index) => {
            const bookWarnings = {};
            if (item && item.new_language && item.new_language.length > 0) {
                bookWarnings.language = <>{getFormattedMessage('books.input.language.warning-start.label')} "
                                          {item.new_language[0].label}"
                                          {getFormattedMessage('books.input.authors.warning-end.label')}
                </>;
                booksArrayWarnings[index] = bookWarnings;
            }
            if (item && item.new_publisher && item.new_publisher.length > 0) {
                bookWarnings.publisher = <>{getFormattedMessage('books.input.publisher.warning-start.label')} "
                                           {item.new_publisher[0].label}"
                                           {getFormattedMessage('books.input.authors.warning-end.label')}
                </>;
                booksArrayWarnings[index] = bookWarnings;
            }
        });
        if (booksArrayWarnings.length) {
            warning.items = booksArrayWarnings;
        }
    }
    return warning;
};
