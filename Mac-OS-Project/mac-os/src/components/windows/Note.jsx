import React, { useEffect,useState } from 'react'
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import MacWindow from './MacWindow'
import "./note.scss"


const Note = ({ windowName, setWindowsState }) => {
    const assetBase = import.meta.env.BASE_URL.endsWith("/")
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`

    const [ markdown, setMarkdown ] = useState(null)

    useEffect(() => {
        fetch(`${assetBase}note.txt`)
            .then(res => res.text())
            .then(text => setMarkdown(text))
    }, [assetBase])

    return (
        <MacWindow windowName={windowName} setWindowsState={setWindowsState} >
            <div className="note-window">
                { markdown ? <SyntaxHighlighter language='typescript' style={atelierDuneDark} >{markdown}</SyntaxHighlighter> : <p>Loading...</p> }
            </div>
        </MacWindow>
    )
}

export default Note
