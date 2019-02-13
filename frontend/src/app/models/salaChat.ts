export class SalaChat {
    _id: String;
    docente: String;
    nombreChat: String;
    fecha: Date;

    constructor(_id:string='', docente:string, nombreChat:string='', fecha?:Date){
        this._id = _id;
        this.docente = docente;
        this.nombreChat = nombreChat;
        this.fecha = fecha;
    }
    
}