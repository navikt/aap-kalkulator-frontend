export const ytelsesdager = 260

export const ytelseTilGrunnlag = (ytelse: number) => {
    const broek = 0.66
    return ytelse / broek
}
