import React, { useEffect, useRef } from 'react'
import { patchData } from '../../ultils/FetchData'

function FormInput({id, socket, rating,setReply,send,name}) {
    const nameRef = useRef()
    const contentRef = useRef()
    
    useEffect(() => {
        if(name) {
            contentRef.current.innerHTML = `
                <a href="#!"
                    style="color: crimson";
                    font-weight: 600;
                    text-reansform: capitatlize;
                >${name}: </a>
            `
        }
    },[name])


    const commentClick = () => {
        const username = nameRef.current.value
        const content = contentRef.current.innerHTML
   
        if(!username.trim()) return alert('Không được để trống tên.')
        
        if(contentRef.current.textContent.trim().length < 20)
            return alert('Nội dung quá ngắn, nội dung lớn hơn 20 kí tự!')
    
        const createdAt = new Date().toISOString()

        socket.emit('createComment', {
            username, content, product_id: id,createdAt , rating, send 
        })

        if(rating && rating !== 0) {
            patchData(`/api/products/${id}`, {rating})
        }

        contentRef.current.innerHTML = "";

        if(setReply) setReply(false)
    }
    return (
        <div className="form_input">
            <p>Tên</p>
            <input type="text" ref={nameRef} />
            
            <p>Nội dung</p>
            <div 
                ref={contentRef}
                contentEditable="true"
                style={{
                    height: '100px',
                    border: '1px solid #ccc',
                    padding: '5px 10px',
                    outline: 'none'
                }}
            
            />

            <button onClick={commentClick}>Gửi</button>
        </div>
    )
}

export default FormInput
