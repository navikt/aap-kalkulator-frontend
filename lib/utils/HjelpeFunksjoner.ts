export const YTELSESDAGER = 260

export const ytelseTilGrunnlag = (ytelse: number) => {
    const broek = 0.66
    return ytelse / broek
}
export const minsteGrunnlagFraG= (g:number) => {
    return (2 * g) / 0.66
}

export const minsteGrunnlagUnder25FraG = (g:number) => {
    return (2 * g * (2.0 / 3.0)) / 0.66
}

export const maksGrunnlagFraG = (g:number) => {
    return 6 * g
}

export const prosentReduksjon = (res:number) => {
    return res * 0.66
}

export const toKr = (resultat: number) => {
    return new Intl.NumberFormat("no-NO", { style: "decimal" }).format(
        Math.round(resultat)
    )
}