import { Head, Link } from '@inertiajs/react';
import {
    BarChart3,
    ClipboardList,
    Clock,
    FileText,
    GraduationCap,
    UserCheck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard } from '@/routes';

type Summary = {
    total_registrations: number;
    submitted_this_month: number;
    pending_review: number;
    degree_pathways: number;
};

type StatusBreakdown = {
    status: string;
    count: number;
};

type TopProgram = {
    program: string;
    count: number;
};

type RecentRegistration = {
    id: number;
    applicant_name: string;
    first_priority: string;
    status: string;
    submitted_at: string | null;
    documents_count: number;
};

function formatDate(value: string | null) {
    if (!value) {
        return 'Not recorded';
    }

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(value));
}

function statusLabel(status: string) {
    return status.replaceAll('_', ' ');
}

function percentage(value: number, total: number) {
    if (total === 0) {
        return 0;
    }

    return Math.round((value / total) * 100);
}

export default function Dashboard({
    summary,
    status_breakdown: statusBreakdown,
    top_programs: topPrograms,
    recent_registrations: recentRegistrations,
}: {
    summary: Summary;
    status_breakdown: StatusBreakdown[];
    top_programs: TopProgram[];
    recent_registrations: RecentRegistration[];
}) {
    const statCards = [
        {
            label: 'Total registrations',
            value: summary.total_registrations,
            detail: 'Applications received',
            icon: ClipboardList,
            className:
                'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
        },
        {
            label: 'This month',
            value: summary.submitted_this_month,
            detail: 'New submissions',
            icon: Clock,
            className:
                'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
        },
        {
            label: 'Pending review',
            value: summary.pending_review,
            detail: 'Submitted applications',
            icon: UserCheck,
            className:
                'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
        },
        {
            label: 'Degree pathways',
            value: summary.degree_pathways,
            detail: 'Selected first priorities',
            icon: GraduationCap,
            className:
                'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-normal">
                            ETEEAP Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Monitor incoming applications and review workload.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/registrations">
                            <ClipboardList />
                            View registrations
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((item) => (
                        <Card key={item.label}>
                            <CardContent className="flex items-center justify-between gap-4 p-6">
                                <div className="min-w-0">
                                    <p className="text-sm text-muted-foreground">
                                        {item.label}
                                    </p>
                                    <p className="mt-2 text-3xl font-semibold">
                                        {item.value}
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {item.detail}
                                    </p>
                                </div>
                                <span
                                    className={`flex size-11 shrink-0 items-center justify-center rounded-md ${item.className}`}
                                >
                                    <item.icon className="size-5" />
                                </span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid flex-1 gap-4 xl:grid-cols-[1fr_380px]">
                    <Card>
                        <CardHeader>
                            <div>
                                <CardTitle>Recent submissions</CardTitle>
                                <CardDescription>
                                    Latest applications waiting in the queue
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {recentRegistrations.length > 0 ? (
                                <div className="overflow-x-auto rounded-md border">
                                    <table className="w-full min-w-[720px] text-sm">
                                        <thead className="bg-muted/50">
                                            <tr className="border-b">
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Applicant
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Degree priority
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Documents
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Status
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Submitted
                                                </th>
                                                <th className="px-4 py-3 text-right font-medium">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentRegistrations.map(
                                                (registration) => (
                                                    <tr
                                                        className="border-b last:border-b-0"
                                                        key={registration.id}
                                                    >
                                                        <td className="px-4 py-3 font-medium">
                                                            {
                                                                registration.applicant_name
                                                            }
                                                        </td>
                                                        <td className="max-w-[260px] truncate px-4 py-3 text-muted-foreground">
                                                            {
                                                                registration.first_priority
                                                            }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {
                                                                registration.documents_count
                                                            }{' '}
                                                            submitted
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <Badge
                                                                className="capitalize"
                                                                variant="secondary"
                                                            >
                                                                {statusLabel(
                                                                    registration.status,
                                                                )}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-3 text-muted-foreground">
                                                            {formatDate(
                                                                registration.submitted_at,
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            <Button
                                                                asChild
                                                                size="sm"
                                                                variant="outline"
                                                            >
                                                                <Link
                                                                    href={`/registrations/${registration.id}`}
                                                                >
                                                                    Review
                                                                </Link>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed text-center">
                                    <FileText className="mb-3 size-10 text-muted-foreground" />
                                    <h2 className="font-medium">
                                        No applications yet
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Submitted registrations will appear
                                        here.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="grid gap-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                        <BarChart3 className="size-5" />
                                    </span>
                                    <div>
                                        <CardTitle>Status mix</CardTitle>
                                        <CardDescription>
                                            Application workload by status
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {statusBreakdown.length > 0 ? (
                                    <div className="space-y-4">
                                        {statusBreakdown.map((item) => (
                                            <div key={item.status}>
                                                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                                                    <span className="capitalize">
                                                        {statusLabel(
                                                            item.status,
                                                        )}
                                                    </span>
                                                    <span className="font-medium">
                                                        {item.count}
                                                    </span>
                                                </div>
                                                <div className="h-2 rounded-full bg-muted">
                                                    <div
                                                        className="h-2 rounded-full bg-primary"
                                                        style={{
                                                            width: `${percentage(
                                                                item.count,
                                                                summary.total_registrations,
                                                            )}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No status data to display.
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <span className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground">
                                        <GraduationCap className="size-5" />
                                    </span>
                                    <div>
                                        <CardTitle>
                                            Top degree choices
                                        </CardTitle>
                                        <CardDescription>
                                            Most selected first priorities
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {topPrograms.length > 0 ? (
                                    <div className="space-y-3">
                                        {topPrograms.map((program, index) => (
                                            <div
                                                className="flex items-start gap-3"
                                                key={program.program}
                                            >
                                                <span className="flex size-7 shrink-0 items-center justify-center rounded-md border text-xs font-medium">
                                                    {index + 1}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium">
                                                        {program.program}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {program.count}{' '}
                                                        applicant
                                                        {program.count === 1
                                                            ? ''
                                                            : 's'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No degree choices to display.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
