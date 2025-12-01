import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CompanyInputForm({ onSubmit, isLoading }) {
    const [companyType, setCompanyType] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (companyType.trim()) {
            onSubmit({ companyType, details });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Company Details</h2>
                        <p className="text-slate-500 text-sm">Tell us about your business</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="companyType" className="text-slate-700 font-medium">
                            Company Type / Industry *
                        </Label>
                        <Input
                            id="companyType"
                            placeholder="e.g., E-commerce startup, Restaurant chain, SaaS company..."
                            value={companyType}
                            onChange={(e) => setCompanyType(e.target.value)}
                            className="h-12 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-base"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="details" className="text-slate-700 font-medium">
                            Additional Details <span className="text-slate-400 font-normal">(optional)</span>
                        </Label>
                        <Textarea
                            id="details"
                            placeholder="Tell us more about your company... Size, location, target market, unique offerings, current challenges..."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="min-h-[120px] rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-base resize-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || !companyType.trim()}
                        className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Analyzing...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5" />
                                <span>Generate SWOT Analysis</span>
                            </div>
                        )}
                    </Button>
                </form>
            </div>
        </motion.div>
    );
}
