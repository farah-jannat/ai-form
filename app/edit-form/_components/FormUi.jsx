import { Input } from '@/components/ui/input'
import React from 'react'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function FormUi({ jsonForm }) {
    return (
        <div className='border p-5 md:w-[600px]'>
            <h2 className='font-bold text-center text-2xl'>{jsonForm.formTitle}</h2>
            <h2 className='text-sm text-gray-400 text-center'>{jsonForm.formHeading}</h2>

            {jsonForm?.fields?.map((field, index) => (
                <div key={index}>

                    {field.fieldType == 'select' ?
                        <div className='my-3'>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={field.label} />
                                </SelectTrigger>
                                <SelectContent>
                                    {field.options.map((item, index) => (
                                        <SelectItem key={index} value="light">{item}</SelectItem>
                                    ))}


                                </SelectContent>
                            </Select>
                        </div>
                        : field.fieldType == 'radio' ?
                            <div>

                                <RadioGroup defaultValue="option-one">
                                    {field.options.map((item, index) => (
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="option-one" id="option-one" />
                                            <Label htmlFor="option-one">Option One</Label>
                                        </div>
                                    ))}


                                </RadioGroup>

                            </div>


                            : < div className='my-3'>
                                <label className='text-xs text-gray-500'>{field.label}</label>
                                <Input type={field?.type}
                                    placeholder={field?.placeholder}
                                // name={field?.fieldName}
                                />
                            </div>
                    }
                </div>

            ))
            }
        </div >
    )
}

export default FormUi