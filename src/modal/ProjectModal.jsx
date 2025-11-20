import { ExternalLink, Target, Wrench, XCircle } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 flex justify-between items-center">
                    <h2 className="text-3xl font-bold">{project.title}</h2>
                    <button onClick={onClose} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                        <XCircle size={24} />
                    </button>
                </div>
                
                <div className="p-8 space-y-8">
                    <div className="group">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <Target className="mr-3 text-gray-700 group-hover:scale-110 transition-transform duration-300" size={24} />
                            Objectif du projet
                        </h3>
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-200 group-hover:border-gray-300 transition-all duration-300">{project.objective}</p>
                    </div>
                    
                    <div className="group">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <Wrench className="mr-3 text-gray-600 group-hover:scale-110 transition-transform duration-300" size={24} />
                            Technologies utilisées
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium border border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition-all duration-300 transform hover:scale-105">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="group">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:translate-x-1 transition-transform duration-300">Fonctionnalités principales</h3>
                        <ul className="space-y-3">
                            {project.features.map((feature, index) => (
                                <li key={index} className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                    <span className="text-gray-700 mr-3 mt-1 group-hover/item:scale-110 transition-transform duration-300">✓</span>
                                    <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="group">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:translate-x-1 transition-transform duration-300">Défis relevés</h3>
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-200 group-hover:border-gray-300 transition-all duration-300">{project.challenges}</p>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 group/btn"
                        >
                            Voir le projet en ligne
                            <ExternalLink className="ml-3 group-hover/btn:scale-110 transition-transform duration-300" size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;