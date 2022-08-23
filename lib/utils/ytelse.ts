export const ytelsesdager = 260

export const ytelseTilGrunnlag = (ytelse: number) => {
    const broek = 2.0 / 3.0
    return ytelse / broek
}
