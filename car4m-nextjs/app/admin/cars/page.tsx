import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { fetchCarAccept } from '@/app/services/CarServices';
import { useEffect, useState } from 'react';

export default async function Cars() {

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center text-base rounded">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Not Accept</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1 bg-lowblue text-white">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Car
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <ProductsTable
         
        /> 
      </TabsContent>
    </Tabs>
  );
}
