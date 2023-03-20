import { sendEmail } from '../../utils/sendEmail.js';
import {describe, expect, it} from "@jest/globals";

describe('sendEmail', () => {
    it('should send an email', async () => {
        const email = 'test@example.com';
        const subject = 'Test Email';
        const email_body = 'This is a test email';

        await expect(sendEmail(email, subject, email_body)).resolves.not.toThrow();
    });

    it('should throw an error if email is not sent', async () => {
        const email = 'invalid-email';
        const subject = 'Test Email';
        const email_body = 'This is a test email';

        await expect(sendEmail(email, subject, email_body)).rejects.toThrow('Email Not Sent');
    });
});