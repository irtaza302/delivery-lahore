"use client";

import { useState, useEffect, useMemo } from "react";
import { DeliveryForm } from "@/components/delivery-form";
import { DeliveryList } from "@/components/delivery-list";
import { DeliveryFiltersComponent } from "@/components/delivery-filters";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  type DeliveryItem,
  type DeliveryStatus,
  type DeliveryFilters
} from "@/lib/types";
import { type DeliveryFormData } from "@/lib/validations";
import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  TrendingUp
} from "lucide-react";

// Local storage key
const STORAGE_KEY = "my-delivery-items";

export default function Home() {
  const { t, language } = useLanguage();
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([]);
  const [filters, setFilters] = useState<DeliveryFilters>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const deliveriesWithDates = parsed.map((delivery: any) => ({
          ...delivery,
          createdAt: new Date(delivery.createdAt),
          updatedAt: new Date(delivery.updatedAt),
          deliveryDate: delivery.deliveryDate ? new Date(delivery.deliveryDate) : undefined,
        }));
        setDeliveries(deliveriesWithDates);
      }
    } catch (error) {
      console.error("Failed to load deliveries from localStorage:", error);
      toast.error(t("messages.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever deliveries change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(deliveries));
      } catch (error) {
        console.error("Failed to save deliveries to localStorage:", error);
        toast.error(t("messages.saveError"));
      }
    }
  }, [deliveries, isLoading]);

  // Filter deliveries based on current filters
  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((delivery) => {
      // Status filter
      if (filters.status && delivery.status !== filters.status) {
        return false;
      }

      // Location filter
      if (filters.location && delivery.location !== filters.location) {
        return false;
      }

      // Client name filter
      if (filters.clientName && !delivery.clientName.toLowerCase().includes(filters.clientName.toLowerCase())) {
        return false;
      }

      // Date range filter
      if (filters.dateRange?.from || filters.dateRange?.to) {
        const deliveryDate = delivery.createdAt;
        if (filters.dateRange.from && deliveryDate < filters.dateRange.from) {
          return false;
        }
        if (filters.dateRange.to && deliveryDate > filters.dateRange.to) {
          return false;
        }
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const searchableText = [
          delivery.itemName,
          delivery.clientName,
          delivery.location,
          delivery.clientStreetAddress,
          delivery.phoneNumber,
          delivery.additionalDetails
        ].join(' ').toLowerCase();

        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [deliveries, filters]);

  // Handle adding new delivery
  const handleAddDelivery = (formData: DeliveryFormData) => {
    const newDelivery: DeliveryItem = {
      id: crypto.randomUUID(),
      ...formData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setDeliveries(prev => [newDelivery, ...prev]);
    toast.success(t("messages.deliveryAdded"));
  };

  // Handle status change
  const handleStatusChange = (id: string, status: DeliveryStatus) => {
    setDeliveries(prev =>
      prev.map(delivery =>
        delivery.id === id
          ? { ...delivery, status, updatedAt: new Date() }
          : delivery
      )
    );
    toast.success(t("messages.statusUpdated"));
  };

  // Statistics
  const stats = useMemo(() => {
    const total = deliveries.length;
    const pending = deliveries.filter(d => d.status === 'pending').length;
    const inTransit = deliveries.filter(d => d.status === 'in-transit').length;
    const delivered = deliveries.filter(d => d.status === 'delivered').length;
    const failed = deliveries.filter(d => d.status === 'failed').length;
    const cancelled = deliveries.filter(d => d.status === 'cancelled').length;

    return { total, pending, inTransit, delivered, failed, cancelled };
  }, [deliveries]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Truck className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{t("appTitle")}</h1>
                <p className="text-sm text-muted-foreground">{t("appSubtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-2">
                <MapPin className="h-3 w-3" />
                {t("locationBadge")}
              </Badge>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{t("stats.total")}</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">{t("stats.pending")}</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.pending}</p>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">{t("stats.inTransit")}</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-blue-600">{stats.inTransit}</p>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">{t("stats.delivered")}</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-green-600">{stats.delivered}</p>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">{t("stats.failed")}</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-red-600">{stats.failed}</p>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{t("stats.successRate")}</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {stats.total > 0 ? Math.round((stats.delivered / stats.total) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Add Delivery Form */}
        <div className="mb-8">
          <DeliveryForm
            onSubmit={handleAddDelivery}
            translations={{
              form: {
                title: t("form.title"),
                description: t("form.description"),
                itemName: t("form.itemName"),
                itemNamePlaceholder: t("form.itemNamePlaceholder"),
                clientName: t("form.clientName"),
                clientNamePlaceholder: t("form.clientNamePlaceholder"),
                phoneNumber: t("form.phoneNumber"),
                phoneNumberPlaceholder: t("form.phoneNumberPlaceholder"),
                region: t("form.region"),
                area: t("form.area"),
                locationTitle: t("form.locationTitle"),
                streetAddress: t("form.streetAddress"),
                streetAddressPlaceholder: t("form.streetAddressPlaceholder"),
                additionalDetails: t("form.additionalDetails"),
                additionalDetailsPlaceholder: t("form.additionalDetailsPlaceholder"),
                addDelivery: t("form.addDelivery"),
                resetForm: t("form.resetForm"),
                adding: t("form.adding"),
              },
            }}
          />
        </div>

        <Separator className="my-8" />

        {/* Filters */}
        <div className="mb-6">
          <DeliveryFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            totalCount={deliveries.length}
            filteredCount={filteredDeliveries.length}
          />
        </div>

        {/* Delivery List */}
        <DeliveryList
          deliveries={filteredDeliveries}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>{t("footer.copyright")}</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {t("locationBadge")}
              </span>
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
