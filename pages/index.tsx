import type { NextPage } from 'next'
import Sidebanner from "../components/sidebanner/Sidebanner";

const Home: NextPage = () => {
  return (<>
      <Sidebanner tittel="Beregning av AAP"/>
      <div className="container mx-auto bg-component-background-light">
          hello
      </div>
  </>)
}

export default Home
