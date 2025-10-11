"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { deliveryFormSchema, type DeliveryFormData } from "@/lib/validations";
import { LAHORE_AREAS } from "@/lib/types";
import { Package, MapPin, Phone, User, Home, FileText, Plus } from "lucide-react";

interface DeliveryFormProps {
  onSubmit: (data: DeliveryFormData) => void;
  isSubmitting?: boolean;
  translations?: {
    form: {
      title: string;
      description: string;
      itemName: string;
      itemNamePlaceholder: string;
      clientName: string;
      clientNamePlaceholder: string;
      phoneNumber: string;
      phoneNumberPlaceholder: string;
      region: string;
      area: string;
      locationTitle: string;
      streetAddress: string;
      streetAddressPlaceholder: string;
      additionalDetails: string;
      additionalDetailsPlaceholder: string;
      addDelivery: string;
      resetForm: string;
      adding: string;
    };
  };
}

export function DeliveryForm({ onSubmit, isSubmitting = false, translations }: DeliveryFormProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  // Default translations
  const t = {
    form: {
      title: "Add New Delivery",
      description: "Enter delivery details for Lahore, Pakistan",
      itemName: "Item Name",
      itemNamePlaceholder: "e.g., Electronics Package, Food Order, Documents",
      clientName: "Client Name",
      clientNamePlaceholder: "Full name",
      phoneNumber: "Phone Number",
      phoneNumberPlaceholder: "03001234567",
      region: "Region",
      area: "Area",
      locationTitle: "Delivery Location in Lahore",
      streetAddress: "Street Address",
      streetAddressPlaceholder: "House number, street name, landmark",
      additionalDetails: "Additional Details (Optional)",
      additionalDetailsPlaceholder: "Special instructions, delivery notes, or additional information...",
      addDelivery: "Add Delivery",
      resetForm: "Reset Form",
      adding: "Adding Delivery...",
      ...translations?.form,
    },
  };

  const form = useForm<DeliveryFormData>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      itemName: "",
      location: "",
      phoneNumber: "",
      clientName: "",
      clientStreetAddress: "",
      additionalDetails: "",
    },
  });

  const handleSubmit = (data: DeliveryFormData) => {
    onSubmit(data);
    form.reset();
    setSelectedRegion("");
  };

  const getAreasForRegion = (region: string) => {
    return LAHORE_AREAS[region] || [];
  };

  return (
    <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item Name */}
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {t.form.itemName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.form.itemNamePlaceholder}
                        {...field}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Client Name */}
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t.form.clientName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.form.clientNamePlaceholder}
                        {...field}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t.form.phoneNumber}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.form.phoneNumberPlaceholder}
                        {...field}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location Selection */}
            <div className="space-y-4">
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <MapPin className="h-4 w-4" />
                {t.form.locationTitle}
              </FormLabel>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Region Selection */}
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-sm font-medium">
                    {t.form.region}
                  </Label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger id="region">
                      <SelectValue placeholder={`${t.form.region.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(LAHORE_AREAS).map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Area Selection */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="area" className="text-sm font-medium">
                        {t.form.area}
                      </Label>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!selectedRegion}
                      >
                        <SelectTrigger id="area">
                          <SelectValue placeholder={`${t.form.area.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {getAreasForRegion(selectedRegion).map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Street Address */}
            <FormField
              control={form.control}
              name="clientStreetAddress"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    {t.form.streetAddress}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.streetAddressPlaceholder}
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Details */}
            <FormField
              control={form.control}
              name="additionalDetails"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t.form.additionalDetails}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.form.additionalDetailsPlaceholder}
                      className="min-h-[80px] text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {t.form.adding}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    {t.form.addDelivery}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="flex-1 sm:flex-none"
                size="lg"
              >
                {t.form.resetForm}
              </Button>
            </div>
          </form>
        </Form>
    </div>
  );
}
