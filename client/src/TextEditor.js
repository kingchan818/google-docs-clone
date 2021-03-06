import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const SAVETIME = 3000;

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ direction: 'rtl' }], // text direction
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
];

export default function TextEditor() {
    const { id: docId } = useParams();
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const user = localStorage.getItem('user');

    useEffect(() => {
        const s = io('http://localhost:3001');
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket == null || quill == null) return;
        socket.once('load-doc', (doc) => {
            quill.setContents(doc);
            quill.enable();
        });

        socket.emit('get-doc', docId, user._id);
    }, [socket, quill, docId]);

    useEffect(() => {
        if (socket == null || quill == null) return;
        const eHandler = (delta) => {
            quill.updateContents(delta);
        };
        socket.on('receive-changes', eHandler);

        return () => {
            socket.off('receive-changes', eHandler);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;
        const eHandler = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit('changes', delta);
            console.log('delta', delta);
        };
        quill.on('text-change', eHandler);

        return () => {
            quill.off('text-change', eHandler);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const timer = setInterval(() => {
            socket.emit('save-doc', quill.getContents());
        }, SAVETIME);

        return () => {
            clearInterval(timer);
        };
    }, [socket, quill]);

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;

        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
        const q = new Quill(editor, {
            theme: 'snow',
            modules: { toolbar: toolbarOptions },
        });
        q.disable();
        q.setText('fetching from db...');
        setQuill(q);
    }, []);

    return <div className="container" ref={wrapperRef}></div>;
}
