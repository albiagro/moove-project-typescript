import { IMezzo, IUtente, ICitta } from "./interfaces";

// Define my custom types
type paymentMethodsType = "paypal" | "mooney" | "card";
type vehicleTypes = "bike" | "scooter" | "electric scooter";
type statusTypes = "available" | "in use";

let counter: number = 0; // ID for vehicles

export class Vehicle implements IMezzo {
  type: vehicleTypes;
  id: number;
  private _status: statusTypes;
  assignedUser: User | null; // Can be a user or null when unassigned

  public get status(): statusTypes {
    return this._status;
  }

  public set status(v: statusTypes) {
    this._status = v;
  }

  constructor(type: vehicleTypes) {
    this.type = type;
    this.id = counter++; // Assign this counter as ID to avoid creating multiple vehicles with the same ID
    this._status = "available"; // When I create the vehicle, by default it is available
  }

  assignUser(userToAssign: User): boolean { // Created as a boolean function to handle different behavior in bookVehicle based on the outcome
    if (this.status != "in use") {
      this.status = "in use";
      this.assignedUser = userToAssign;
      console.log(
        `User ${this.assignedUser.name} has been successfully assigned to the vehicle ${this.type} - ID: ${this.id}!`
      );
      return true;
    } else {
      console.log(
        `Unable to assign! The vehicle ${this.type} - ID: ${this.id} is currently in use!`
      );
      return false;
    }
  }

  unassignUser(): void {
    // No need to ask for the user as input because if I want to unassign, I unassign the user currently assigned
    console.log(
      `User ${this.assignedUser?.name} has been successfully unassigned from the vehicle ${this.type} - ID: ${this.id}!`
    );
    this.status = "available";
    this.assignedUser = null;
  }
}

export class User implements IUtente {
  name: string;
  surname: string;
  email: string;
  paymentMethod: paymentMethodsType;
  assignedVehicle: Vehicle | null;

  constructor(
    name: string,
    surname: string,
    email: string,
    paymentMethod: paymentMethodsType
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.paymentMethod = paymentMethod;
  }

  bookVehicle(vehicleToAssign: Vehicle): void {
    if (this.assignedVehicle == null) {
      if (vehicleToAssign.assignUser(this))
        this.assignedVehicle = vehicleToAssign; // If the assignment was successful
    } else {
      console.log(
        `User ${this.name} is already assigned to the vehicle ${this.assignedVehicle.type} - ID: ${this.assignedVehicle.id}!`
      );
    }
  }

  releaseVehicle() {
    if (this.assignedVehicle != null) {
      this.assignedVehicle.unassignUser();
      this.assignedVehicle = null;
    } else {
      console.log(
        `User ${this.name} does not have any assigned vehicle to release!`
      );
    }
  }
}

export class City implements ICitta {
  name: string;
  availableVehicles: Vehicle[];

  constructor(
    name: string,
    availableVehicles: Vehicle[]
  ) {
    this.name = name;
    this.availableVehicles = availableVehicles;
  }

  addVehicle(vehicleToAdd: Vehicle): void {
    this.availableVehicles.push(vehicleToAdd);
    console.log(
      `Vehicle ${vehicleToAdd.type} ID: ${vehicleToAdd.id} successfully added to the city ${this.name}!`
    );
  }

  showAllVehicles(): void { // Show all vehicles
    console.log(`The vehicles in the city ${this.name} are as follows:`);
    this.availableVehicles.forEach((element) => {
      console.log(`${element.type} ID: ${element.id}`);
    });
  }

  showAvailableVehicles(): void { // Show only available vehicles
    console.log(`The available vehicles in the city ${this.name} are as follows:`);
    this.availableVehicles.forEach((element) => {
      if (element.status == "available")
        console.log(`${element.type} ID: ${element.id}`);
    });
  }
}