import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Themes from '@/app/_data/Themes'
import GradientBg from '@/app/_data/GradientBg'
import Style from '@/app/_data/Style'
import { index } from 'drizzle-orm/mysql-core'


function Controller({ selectedTheme, selectedBg, selectedItem, setSelectedItem, selectedStyle, selectedBorder, setSelectedBorder }) {
    const [showMore, setShowMore] = useState(6)
    return (
        <div>

            {/* {theme selction controller} */}
            <h2 className='my-1'>Themes</h2>
            <Select onValueChange={(value) => selectedTheme(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Themes" />
                </SelectTrigger>
                <SelectContent>
                    {Themes.map((theme, index) => (
                        <SelectItem key={index} value={theme.theme}>
                            <div className='flex gap-3'>
                                <div className='flex '>
                                    <div className='h-5 w-5 rounded-l-md' style={{ backgroundColor: theme.primary }}>

                                    </div>
                                    <div className='h-5 w-5' style={{ backgroundColor: theme.secondary }}>

                                    </div>
                                    <div className='h-5 w-5' style={{ backgroundColor: theme.accent }}>

                                    </div>
                                    <div className='h-5 w-5 rounded-r-md' style={{ backgroundColor: theme.neutral }}>

                                    </div>
                                </div>
                                {theme.theme}
                            </div>

                        </SelectItem>

                    ))}


                </SelectContent>
            </Select>

            {/* {background selction controller} */}

            <h2 className='mt-8 my-1'> Background Themes</h2>
            <div className='grid grid-cols-3 gap-5'>
                {GradientBg.map((bg, index) => (index < showMore) && (
                    <div key={index} value={bg.gradient}
                        className='w-full h-[80px] cursor-pointer rounded-lg 
                        hover:border-2 hover:border-black flex justify-center items-center'
                        style={{
                            background: bg.gradient,
                            border: index == selectedItem ? '1px solid black' : ''

                        }}

                        onClick={() => {
                            setSelectedItem(index)

                            selectedBg(bg.gradient)
                        }}
                    >
                        {index == 0 && 'None'}

                    </div>
                ))}
            </div>
            <Button variant='ghost' size='sm' className='w-full my-6'
                onClick={() => setShowMore(showMore > 6 ? 6 : 20)}>
                {showMore > 6 ? 'Show Less' : 'Show More'}
            </Button>

            {/* {style selction controller}  */}
            <h2 className='mt-8 my-1'> Styles </h2>
            <div className='grid grid-cols-3 gap-5'>
                {Style.map((item, index) => (
                    <div key={index}>
                        <div className='cursor-pointer hover:border-2 rounded-lg '

                            style={{
                                border: index == selectedBorder ? '1px solid black' : ''
                            }}

                            onClick={() => {
                                selectedStyle(item)
                                setSelectedBorder(index)
                            }}>

                            <img src={item.name} width={600} height={80} className='rounded-lg' />
                        </div>
                        <h2> {item.name}</h2>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Controller