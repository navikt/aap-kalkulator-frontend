import { logAmplitudeEvent as dekoratorenLogEvent } from '@navikt/nav-dekoratoren-moduler';

export const logAmplitudeEvent = (eventName: string, eventData?: Record<string, any>) => {
    dekoratorenLogEvent({ origin: 'aap-kalkulator-frontend', eventName, eventData }).catch((e) => {
        console.log('Amplitude error', e);
    });
};