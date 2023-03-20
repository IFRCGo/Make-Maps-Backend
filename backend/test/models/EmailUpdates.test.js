import cron from 'node-cron';
import { StartMapSubscription } from '../../modules/EmailUpdates/EmailUpdates.js';
import {describe, expect, it, jest} from "@jest/globals";

// mock sendEmail function
jest.mock('node-cron');

describe('StartMapSubscription', () => {

    it('should start a cron job that runs every 30 seconds', () => {
        // Call the function
        StartMapSubscription();

        // Check that cron.schedule is called with the correct arguments
        expect(cron.schedule).toHaveBeenCalledWith('*/30 * * * * *', expect.any(Function));
    });
})