import { z } from "zod";

export const deliveryFormSchema = z.object({
  itemName: z
    .string()
    .min(1, "Item name is required")
    .max(100, "Item name must be less than 100 characters"),

  location: z
    .string()
    .min(1, "Location is required"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+92|0)?[3][0-4][0-9]{8}$/, "Please enter a valid Pakistani phone number"),

  clientName: z
    .string()
    .min(1, "Client name is required")
    .max(50, "Client name must be less than 50 characters"),

  clientStreetAddress: z
    .string()
    .min(1, "Street address is required")
    .max(200, "Street address must be less than 200 characters"),

  additionalDetails: z
    .string()
    .max(500, "Additional details must be less than 500 characters")
    .optional(),
});

export type DeliveryFormData = z.infer<typeof deliveryFormSchema>;
