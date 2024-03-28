import React from 'react'
import { useRef, useEffect } from 'react'

const CategoryForm = ({ handleSubmit, categoryName, setCategoryName }) => {
    const categoryRef = useRef()

    useEffect(() => {
        categoryRef.current.focus()
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mt-3">
                    <input name="category"
                        type="text"
                        className="form-control"
                        id="exampleInputEmail"
                        placeholder='Enter Category Name'
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        ref={categoryRef}
                    />
                    <label htmlFor="exampleInputEmail">Enter Category Name</label>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Save</button>
            </form>


        </>
    )
}

export default CategoryForm
