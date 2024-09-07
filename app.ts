import { User, Vehicle, City } from "./classes";
import { paymentMethodsType, vehicleTypes } from "./definitions";

let user1 = new User("Alberto", "Agrò", "alberto.agro@live.it", paymentMethodsType.PayPal);
let user2 = new User("Mario", "Rossi", "mario.rossi@live.it", paymentMethodsType.Card);

let vehicle1 = new Vehicle(vehicleTypes.Scooter);
let vehicle2 = new Vehicle(vehicleTypes.ElectricScooter);

let city1 = new City("Turin", [vehicle1]); // create a city with a single vehicle

city1.addVehicle(vehicle2); // add a second vehicle
city1.showAllVehicles(); // check all vehicles in city1

user1.bookVehicle(vehicle1); // start a regular ride

user1.bookVehicle(vehicle2); // try to book another one with the same user

user2.bookVehicle(vehicle1); // try to book the same vehicle with another user

user1.releaseVehicle(); // end the ride, correctly release the vehicle

user2.bookVehicle(vehicle1); // start a regular ride

city1.showAvailableVehicles(); // check the available vehicles in city1, should only see vehicle2

user1.releaseVehicle(); // try to release it even if none are assigned

user1.bookVehicle(vehicle2); // start a regular ride

city1.showAvailableVehicles(); // check the available vehicles in city1 again, shouldn't see any

user1.releaseVehicle(); // end the regular ride

user2.releaseVehicle(); // end the regular ride

city1.showAvailableVehicles(); // check the available vehicles in city1 again, should see them all