export interface operacion {
    _id: String,
    fecha_operacion: Date,
    operacionFinalizada: Boolean,
    tipoVehiculo: String,
    informacionCompra: Array<any>
}