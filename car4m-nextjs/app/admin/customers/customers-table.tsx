'use client'

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Customers } from './customers';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { acceptedCar, deleteCar, fetchAllCar, fetchAllCarAcp, fetchCarAccept } from '@/app/services/CarServices';
import { fetchAllUser } from '@/app/services/UserServices';

type CarProps = {
  type: string
  name: string
  image: string
  status: number
  rental_fee: number

}

export function CustomersTable({ offset }: { offset: number }) {
  const [total, setTotal] = useState(0)
  const [items, setItem] = useState<any[]>([])

  let router = useRouter();
  let productsPerPage = 5;

  function prevPage() {
    router.back();
  }
  function nextPage() {
    router.push(`/admin/?admin=customers&offset=${offset + 5}`, { scroll: false })
  }

  const getAllUser = async (no: number) => {
    try {
      const respone = await fetchAllUser(no)
      setItem(respone.data.content)
      setTotal(respone.data.totalElements)
    } catch (error) {
      console.log("Loi khi lay du lieu nguoi dung", error)
    }
  }

  useEffect(() => {
    getAllUser(offset/5)
  }, [offset])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>
          Danh sách người dùng
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead >
              Số xe
              </TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((customer) => (
              <Customers customer={customer} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset + 5 - productsPerPage, total) + 1)}-{Math.min(offset + 5, total)}
            </strong>{' '}
            of <strong>{total}</strong> users
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > total}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
