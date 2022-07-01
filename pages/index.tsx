import type { NextPage } from 'next'
import Sidebanner from "../components/sidebanner/Sidebanner";
import {Calculator, FlowerBladeFallFilled, HeartBroken} from "@navikt/ds-icons";
import {Heading} from "@navikt/ds-react";
import Divider from "../components/divider/Divider";

const Home: NextPage = () => {
  return (<>
      <Sidebanner tittel="Beregning av AAP"/>
      <div className="container mx-auto">
          <section className="bg-component-background-light ">
              <div className="flex flex-col items-center">
                <Calculator className="h-14 w-14 my-4"/>
                <Heading size="large" spacing>
                    Hvor mye kan jeg få?
                </Heading>
                  <Divider/>
              </div>
          </section>
      </div>
  </>)
}

export default Home
