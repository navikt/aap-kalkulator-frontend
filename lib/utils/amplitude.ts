import amplitude from "amplitude-js"
import { logAmplitudeEvent as dekoratorenLogEvent } from '@navikt/nav-dekoratoren-moduler';

const isBrowser = () => typeof window !== "undefined"

export function logAmplitudeEvent(
    eventName: string,
    eventData?: Record<string, unknown>
): void {
    setTimeout(() => {
        try {
            if (isBrowser()) {
                amplitude.getInstance().logEvent(eventName, eventData)
            }
        } catch (error) {
            console.error(error)
        }
    })
}
