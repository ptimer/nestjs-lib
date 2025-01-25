"use client"

import { adminSideBarLinks } from '@/constants'
import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Session } from 'next-auth'

const Sidebar = ({
    session
}: {
    session: Session
}) => {
    const pathname = usePathname();

    return (
        <div className="admin-sidebar">
            <div className="logo">
                <Image
                    src="/icons/admin/logo.svg"
                    alt="admin-logo"
                    height={37}
                    width={37}
                /> 
                <h1>BookWise</h1>
            </div>

            <div className="mt-10 flex flex-col gap-5">
                {adminSideBarLinks.map(({ route, img, text }) => {
                    const isSelected = (
                        pathname !== "/admin" 
                        && pathname.includes(route)
                        && route.length > 1
                    ) || pathname === route;

                    return (
                        <Link href={route} className="link" key={route}>
                            <div className={cn(
                                "link",
                                isSelected && "bg-primary-admin shadow-sm"
                            )}>
                                <div className="relative size-5">
                                    <Image 
                                        src={img}
                                        fill
                                        alt="icon"
                                        className={`${isSelected ? "brightness-0 invert" : ""} object-contain`}
                                    />
                                </div>

                                <p className={cn(isSelected ? "text-white" : "text-dark")}>{text}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className="user">
                <Avatar>
                    <AvatarFallback className="bg-amber-100">
                        { getInitials(session?.user?.name || "IN") }
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col max-md:hidden">
                    <p className="font-semibold text-dark-200">{session?.user?.name}</p>
                    <p className="text-light-500 text-xs">{session?.user?.email}</p>
                </div>
            </div>
        </div>
  )
}

export default Sidebar