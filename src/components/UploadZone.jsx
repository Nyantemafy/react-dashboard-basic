import React, { useState } from 'react';
import { Upload, Download, Trash2, FileText, HelpCircle, CheckCircle2 } from 'lucide-react';
import * as XLSX from 'xlsx';

const UploadZone = ({ onFileUpload, excelData, onClearData }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);

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

    // Fonction pour télécharger un exemple de fichier Excel
    const downloadExampleFile = () => {
        const exampleData = [
            {
                "Project": "Site Vitrine",
                "Client": "ACME",
                "Start Date": "01/01/2025",
                "End Date": "28/02/2025",
                "Status": "Completed",
                "Budget": 5000,
                "Spent": 4800,
                "Progress": 100,
                "Priority": "High",
                "Notes": "Lancé en production"
            },
            {
                "Project": "Dashboard Interne",
                "Client": "Globex",
                "Start Date": "15/02/2025",
                "End Date": "15/05/2025",
                "Status": "Active",
                "Budget": 15000,
                "Spent": 7000,
                "Progress": 45,
                "Priority": "High",
                "Notes": "API en cours"
            },
            {
                "Project": "Refonte UI",
                "Client": "Initech",
                "Start Date": "01/03/2025",
                "End Date": "30/04/2025",
                "Status": "Planned",
                "Budget": 8000,
                "Spent": 0,
                "Progress": 0,
                "Priority": "Medium",
                "Notes": "Design finalisé"
            }
        ];

        const ws = XLSX.utils.json_to_sheet(exampleData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Projets");
        XLSX.writeFile(wb, "exemple-projets.xlsx");
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

                {/* Bouton d'instructions */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowInstructions(!showInstructions)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200"
                    >
                        <HelpCircle size={16} />
                        {showInstructions ? 'Masquer les instructions' : 'Voir le format requis'}
                    </button>
                </div>

                {/* Instructions détaillées */}
                {showInstructions && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 text-left animate-fadeIn">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="text-blue-600" size={20} />
                            <h4 className="text-lg font-semibold text-blue-800">Format requis pour votre fichier Excel</h4>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    Colonnes obligatoires :
                                </h5>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <strong>Project</strong> - Nom du projet
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <strong>Client</strong> - Nom du client
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <strong>Status</strong> - Active, Completed, Planned, On Hold
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <strong>Budget</strong> - Budget total (nombre)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <strong>Spent</strong> - Dépenses (nombre)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <strong>Progress</strong> - Progression (0-100)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <strong>Priority</strong> - High, Medium, Low
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-blue-500" />
                                    Exemple de données :
                                </h5>
                                <div className="bg-white border border-gray-200 rounded-lg p-3 text-xs">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="p-1 text-left">Project</th>
                                                <th className="p-1 text-left">Status</th>
                                                <th className="p-1 text-left">Budget</th>
                                                <th className="p-1 text-left">Progress</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="p-1">Site Vitrine</td>
                                                <td className="p-1">Active</td>
                                                <td className="p-1">5000</td>
                                                <td className="p-1">45</td>
                                            </tr>
                                            <tr>
                                                <td className="p-1">App Mobile</td>
                                                <td className="p-1">Completed</td>
                                                <td className="p-1">15000</td>
                                                <td className="p-1">100</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <button
                                    onClick={downloadExampleFile}
                                    className="w-full mt-3 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <Download size={16} />
                                    Télécharger un exemple
                                </button>
                            </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-700">
                                <strong>💡 Conseil :</strong> La première ligne de votre fichier doit contenir les noms de colonnes. 
                                Les données doivent commencer à partir de la deuxième ligne.
                            </p>
                        </div>
                    </div>
                )}

                {/* Zone de téléchargement principale */}
                <div className="space-y-4">
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
                    
                    <div className="text-xs text-gray-500">
                        <p>Formats acceptés: .xlsx, .xls • Taille max: 10MB</p>
                    </div>
                </div>

                {/* Feedback après import */}
                {excelData && (
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium animate-fadeIn">
                        <Download size={16} />
                        {excelData.length} projets importés avec succès
                        <button 
                            onClick={onClearData}
                            className="ml-2 p-1 hover:bg-green-200 rounded transition-colors"
                            title="Supprimer les données"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                )}

                {/* Message drag & drop */}
                {isDragging && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
                            <Upload size={48} className="text-indigo-600 mx-auto mb-4" />
                            <p className="text-xl font-semibold text-gray-800">Déposez votre fichier Excel ici</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Styles CSS pour l'animation */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default UploadZone;