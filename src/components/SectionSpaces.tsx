import React from 'react'
import { spaces } from '@/lib/constantes'
import Space from '@/components/Space'

export default function SectionSpaces() {
  return (
    <div className='space-y-10 '>
        {spaces.map((space)=>(
            <Space key={space.title} {...space} />
        ))}
    </div>
  )
}
