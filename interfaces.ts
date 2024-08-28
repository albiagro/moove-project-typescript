export interface IMezzo {
    tipo: "bici" | "scooter" | "monopattino"
    id: number
    stato: "disponibile" | "in uso"
    assegnaUtente(utenteDaAssegnare : IUtente) : boolean
 }
 
 export interface IUtente {
    nome: string
    cognome: string
    email: string
    metodoPagamento: "paypal" | "mooney" | "carta"
    prenotaMezzo(mezzoDaAssegnare : IMezzo) : void
 }
 
 export interface ICitta {
    nome: string
    mezziDisponibili: IMezzo[]
    aggiungiMezzo(mezzoDaAggiungere : IMezzo) : void
 }