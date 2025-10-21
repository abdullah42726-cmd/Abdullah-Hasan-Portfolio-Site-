import React, { useState, useEffect, useRef } from 'react';
import { Service } from '../types';

interface ServiceEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (service: Service) => void;
    serviceData: Service | null;
}

const ServiceEditorModal: React.FC<ServiceEditorModalProps> = ({ isOpen, onClose, onSave, serviceData }) => {
    const initialServiceState: Service = {
        title: '',
        description: '',
        imageUrl: '',
        content: '',
    };

    const [service, setService] = useState<Service>(initialServiceState);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (serviceData) {
            setService(serviceData);
        } else {
            setService(initialServiceState);
        }
    }, [serviceData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setService(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(service);
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div ref={modalRef} className="bg-slate-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto text-white">
                <form onSubmit={handleSubmit}>
                    <div className="sticky top-0 bg-slate-800 z-10 px-6 py-4 border-b border-slate-700">
                        <h2 className="text-2xl font-bold">{serviceData ? 'Edit Service' : 'Create New Service'}</h2>
                    </div>
                    <div className="p-6">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                            <input type="text" name="title" id="title" value={service.title} onChange={handleChange} className="w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 bg-slate-700 text-white" required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                            <input type="text" name="imageUrl" id="imageUrl" value={service.imageUrl} onChange={handleChange} className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white" placeholder="https://example.com/image.png" />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Short Description (for card)</label>
                            <textarea name="description" id="description" value={service.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 bg-slate-700 text-white" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-1">Full Content (for service page)</label>
                            <textarea name="content" id="content" value={service.content} onChange={handleChange} rows={8} className="w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 bg-slate-700 text-white" />
                        </div>
                    </div>

                    <div className="bg-slate-900/50 px-6 py-3 flex justify-end space-x-3 sticky bottom-0 border-t border-slate-700">
                        <button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 border border-slate-500 rounded-md shadow-sm text-sm font-medium text-white hover:bg-slate-500">Cancel</button>
                        <button type="submit" className="bg-brand-blue-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-brand-blue-600">{serviceData ? 'Update Service' : 'Save Service'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceEditorModal;