import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ClipboardList,
    FileCheck2,
    GraduationCap,
    LayoutDashboard,
    ListChecks,
    Receipt,
    Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const admissionSteps = [
    {
        title: 'Initial Screening',
        description:
            'Applicant undergoes initial screening with the ETEEAP Focal Person.',
        icon: Users,
        accent: 'bg-sky-50 text-sky-700 ring-sky-200',
    },
    {
        title: 'Application Form',
        description:
            'Applicant accomplishes the ETEEAP form in duplicate and submits it to the Focal Person.',
        icon: ClipboardList,
        accent: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    },
    {
        title: 'Portfolio Submission',
        description:
            'Qualified applicants submit the form, portfolio, and supporting evidence to the Dean or Program Chair.',
        icon: FileCheck2,
        accent: 'bg-amber-50 text-amber-700 ring-amber-200',
    },
    {
        title: 'Portfolio Review',
        description:
            'Complete documentation is recommended for assessment; deficient portfolios are returned for completion.',
        icon: ListChecks,
        accent: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
    },
    {
        title: 'Assessment Payment',
        description:
            'Applicant signs up in the enrolment system and pays assessment and admission fees.',
        icon: Receipt,
        accent: 'bg-violet-50 text-violet-700 ring-violet-200',
    },
    {
        title: 'Enrolment Proper',
        description:
            "Applicant pays ETEEAP fees to the Cashier's Office before the implementing unit assessment.",
        icon: Receipt,
        accent: 'bg-teal-50 text-teal-700 ring-teal-200',
    },
    {
        title: 'Panel Assessment',
        description:
            'The implementing unit convenes assessors for competency or work-based evaluation.',
        icon: Users,
        accent: 'bg-rose-50 text-rose-700 ring-rose-200',
    },
    {
        title: 'Learning Pathways',
        description:
            'Alternative learning materials or pathways are issued when applicants need to meet desired skills.',
        icon: FileCheck2,
        accent: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    },
    {
        title: 'Grade Evaluation',
        description:
            'Academic records are verified to ensure required subjects and grades are complete for graduation eligibility.',
        icon: GraduationCap,
        accent: 'bg-lime-50 text-lime-700 ring-lime-200',
    },
    {
        title: 'Graduation Application',
        description:
            "After evaluation, students proceed to the Registrar's Office for graduation application and special order processing.",
        icon: GraduationCap,
        accent: 'bg-orange-50 text-orange-700 ring-orange-200',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="ETEEAP Admission Flow" />
            <div className="min-h-screen bg-background text-foreground">
                <header className="border-b bg-background/95">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-muted-foreground">
                                Expanded Tertiary Education Equivalency and
                                Accreditation Program
                            </p>
                            <h1 className="text-xl font-semibold sm:text-2xl">
                                Admission and Assessment Procedure
                            </h1>
                        </div>
                        <nav className="flex flex-wrap gap-2">
                            {auth.user && (
                                <>
                                    <Button asChild variant="outline">
                                        <Link href="/registrations">
                                            <ClipboardList />
                                            Registrations
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline">
                                        <Link href="/dashboard">
                                            <LayoutDashboard />
                                            Dashboard
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid gap-6">
                        <section className="space-y-4">
                            <div className="grid gap-3">
                                <div className="mx-auto text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Start
                                </div>
                                {admissionSteps.map((step, index) => {
                                    const Icon = step.icon;

                                    return (
                                        <div
                                            className="grid justify-items-center gap-3"
                                            key={step.title}
                                        >
                                            <ArrowRight className="size-5 rotate-90 text-muted-foreground" />
                                            <Card className="w-full gap-0 rounded-md border shadow-sm">
                                                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
                                                    <span
                                                        className={`flex size-10 shrink-0 items-center justify-center rounded-md ring-1 ${step.accent}`}
                                                    >
                                                        <Icon className="size-5" />
                                                    </span>
                                                    <div className="min-w-0">
                                                        <CardDescription>
                                                            Step {index + 1}
                                                        </CardDescription>
                                                        <CardTitle className="text-base">
                                                            {step.title}
                                                        </CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm leading-6 text-muted-foreground">
                                                        {step.description}
                                                    </p>
                                                    {index === 1 && (
                                                        <Button
                                                            asChild
                                                            className="mt-4"
                                                        >
                                                            <Link href="/registration">
                                                                Go to
                                                                Registration
                                                                <ArrowRight />
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
