import React from 'react'
import "./dock.scss"

const Dock = ({ windowsState, setWindowsState }) => {
    const assetBase = import.meta.env.BASE_URL.endsWith("/")
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`

    return (
        <footer className='dock' >
            <div
                onClick={() => { setWindowsState(state => ({ ...state, github: true })) }}
                className="icon github"><img src={`${assetBase}doc-icons/github.svg`} alt="" /></div>
            <div
                onClick={() => { setWindowsState(state => ({ ...state, note: true })) }}
                className="icon note"><img src={`${assetBase}doc-icons/note.svg`} alt="" /></div>
            <div
                onClick={() => { setWindowsState(state => ({ ...state, resume: true })) }}
                className="icon pdf"><img src={`${assetBase}doc-icons/pdf.svg`} alt="" /></div>
            <div
                onClick={()=>{window.open("https://calendar.google.com/","_blank")}}
            
             className="icon calender"><img src={`${assetBase}doc-icons/calender.svg`} alt="" /></div>
            <div
                onClick={() => { setWindowsState(state => ({ ...state, spotify: true })) }}
                className="icon spotify"><img src={`${assetBase}doc-icons/spotify.svg`} alt="" /></div>
            <div
            onClick={()=>{window.open("https://mail.google.com/mail/u/0/#inbox","_blank")}}
             className="icon mail"><img src={`${assetBase}doc-icons/mail.svg`} alt="" /></div>
            <div 
            onClick={()=>{window.open("https://www.linkedin.com/in/suzainkhan/","_blank")}}
            
            className="icon link"><img src={`${assetBase}doc-icons/link.svg`} alt="" /></div>
            <div
                onClick={() => { setWindowsState(state => ({ ...state, cli: true })) }}
                className="icon cli"><img src={`${assetBase}doc-icons/cli.svg`} alt="" /></div>
        </footer>
    )
}
export default Dock
