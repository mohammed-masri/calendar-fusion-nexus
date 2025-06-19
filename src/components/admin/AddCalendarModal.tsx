
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const calendarFormSchema = z.object({
  name: z.string().min(1, 'Calendar name is required'),
  description: z.string().optional(),
  color: z.string().min(1, 'Color is required'),
  syncInterval: z.enum(['manual', '15min', '30min', '1hour', '4hours']),
  isPublic: z.boolean(),
  autoApprove: z.boolean(),
});

type CalendarFormData = z.infer<typeof calendarFormSchema>;

interface AddCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (calendarData: CalendarFormData) => void;
}

export const AddCalendarModal: React.FC<AddCalendarModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const { toast } = useToast();

  const form = useForm<CalendarFormData>({
    resolver: zodResolver(calendarFormSchema),
    defaultValues: {
      name: '',
      description: '',
      color: '#3b82f6',
      syncInterval: '30min',
      isPublic: true,
      autoApprove: false,
    },
  });

  const onSubmit = async (data: CalendarFormData) => {
    try {
      onSave(data);
      toast({
        title: "Calendar Added",
        description: `${data.name} has been successfully added to the system`,
      });
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add calendar",
        variant: "destructive",
      });
    }
  };

  const colorOptions = [
    { value: '#3b82f6', label: 'Blue', color: 'bg-blue-500' },
    { value: '#ef4444', label: 'Red', color: 'bg-red-500' },
    { value: '#10b981', label: 'Green', color: 'bg-green-500' },
    { value: '#f59e0b', label: 'Amber', color: 'bg-amber-500' },
    { value: '#8b5cf6', label: 'Purple', color: 'bg-purple-500' },
    { value: '#06b6d4', label: 'Cyan', color: 'bg-cyan-500' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Calendar</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calendar Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Marketing Events" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of this calendar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Theme</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${option.color}`} />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="syncInterval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sync Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sync frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="manual">Manual Only</SelectItem>
                      <SelectItem value="15min">Every 15 minutes</SelectItem>
                      <SelectItem value="30min">Every 30 minutes</SelectItem>
                      <SelectItem value="1hour">Every hour</SelectItem>
                      <SelectItem value="4hours">Every 4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Public Calendar</FormLabel>
                      <p className="text-sm text-gray-600">Events visible to all users</p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autoApprove"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Auto-approve Events</FormLabel>
                      <p className="text-sm text-gray-600">New events don't need approval</p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Add Calendar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
