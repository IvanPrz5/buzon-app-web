export class DateUtils {
  formatDate(date: any) {
    const aux = date.toLocaleString("en-GB").replace(" ", " ");
    const fecha = aux.substring(0, aux.length - 3);
    return fecha;
  }
}