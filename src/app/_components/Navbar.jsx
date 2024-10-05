import { MessageCirclePlus, CalendarHeart, BookCheck, PhoneCall } from 'lucide-react'
import Link from 'next/link'

export const Navbar = ({ }) => {
    return (
        <div className="flex justify-center items-center w-24 h-screen">
          <div className="flex flex-col justify-evenly items-center w-full h-96 bg-joy-pink rounded-full">
            <Link 
                className='flex justify-center items-center w-14 h-14 rounded-full hover:brightness-75 hover:bg-joy-pink-dark hover:shadow-inner duration-300 transition-all' 
                href='chat'
            >
                <MessageCirclePlus size={35} color='#826a5c' />
            </Link>
            <Link 
                className='flex justify-center items-center w-14 h-14 rounded-full hover:brightness-75 hover:bg-joy-pink-dark hover:shadow-inner duration-300 transition-all' 
                href='chat'
            >
                <CalendarHeart size={35} color='#826a5c' />
            </Link>
            <Link 
                className='flex justify-center items-center w-14 h-14 rounded-full hover:brightness-75 hover:bg-joy-pink-dark hover:shadow-inner duration-300 transition-all' 
                href='chat'
            >
                <BookCheck size={35} color='#826a5c' />
            </Link>
            <Link 
                className='flex justify-center items-center w-14 h-14 rounded-full hover:brightness-75 hover:bg-joy-pink-dark hover:shadow-inner duration-300 transition-all' 
                href='chat'
            >
                <PhoneCall size={35} color='#826a5c' />
            </Link>
          </div>
        </div>
    )
}