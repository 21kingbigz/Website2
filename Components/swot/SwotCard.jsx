import React from 'react';
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Lightbulb, AlertTriangle } from "lucide-react";

const cardConfig = {
    strengths: {
        title: "Strengths",
        icon: TrendingUp,
        gradient: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        iconBg: "bg-emerald-100",
    },
    weaknesses: {
        title: "Weaknesses",
        icon: TrendingDown,
        gradient: "from-rose-500 to-pink-600",
        bg: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-700",
        iconBg: "bg-rose-100",
    },
    opportunities: {
        title: "Opportunities",
        icon: Lightbulb,
        gradient: "from-amber-500 to-orange-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        iconBg: "bg-amber-100",
    },
    threats: {
        title: "Threats",
        icon: AlertTriangle,
        gradient: "from-slate-600 to-slate-800",
        bg: "bg-slate-50",
        border: "border-slate-200",
        text: "text-slate-700",
        iconBg: "bg-slate-200",
    },
};

export default function SwotCard({ type, items, delay = 0 }) {
    const config = cardConfig[type];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            className={`rounded-2xl border ${config.border} ${config.bg} p-6 h-full`}
        >
            <div className="flex items-center gap-3 mb-5">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className={`text-lg font-bold ${config.text}`}>
                    {config.title}
                </h3>
            </div>

            <ul className="space-y-3">
                {items?.map((item, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: delay + 0.1 + index * 0.05 }}
                        className="flex items-start gap-3"
                    >
                        <span className={`mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-br ${config.gradient} flex-shrink-0`} />
                        <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}
