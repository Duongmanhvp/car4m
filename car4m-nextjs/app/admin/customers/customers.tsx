'use client'

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';

import bg from '@/app/assets/imgs/avatar.png'
import { use, useEffect, useState } from 'react';
import { fetchOwner } from '@/app/services/UserServices';
import { fetchCarUser } from '@/app/services/CarServices';

const linkImg = process.env.NEXT_PUBLIC_LINK

export function Customers({ customer }: { customer: any }) {
  const [data, setData] = useState(0)

  const getCount = async (id: number) => {
    try {
      const respone = await fetchCarUser(id)
      setData(respone.data.totalElements)
    } catch (error) {
      console.log("Loi khi lay info", error)
    }
  }

  useEffect(() => {
    getCount(customer.id)
  }, [customer.id])

  //console.log(customer)

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell font-baloo-2">
        <Image
          alt="customer image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={customer.image ? customer.image : bg }
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{customer.username}</TableCell>
      <TableCell>
        {customer.email}
      </TableCell>
      <TableCell className="hidden md:table-cell">{customer.phone}</TableCell>
      <TableCell className="hidden md:table-cell">{data}</TableCell>
    </TableRow>
  );
}
