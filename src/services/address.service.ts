import { UserAddress, UserAddressInput } from "@/interfaces";
import { DatabaseError } from "@/lib/errors";
import { AddressRepository } from "@/repositories";

export class AddressService {
  constructor(private repository: AddressRepository) {}

  /**
   * Obtiene la dirección de un usuario por su ID.
   * Retorna UserAddress con el país completo incluido, o null si no existe.
   */
  async getUserAddresses(userId: string): Promise<UserAddress[]> {
    console.log("UserID: ", userId);
    try {
      const addresses = await this.repository.findAllByUserId(userId);
      return addresses;
    } catch (error) {
      throw new DatabaseError(
        "Error fetching user addresses",
        "getUserAddresses",
        error
      );
    }
  }

  async getDefaultAddress(userId: string): Promise<UserAddress | null> {
    try {
      const address = await this.repository.findDefaultByUserId(userId);
      return address;
    } catch (error) {
      throw new DatabaseError(
        "Error fetching default address",
        "getDefaultAddress",
        error
      );
    }
  }

  async getAddressById(addressId: string): Promise<UserAddress | null> {
    try {
      const address = await this.repository.findById(addressId);
      return address;
    } catch (error) {
      throw new DatabaseError(
        "Error fetching address",
        "getAddressById",
        error
      );
    }
  }

  /**
   * Crea una nueva dirección para un usuario.
   * Recibe UserAddressInput y retorna UserAddress con relaciones.
   */
  async createAddress(userId: string, address: UserAddressInput): Promise<UserAddress> {
    try {
      const newAddress = await this.repository.create(userId, address);
      return newAddress;
    } catch (error) {
      throw new DatabaseError("Error creating address", "createAddress", error);
    }
  }

  /**
   * Actualiza la dirección existente de un usuario.
   * Recibe UserAddressInput y retorna UserAddress actualizada.
   */
  async updateAddress(
    addressId: string,
    userId: string,
    address: UserAddressInput
  ): Promise<UserAddress> {
  
    try {
      const updatedAddress = await this.repository.update(addressId, userId, address);
      return updatedAddress
    } catch (error) {
      throw new DatabaseError("Error updating address", "updateAddress", error);
    }
  }

  async setDefaultAddress(addressId: string, userId: string): Promise<UserAddress> {
    try {
      const address = await this.repository.setAsDefault(addressId, userId);
      return address;
    } catch (error) {
      throw new DatabaseError("Error setting default address", "setDefaultAddress", error);
    }
  }

  /**
   * Crea o actualiza la dirección de un usuario (upsert).
   * Recibe UserAddressInput y retorna UserAddress.
   */
  async deleteAddress(addressId: string, userId: string): Promise<boolean> {
    try {
      const deleted = await this.repository.delete(addressId, userId);
      return deleted !== null;
    } catch (error) {
      throw new DatabaseError("Error deleting address", "deleteAddress", error);
    }
  }
}

// Instancia única del servicio (Singleton)
const addressRepository = new AddressRepository();
export const addressService = new AddressService(addressRepository);