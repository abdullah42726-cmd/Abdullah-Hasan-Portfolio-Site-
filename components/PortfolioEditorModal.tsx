import React, { useState, useEffect, useRef } from 'react';
import { PortfolioItem } from '../types';
import TrashIcon from './icons/TrashIcon';
import PlusIcon from './icons/PlusIcon';


interface PortfolioEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: PortfolioItem) => void;
    itemData: PortfolioItem | null;
}

const PortfolioEditorModal: React.FC<PortfolioEditorModalProps> = ({ isOpen, onClose, onSave, itemData }) => {
    const initialItemState: PortfolioItem = {
        id: null,
        title: '',
        description: '',
        coverImage: '',
        galleryImages: [],
        category: '',
    };

    const [item, setItem] = useState<PortfolioItem>(initialItemState);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (itemData) {
            setItem({
                ...itemData,
                galleryImages: itemData.galleryImages || [], // Ensure galleryImages is an array
            });
        } else {
            setItem(initialItemState);
        }
    }, [itemData, isOpen]);
    
    const handleMainChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItem(prev => ({ ...prev, [name]: value }));
    };
    
    const handleGalleryImageChange = (index: number, value: string) => {
        const newImages = [...item.galleryImages];
        newImages[index] = value;
        setItem(prev => ({ ...prev, galleryImages: newImages }));
    };

    const handleAddGalleryImage = () => {
        setItem(prev => ({ ...prev, galleryImages: [...prev.galleryImages, ''] }));
    };

    const handleRemoveGalleryImage = (indexToRemove: number) => {
        const newImages = item.galleryImages.filter((_, index) => index !== indexToRemove);
        setItem(prev => ({ ...prev, galleryImages: newImages }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalItem = {
            ...item,
            galleryImages: item.galleryImages.filter(img => img && img.trim() !== ''),
        };
        onSave(finalItem);
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
            <div ref={modalRef} className="bg-slate-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col text-white">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <div className="sticky top-0 bg-slate-800 z-10 p-6 border-b border-slate-700">
                        <h2 className="text-2xl font-bold">{itemData ? 'Edit Portfolio Item' : 'Create New Portfolio Item'}</h2>
                    </div>
                    <div className="p-6 overflow-y-auto">
                        
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                            <input type="text" name="title" id="title" value={item.title} onChange={handleMainChange} className="w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 bg-slate-700 text-white" required />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                            <textarea name="description" id="description" value={item.description} onChange={handleMainChange} rows={5} className="w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 bg-slate-700 text-white" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="coverImage" className="block text-sm font-medium text-slate-300 mb-1">Cover Image URL</label>
                            <input
                                type="text"
                                name="coverImage"
                                id="coverImage"
                                value={item.coverImage}
                                onChange={handleMainChange}
                                className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white"
                                placeholder="https://example.com/cover-image.png"
                                required
                            />
                        </div>

                        <div className="mb-4">
                             <label className="block text-sm font-medium text-slate-300 mb-2">Gallery Images</label>
                             <div className="space-y-3">
                                {item.galleryImages.map((imgUrl, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            value={imgUrl}
                                            onChange={(e) => handleGalleryImageChange(index, e.target.value)}
                                            className="flex-grow px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white"
                                            placeholder="https://example.com/gallery-image.png"
                                        />
                                        <button type="button" onClick={() => handleRemoveGalleryImage(index)} className="text-red-500 hover:text-red-400">
                                            <TrashIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                ))}
                             </div>
                             <button type="button" onClick={handleAddGalleryImage} className="mt-3 text-sm font-semibold text-brand-blue-400 hover:text-brand-blue-300 flex items-center space-x-1">
                                <PlusIcon className="w-4 h-4" />
                                <span>Add Gallery Image</span>
                             </button>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                            <input type="text" name="category" id="category" value={item.category} onChange={handleMainChange} className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white" />
                        </div>
                    </div>

                    <div className="bg-slate-900/50 px-6 py-3 flex justify-end space-x-3 mt-auto border-t border-slate-700 sticky bottom-0">
                        <button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 border border-slate-500 rounded-md shadow-sm text-sm font-medium text-white hover:bg-slate-500">Cancel</button>
                        <button type="submit" className="bg-brand-blue-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-brand-blue-600">{itemData ? 'Update Item' : 'Save Item'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PortfolioEditorModal;