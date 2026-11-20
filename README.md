# aap-kalkulator

Vi ser i dag at det er mange henvendelser til NKS hvor brukerne lurer på hvor mye de kan få i AAP, og hvorfor de får akkurat denne summen. Denne kalkulatoren vil kunne gi en forhåndsberegning av AAP til brukere, med en enkel forklaring av hva som ligger til grunn for utregningen. Vi håper kalkulatoren kan redusere noen av henvendelsene til NKS. Vi legger vekt på at kalkulatoren kun er et hjelpeverktøy og ikke en nøyaktig utregning. Den vil ikke kreve innlogging.

Bruker starter på en startside hvor de blir informert om informasjonene nevt i avsnittet over. Etter et noe spørsmål er blitt besvart vil de bli presentert med resultat siden. Teksten er dynamisk og vil være forskjellig ut fra svarene avgitt. I eksempelet under har bruker oppgitt inntekt, antall barn og sykemeldingsår 2020.

| År       | Inntekt |
| -------- | ------- |
| **2017** | 300 000 |
| **2018** | 300 000 |
| **2019** | 500 000 |

<img width="444" alt="Screenshot 2023-05-31 at 09 04 12" src="https://github.com/navikt/aap-kalkulator-frontend/assets/4377955/0f11a273-2cdd-4c5d-ab81-acf978f74a17">

---

## Bygge og kjøre app lokalt

### Sett opp GitHub token

> ⚠️ **OBS:** Dette steget er nødvendig for å kunne installere avhengigheter fra Navikt Github Package Registry.
> Hvis noe feiler med `unauthorized` eller `403`, sjekk at du har et gyldig token og oppsett.

Du finner bruksanvisning for oppsett av GitHub token her:
[AAP Sysdoc - Frontend](https://aap-sysdoc.ansatt.nav.no/teknisk/frontend)

### Kjøre lokalt

Prosjektet er satt opp med **mise** for å styre `Node` og `pnpm`.
Det anbefales at du installerer mise og aktiverer det før du fortsetter.
Se [hvordan du installerer mise](https://mise.jdx.dev/getting-started.html).

Hvis du bruker mise kan du bare kjøre denne:

```bash
mise install
```

Installer pakker med pnpm:

```bash
pnpm install
```

Så for å kjøre opp prosjektet:

```bash
pnpm dev
```

`preinstall` stopper installasjon med npm og Yarn. `--ignore-scripts` hopper over denne sjekken.

### Test og bygg

Kjør testene og bygg appen med:

```bash
pnpm test
pnpm build
```

Lag en `.env.local`-fil og legg inn:

```bash
NEXT_PUBLIC_LAST_UPDATED=10-26-2022
```

Appen vil være tilgjengelig på: [http://localhost:3000/aap/kalkulator](http://localhost:3000/aap/kalkulator)

---

# Teknisk beskrivelse

Kalkulatoren er strukturert rundt 5 sider.

```mermaid
flowchart LR
    A[Start] <--> B[Helse]
    B <--> C[Inntekt]
    C <--> D[Barn]
    D --> E[Resultat]
    E --> B
```

[Start](https://github.com/navikt/aap-kalkulator-frontend/blob/main/pages/index.tsx)
--> [Spørsmål](https://github.com/navikt/aap-kalkulator-frontend/tree/main/components/questions)
--> [Resultat](https://github.com/navikt/aap-kalkulator-frontend/blob/main/pages/resultat.tsx)

## Logikk

```mermaid
flowchart TD
    s[Innput data] <--> A
    A[Kalkuler] -->|1| B[Beregnings Grunnlag]
    A -->|2| C[Barnetilegg]
    A -.->|3 Avviklet| D[Arbeid]
```

Kalkuler wrapper state (brukers input) i en type, som inneholder tekst log og resultat per år i kroner.
wrappet state blir da sendt inn i 3 funksjoner som regner Beregningsgrunnlag, evt. Baretilegg og Reduksjon pga. arbeid

---

# Teknisk beskrivelse, inkl. ROS:

Kalkulatoren er tested for WCAG 2.0 A og AA. Dette ble testet med en rekke verktøy, blant annet [W3C Validator](https://validator.w3.org/), [Playwright](https://playwright.dev/docs/accessibility-testing) og [Lighthouse](https://developers.google.com/web/tools/lighthouse).

Risiko- og Sikkerhetsanalyse kan du finne [her](https://apps.powerapps.com/play/e/default-62366534-1ec3-4962-8869-9b5535279d0b/a/f8517640-ea01-46e2-9c09-be6b05013566?ID=1134) (Krever Tilgang til TryggNok)

Beregningene er basert på [AAP beregningsregler](https://www.nav.no/aap#hvor-mye).
Noen unntak er blitt gjort for å gjøre kalkulatoren lettere å bruke, som f.eks tar den ikke hensyn til andre ytelser som bruker får.

---

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #po-aap-værsågod.
