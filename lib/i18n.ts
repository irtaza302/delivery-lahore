export type Language = 'en' | 'ur';

export const translations = {
  en: {
    // Header
    appTitle: 'MyDelivery',
    appSubtitle: 'Lahore Delivery Management',
    locationBadge: 'Lahore, Pakistan',

    // Statistics
    stats: {
      total: 'Total',
      pending: 'Pending',
      inTransit: 'In Transit',
      delivered: 'Delivered',
      failed: 'Failed',
      successRate: 'Success Rate',
    },

    // Form
    form: {
      title: 'Add New Delivery',
      description: 'Enter delivery details for Lahore, Pakistan',
      itemName: 'Item Name',
      itemNamePlaceholder: 'e.g., Electronics Package, Food Order, Documents',
      clientName: 'Client Name',
      clientNamePlaceholder: 'Full name',
      phoneNumber: 'Phone Number',
      phoneNumberPlaceholder: '03001234567',
      region: 'Region',
      area: 'Area',
      locationTitle: 'Delivery Location in Lahore',
      streetAddress: 'Street Address',
      streetAddressPlaceholder: 'House number, street name, landmark',
      additionalDetails: 'Additional Details (Optional)',
      additionalDetailsPlaceholder: 'Special instructions, delivery notes, or additional information...',
      addDelivery: 'Add Delivery',
      resetForm: 'Reset Form',
      adding: 'Adding Delivery...',
    },

    // Filters
    filters: {
      title: 'Filters',
      expand: 'Expand',
      collapse: 'Collapse',
      searchPlaceholder: 'Search deliveries by item name, client, or location...',
      allStatuses: 'All Status',
      status: 'Status',
      location: 'Location',
      allLocations: 'All locations',
      clientName: 'Client Name',
      clientNamePlaceholder: 'Filter by client name',
      dateRange: 'Date Range',
      fromDate: 'From date',
      toDate: 'To date',
      activeFilters: 'Active filters:',
      clearAll: 'Clear all',
    },

    // List
    list: {
      title: 'Delivery List',
      description: 'Manage and track all your deliveries in Lahore',
      noDeliveries: 'No deliveries yet',
      noDeliveriesDesc: 'Add your first delivery using the form above to get started.',
      id: 'ID',
      item: 'Item',
      client: 'Client',
      location: 'Location',
      status: 'Status',
      date: 'Date',
      actions: 'Actions',
      viewDetails: 'View Details',
    },

    // Status labels
    status: {
      pending: 'Pending',
      'in-transit': 'In Transit',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      failed: 'Failed',
    },

    // Details dialog
    details: {
      title: 'Delivery Details',
      deliveryInfo: 'DELIVERY INFO',
      location: 'LOCATION',
      clientInfo: 'CLIENT INFO',
      additionalDetails: 'ADDITIONAL DETAILS',
      created: 'Created',
      updated: 'Updated',
    },

    // Messages
    messages: {
      deliveryAdded: 'Delivery added successfully!',
      statusUpdated: 'Delivery status updated',
      loadError: 'Failed to load saved deliveries',
      saveError: 'Failed to save deliveries',
    },

    // Footer
    footer: {
      copyright: '© 2025 MyDelivery. Built for Lahore, Pakistan.',
    },
  },

  ur: {
    // Header - Urdu translations
    appTitle: 'میرا ڈیلیوری',
    appSubtitle: 'لاہور کی ڈیلیوری مینجمنٹ',
    locationBadge: 'لاہور، پاکستان',

    // Statistics
    stats: {
      total: 'کل',
      pending: 'زیر التواء',
      inTransit: 'راستے میں',
      delivered: 'پہنچا دیا گیا',
      failed: 'ناکام',
      successRate: 'کامیابی کی شرح',
    },

    // Form
    form: {
      title: 'نئی ڈیلیوری شامل کریں',
      description: 'لاہور، پاکستان کے لیے ڈیلیوری کی تفصیلات درج کریں',
      itemName: 'آئٹم کا نام',
      itemNamePlaceholder: 'مثال کے طور پر: الیکٹرانکس پیکیج، فوڈ آرڈر، دستاویزات',
      clientName: 'کلائنٹ کا نام',
      clientNamePlaceholder: 'پورا نام',
      phoneNumber: 'فون نمبر',
      phoneNumberPlaceholder: '03001234567',
      region: 'علاقہ',
      area: 'سےکٹر',
      locationTitle: 'لاہور میں ڈیلیوری کا مقام',
      streetAddress: 'گلی کا پتہ',
      streetAddressPlaceholder: 'گھر نمبر، گلی کا نام، لینڈ مارک',
      additionalDetails: 'اضافی تفصیلات (اختیاری)',
      additionalDetailsPlaceholder: 'خصوصی ہدایات، ڈیلیوری نوٹس، یا اضافی معلومات...',
      addDelivery: 'ڈیلیوری شامل کریں',
      resetForm: 'فارم ری سیٹ کریں',
      adding: 'ڈیلیوری شامل کی جا رہی ہے...',
    },

    // Filters
    filters: {
      title: 'فلٹرز',
      expand: 'توسیع کریں',
      collapse: 'سکیڑیں',
      searchPlaceholder: 'آئٹم نام، کلائنٹ، یا مقام سے ڈیلیوریز تلاش کریں...',
      allStatuses: 'تمام اسٹیٹس',
      status: 'اسٹیٹس',
      location: 'مقام',
      allLocations: 'تمام مقامات',
      clientName: 'کلائنٹ کا نام',
      clientNamePlaceholder: 'کلائنٹ کے نام سے فلٹر کریں',
      dateRange: 'تاریخ کی حد',
      fromDate: 'تاریخ سے',
      toDate: 'تاریخ تک',
      activeFilters: 'فعال فلٹرز:',
      clearAll: 'سب کو صاف کریں',
    },

    // List
    list: {
      title: 'ڈیلیوریز کی فہرست',
      description: 'لاہور میں اپنی تمام ڈیلیوریز کا نظم کریں اور ٹریک کریں',
      noDeliveries: 'ابھی تک کوئی ڈیلیوری نہیں',
      noDeliveriesDesc: 'اوپر دیے گئے فارم کا استعمال کرتے ہوئے اپنی پہلی ڈیلیوری شامل کریں۔',
      id: 'ID',
      item: 'آئٹم',
      client: 'کلائنٹ',
      location: 'مقام',
      status: 'اسٹیٹس',
      date: 'تاریخ',
      actions: 'ایکشنز',
      viewDetails: 'تفصیلات دیکھیں',
    },

    // Status labels
    status: {
      pending: 'زیر التواء',
      'in-transit': 'راستے میں',
      delivered: 'پہنچا دیا گیا',
      cancelled: 'منسوخ',
      failed: 'ناکام',
    },

    // Details dialog
    details: {
      title: 'ڈیلیوری کی تفصیلات',
      deliveryInfo: 'ڈیلیوری کی معلومات',
      location: 'مقام',
      clientInfo: 'کلائنٹ کی معلومات',
      additionalDetails: 'اضافی تفصیلات',
      created: 'بنائی گئی',
      updated: 'اپ ڈیٹ کی گئی',
    },

    // Messages
    messages: {
      deliveryAdded: 'ڈیلیوری کامیابی سے شامل کر دی گئی!',
      statusUpdated: 'ڈیلیوری اسٹیٹس اپ ڈیٹ کر دیا گیا',
      loadError: 'محفوظ شدہ ڈیلیوریز لوڈ کرنے میں ناکام',
      saveError: 'ڈیلیوریز محفوظ کرنے میں ناکام',
    },

    // Footer
    footer: {
      copyright: '© ۲۰۲۵ میرا ڈیلیوری۔ لاہور، پاکستان کے لیے بنایا گیا۔',
    },
  },
} as const;

export function useTranslation(language: Language = 'en') {
  return {
    t: (key: string) => {
      const keys = key.split('.');
      let value: unknown = translations[language];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }

      return typeof value === 'string' ? value : key;
    },
  };
}
