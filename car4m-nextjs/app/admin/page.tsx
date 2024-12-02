'use client'

import Link from 'next/link';
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2
} from 'lucide-react';

import Image from 'next/image';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { User } from './cars/user';
import { VercelLogo } from '@/components/icons';
import Providers from './cars/providers';
import { NavItem } from './cars/nav-item';
import { SearchInput } from './cars/search';
import ProductsPage from './cars/page';

import { useSearchParams } from 'next/navigation';

import logo from '@/app/assets/imgs/Frame.svg'
import Dashboard from './dashboard/page';
import { useState } from 'react';
import Cars from './cars/page';
import Customers from './customers/page';

export default function Admin() {
  const params = useSearchParams().get('admin')
  const renderAdmin = () => {
    switch (params) {
      case 'cars':
          return <Cars/>
      case 'customers':
          return <Customers/>
      default:
        return <Dashboard/>
    }
  }

  return ( 
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40 font-baloo-2">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex flex-row justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* <MobileNav /> */}
            <DashboardBreadcrumb />
            {/* <SearchInput /> */}
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {/* <ProductsPage></ProductsPage> */}
            {renderAdmin()}
          </main>
        </div>

      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-line bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          {/* <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" /> */}
          <Image src={logo} alt={''} className='w-full h-full relative' />
          <span className="sr-only">Car4m</span>
        </Link>

        <NavItem href="/admin" label="Home">
          <Home className="h-5 w-5" />
        </NavItem>

        <NavItem href="/admin?admin=cars" label="Cars">
          <Package className="h-5 w-5" />
        </NavItem>

        <NavItem href="/admin?admin=customers" label="Customers">
          <Users2 className="h-5 w-5" />
        </NavItem>

        {/* <NavItem href="#" label="Analytics">
          <LineChart className="h-5 w-5" />
        </NavItem> */}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-base font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Car4m</span>
          </Link>
          
          <Link
            href="/dashboard"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground text-[16px]"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            Cars
          </Link>

          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>

          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function DashboardBreadcrumb() {
  const params = useSearchParams().get('admin')
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            {/* <Link href="#">Home</Link> */}
            <BreadcrumbPage>{params == 'cars' ? 'Cars' : params == 'customers' ? "Customers" : 'Home'}</BreadcrumbPage>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
