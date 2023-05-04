export interface PostVehicle {
    _id: String,
    titulo: String,
    fecha_post: Date,
    tipo_publicacion: String,
    Reports: Array<any>,
    likes: Array<any>,
    media:String,
    informacionUser: Array<any>
}