import React, { useState } from 'react';
import { Upload, Download, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';

const UploadZone = ({ onFileUpload, excelData, onClearData }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            onFileUpload(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
            handleFileUpload(file);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) handleFileUpload(file);
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-dashed border-indigo-300 hover:border-indigo-500 transition-all duration-300">
            <div 
                className={`text-center ${isDragging ? 'scale-105' : ''} transition-transform duration-300`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
                    <Upload size={48} className="text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Importez vos données de projets Excel
                </h3>
                <p className="text-gray-600 mb-6">
                    Glissez-déposez votre fichier .xlsx ou .xls contenant vos données de projets
                </p>
                <label className="inline-block">
                    <input 
                        type="file" 
                        accept=".xlsx,.xls" 
                        onChange={handleFileInput}
                        className="hidden"
                    />
                    <span className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block">
                        Choisir un fichier
                    </span>
                </label>
                {excelData && (
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                        <Download size={16} />
                        {excelData.length} projets importés
                        <button 
                            onClick={onClearData}
                            className="ml-2 p-1 hover:bg-green-200 rounded transition-colors"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadZone;