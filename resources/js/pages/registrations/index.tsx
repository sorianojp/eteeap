import { Head, Link } from '@inertiajs/react';
import { ClipboardList, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type Registration = {
    id: number;
    applicant_name: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    telephone: string | null;
    first_priority: string;
    status: string;
    submitted_at: string | null;
    id_picture_url: string | null;
    documents_count: number;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedRegistrations = {
    data: Registration[];
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
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

function cleanPaginationLabel(label: string) {
    return label.replace('&laquo;', 'Previous').replace('&raquo;', 'Next');
}

export default function RegistrationsIndex({
    registrations: registrationPage,
}: {
    registrations: PaginatedRegistrations;
}) {
    return (
        <>
            <Head title="Registrations" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-start gap-3">
                            <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <ClipboardList className="size-5" />
                            </span>
                            <div>
                                <CardTitle>Registrations</CardTitle>
                                <CardDescription>
                                    Submitted ETEEAP application registrations
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {registrationPage.data.length > 0 ? (
                            <>
                                <div className="overflow-x-auto rounded-md border">
                                    <table className="w-full min-w-[760px] text-sm">
                                        <thead className="bg-muted/50">
                                            <tr className="border-b">
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Photo
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Applicant
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Degree priority
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Telephone
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
                                            {registrationPage.data.map(
                                                (registration) => (
                                                    <tr
                                                        className="border-b last:border-b-0"
                                                        key={registration.id}
                                                    >
                                                        <td className="px-4 py-3">
                                                            {registration.id_picture_url ? (
                                                                <img
                                                                    alt={`${registration.applicant_name} ID picture`}
                                                                    className="size-12 rounded-md border object-cover"
                                                                    src={
                                                                        registration.id_picture_url
                                                                    }
                                                                />
                                                            ) : (
                                                                <div className="flex size-12 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground">
                                                                    None
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 font-medium">
                                                            {
                                                                registration.applicant_name
                                                            }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {
                                                                registration.first_priority
                                                            }
                                                        </td>
                                                        <td className="px-4 py-3 text-muted-foreground">
                                                            {registration.telephone ||
                                                                'Not provided'}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {
                                                                registration.documents_count
                                                            }{' '}
                                                            submitted
                                                        </td>
                                                        <td className="px-4 py-3 capitalize">
                                                            {
                                                                registration.status
                                                            }
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
                                                                    <Eye />
                                                                    View
                                                                </Link>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Showing {registrationPage.from} to{' '}
                                        {registrationPage.to} of{' '}
                                        {registrationPage.total} registrations
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {registrationPage.links.map(
                                            (link, index) => (
                                                <Button
                                                    asChild={Boolean(link.url)}
                                                    disabled={!link.url}
                                                    key={`${link.label}-${index}`}
                                                    size="sm"
                                                    variant={
                                                        link.active
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                >
                                                    {link.url ? (
                                                        <Link href={link.url}>
                                                            {cleanPaginationLabel(
                                                                link.label,
                                                            )}
                                                        </Link>
                                                    ) : (
                                                        <span>
                                                            {cleanPaginationLabel(
                                                                link.label,
                                                            )}
                                                        </span>
                                                    )}
                                                </Button>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed text-center">
                                <ClipboardList className="mb-3 size-10 text-muted-foreground" />
                                <h2 className="font-medium">
                                    No registrations yet
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Submitted applications will appear here.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

RegistrationsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Registrations',
            href: '/registrations',
        },
    ],
};
