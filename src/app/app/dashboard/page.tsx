"use client";

import { useAppStore } from "@/lib/store";
import { BRANDS, DASHBOARD_STATS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ShieldCheck, Target, Clock } from "lucide-react";

function SnapshotCard({ title, value, icon: Icon, unit = '' }: { title: string; value: string | number; icon: React.ElementType; unit?: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}{unit}</div>
            </CardContent>
        </Card>
    );
}

export default function DashboardPage() {
    // 1. Get the selected brand ID from our global store
    const { selectedBrandId } = useAppStore();
    
    // 2. Find the actual brand name (fallback to first brand if not found)
    const currentBrand = BRANDS.find(b => b.id === selectedBrandId) || BRANDS[0];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">
                {currentBrand.name} Snapshot
            </h1>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <SnapshotCard
                    title="AI Visibility Score"
                    value={DASHBOARD_STATS.aiVisibility}
                    icon={Activity}
                    unit="%"
                />
                <SnapshotCard
                    title="Trust / E-E-A-T Score"
                    value={DASHBOARD_STATS.trustScore}
                    icon={ShieldCheck}
                    unit="/100"
                />
                <SnapshotCard
                    title="Keyword Coverage"
                    value={DASHBOARD_STATS.keywordCoverage}
                    icon={Target}
                    unit="%"
                />
                <SnapshotCard
                    title="Last Audit"
                    value="2h ago"
                    icon={Clock}
                />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Welcome to your Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                    This is a high-level overview of <span className="font-semibold text-slate-900 dark:text-white">{currentBrand.name}&apos;s</span> performance in the AI search landscape. Use the navigation on the left to dive deeper into specific audit modules or explore the system architecture.
                </p>
              </CardContent>
            </Card>
        </div>
    );
}