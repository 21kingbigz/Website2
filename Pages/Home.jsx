import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BarChart3 } from 'lucide-react';
import CompanyInputForm from '@/components/swot/CompanyInputForm';
import SwotGrid from '@/components/swot/SwotGrid';
import AnalysisHistory from '@/components/swot/AnalysisHistory';

export default function Home() {
    const [currentAnalysis, setCurrentAnalysis] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const queryClient = useQueryClient();

    const { data: analyses = [] } = useQuery({
        queryKey: ['swotAnalyses'],
        queryFn: () => base44.entities.SwotAnalysis.list('-created_date', 20),
    });

    const createAnalysisMutation = useMutation({
        mutationFn: (data) => base44.entities.SwotAnalysis.create(data),
        onSuccess: (newAnalysis) => {
            queryClient.invalidateQueries({ queryKey: ['swotAnalyses'] });
            setCurrentAnalysis(newAnalysis);
            setIsGenerating(false);
        },
    });

    const handleSubmit = async ({ companyType, details }) => {
        setIsGenerating(true);
        
        const prompt = `Generate a comprehensive SWOT analysis for a ${companyType} company.
${details ? `Additional context: ${details}` : ''}

Provide detailed, specific, and actionable insights for each category. 
Each point should be practical and relevant to this type of business.
Provide 4-6 points for each category.`;

        const result = await base44.integrations.Core.InvokeLLM({
            prompt,
            response_json_schema: {
                type: "object",
                properties: {
                    strengths: {
                        type: "array",
                        items: { type: "string" },
                        description: "Internal positive attributes and advantages"
                    },
                    weaknesses: {
                        type: "array",
                        items: { type: "string" },
                        description: "Internal negative attributes and limitations"
                    },
                    opportunities: {
                        type: "array",
                        items: { type: "string" },
                        description: "External factors that could be advantageous"
                    },
                    threats: {
                        type: "array",
                        items: { type: "string" },
                        description: "External factors that could cause problems"
                    }
                }
            }
        });

        createAnalysisMutation.mutate({
            company_type: companyType,
            company_details: details,
            strengths: result.strengths,
            weaknesses: result.weaknesses,
            opportunities: result.opportunities,
            threats: result.threats
        });
    };

    const handleNewAnalysis = () => {
        setCurrentAnalysis(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            {/* Header */}
            <header className="pt-12 pb-8 px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
                        <Sparkles className="h-4 w-4" />
                        AI-Powered Analysis
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        SWOT Analysis
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Get instant strategic insights for your business with AI-generated 
                        strengths, weaknesses, opportunities, and threats analysis.
                    </p>
                </motion.div>
            </header>

            {/* Main Content */}
            <main className="px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        {!currentAnalysis ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                            >
                                <div className="lg:col-span-2">
                                    <CompanyInputForm 
                                        onSubmit={handleSubmit} 
                                        isLoading={isGenerating} 
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <AnalysisHistory 
                                        analyses={analyses} 
                                        onSelect={setCurrentAnalysis}
                                        selectedId={null}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <SwotGrid 
                                    analysis={currentAnalysis} 
                                    onNewAnalysis={handleNewAnalysis}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer accent */}
            <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-rose-500" />
        </div>
    );
}
