import { UserAddressInput } from "@/interfaces";
import prisma from "@/lib/prisma";

const addressInclude = {
  country: {
    select: {
      id: true,
      name: true,
    },
  },
};

export class AddressRepository {
  /**
   * Busca la dirección asociada a un usuario.
   * Retorna la dirección completa con la relación del país incluida.
   */
  async findAllByUserId(userId: string) {
    return prisma.userAddress.findMany({
      where: { userId },
      include: addressInclude,
    });
  }

  async findDefaultByUserId(userId: string) {
    return prisma.userAddress.findFirst({
      where: { userId, isDefault: true },
      include: addressInclude,
    });
  }

  async findById(id: string) {
    return prisma.userAddress.findFirst({
      where: { id },
      include: addressInclude,
    });
  }

  /**
   * Crea una nueva dirección para un usuario.
   * Recibe UserAddressInput y retorna la dirección creada con relaciones.
   */
  async create(userId: string, address: UserAddressInput) {
    const adressCount = await prisma.userAddress.count({
      where: { userId },
    });

    const isFirstAddress = adressCount === 0;

    if (address.isDefault || isFirstAddress) {
      await this.unsetDefaultAddresses(userId);
    }

    return prisma.userAddress.create({
      data: {
        userId,
        alias: address.alias,
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        address2: address.address2 ?? null,
        postalCode: address.postalCode,
        city: address.city,
        state: address.state,
        countryId: address.country,
        phone: address.phone,
        isDefault: address.isDefault || isFirstAddress,
      },
      include: addressInclude,
    });
  }

  /**
   * Actualiza la dirección existente de un usuario.
   * Recibe UserAddressInput y retorna la dirección actualizada con relaciones.
   */
  async update(addressId: string, userId: string, address: UserAddressInput) {
    if (address.isDefault) {
      await this.unsetDefaultAddresses(userId);
    }
    return prisma.userAddress.update({
      where: {
        id: addressId,
      },
      data: {
        alias: address.alias,
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        address2: address.address2 ?? null,
        postalCode: address.postalCode,
        city: address.city,
        state: address.state,
        countryId: address.country,
        phone: address.phone,
        isDefault: address.isDefault ?? false,
      },
      include: addressInclude,
    });
  }

  async setAsDefault(addressId: string, userId: string) {
    // Desmarcar todas las direcciones del usuario
    await this.unsetDefaultAddresses(userId);

    // Marcar la dirección especificada
    return prisma.userAddress.update({
      where: { id: addressId },
      data: { isDefault: true },
      include: addressInclude,
    });
  }

  /**
   * Elimina la dirección asociada a un usuario.
   */
  async delete(addressId: string, userId: string) {
    const address = await prisma.userAddress.findFirst({
      where: { id: addressId, userId },
    });
    if (!address) return null;

    if (address.isDefault) {
      const nextAddress = await prisma.userAddress.findFirst({
        where: {
          userId,
          id: { not: addressId },
        },
      });
      if (nextAddress) {
        await prisma.userAddress.update({
          where: { id: nextAddress.id },
          data: { isDefault: true },
        });
      }
    }

    return prisma.userAddress.delete({
      where: { id: addressId },
    });
  }

  private async unsetDefaultAddresses(userId: string) {
    await prisma.userAddress.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    })
  }

}
