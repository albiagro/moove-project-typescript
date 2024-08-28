import { Utente, Mezzo, Citta } from "./classes";

let utente1 = new Utente("Alberto", "Agrò", "alberto.agro@live.it", "paypal")
let utente2 = new Utente("Mario", "Rossi", "mario.rossi@live.it", "carta")

let mezzo1 = new Mezzo("scooter")
let mezzo2 = new Mezzo("monopattino")

let citta1 = new Citta("Torino", [mezzo1]) // creo una città con un solo mezzo
citta1.aggiungiMezzo(mezzo2) // aggiungo secondo mezzo
citta1.mostramiTuttiIMezzi() // verifico tutti i mezzi della città1

utente1.prenotaMezzo(mezzo1) // inizio corsa regolare

utente1.prenotaMezzo(mezzo2) // provo a prenotarne un altro con lo stesso utente

utente2.prenotaMezzo(mezzo1) // provo a prenotare lo stesso mezzo con un altro utente

utente1.liberaMezzo() // fine corsa, libero correttamente il mezzo

utente2.prenotaMezzo(mezzo1) // inizio corsa regolare

citta1.mostramiMezziLiberi() // verifico i mezzi liberi della città1, dovrei vedere solo mezzo2

utente1.liberaMezzo() // provo a liberarlo anche se non ne ho assegnati

utente1.prenotaMezzo(mezzo2) // inizio corsa regolare

citta1.mostramiMezziLiberi() // verifico nuovamente i mezzi liberi della città1, non dovrei vederne nessuno

utente1.liberaMezzo() // fine corsa regolare

utente2.liberaMezzo()// fine corsa regolare

citta1.mostramiMezziLiberi() // verifico nuovamente i mezzi liberi della città1, dovrei vederli tutti