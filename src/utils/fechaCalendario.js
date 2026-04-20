/**
 * Fechas solo-día (YYYY-MM-DD) en JS se parsean como UTC medianoche.
 * En zonas como América Latina eso muestra el día anterior al formatear en local.
 * Esta util interpreta el calendario como fecha local (igual que en la BD).
 */

export function parseFechaCalendario(valor) {
    if (valor == null || valor === "") return new Date(NaN);
    if (valor instanceof Date && !Number.isNaN(valor.getTime())) {
        return new Date(
            valor.getFullYear(),
            valor.getMonth(),
            valor.getDate()
        );
    }
    const s = String(valor);
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) {
        const y = Number(m[1]);
        const mo = Number(m[2]) - 1;
        const d = Number(m[3]);
        return new Date(y, mo, d);
    }
    return new Date(valor);
}

export function formatearFechaCalendario(valor, locales = "es-ES", options) {
    const d = parseFechaCalendario(valor);
    if (Number.isNaN(d.getTime())) return valor == null ? "" : String(valor);
    return d.toLocaleDateString(locales, options);
}
