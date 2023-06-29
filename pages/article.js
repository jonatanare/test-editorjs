import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Blocks from 'editorjs-blocks-react-renderer';
import { useForm, Controller } from "react-hook-form"

const EditorComponent = dynamic( () => import('../components/EditorCompoenent').then((module) => module.default),
{ssr: false} 
);

export default function Article() {
    const [contentData, setContentDate] = useState()

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
      } = useForm()

      const onSubmit = ({title}) => console.log(title, contentData)


  return (
    <main className='container pt-5'>
        <section className="row">
            <div className="col-8 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className='card p-3'>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" class="form-label">Titulo</label>
                        <input type="text" className="form-control" {...register('title', { required: 'Campo requerido'})} />
                        {
                            errors.title && (
                                <span className='mt-1 text-danger'>{errors.title.message}</span>
                            )
                        }
                    </div>
                    <div className="mb-3">
                        <EditorComponent getData={setContentDate} />
                        {
                            contentData?.blocks.length <= 0 || contentData?.blocks === undefined && (
                                <span className='text-danger mt-1'>
                                    Campo requerido
                                </span>
                            )
                        }
                    </div>
                    <button className='btn btn-primary'>Enviar</button>
                </form>
            </div>
        </section>
    </main>
  )
}
