import { ResultatComponent } from '../../../components/pageComponents/ResultatComponent';

const ResultatPage = async () => {
  const res = await fetch('https://g.nav.no/api/v1/grunnbeloep', { next: { revalidate: 7200 } });
  const resHistorikk = await fetch('https://g.nav.no/api/v1/historikk', { next: { revalidate: 7200 } });
  const data = await res.json();
  // @ts-ignore
  const dataHistorikk: GrunnbeloepHistorikk[] = await resHistorikk.json().then((res) =>
    res.map((item: { grunnbeløp: any; dato: string | number | Date; gjennomsnittPerÅr: any }) => {
      // noinspection NonAsciiCharacters
      return {
        grunnbeloep: item.grunnbeløp,
        dato: new Date(item.dato).getFullYear(),
        gjennomsnittPerAar: item.gjennomsnittPerÅr ? item.gjennomsnittPerÅr : null,
      };
    })
  );
  return <ResultatComponent G={data} Historikk={dataHistorikk} />;
};

export default ResultatPage;
