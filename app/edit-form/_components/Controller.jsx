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


function Controller({ selectedTheme }) {
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
                    <div className='w-full h-[80px] cursor-pointer rounded-lg hover: border-2 hover:border-black flex justify-center items-center' style={{ background: bg.gradient }}>
                        {index == 0 && 'None'}
                    </div>
                ))}

            </div>
            <Button variant='ghost' size='sm' className='w-full my-6'
                onClick={() => setShowMore(showMore > 6 ? 6 : 20)}>
                {showMore > 6 ? 'Show Less' : 'Show More'}
            </Button>

        </div>
    )
}

export default Controller