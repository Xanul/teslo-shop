interface SeedAddress {
  alias: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  phone: string;
  city: string;
  countryId: string;
  isDefault?: boolean;
}

export const userAddresses: SeedAddress[] = [
      {
        alias: 'Casa principal',
        firstName: 'Rodrigo',
        lastName: 'Rivas',
        address: 'Av. Paseo de la Reforma 123',
        address2: 'Depto. 501',
        postalCode: '06500',
        phone: '+52 55 1234 5678',
        city: 'Ciudad de México',
        countryId: 'MX',
      },
      {
        alias: 'Oficina',
        firstName: 'Rodrigo',
        lastName: 'Rivas',
        address: 'Insurgentes Sur 456',
        address2: 'Piso 10',
        postalCode: '06600',
        phone: '+52 55 8765 4321',
        city: 'Ciudad de México',
        countryId: 'MX',
      },
      {
        alias: 'Casa de playa',
        firstName: 'Rodrigo',
        lastName: 'Rivas',
        address: 'Carretera Cancún-Tulum Km 12',
        postalCode: '77500',
        phone: '+52 998 234 5678',
        city: 'Cancún',
        countryId: 'MX',
      },
      {
        alias: 'Casa',
        firstName: 'Armando',
        lastName: 'Rivas',
        address: '245 Market St',
        address2: 'Apt 8B',
        postalCode: '94105',
        phone: '+1 415 555 1234',
        city: 'San Francisco',
        countryId: 'US',
      },
      {
        alias: 'Trabajo',
        firstName: 'Armando',
        lastName: 'Rivas',
        address: '1 Tesla Rd',
        postalCode: '94304',
        phone: '+1 650 555 5678',
        city: 'Palo Alto',
        countryId: 'US',
      },
      {
        alias: 'Casa de campo',
        firstName: 'Armando',
        lastName: 'Rivas',
        address: '89 Wine Country Dr',
        postalCode: '95476',
        phone: '+1 707 555 9012',
        city: 'Sonoma',
        countryId: 'US',
      },
];

