import Banner from "./Banner";
import {render, screen} from "@testing-library/react";
import {messages} from "../../utils/message";
import {IntlProvider} from "react-intl";

describe('Banner', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_LAST_UPDATED = '11-07-2024'
  })
  it('oppdatert dato vises som forventet', () => {
     render(
       <IntlProvider locale={'nb'} messages={messages['nb']}>
         <Banner />
       </IntlProvider>)
    const datoString = screen.getByText('Oppdatert 7. november 2024')
    expect(datoString).toBeDefined()
  })
})