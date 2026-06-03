import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    FileText,
    GraduationCap,
    Phone,
    UserRound,
    XCircle,
} from 'lucide-react';
import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type DetailPayload = Record<string, unknown>;

type DetailDocument = {
    name: string;
    checked: boolean;
    file_url?: string | null;
    original_name?: string | null;
    mime_type?: string | null;
    size?: number | null;
};

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
    payload: DetailPayload;
    documents: DetailDocument[];
};

type FieldDefinition = {
    label: string;
    key: string;
};

const personalFields: FieldDefinition[] = [
    { label: 'Last name', key: 'last_name' },
    { label: 'First name', key: 'first_name' },
    { label: 'Middle name', key: 'middle_name' },
    { label: 'Address', key: 'address' },
    { label: 'Zip code', key: 'zip_code' },
    { label: 'Telephone', key: 'telephone' },
    { label: 'Birth date', key: 'birth_date' },
    { label: 'Birthplace', key: 'birthplace' },
    { label: 'Civil status', key: 'civil_status' },
    { label: 'Sex', key: 'sex' },
    { label: 'Nationality', key: 'nationality' },
    { label: 'Languages and dialects', key: 'languages' },
];

const programFields: FieldDefinition[] = [
    { label: 'First priority degree', key: 'first_priority' },
    { label: 'Second priority degree', key: 'second_priority' },
    { label: 'Third priority degree', key: 'third_priority' },
    { label: 'Completion timeline', key: 'completion_timeline' },
    { label: 'Application goals', key: 'application_goals' },
    { label: 'Learning time plan', key: 'learning_time_plan' },
    {
        label: 'Overseas accreditation plan',
        key: 'overseas_accreditation_plan',
    },
];

const lifelongFields: FieldDefinition[] = [
    { label: 'Hobbies and leisure activities', key: 'hobbies' },
    { label: 'Special skills', key: 'special_skills' },
    { label: 'Work-related learning', key: 'work_related_learning' },
    { label: 'Volunteer activities', key: 'volunteer_activities' },
    { label: 'Travels', key: 'travels' },
    {
        label: 'Degree contribution essay',
        key: 'degree_contribution_essay',
    },
];

const repeaterSections = [
    {
        title: 'Formal Education',
        key: 'formal_education',
        fields: [
            { label: 'Course or degree program', key: 'course' },
            { label: 'School and address', key: 'school' },
            { label: 'Inclusive dates', key: 'dates' },
        ],
    },
    {
        title: 'Non-Formal Education',
        key: 'non_formal_education',
        fields: [
            { label: 'Training program', key: 'title' },
            { label: 'Certificate obtained', key: 'certificate' },
            { label: 'Inclusive dates', key: 'dates' },
        ],
    },
    {
        title: 'Certification Examinations',
        key: 'certifications',
        fields: [
            { label: 'Certification examination', key: 'title' },
            { label: 'Certifying agency', key: 'agency' },
            { label: 'Date certified', key: 'certifiedDate' },
            { label: 'Rating', key: 'rating' },
        ],
    },
    {
        title: 'Work Experience',
        key: 'work_experiences',
        fields: [
            { label: 'Post or designation', key: 'post' },
            { label: 'Inclusive dates', key: 'dates' },
            { label: 'Company name and address', key: 'company' },
            { label: 'Employment status', key: 'status' },
            { label: 'Immediate supervisor', key: 'supervisor' },
            { label: 'Self-employment references', key: 'references' },
            { label: 'Reason for moving jobs', key: 'reason' },
            { label: 'Responsibilities', key: 'responsibilities' },
        ],
    },
    {
        title: 'Academic Awards',
        key: 'academic_awards',
        fields: [
            { label: 'Award conferred', key: 'award' },
            { label: 'Conferring organization', key: 'organization' },
            { label: 'Date awarded', key: 'date' },
        ],
    },
    {
        title: 'Community and Civic Awards',
        key: 'community_awards',
        fields: [
            { label: 'Award conferred', key: 'award' },
            { label: 'Conferring organization', key: 'organization' },
            { label: 'Date awarded', key: 'date' },
        ],
    },
    {
        title: 'Work Related Awards',
        key: 'work_awards',
        fields: [
            { label: 'Award conferred', key: 'award' },
            { label: 'Conferring organization', key: 'organization' },
            { label: 'Date awarded', key: 'date' },
        ],
    },
    {
        title: 'Creative Works and Special Accomplishments',
        key: 'creative_works',
        fields: [
            { label: 'Description', key: 'description' },
            { label: 'Date accomplished', key: 'date' },
            {
                label: 'Publishing agency or attesting organization',
                key: 'attestingOrganization',
            },
        ],
    },
];

function formatDate(value: string | null) {
    if (!value) {
        return 'Not recorded';
    }

    return new Intl.DateTimeFormat('en', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(value));
}

function displayValue(value: unknown): string {
    if (value === null || value === undefined || value === '') {
        return 'Not provided';
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
    }

    return JSON.stringify(value);
}

function formatFileSize(size?: number | null) {
    if (!size) {
        return null;
    }

    if (size < 1024 * 1024) {
        return `${Math.round(size / 1024)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function submittedDocumentCount(documents: DetailDocument[]) {
    return documents.filter((document) => document.checked || document.file_url)
        .length;
}

function SummaryTile({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: ReactNode;
}) {
    return (
        <div className="rounded-md border bg-muted/20 p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                {icon}
                {label}
            </div>
            <div className="text-sm font-medium">{value}</div>
        </div>
    );
}

function DetailGrid({
    fields,
    payload,
}: {
    fields: FieldDefinition[];
    payload: DetailPayload;
}) {
    return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {fields.map((field) => (
                <div
                    className="rounded-md border bg-background p-3"
                    key={field.key}
                >
                    <p className="text-xs font-medium text-muted-foreground">
                        {field.label}
                    </p>
                    <p className="mt-1 text-sm whitespace-pre-wrap">
                        {displayValue(payload[field.key])}
                    </p>
                </div>
            ))}
        </div>
    );
}

function DetailSection({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}

function getRepeaterItems(payload: DetailPayload, key: string) {
    const value = payload[key];

    if (!Array.isArray(value)) {
        return [];
    }

    return value.filter(
        (item): item is Record<string, unknown> =>
            item !== null && typeof item === 'object' && !Array.isArray(item),
    );
}

export default function RegistrationShow({
    registration,
}: {
    registration: Registration;
}) {
    const documentCount = submittedDocumentCount(registration.documents);

    return (
        <>
            <Head title={`Registration #${registration.id}`} />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="gap-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex items-start gap-4">
                                {registration.id_picture_url ? (
                                    <img
                                        alt={`${registration.applicant_name} ID picture`}
                                        className="size-24 rounded-md border object-cover"
                                        src={registration.id_picture_url}
                                    />
                                ) : (
                                    <span className="flex size-24 items-center justify-center rounded-md border bg-muted text-muted-foreground">
                                        <UserRound className="size-9" />
                                    </span>
                                )}
                                <div className="min-w-0">
                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                        <CardTitle className="text-2xl">
                                            {registration.applicant_name}
                                        </CardTitle>
                                        <Badge className="capitalize">
                                            {registration.status}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        Registration #{registration.id}
                                    </CardDescription>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Submitted{' '}
                                        {formatDate(registration.submitted_at)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Button asChild variant="outline">
                                    <Link href="/registrations">
                                        <ArrowLeft />
                                        Back to list
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <SummaryTile
                                icon={<GraduationCap className="size-4" />}
                                label="First priority"
                                value={registration.first_priority}
                            />
                            <SummaryTile
                                icon={<Phone className="size-4" />}
                                label="Telephone"
                                value={registration.telephone || 'Not provided'}
                            />
                            <SummaryTile
                                icon={<FileText className="size-4" />}
                                label="Documents"
                                value={`${documentCount} of ${registration.documents.length} submitted`}
                            />
                            <SummaryTile
                                icon={<CalendarDays className="size-4" />}
                                label="Submitted"
                                value={formatDate(registration.submitted_at)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <DetailSection title="Personal Information">
                    {!registration.id_picture_url && (
                        <p className="mb-4 rounded-md border border-dashed p-3 text-sm text-muted-foreground">
                            No ID picture uploaded.
                        </p>
                    )}
                    <DetailGrid
                        fields={personalFields}
                        payload={registration.payload}
                    />
                </DetailSection>

                <DetailSection title="Program Application">
                    <DetailGrid
                        fields={programFields}
                        payload={registration.payload}
                    />
                </DetailSection>

                {repeaterSections.map((section) => {
                    const items = getRepeaterItems(
                        registration.payload,
                        section.key,
                    );

                    return (
                        <DetailSection
                            description={`${items.length} entr${items.length === 1 ? 'y' : 'ies'}`}
                            key={section.key}
                            title={section.title}
                        >
                            {items.length > 0 ? (
                                <div className="space-y-3">
                                    {items.map((item, index) => (
                                        <div
                                            className="rounded-md border bg-muted/20 p-3"
                                            key={`${section.key}-${index}`}
                                        >
                                            <p className="mb-3 text-sm font-medium">
                                                Entry {index + 1}
                                            </p>
                                            <DetailGrid
                                                fields={section.fields}
                                                payload={item}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No entries submitted.
                                </p>
                            )}
                        </DetailSection>
                    );
                })}

                <DetailSection title="Lifelong Learning Experience">
                    <DetailGrid
                        fields={lifelongFields}
                        payload={registration.payload}
                    />
                </DetailSection>

                <DetailSection
                    description={`${documentCount} of ${registration.documents.length} submitted`}
                    title="Required Documents"
                >
                    <div className="grid gap-3 md:grid-cols-2">
                        {registration.documents.map((document) => {
                            const isUploaded = Boolean(document.file_url);
                            const isSubmitted = document.checked || isUploaded;

                            return (
                                <div
                                    className="rounded-md border bg-background p-3"
                                    key={document.name}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex min-w-0 items-start gap-3">
                                            {isSubmitted ? (
                                                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                                            ) : (
                                                <XCircle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium">
                                                    {document.name}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {isUploaded
                                                        ? [
                                                              document.original_name,
                                                              formatFileSize(
                                                                  document.size,
                                                              ),
                                                          ]
                                                              .filter(Boolean)
                                                              .join(' · ')
                                                        : document.checked
                                                          ? 'Marked as submitted'
                                                          : 'Not marked'}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                isSubmitted
                                                    ? 'secondary'
                                                    : 'outline'
                                            }
                                        >
                                            {isUploaded
                                                ? 'Uploaded'
                                                : document.checked
                                                  ? 'Checked'
                                                  : 'Missing'}
                                        </Badge>
                                    </div>
                                    {document.file_url && (
                                        <>
                                            <Separator className="my-3" />
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                            >
                                                <a
                                                    href={document.file_url}
                                                    rel="noreferrer"
                                                    target="_blank"
                                                >
                                                    <FileText />
                                                    Open file
                                                </a>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </DetailSection>
            </div>
        </>
    );
}

RegistrationShow.layout = {
    breadcrumbs: [
        {
            title: 'Registrations',
            href: '/registrations',
        },
        {
            title: 'Details',
            href: '#',
        },
    ],
};
