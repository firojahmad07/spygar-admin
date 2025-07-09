'use client';

import { useState } from 'react';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { MultiSelectInput } from '@/components/ui/multi-select';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  code: z.string().min(1, 'Email is required').email({ message: 'Please enter a valid email address.' }),
  currencies: z.string().min(1, 'Email is required').email({ message: 'Please enter a valid email address.' }),
  locales: z.string().min(1, 'Email is required').email({ message: 'Please enter a valid email address.' }),
  categorytree: z.string().min(1, 'Email is required').email({ message: 'Please enter a valid email address.' }),
});

export default function PropertiesForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { code: '', currencies: '',locales: '', categorytree: '' },
  });

  const [statuses, setStatuses] = useState<string[]>([]);

  const statusOptions = [
    { value: 'EUR', label: 'EUR' },
    { value: 'USD', label: 'USD' },
    { value: 'GBP', label: 'GBP' },
  ];
  const currencyOptions = [

];
  const onSubmit = () => {
    toast.custom((t) => (
      <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
        <AlertIcon>
          <RiCheckboxCircleFill />
        </AlertIcon>
        <AlertTitle>Your form has been successfully submitted</AlertTitle>
      </Alert>
    ));
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="channel code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="currencies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currencies:</FormLabel>
              <FormControl>
                <MultiSelectInput
                  options={statusOptions}
                  value={statuses}
                  onChange={setStatuses}
                  placeholder="Status"
                />
                {/* <Input placeholder="Email address" {...field} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="locales"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locales:</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="categorytree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category tree * :</FormLabel>
              <FormControl>
                <Input placeholder="Category tree" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
