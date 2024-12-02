'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeleteIcon, File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { fetchCarAccept } from '@/app/services/CarServices';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Cars() {
  const [value, setValue] = useState('all')
  const params = useSearchParams()
  const offset = params.get('offset') ? Number(params.get('offset')) : 0;

  const router = useRouter()

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center text-base rounded">
        <TabsList>
          <TabsTrigger onClick={() => {setValue('all'); router.push('/admin?admin=cars')}} value="all">All</TabsTrigger>
          <TabsTrigger onClick={() => {setValue('active'); router.push('/admin?admin=cars')}} value="active">Not Accept</TabsTrigger>
        </TabsList>
        {value == 'all'
          ? (<div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1 bg-lightred text-white">
              <DeleteIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Xóa
              </span>
            </Button>
          </div>)
          : (<div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1 bg-green-300 text-white">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Duyệt
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1 bg-lightred text-white">
              <DeleteIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Xóa
              </span>
            </Button>
          </div>)
        }
      </div>
        {value == 'all'
          ? (<TabsContent value="all">
        <ProductsTable type={'all'} offset={offset} /> 
      </TabsContent>)
          : (<TabsContent value={'active'} >
        <ProductsTable type={'active'} offset={offset} />
      </TabsContent>)
        }
      

      
    </Tabs>
  );
}
