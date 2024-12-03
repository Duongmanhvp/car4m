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

import bg from '@/app/assets/imgs/bg.jpeg'
import { getAllCarOrder } from '@/app/services/OrderService';
import { useEffect, useState } from 'react';
import { acceptedCar, deleteCar, rejectedCar } from '@/app/services/CarServices';

const linkImg = process.env.NEXT_PUBLIC_LINK

export function Product({ product }: { product: any }) {
  const [count, setCount] = useState(0)
  const stringToLink = (images: string) => {
		let image: string[] = images.split(',')
		
    console.log(linkImg, image[0])
    return linkImg + image[0]
	}

  const rejectCar = async () => {
    try {
      const response = await rejectedCar(product.id) 
    } catch (error) {
      console.log('Loi khi reject car', error)
    }
  }

  const acceptCar = async () => {
    try {
      const response = await acceptedCar(product.id) 
    } catch (error) {
      console.log('Loi khi accept car', error)
    }
  }

  const delCar = async () => {
    try {
      const respone = await deleteCar(product.id)
    } catch (error) {
      console.log('Loi khi delete car', error)
    }
  }

  const getAllRent = async () => {
    try {
      const respone = await getAllCarOrder(product.id)
      const obj: any[] = respone.data
      setCount(obj.length)
    } catch (error) {
      console.log('Loi khi lay count redntal')
    }
  }

  useEffect(() => {
    getAllRent()
  }, [product.id])

  const handleAction = () => {
    if (product.is_accepted) {
      delCar()
      window.location.reload()
    } else {
      rejectCar()
      window.location.reload()
    }
  }

  const handleAcp = () => {
    acceptCar()
    window.location.reload()
  }
  //console.log(product)

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell font-baloo-2">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.car_detail.images ? stringToLink(product.car_detail.images) : bg }
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.type} {product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className={`capitalize font-medium ${!product.is_accepted ? 'text-lowblue' : 'text-green-500'}`}>
          {product.is_accepted ? 'Xác nhận' : 'Chờ duyệt'}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`${product.rental_fee} VNĐ/giờ`}</TableCell>
      <TableCell className="hidden md:table-cell">{count}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            {!product.is_accepted && <DropdownMenuItem onClick={() => handleAcp()}>Duyệt</DropdownMenuItem>}
            <DropdownMenuItem onClick={() => handleAction()}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
