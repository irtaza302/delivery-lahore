"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { type DeliveryFilters, type DeliveryStatus, STATUS_LABELS, LAHORE_AREAS } from "@/lib/types";
import {
  Filter,
  Search,
  Calendar as CalendarIcon,
  X,
  MapPin,
  User,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliveryFiltersProps {
  filters: DeliveryFilters;
  onFiltersChange: (filters: DeliveryFilters) => void;
  totalCount: number;
  filteredCount: number;
}

export function DeliveryFiltersComponent({ filters, onFiltersChange, totalCount, filteredCount }: DeliveryFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (key: keyof DeliveryFilters, value: DeliveryFilters[keyof DeliveryFilters]) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value =>
    value !== undefined && value !== "" && (typeof value !== 'object' || (value.from || value.to))
  );

  const activeFilterCount = Object.values(filters).filter(value =>
    value !== undefined && value !== "" && (typeof value !== 'object' || (value.from || value.to))
  ).length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredCount} of {totalCount} deliveries
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deliveries by item name, client, or location..."
            value={filters.searchTerm || ""}
            onChange={(e) => updateFilters("searchTerm", e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!filters.status ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilters("status", undefined)}
          >
            All Status
          </Button>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <Button
              key={key}
              variant={filters.status === key ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters("status", key as DeliveryStatus)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
            {/* Status Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Status
              </Label>
              <Select
                value={filters.status || ""}
                onValueChange={(value) => updateFilters("status", value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Select
                value={filters.location || ""}
                onValueChange={(value) => updateFilters("location", value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All locations</SelectItem>
                  {Object.entries(LAHORE_AREAS).map(([region, areas]) =>
                    areas.map((area) => (
                      <SelectItem key={`${region}-${area}`} value={area}>
                        {area} ({region})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Client Name Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Client Name
              </Label>
              <Input
                placeholder="Filter by client name"
                value={filters.clientName || ""}
                onChange={(e) => updateFilters("clientName", e.target.value)}
              />
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Date Range
              </Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
                        !filters.dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange?.from ? (
                        format(filters.dateRange.from, "PPP")
                      ) : (
                        "From date"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange?.from}
                      onSelect={(date) =>
                        updateFilters("dateRange", {
                          ...filters.dateRange,
                          from: date || undefined,
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
                        !filters.dateRange?.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange?.to ? (
                        format(filters.dateRange.to, "PPP")
                      ) : (
                        "To date"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange?.to}
                      onSelect={(date) =>
                        updateFilters("dateRange", {
                          ...filters.dateRange,
                          to: date || undefined,
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
            <span className="text-sm font-medium text-muted-foreground">Active filters:</span>

            {filters.status && (
              <Badge variant="secondary" className="gap-1">
                Status: {STATUS_LABELS[filters.status]}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => updateFilters("status", undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {filters.location && (
              <Badge variant="secondary" className="gap-1">
                Location: {filters.location}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => updateFilters("location", undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {filters.clientName && (
              <Badge variant="secondary" className="gap-1">
                Client: {filters.clientName}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => updateFilters("clientName", undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {filters.dateRange?.from && (
              <Badge variant="secondary" className="gap-1">
                From: {format(filters.dateRange.from, "MMM dd")}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() =>
                    updateFilters("dateRange", {
                      ...filters.dateRange,
                      from: undefined,
                    })
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {filters.dateRange?.to && (
              <Badge variant="secondary" className="gap-1">
                To: {format(filters.dateRange.to, "MMM dd")}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() =>
                    updateFilters("dateRange", {
                      ...filters.dateRange,
                      to: undefined,
                    })
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {filters.searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: {filters.searchTerm}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => updateFilters("searchTerm", undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
