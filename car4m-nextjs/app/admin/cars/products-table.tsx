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
import { Product } from './product';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { acceptedCar, deleteCar, fetchAllCar, fetchAllCarAcp, fetchCarAccept } from '@/app/services/CarServices';

type CarProps = {
  type: string
  name: string
  image: string
  status: number
  rental_fee: number

}

export function ProductsTable({ type, offset }: { type: string, offset: number }) {
  const [list, setList] = useState<number[]>([])
  const [total, setTotal] = useState(0)
  const [countAcp, setCountAcp] = useState(0)
  const [countNot, setCountNot] = useState(0)

  let router = useRouter();
  let productsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/admin/?admin=cars&offset=${offset + 5}`, { scroll: false })
  }

  const [items, setItem] = useState<any[]>([])

  const getCarNotAcp = async (no: number) => {
    try {
      const res = await fetchCarAccept(no)
      setItem(res.data.content)
      setTotal(res.data.totalElements)
    } catch (error) {
      console.log('Loi khi lay du lieu car', error)
    }
  }

  const getCarAcp = async (no: number) => {
    try {
      const res = await fetchAllCarAcp(no)
      setItem(res.data.content)
      setTotal(res.data.totalElements)
    } catch (error) {
      console.log('Loi khi lay du lieu car', error)
    }
  }

  useEffect(() => {
    if (type == 'all') {
      getCarAcp(offset / 5)
    }
    if (type == 'active') {
      getCarNotAcp(offset / 5)
    }
  }, [type, offset])

  console.log(offset, type)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cars</CardTitle>
        <CardDescription>
          Quản lý xe của bạn và hiệu suất hoạt động.
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
              <TableHead>Trạng thái</TableHead>
              <TableHead className="hidden md:table-cell">Giá</TableHead>
              <TableHead className="hidden md:table-cell">
                Lượt thuê
              </TableHead>
              <TableHead className="hidden md:table-cell">Quản lý</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((product) => (
              <Product product={product} />
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
            of <strong>{total}</strong> cars
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
