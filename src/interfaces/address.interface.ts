/**
 * Interfaz para enviar datos de dirección al servidor (crear/actualizar)
 * Se usa en formularios y al guardar datos
 */
export interface UserAddressInput {
  alias: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string | null;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

/**
 * Interfaz para recibir datos de dirección del servidor
 * Incluye todos los campos de la BD más las relaciones
 */
export interface UserAddress {
  id: string;
  alias: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string | null;
  postalCode: string;
  city: string;
  state: string;
  phone: string;
  isDefault: boolean;
  countryId: string;
  userId: string;
  country: {
    id: string;
    name: string;
  };
}
