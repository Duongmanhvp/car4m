'use client'

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import axios from '@/app/services/api';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

import icon from '@/app/assets/imgs/placeholder-user.webp'
import { useRouter } from 'next/navigation';

export async function User() {
  const router = useRouter()
  const handleLogout = async () => {
    const accessToken = localStorage.getItem('access_token')
    try {
      const response = await axios.post('/api/v1/auths/logout', {
        token: accessToken
      })

      if (response) {
        localStorage.clear()
        router.push('/home')
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border border-line overflow-hidden rounded-full"
        >
          <Image
            src={icon}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {!false ? (
          <DropdownMenuItem>

            <button onClick={() => handleLogout()} type="submit">Sign Out</button>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
