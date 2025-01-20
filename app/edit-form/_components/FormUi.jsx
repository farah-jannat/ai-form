'use client'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

import { Checkbox } from "@/components/ui/checkbox"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FieldEdit from './FieldEdit'

function FormUi({ jsonForm, onFieldUpdate, deleteField, selectedTheme, editable = true, selectedStyle }) {

    const [formData, setFormData] = useState();
    const handleInputChange = (event) => {
        const { name, value } = event.target
        // console.log('name of and value', name, value)

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const onFormSubmit = (event) => {
        console.log('fomdata', formData)
        event.preventDefault();
    }



    return (
        <form
            onSubmit={onFormSubmit}
            className='border p-5 md:w-[600px] rounded-lg' data-theme={selectedTheme} style={

                {
                    boxShadow: selectedStyle?.key == 'boxshadow' && '5px 5px 0px black',
                    border: selectedStyle?.key == 'border' && selectedStyle.value
                }
            }>
            <h2 className='font-bold text-center text-2xl'>{jsonForm.formTitle}</h2>
            <h2 className='text-sm text-gray-400 text-center'>{jsonForm.formHeading}</h2>

            {jsonForm?.fields?.map((field, index) => (
                <div key={index} className='flex items-center gap-2'>

                    {field.fieldType == 'select' ?
                        <div className='my-3 w-full'>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={field.label} />
                                </SelectTrigger>
                                <SelectContent>
                                    {field.options.map((item, index) => (
                                        <SelectItem key={index} value={item}>{item}</SelectItem>
                                    ))}


                                </SelectContent>
                            </Select>
                        </div>
                        : field.fieldType == 'checkbox' ?
                            <div className='my-3 w-full'>
                                <label className='text-xs text-gray-500'>{field.label}</label>
                                {field?.options ? field?.options?.map((item, index) => (
                                    <div key={index} className='flex gap-2'>
                                        <Checkbox required={field?.required} />
                                        <h2>{item}</h2>

                                    </div>

                                ))
                                    :

                                    <div className='flex  items-center gap-2'>
                                        <Checkbox />
                                        <h2>{field.label}</h2>
                                    </div>
                                }
                            </div>
                            : field.fieldType == "radiogroup" ?
                                <div className='w-full'>
                                    <label className='text-xs text-gray-500'>{field.label}</label>

                                    <RadioGroup required={field?.required}>
                                        {field?.options?.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <RadioGroupItem value={item} id={item} />
                                                <Label htmlFor={item}>{item}</Label>
                                            </div>
                                        ))}


                                    </RadioGroup>

                                </div>


                                : < div className='my-3 w-full' >
                                    <label className='text-xs text-gray-500'>{field.label}</label>
                                    <Input type={field?.type}
                                        placeholder={field?.placeholder}
                                        required={field?.required}
                                        name={field?.fieldName}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                    }
                    {editable && <div><FieldEdit defaultValue={field}
                        onUpdate={(value) => onFieldUpdate(value, index)}
                        deleteField={() => deleteField(index)}

                    /></div>}
                </div>

            ))}
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    )
}

export default FormUi