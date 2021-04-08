export const FIRST_NAME = 'firstName';
export const LAST_NAME = 'lastName';
export const EMAIL_ADDRESS = 'emailAddress';
export const TELEPHONE_NUMBER = 'telephoneNumber';
export const STATUS = 'status';

export const USER_DELETE_FEEDBACK = 'delete user?';
export const USER_SUCCESSFULLY_ADDED_FEEDBACK = 'user successfully added';
export const USER_NOT_FOUND_FEEDBACK = 'user not found';
export const USER_SUCCESSFULLY_MODIFIED_FEEDBACK = 'user successfully modified'
export const USER_SUCCESSFULLY_DELETED_FEEDBACK = 'user successfully deleted'

export const EMPTY_STRING = '';

export const ROUTE_MAIN = '/main';

export const REGEX_ALPHA_SPACES = /^[a-zA-ZÀ-ÿ-. ]{2,20}$/;
export const REGEX_ALPHA_DIGITS_SPACES_SPECIAL = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9À-ÿ!@#\$%\^\&*\)\(+=._-]{8,}$/;
// https://emailregex.com/ better than the Angular default
export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
