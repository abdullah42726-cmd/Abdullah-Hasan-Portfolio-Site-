import React, { useEffect, useRef } from 'react';
import { Message } from '../types';

interface MessageViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: Message | null;
}

const MessageViewerModal: React.FC<MessageViewerModalProps> = ({ isOpen, onClose, message }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !message) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-viewer-title"
        >
            <div ref={modalRef} className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl text-white">
                <div className="px-6 py-4 border-b border-slate-700">
                    <h2 id="message-viewer-title" className="text-xl font-bold truncate">Message from {message.name}</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex flex-wrap text-sm">
                        <span className="font-semibold text-slate-400 w-24">From:</span>
                        <span className="text-slate-200">{message.name} &lt;{message.email}&gt;</span>
                    </div>
                    <div className="flex flex-wrap text-sm">
                        <span className="font-semibold text-slate-400 w-24">Received:</span>
                        <span className="text-slate-300">{new Date(message.date).toLocaleString()}</span>
                    </div>
                    <div className="pt-4 border-t border-slate-700">
                        <p className="text-slate-300 whitespace-pre-wrap">{message.message}</p>
                    </div>
                </div>
                <div className="bg-slate-900/50 px-6 py-3 flex justify-end border-t border-slate-700">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="bg-slate-600 py-2 px-4 border border-slate-500 rounded-md shadow-sm text-sm font-medium text-white hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-blue-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageViewerModal;