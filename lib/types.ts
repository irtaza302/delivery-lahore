export type DeliveryStatus = 'pending' | 'in-transit' | 'delivered' | 'cancelled' | 'failed';

export interface DeliveryItem {
  id: string;
  itemName: string;
  location: string;
  phoneNumber: string;
  clientName: string;
  clientStreetAddress: string;
  additionalDetails?: string;
  status: DeliveryStatus;
  createdAt: Date;
  updatedAt: Date;
  deliveryDate?: Date;
}

export interface DeliveryFilters {
  status?: DeliveryStatus;
  clientName?: string;
  location?: string;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  searchTerm?: string;
}

export interface LahoreAreas {
  [key: string]: string[];
}

export const LAHORE_AREAS: LahoreAreas = {
  'Central Lahore': [
    'Anarkali',
    'Civil Lines',
    'Gulberg',
    'Model Town',
    'Johar Town',
    'Garden Town',
    'Ferozepur Road',
    'Mall Road',
    'Shadman',
    'Walled City'
  ],
  'East Lahore': [
    'Allama Iqbal Town',
    'Township',
    'Canal View',
    'Bahria Town',
    'DHA Phase 1-8',
    'Wapda Town',
    'Askari',
    'Valencia Town',
    'EME Society',
    'PCSIR'
  ],
  'West Lahore': [
    'Shalimar',
    'Ravi',
    'Data Nagar',
    'Ichhra',
    'Samnabad',
    'LDA Avenue',
    'Pakki Thatti',
    'Misri Shah',
    'Samanabad',
    'Green Town'
  ],
  'North Lahore': [
    'Faisal Town',
    'State Life Housing Society',
    'Gulshan-e-Ravi',
    'Sabzazar',
    'Lahore Cantonment',
    'Saddar',
    'Garhi Shahu',
    'Barkat Market',
    'Islampura',
    'Rakh Chand Road'
  ]
};

export const STATUS_LABELS: Record<DeliveryStatus, string> = {
  'pending': 'Pending',
  'in-transit': 'In Transit',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled',
  'failed': 'Failed'
};

export const STATUS_COLORS: Record<DeliveryStatus, string> = {
  'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'in-transit': 'bg-blue-100 text-blue-800 border-blue-200',
  'delivered': 'bg-green-100 text-green-800 border-green-200',
  'cancelled': 'bg-gray-100 text-gray-800 border-gray-200',
  'failed': 'bg-red-100 text-red-800 border-red-200'
};
