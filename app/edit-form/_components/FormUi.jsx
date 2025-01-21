'use client'
import { Input } from '@/components/ui/input'
import React, { useRef, useState } from 'react'

import { Checkbox } from "@/components/ui/checkbox"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { db } from '@/configs'


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FieldEdit from './FieldEdit'
import { userResponses } from '@/configs/schema'
import moment from 'moment'
import { toast } from 'sonner'

function FormUi({ jsonForm, onFieldUpdate, deleteField, selectedTheme, editable = true, selectedStyle, formId }) {


    const [formData, setFormData] = useState();
    let formRef = useRef();

    const handleInputChange = (event) => {
        const { name, value } = event.target
        // console.log('name of and value', name, value)

        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleCheckboxChange = (fieldName, itemName, value) => {
        // console.log("form handleCheckChange", fieldName, itemName, value)
        const list = formData?.[fieldName] ? formData?.[fieldName] : []
        // console.log('list', list)
        if (value) {
            list.push({
                label: itemName,
                value: value
            })
            setFormData({
                ...formData,
                [fieldName]: list
            })
        } else {
            const result = list.filter((item) => item.label == itemName)
            setFormData({
                ...formData,
                [fieldName]: list
            })
        }
        // console.log('formdata', formData)

    }

    const onFormSubmit = async (event) => {
        console.log('fomdata', formData)
        event.preventDefault();
        const result = await db.insert(userResponses)
            .values({
                jsonResponses: formData,
                createdAt: moment().format('DD/MM/YYYY'),
                formRef: formId
            })
        if (result) {
            formRef.reset();
            toast('Responses submitted successfully !')

        } else {
            toast('Internal error while saving your form')
        }
    }



    return (
        <form
            ref={(e) => formRef = e}
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
                            <Select required={field?.required} onValueChange={(value) => handleSelectChange(field.fieldName, value)}>
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
                                        <Checkbox required={field?.required} onCheckedChange={(v) => handleCheckboxChange(field.label, item, v)} />
                                        <h2>{item}</h2>

                                    </div>

                                ))
                                    :

                                    <div className='flex  items-center gap-2'>
                                        <Checkbox required={field?.required} />
                                        <h2>{field.label}</h2>
                                    </div>
                                }
                            </div>
                            : field.fieldType == "radiogroup" ?
                                <div className='w-full'>
                                    <label className='text-xs text-gray-500'>{field.label}</label>

                                    <RadioGroup required={field?.required} >
                                        {field?.options?.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <RadioGroupItem value={item} id={item}
                                                    onClick={() => handleSelectChange(field.label, item)}
                                                />
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