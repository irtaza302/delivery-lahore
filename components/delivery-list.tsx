"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { type DeliveryItem, type DeliveryStatus, STATUS_LABELS, STATUS_COLORS } from "@/lib/types";
import {
  Package,
  MapPin,
  Phone,
  User,
  Home,
  FileText,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DeliveryListProps {
  deliveries: DeliveryItem[];
  onStatusChange: (id: string, status: DeliveryStatus) => void;
}

export function DeliveryList({ deliveries, onStatusChange }: DeliveryListProps) {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryItem | null>(null);

  const getStatusBadge = (status: DeliveryStatus) => {
    return (
      <Badge variant="outline" className={STATUS_COLORS[status]}>
        {STATUS_LABELS[status]}
      </Badge>
    );
  };

  const DeliveryDetailsDialog = ({ delivery }: { delivery: DeliveryItem }) => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Delivery Details
        </DialogTitle>
        <DialogDescription>
          Complete information for delivery #{delivery.id.slice(-8)}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">DELIVERY INFO</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{delivery.itemName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Created: {format(delivery.createdAt, 'PPP')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Updated: {format(delivery.updatedAt, 'PPP')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(delivery.status)}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">LOCATION</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{delivery.location}</p>
                    <p className="text-sm text-muted-foreground">{delivery.clientStreetAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">CLIENT INFO</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{delivery.clientName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono">{delivery.phoneNumber}</span>
                </div>
              </div>
            </div>

            {delivery.additionalDetails && (
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">ADDITIONAL DETAILS</h4>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm leading-relaxed">{delivery.additionalDetails}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );

  if (deliveries.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No deliveries yet</h3>
          <p className="text-muted-foreground text-center">
            Add your first delivery using the form above to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Delivery List
          </span>
          <Badge variant="secondary">{deliveries.length} deliveries</Badge>
        </CardTitle>
        <CardDescription>
          Manage and track all your deliveries in Lahore
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>
                    <div className="font-medium">{delivery.itemName}</div>
                    <div className="text-sm text-muted-foreground">
                      ID: {delivery.id.slice(-8)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{delivery.clientName}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {delivery.phoneNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {delivery.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={delivery.status}
                      onValueChange={(value: DeliveryStatus) => onStatusChange(delivery.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(delivery.createdAt, 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(delivery.createdAt, 'HH:mm')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={() => setSelectedDelivery(delivery)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {deliveries.map((delivery) => (
            <Card key={delivery.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{delivery.itemName}</h4>
                    <p className="text-sm text-muted-foreground">ID: {delivery.id.slice(-8)}</p>
                  </div>
                  {getStatusBadge(delivery.status)}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{delivery.clientName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{delivery.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{delivery.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{format(delivery.createdAt, 'MMM dd, yyyy')}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Select
                    value={delivery.status}
                    onValueChange={(value: DeliveryStatus) => onStatusChange(delivery.id, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDelivery(delivery)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DeliveryDetailsDialog delivery={delivery} />
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Details Dialog */}
        {selectedDelivery && (
          <Dialog open={!!selectedDelivery} onOpenChange={() => setSelectedDelivery(null)}>
            <DeliveryDetailsDialog delivery={selectedDelivery} />
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
